/* ════════════════════════════════════════════════════════════════
   APEX — Candle Data Worker (Cloudflare)
   ────────────────────────────────────────────────────────────────
   Proxies historical OHLC candles from Twelve Data so that EVERY app
   user runs through YOUR single server-side API key (no per-user key).
   Adds CORS, validates input, and edge-caches results — historical
   candles never change, so repeated requests (auto-fill MFE/MAE,
   backtest, replay, trade charts) are basically free after the first
   call, which dramatically stretches the daily Twelve Data quota.

   Endpoint (GET):
     /candles?symbol=XAU/USD&interval=5min&start_date=YYYY-MM-DD HH:MM:SS&end_date=...
   Returns Twelve Data's native JSON: { values:[{datetime,open,high,low,close},...], status:"ok" }

   ── DEPLOY ───────────────────────────────────────────────────────
   1.  Create a free Twelve Data key:  https://twelvedata.com/register
   2.  Create a new Cloudflare Worker, paste this file, deploy.
   3.  Store your key as a SECRET (not plain text):
         npx wrangler secret put TD_API_KEY
       (or Dashboard → Worker → Settings → Variables → add secret TD_API_KEY)
   4.  Copy the Worker URL and set it in indexerweitert.html:
         var CANDLE_WORKER_URL = 'https://YOUR-worker.workers.dev';
   5.  (optional) lock CORS to your domain via ALLOW_ORIGIN below.

   Quota note: the free Twelve Data plan is 800 calls/day & 8/min shared
   across ALL users on this key. Caching covers re-runs; if many users
   fill large journals, upgrade the Twelve Data plan.
   ════════════════════════════════════════════════════════════════ */

const ALLOW_ORIGIN = '*'; // e.g. 'https://your-domain.com' to lock it down
const TD_BASE = 'https://api.twelvedata.com/time_series';
const EDGE_TTL = 86400;   // cache historical candles 24h at the edge
const BACKUP_TTL = 43200; // letzte gute Antwort 12h aufheben (Notvorrat)

/* Wie grob die Zeitfenster fuer den Zwischenspeicher gerundet werden.
   Der Live-Chart fragt mit end_date = JETZT — dadurch bekam jede einzelne
   Abfrage einen eigenen Schluessel und der Zwischenspeicher lief ins Leere,
   waehrend das Kontingent (8/min, geteilt von ALLEN Nutzern) verbrannte.
   Mit Rundung teilen sich alle Abfragen innerhalb eines Fensters einen
   Eintrag: 100 Nutzer auf XAUUSD = eine Abfrage nach oben statt hundert.
   Die Rundung kostet hoechstens so viel Aktualitaet wie das Fenster gross
   ist, und die liegt deutlich unter der Verzoegerung des Anbieters selbst. */
const FENSTER = { '1min': 30, '5min': 60, '15min': 120, '30min': 300,
                  '45min': 300, '1h': 300, '2h': 600, '4h': 900, '1day': 3600 };

function fenster(interval) { return FENSTER[interval] || 60; }

/* 'YYYY-MM-DD HH:MM:SS' auf ein Vielfaches von sekunden abrunden. Bei
   unlesbarer Eingabe unveraendert zurueckgeben — lieber kein Treffer im
   Zwischenspeicher als ein falsches Zeitfenster. */
function runden(s, sekunden) {
  const ms = Date.parse(String(s).replace(' ', 'T') + 'Z');
  if (!isFinite(ms)) return s;
  const r = Math.floor(ms / (sekunden * 1000)) * sekunden * 1000;
  return new Date(r).toISOString().slice(0, 19).replace('T', ' ');
}
const ALLOWED_INTERVALS = new Set(['1min', '5min', '15min', '30min', '45min', '1h', '2h', '4h', '1day']);

const CORS = {
  'Access-Control-Allow-Origin': ALLOW_ORIGIN,
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

/* Treffer aus dem Zwischenspeicher als frische Antwort ausgeben. Ein
   gecachter Response ist gebraucht, sobald sein Rumpf gelesen wurde —
   deshalb immer neu verpacken statt direkt weiterreichen. */
async function cachesMatch(key) {
  const c = await caches.default.match(key);
  if (!c) return null;
  const r = new Response(c.body, c);
  r.headers.set('X-APEX-Cache', 'HIT');
  return r;
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

    const url = new URL(request.url);

    // Unauthenticated liveness probe — status page and uptime monitor.
    if (url.pathname === '/health') {
      const configured = !!(env && env.TD_API_KEY);
      return json({ ok: configured, service: 'evidence-candles', configured, ts: Date.now() },
                  configured ? 200 : 503);
    }

    /* ── Aktueller Preis ──────────────────────────────────────────
       Die Kerzen-Schnittstelle liefert nur ABGESCHLOSSENE Kerzen — daher die
       zwei Minuten Rueckstand. Ein reiner Preisabruf wartet nicht auf den
       Kerzenschluss, und daraus baut die App die laufende Kerze selbst.
       Sehr kurz zwischengespeichert: 5 Sekunden genuegen, damit beliebig
       viele Nutzer sich eine Abfrage teilen, ohne dass es sich anfuehlt. */
    if (url.pathname === '/price') {
      if (!env || !env.TD_API_KEY)
        return json({ status: 'error', message: 'Worker missing TD_API_KEY secret' }, 500);
      const sym = (url.searchParams.get('symbol') || '').trim();
      if (!sym) return json({ status: 'error', message: 'symbol required' }, 400);
      const key = new Request('https://apex-candles-cache.local/p?symbol=' + encodeURIComponent(sym));
      const hit = await cachesMatch(key);
      if (hit) return hit;
      try {
        const r = await fetch('https://api.twelvedata.com/price?' + new URLSearchParams({
          symbol: sym, apikey: env.TD_API_KEY,
        }).toString());
        const j = await r.json();
        const preis = j && j.price != null ? Number(j.price) : NaN;
        if (!isFinite(preis))
          return json({ status: 'error', message: (j && j.message) || 'kein Preis' }, 200);
        const out = json({ status: 'ok', symbol: sym, price: preis, ts: Date.now() });
        const c = out.clone(); c.headers.set('Cache-Control', 'public, max-age=5');
        ctx.waitUntil(caches.default.put(key, c));
        return out;
      } catch (e) {
        return json({ status: 'error', message: String(e && e.message) }, 200);
      }
    }

    /* Yahoo als zweite Preisquelle: kostenlos, ohne Schluessel, unbegrenzt —
       und bei Forex und Krypto tatsaechlich in Echtzeit (gemessen: 20
       Sekunden). Nur ueber den Worker erreichbar, weil der Browser dort
       nicht direkt hindarf. Fuer Gold und Indizes ist Yahoo verzoegert,
       darum entscheidet die App, wofuer sie diese Quelle benutzt. */
    if (url.pathname === '/yprice') {
      const sym = (url.searchParams.get('symbol') || '').trim();
      if (!sym) return json({ status: 'error', message: 'symbol required' }, 400);
      const key = new Request('https://apex-candles-cache.local/y?symbol=' + encodeURIComponent(sym));
      const hit = await cachesMatch(key);
      if (hit) return hit;
      try {
        const r = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/' +
          encodeURIComponent(sym) + '?interval=1m&range=1d',
          { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const j = await r.json();
        const m = j && j.chart && j.chart.result && j.chart.result[0] && j.chart.result[0].meta;
        const preis = m && m.regularMarketPrice != null ? Number(m.regularMarketPrice) : NaN;
        if (!isFinite(preis))
          return json({ status: 'error', message: 'kein Preis fuer ' + sym }, 200);
        const out = json({
          status: 'ok', symbol: sym, price: preis,
          ts: (m.regularMarketTime ? m.regularMarketTime * 1000 : Date.now()),
        });
        const c = out.clone(); c.headers.set('Cache-Control', 'public, max-age=5');
        ctx.waitUntil(caches.default.put(key, c));
        return out;
      } catch (e) {
        return json({ status: 'error', message: String(e && e.message) }, 200);
      }
    }

    /* ── Kerzen von Yahoo ─────────────────────────────────────────
       Fuer Forex und Krypto ist Yahoo die bessere Quelle: kostenlos, ohne
       Schluessel, ohne Tageskontingent — und in Echtzeit statt zwei Minuten
       verzoegert (gemessen: EURUSD 6 Sekunden alt). Spot-Gold und Indizes
       kann Yahoo NICHT, die bleiben bei Twelve Data.

       Die Antwort hat bewusst dasselbe Format wie Twelve Data
       ({ values:[{datetime,open,high,low,close,volume}] }), damit die App
       nur die Quelle waehlen muss und sonst nichts aendert. */
    if (url.pathname === '/ycandles') {
      const sym = (url.searchParams.get('symbol') || '').trim();
      const iv  = (url.searchParams.get('interval') || '15min').trim();
      if (!sym) return json({ status: 'error', message: 'symbol required' }, 400);

      /* Yahoo kennt kein 4h. Dafuer 60m holen und je vier zusammenfassen —
         hier im Worker, damit die App keinen Sonderfall bekommt. */
      const PLAN = {
        '1min':  { iv: '1m',  range: '5d',  fassen: 1 },
        '5min':  { iv: '5m',  range: '1mo', fassen: 1 },
        '15min': { iv: '15m', range: '1mo', fassen: 1 },
        '30min': { iv: '30m', range: '1mo', fassen: 1 },
        '1h':    { iv: '60m', range: '3mo', fassen: 1 },
        '4h':    { iv: '60m', range: '2y',  fassen: 4 },
        '1day':  { iv: '1d',  range: '5y',  fassen: 1 },
      };
      const plan = PLAN[iv];
      if (!plan) return json({ status: 'error', message: 'bad interval' }, 400);

      const key = new Request('https://apex-candles-cache.local/yc?' +
        new URLSearchParams({ symbol: sym, interval: iv }).toString());
      const hit = await cachesMatch(key);
      if (hit) return hit;

      try {
        const r = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/' +
          encodeURIComponent(sym) + '?interval=' + plan.iv + '&range=' + plan.range,
          { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const j = await r.json();
        const res = j && j.chart && j.chart.result && j.chart.result[0];
        const ts  = res && res.timestamp;
        const q   = res && res.indicators && res.indicators.quote && res.indicators.quote[0];
        if (!ts || !q) {
          const msg = (j && j.chart && j.chart.error && j.chart.error.description) ||
                      'no candles for ' + sym;
          return json({ status: 'error', message: msg }, 200);
        }

        let roh = [];
        for (let i = 0; i < ts.length; i++) {
          /* Yahoo laesst Luecken als null stehen (Feiertage, duenne Minuten).
             Eine Kerze mit null-Schluss wuerde jede Rechnung darueber
             vergiften — solche Punkte gehoeren raus, nicht auf 0 gesetzt. */
          if (q.close[i] == null || q.open[i] == null) continue;
          roh.push({ t: ts[i] * 1000, o: +q.open[i], h: +q.high[i],
                     l: +q.low[i], c: +q.close[i], v: +(q.volume[i] || 0) });
        }

        if (plan.fassen > 1) {
          const f = plan.fassen, aus = [];
          /* Vom ENDE her gruppieren, damit die letzte Kerze die aktuelle
             bleibt und ein unvollstaendiger Rest vorne landet. */
          const rest = roh.length % f;
          for (let i = rest; i + f <= roh.length; i += f) {
            const teil = roh.slice(i, i + f);
            aus.push({ t: teil[0].t, o: teil[0].o,
                       h: Math.max.apply(null, teil.map(x => x.h)),
                       l: Math.min.apply(null, teil.map(x => x.l)),
                       c: teil[f - 1].c,
                       v: teil.reduce((a, x) => a + x.v, 0) });
          }
          roh = aus;
        }

        const values = roh.map(b => ({
          datetime: new Date(b.t).toISOString().slice(0, 19).replace('T', ' '),
          open: b.o, high: b.h, low: b.l, close: b.c, volume: b.v,
        }));
        if (!values.length) return json({ status: 'error', message: 'no usable candles' }, 200);

        const out = json({ status: 'ok', quelle: 'yahoo', symbol: sym, values });
        const c = out.clone();
        c.headers.set('Cache-Control', 'public, max-age=' + (FENSTER[iv] || 60));
        ctx.waitUntil(caches.default.put(key, c));
        return out;
      } catch (e) {
        return json({ status: 'error', message: String(e && e.message) }, 200);
      }
    }

    if (url.pathname !== '/candles' && url.pathname !== '/') {
      return json({ status: 'error', message: 'not found' }, 404);
    }
    if (!env || !env.TD_API_KEY) {
      return json({ status: 'error', message: 'Worker missing TD_API_KEY secret' }, 500);
    }

    const symbol   = (url.searchParams.get('symbol') || '').trim();
    const interval = (url.searchParams.get('interval') || '5min').trim();
    const start    = (url.searchParams.get('start_date') || '').trim();
    const end      = (url.searchParams.get('end_date') || '').trim();

    if (!symbol)                       return json({ status: 'error', message: 'symbol required' }, 400);
    if (!ALLOWED_INTERVALS.has(interval)) return json({ status: 'error', message: 'bad interval' }, 400);
    if (!start || !end)                return json({ status: 'error', message: 'start_date & end_date required' }, 400);

    // Edge cache key — deterministic, NEVER contains the secret key.
    const cache = caches.default;
    const fw    = fenster(interval);
    /* Gerundetes Fenster statt der exakten Zeitstempel. Nur so koennen sich
       mehrere Nutzer denselben Eintrag teilen. */
    const qStart = runden(start, fw);
    const qEnd   = runden(end,   fw);
    const cacheKey = new Request(
      'https://apex-candles-cache.local/c?' +
      new URLSearchParams({ symbol, interval, start: qStart, end: qEnd }).toString()
    );
    /* Notvorrat: unabhaengig vom Zeitfenster, nur Symbol und Intervall. Ist
       das Kontingent erschoepft, wird daraus bedient statt eine Fehlermeldung
       auszuliefern. Leicht veraltete Kerzen sind unbrauchbarer als frische,
       aber unendlich viel brauchbarer als ein leerer Chart. */
    const backupKey = new Request(
      'https://apex-candles-cache.local/backup?' +
      new URLSearchParams({ symbol, interval }).toString()
    );

    const cached = await cache.match(cacheKey);
    if (cached) {
      const r = new Response(cached.body, cached);
      r.headers.set('X-APEX-Cache', 'HIT');
      return r;
    }

    // Build upstream URL with the server-side secret.
    const upstream = TD_BASE + '?' + new URLSearchParams({
      symbol, interval,
      start_date: qStart, end_date: qEnd,
      timezone: 'UTC', order: 'ASC', outputsize: '5000', format: 'JSON',
      apikey: env.TD_API_KEY,
    }).toString();

    let payload, ok = false;
    try {
      const res = await fetch(upstream, { cf: { cacheTtl: 0 } });
      payload = await res.json();
      ok = res.ok && payload && payload.status !== 'error' && Array.isArray(payload.values);
    } catch (e) {
      payload = { status: 'error', message: 'upstream fetch failed: ' + (e && e.message) };
    }

    /* Anbieter hat nichts geliefert — Kontingent, Ausfall, Tarif. Statt den
       Chart leer zu lassen, den Notvorrat ausgeben und ehrlich kennzeichnen. */
    if (!ok) {
      const backup = await cache.match(backupKey);
      if (backup) {
        const r = new Response(backup.body, backup);
        r.headers.set('X-APEX-Cache', 'STALE');
        r.headers.set('X-APEX-Stale-Reason', String((payload && payload.message) || 'upstream error').slice(0, 120));
        return r;
      }
    }

    const out = json(payload, 200); // TD-Fehler im Rumpf durchreichen
    out.headers.set('X-APEX-Cache', ok ? 'MISS' : 'MISS-ERROR');

    // Nur echte, erfolgreiche Kerzen aufheben.
    if (ok && payload.values.length) {
      const frisch = out.clone();
      frisch.headers.set('Cache-Control', 'public, max-age=' + fw);
      ctx.waitUntil(cache.put(cacheKey, frisch));
      const vorrat = out.clone();
      vorrat.headers.set('Cache-Control', 'public, max-age=' + BACKUP_TTL);
      ctx.waitUntil(cache.put(backupKey, vorrat));
    }
    return out;
  },
};
