/* ════════════════════════════════════════════════════════════════
   Evidence — Service Worker
   • Makes the app installable (PWA) and available offline.
   • Network-first for the HTML shell so updates always flow; falls
     back to the cached copy when offline.
   • Cache-first for static same-origin assets (icon, manifest).
   • Handles Web Push ('push') + notification clicks so alerts can
     arrive even when the app is closed (needs a server to send them).
   Bump CACHE when you change the cached shell so old copies get purged.
   ════════════════════════════════════════════════════════════════ */
/* Bei JEDEM Deploy hochzählen und sw.js mit hochladen. Der Browser
   installiert einen neuen Service Worker nur, wenn sich diese Datei
   byteweise ändert — bleibt sie liegen, behalten installierte Apps die
   alten Icons/Manifest-Einträge (cache-first) und das alte SW-Verhalten.
   Die index.html selbst kommt dank network-first trotzdem frisch an. */
const CACHE = 'evidence-v211';

/* Alle Pfade relativ zum Ablageort dieser Datei — NICHT ab "/".
   Auf GitHub Pages liegt die App unter /<repo>/, dort zeigt "/" auf
   sdbyjason.github.io und damit ins Leere. So funktioniert es in beiden
   Fällen: im Unterordner und später unter der eigenen Domain im Wurzelpfad. */
const BASE = new URL('./', self.location).href;

/* Seit 11.11.2026 sind Landingpage und App getrennt: "/" (index.html) ist nur
   noch die Landing, die App liegt unter app.html (indexdatenschutz.html ist
   dieselbe Datei unter ihrem alten Namen). Offline gehalten wird allein die
   App — unter EINEM Schlüssel, egal mit welcher Query sie geöffnet wurde.
   Fällt eine Navigation offline aus (auch eine auf "/", etwa der alte
   PWA-Start ./?source=pwa), kommt diese Kopie zurück. */
const APP = BASE + 'app.html';
const BASE_PATH = new URL(BASE).pathname;
const isAppPath = (p) => p === BASE_PATH + 'app.html' || p === BASE_PATH + 'indexdatenschutz.html';
/* Die App selbst steht bewusst NICHT in der Vorab-Liste: wer nur die Landing
   liest und von früher noch einen Service Worker hat, soll dafür keine 2 MB
   im Hintergrund laden. Sie wird beim ersten Öffnen abgelegt. */
const SHELL = [BASE + 'manifest.webmanifest',
  BASE + 'icons/icon-192.png', BASE + 'icons/icon-512.png', BASE + 'icons/icon-512-maskable.png'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {}))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // never touch CDN / Firebase / API calls

  // Navigations → network-first, fall back to cached shell offline.
  /* Die App-Datei immer als Navigation behandeln — auch wenn sie nur vorab
     geholt wird (<link rel="prefetch"> von der Landing): sonst läge sie im
     Cache-first-Zweig und bliebe dort bis zum nächsten CACHE-Wechsel stehen. */
  const isNav = req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html') || isAppPath(url.pathname);
  if (isNav) {
    /* no-cache: beim Server nachfragen statt bis zu 10 Minuten (max-age=600
       bei GitHub Pages) eine alte Kopie aus dem HTTP-Cache zu zeigen. Ist die
       Seite unverändert, antwortet der Server nur mit 304 — kostet nichts.
       Ältere Safari-Versionen werfen beim Kopieren einer Navigation; dann
       eben die Anfrage wie bisher. */
    let netReq = req;
    try { netReq = new Request(req, { cache: 'no-cache' }); } catch (_) {}
    e.respondWith(
      fetch(netReq)
        .then((res) => {
          /* Nur die App selbst als Offline-Kopie ablegen — nicht die
             Academy- oder Vergleichsseiten und keine Fehlerseiten, sonst
             öffnet die App offline plötzlich eine ganz andere Seite. */
          if (res.ok && res.type === 'basic' && isAppPath(url.pathname)) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(APP, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => caches.match(APP).then((r) => r || caches.match(BASE)))
    );
    return;
  }

  // Static same-origin assets → cache-first.
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      }
      return res;
    }).catch(() => cached))
  );
});

/* ── Web Push ──────────────────────────────────────────────────── */
self.addEventListener('push', (e) => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; }
  catch (_) { data = { body: e.data && e.data.text ? e.data.text() : '' }; }
  const title = data.title || 'Evidence';
  const opts = {
    body: data.body || '',
    icon: BASE + 'icons/icon-192.png',
    badge: BASE + 'icons/icon-192.png',
    tag: data.tag || 'evidence',
    renotify: !!data.tag,
    data: { url: data.url || BASE }
  };
  e.waitUntil(self.registration.showNotification(title, opts));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || BASE;
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
      for (const c of cs) {
        if ('focus' in c) { c.navigate && c.navigate(target); return c.focus(); }
      }
      return self.clients.openWindow(target);
    })
  );
});
