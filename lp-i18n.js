/* Evidence — Übersetzung der Landingpage. Erzeugt von .claude/build-landing.js aus
   indexdatenschutz.html (Blöcke data-lp="i18n"); Build 2026-11-19a. Nicht von Hand ändern. */
try {
(function(){
  'use strict';
  var COUNTRIES=[
    {code:'auto', name:'Auto (detect from device)'},
    {code:'DE', name:'Germany',                tz:'Europe/Berlin',        fmt:'24h', lang:'de', cur:'EUR'},
    {code:'AT', name:'Austria',                tz:'Europe/Vienna',        fmt:'24h', lang:'de', cur:'EUR'},
    {code:'CH', name:'Switzerland',            tz:'Europe/Zurich',        fmt:'24h', lang:'de', cur:'CHF'},
    {code:'FR', name:'France',                 tz:'Europe/Paris',         fmt:'24h', lang:'fr', cur:'EUR'},
    {code:'ES', name:'Spain',                  tz:'Europe/Madrid',        fmt:'24h', lang:'es', cur:'EUR'},
    {code:'IT', name:'Italy',                  tz:'Europe/Rome',          fmt:'24h', lang:'it', cur:'EUR'},
    {code:'NL', name:'Netherlands',            tz:'Europe/Amsterdam',     fmt:'24h', lang:'nl', cur:'EUR'},
    {code:'PL', name:'Poland',                 tz:'Europe/Warsaw',        fmt:'24h', lang:'pl', cur:'PLN'},
    {code:'GB', name:'United Kingdom',         tz:'Europe/London',        fmt:'24h', lang:'en', cur:'GBP'},
    {code:'US-ET', name:'United States — Eastern', tz:'America/New_York', fmt:'12h', lang:'en', cur:'USD'},
    {code:'US-CT', name:'United States — Central', tz:'America/Chicago',  fmt:'12h', lang:'en', cur:'USD'},
    {code:'US-MT', name:'United States — Mountain',tz:'America/Denver',   fmt:'12h', lang:'en', cur:'USD'},
    {code:'US-PT', name:'United States — Pacific', tz:'America/Los_Angeles', fmt:'12h', lang:'en', cur:'USD'},
    {code:'CA', name:'Canada — Eastern',       tz:'America/Toronto',      fmt:'12h', lang:'en', cur:'CAD'},
    {code:'BR', name:'Brazil',                 tz:'America/Sao_Paulo',    fmt:'24h', lang:'pt', cur:'BRL'},
    {code:'AE', name:'UAE (Dubai)',            tz:'Asia/Dubai',           fmt:'24h', lang:'en', cur:'AED'},
    {code:'IN', name:'India',                  tz:'Asia/Kolkata',         fmt:'12h', lang:'en', cur:'INR'},
    {code:'SG', name:'Singapore',              tz:'Asia/Singapore',       fmt:'12h', lang:'en', cur:'SGD'},
    {code:'JP', name:'Japan',                  tz:'Asia/Tokyo',           fmt:'24h', lang:'ja', cur:'JPY'},
    {code:'AU', name:'Australia — Sydney',     tz:'Australia/Sydney',     fmt:'12h', lang:'en', cur:'AUD'},
    {code:'NZ', name:'New Zealand',            tz:'Pacific/Auckland',     fmt:'12h', lang:'en', cur:'NZD'},
    {code:'ZA', name:'South Africa',           tz:'Africa/Johannesburg',  fmt:'24h', lang:'en', cur:'ZAR'}
  ];
  function findCountry(code){ for(var i=0;i<COUNTRIES.length;i++){ if(COUNTRIES[i].code===code) return COUNTRIES[i]; } return null; }
  var LANGS=[['auto','Auto (from region)'],['en','English'],['de','Deutsch'],['es','Español'],['fr','Français'],['it','Italiano'],['pt','Português'],['nl','Nederlands'],['pl','Polski'],['ja','日本語'],['zh-CN','中文'],['ar','العربية'],['hi','हिन्दी'],['ru','Русский'],['tr','Türkçe']];
  function detect(){
    try{
      var ro=Intl.DateTimeFormat().resolvedOptions();
      var h12=false; try{ h12=!!Intl.DateTimeFormat(undefined,{hour:'numeric'}).resolvedOptions().hour12; }catch(e){}
      return { tz: ro.timeZone||'UTC', fmt: h12?'12h':'24h' };
    }catch(e){ return { tz:'UTC', fmt:'24h' }; }
  }
  function uid(){ return window.currentUID||'local'; }
  // This module boots long before Firebase reports who is signed in, so a
  // preference saved under apexLocale_<uid> was invisible at startup and the
  // browser language won instead — which is why picking English never stuck.
  // Every write is therefore mirrored to a uid-less copy that is readable on
  // the very first paint.
  function loadSt(){
    var keys=['apexLocale_'+uid()];
    if(uid()!=='local') keys.push('apexLocale_local');
    for(var i=0;i<keys.length;i++){
      try{ var v=localStorage.getItem(keys[i]); if(v) return JSON.parse(v); }catch(e){}
    }
    return {country:'auto'};
  }
  function saveSt(o){
    try{
      var s=JSON.stringify(o);
      localStorage.setItem('apexLocale_'+uid(), s);
      localStorage.setItem('apexLocale_local', s);
    }catch(e){}
  }
  function resolve(){
    var st=loadSt(), c=st.country||'auto';
    if(c==='auto'){ var d=detect(); return {country:'auto', tz:d.tz, fmt:d.fmt}; }
    var f=null; for(var i=0;i<COUNTRIES.length;i++){ if(COUNTRIES[i].code===c){ f=COUNTRIES[i]; break; } }
    if(!f){ var d2=detect(); return {country:'auto', tz:d2.tz, fmt:d2.fmt}; }
    return {country:c, tz:f.tz, fmt:f.fmt};
  }
  window.apexLocale = resolve();

  window.apexParseTime = function(str){
    if(str==null) return '';
    var s=String(str).trim().toLowerCase(); if(!s) return '';
    var pm=/p\.?\s*m\.?/.test(s), am=/a\.?\s*m\.?/.test(s);
    s=s.replace(/[^0-9:]/g,'');
    if(!s) return '';
    var hh, mm;
    if(s.indexOf(':')>=0){ var p=s.split(':'); hh=parseInt(p[0],10); mm=parseInt(p[1]||'0',10); }
    else if(s.length<=2){ hh=parseInt(s,10); mm=0; }
    else if(s.length===3){ hh=parseInt(s.slice(0,1),10); mm=parseInt(s.slice(1),10); }
    else { hh=parseInt(s.slice(0,2),10); mm=parseInt(s.slice(2,4),10); }
    if(isNaN(hh)) return ''; if(isNaN(mm)) mm=0;
    if(pm && hh<12) hh+=12; if(am && hh===12) hh=0;
    if(hh>23) hh=23; if(hh<0) hh=0; if(mm>59) mm=59; if(mm<0) mm=0;
    return ('0'+hh).slice(-2)+':'+('0'+mm).slice(-2);
  };
  window.apexFmtTime = function(hhmm){
    if(!hhmm) return '';
    var p=String(hhmm).split(':'); var h=parseInt(p[0],10), m=parseInt(p[1]||'0',10);
    if(isNaN(h)) return ''; if(isNaN(m)) m=0;
    if((window.apexLocale.fmt||'24h')==='12h'){ var ap=h>=12?'PM':'AM'; var h12=h%12; if(h12===0)h12=12; return h12+':'+('0'+m).slice(-2)+' '+ap; }
    return ('0'+h).slice(-2)+':'+('0'+m).slice(-2);
  };
  window.apexTimePlaceholder = function(){ return (window.apexLocale.fmt==='12h')?'e.g. 4:30 pm':'e.g. 17:30'; };

  /* Epoch ms → canonical "HH:MM" in the user's configured timezone.
     Everything stored in entryTime / exitTime is 24h canonical; apexFmtTime
     turns it into 12h at DISPLAY time if that is what the user picked. */
  window.apexMsToHM = function(ms){
    var n = Number(ms);
    if (!isFinite(n) || n <= 0) return '';
    try {
      var tz = (window.apexLocale && window.apexLocale.tz) || 'UTC', p = {};
      new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23',
        hour: '2-digit', minute: '2-digit' })
        .formatToParts(new Date(n)).forEach(function(x){ p[x.type] = x.value; });
      return p.hour + ':' + p.minute;
    } catch (e) {
      var d = new Date(n);
      return ('0'+d.getUTCHours()).slice(-2) + ':' + ('0'+d.getUTCMinutes()).slice(-2);
    }
  };

  /* Fill a trade's DISPLAY times from its timestamps.

     Every import path (broker sync, EA/webhook auto-tracking, statement CSV)
     recorded openTime / closeTime as epoch ms but never wrote entryTime /
     exitTime — and the journal's time fields read only the latter. So an
     auto-tracked trade arrived with the time known but the boxes empty, and
     anything keyed on entry hour (Stat Lab's hour breakdown, session stats)
     saw nothing.

     Never overwrites a value that is already there: a time the trader typed,
     or one a previous sync resolved, outranks a re-derived one. */
  window.apexFillTradeTimes = function(t){
    if (!t) return t;
    if (!t.entryTime && t.openTime)  t.entryTime = window.apexMsToHM(t.openTime);
    if (!t.exitTime  && t.closeTime) t.exitTime  = window.apexMsToHM(t.closeTime);
    // `time` is the legacy alias the chart marker and MFE/MAE lookups still read.
    if (!t.time && t.entryTime) t.time = t.entryTime;
    return t;
  };

  function tzOffsetMs(utcMs, tz){
    try{
      var dtf=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'});
      var o={}; dtf.formatToParts(new Date(utcMs)).forEach(function(p){o[p.type]=p.value;});
      var asUTC=Date.UTC(+o.year,+o.month-1,+o.day,+o.hour,+o.minute,+o.second);
      return asUTC-utcMs;
    }catch(e){ return 0; }
  }
  // Convert a wall-clock local time (HH:MM, 24h canonical) on dateStr in the chosen tz → UTC ms
  window.apexLocalToUTC = function(dateStr, hhmm){
    if(!hhmm || !dateStr) return null;
    var hp=hhmm.split(':'); var hh=+hp[0], mm=+hp[1]||0;
    var dp=dateStr.split('-'); var y=+dp[0], mo=+dp[1], d=+dp[2];
    if(isNaN(y)||isNaN(mo)||isNaN(d)||isNaN(hh)) return null;
    var tz=(window.apexLocale&&window.apexLocale.tz)||'UTC';
    var guess=Date.UTC(y,mo-1,d,hh,mm);
    if(tz==='UTC') return guess;
    var off=tzOffsetMs(guess, tz);
    var utc=guess-off;
    off=tzOffsetMs(utc, tz);      // second pass handles DST edges
    return guess-off;
  };

  function populate(sel){ sel.innerHTML=COUNTRIES.map(function(c){ return '<option value="'+c.code+'">'+c.name+'</option>'; }).join(''); sel.value=loadSt().country||'auto'; }
  function updateUI(){
    var sel=document.getElementById('apexCountrySelect'); if(sel){ if(!sel.options.length) populate(sel); sel.value=loadSt().country||'auto'; }
    var hint=document.getElementById('apexLocaleHint');
    if(hint){ var L=window.apexLocale; hint.textContent='Format: '+(L.fmt==='12h'?'12-hour (4:30 PM)':'24-hour (17:30)')+'  ·  Timezone: '+L.tz; }
  }
  window.apexSetCountry = function(code){
    var st=loadSt(); st.country=code; saveSt(st);
    window.apexLocale=resolve(); updateUI();
    var f=findCountry(code);
    if(f && f.cur && typeof setPnlCurrency==='function'){ setPnlCurrency(f.cur); var cs=document.getElementById('pnlCurrencySelect'); if(cs) cs.value=f.cur; }
    if((loadSt().lang||'auto')==='auto'){ updateLangUI(); applyTranslate(resolveLang()); }
    try{ if(typeof renderTrades==='function' && window.currentJournalKey && window.journalData && journalData[currentJournalKey]) renderTrades(); }catch(e){}
    try{ if(typeof showToast==='function') showToast('🌍 Region set — time, currency & language adapt'); }catch(e){}
  };
  window.apexRefreshLocale = function(){ window.apexLocale=resolve(); updateUI(); };

  /* Published so the authored-translation layer (ApexI18n) reads the SAME
     answer this module acts on — a second language resolution would be a
     second source of truth, and they would drift. */
  function resolveLang(){
    var r = _resolveLang();
    window.apexResolvedLang = r;
    return r;
  }
  function _resolveLang(){
    var st=loadSt(), l=st.lang||'auto';
    if(l && l!=='auto') return l;
    var R=resolve();
    if(R.country && R.country!=='auto'){ var f=findCountry(R.country); if(f&&f.lang) return f.lang; }
    try{ return (navigator.language||'en').slice(0,2).toLowerCase(); }catch(e){ return 'en'; }
  }
  // Every domain scope the googtrans cookie may have been written under.
  function gtCookieScopes(){
    var h=location.hostname, out=[''];
    if(h && !/^[\d.]+$/.test(h)){
      out.push(';domain='+h);
      if(h.indexOf('.')>0){
        out.push(';domain=.'+h);
        var p=h.split('.'); if(p.length>2) out.push(';domain=.'+p.slice(-2).join('.'));
      }
    }
    return out;
  }
  function setGoogTrans(lang){
    try{
      var scopes=gtCookieScopes();
      if(!lang || lang==='en'){
        // Writing an EMPTY googtrans is not the same as having none — Google keeps
        // the last pair and refuses to go back to the source language. Expire it.
        scopes.forEach(function(s){ document.cookie='googtrans=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/'+s; });
        return;
      }
      var v='/en/'+lang;
      scopes.forEach(function(s){ document.cookie='googtrans='+v+';path=/'+s; });
    }catch(e){}
  }
  // Deliberately does NOT look at the translated-ltr/rtl class: Google leaves
  // that on the <html> element even after the page is back to English, and
  // treating it as "still translated" would reload the page forever.
  function isTranslated(){
    try{
      if(/googtrans=\/[a-zA-Z-]+\/[a-zA-Z-]+/.test(document.cookie||'')) return true;
      var combo=document.querySelector('.goog-te-combo');
      return !!(combo && combo.value && combo.value!=='en');
    }catch(e){ return false; }
  }
  // Google Translate can switch between two foreign languages in place, but it
  // can NOT put the original text back: its widget keeps translating every node
  // the app renders afterwards. Once GT is loaded on a page, the only reliable
  // way back to English is to drop the cookie and reload — and then simply not
  // load GT again.
  function backToEnglish(){
    setGoogTrans('en');
    if(!window._gtInjected && !isTranslated()) return;   // nothing to undo
    var last=0; try{ last=+(sessionStorage.getItem('apexGtReload')||0); }catch(e){}
    if(Date.now()-last < 8000) return;                   // never loop
    try{ sessionStorage.setItem('apexGtReload', String(Date.now())); }catch(e){}
    try{ if(typeof showToast==='function') showToast('🌐 Switching back to English…'); }catch(e){}
    setTimeout(function(){ location.reload(); }, 250);
  }
  function applyTranslate(lang, tries){
    tries=tries||0;
    if(!lang || lang==='en'){ backToEnglish(); return; }
    injectGT();
    setGoogTrans(lang);
    var combo=document.querySelector('.goog-te-combo');
    if(combo){ combo.value=lang; combo.dispatchEvent(new Event('change')); }
    else if(tries<25){ setTimeout(function(){ applyTranslate(lang, tries+1); }, 500); }
  }
  /* ── Markenschutz gegen die Auto-Übersetzung ──────────────────────────
     „Evidence Trading" besteht aus zwei ganz normalen englischen Wörtern.
     Ohne Schutz macht Google Translate daraus im Deutschen „Evidenzhandel",
     im Spanischen „Comercio de evidencia" und so weiter — der Produktname
     wäre in jeder Sprache ein anderer. Bei „Apex" konnte das nicht passieren,
     weil es kein Wörterbucheintrag ist.

     Google Translate überspringt jeden Teilbaum mit der Klasse notranslate.
     Also verpacken wir jede Fundstelle in Textknoten, bevor das Widget lädt. */
  /* ── Trading-Fachbegriffe bleiben englisch ────────────────────────────
     Google Translate macht aus „lots" im Deutschen „Lose", aus „pips" „Kerne"
     und aus „drawdown" „Rückzug". Das sind Fachbegriffe, die Trader in JEDER
     Sprache englisch benutzen — sie werden deshalb wie der Produktname
     behandelt: in ein .notranslate-<span> verpackt.

     ── WARUM NICHT IN LANGEN SÄTZEN ──────────────────────────────────
     Ein geschütztes Wort ist für Google Translate ein undurchdringlicher
     Block. In einem Label („Lots") ist das genau richtig. Mitten in einem
     deutschen Satz zerstört es aber die Wortstellung, weil GT den Satz um
     den Block herum nicht mehr umbauen kann — aus „trade it forward candle
     by candle" wurde im Test wörtlich „candlevoncandleDie". Prosa wird
     deshalb NICHT angetastet: Fachbegriffe werden nur in kurzen Textknoten
     geschützt (Labels, Buttons, Tabellenzellen, Badges), nicht in Sätzen.
     Der Markenname bleibt überall geschützt — ein falsch übersetzter
     Produktname ist schlimmer als ein holpriger Satz.

     ── DAS VERSCHLUCKTE LEERZEICHEN ──────────────────────────────────
     GT frisst das Leerzeichen direkt neben einem notranslate-Block
     („Evidenceverwandelt sie …"). Deshalb wandert ein angrenzendes
     Leerzeichen MIT in den Block hinein, wo GT es nicht anfassen kann. */

  /* Immer geschützt, auch mitten im Satz. */
  /* „Evidence Score" gehört dazu: das ist der Name einer Kennzahl, kein
     beschreibendes Wort. Ohne den Eintrag wurde daraus „Evidence Pontuação",
     was aussieht, als hätte jemand den Produktnamen halb übersetzt — hat er
     auch. Steht VOR den kürzeren Einträgen, weil die Trefferliste nach Länge
     sortiert wird und „Evidence" sonst zuerst greift. */
  var BRAND_TERMS = ['Evidence Trading','Evidence Score','Evidence Pro','Evidence Free','Evidence'];

  /* Nur in kurzen Textknoten geschützt — siehe Kommentar oben. */
  var JARGON = [
    'lot size','lots','lot','pips','pip','pipette','ticks','tick',
    'stop loss','stop-loss','take profit','take-profit','trailing stop','breakeven','break-even',
    'drawdown','max drawdown','equity curve','equity','leverage','margin call','margin',
    'spread','slippage','swap','rollover','lot-size',
    'risk-reward','risk/reward','expectancy','profit factor','win rate','payout',
    'order block','fair value gap','break of structure','change of character',
    'liquidity sweep','liquidity','imbalance','setup','session','timeframe',
    'higher timeframe','candlestick','candle','scalping','swing trading','day trading',
    'overtrading','hedging','backtest','backtesting','replay','watchlist',
    'trailing','breakout','pullback','retest','fakeout','stop hunt',
    'bid','ask','swap fee','funding rate','open interest',
    'prop firm','daily loss limit','trailing drawdown',
    /* Prop-Modus (07.10.2026): „Prop mode" wurde zum „Propellermodus",
       „Floor" zum „Boden", „Challenge Setup" zur „Herausforderung". */
    'prop mode','floor','buffer','buffer to floor','balance','profit','to the floor','room left today','closest all cycle','tightest buffer','challenge','challenge setup',
    'combine','consistency','evaluation','funded','phase 1','phase 2','profit target','trading days',
    'next payout','payout available','profitable days',
    /* Produktbegriffe der App. „Playbooks" wurde von Google Translate zu
       „Theaterbücher" — die Überschrift einer ganzen Seite, und für einen
       Trader schlicht unverständlich. */
    'playbooks','playbook','confluence','drawdown floor','equity floor',
    'challenge mode','edge lab','stat lab','killzone','order flow',
    /* Setup-Namen und SMC-Vokabular. Das sind Eigennamen der Methode, keine
       übersetzbaren Wörter — „Order Block" als „Auftragsblock" liest sich für
       einen Trader wie eine Fehlübersetzung, weil es eine ist. Sie stehen
       hier statt im Wörterbuch: geschützt, nicht übertragen. */
    'order block','fair value gap','fvg','fvg fill','bos','bos retest',
    'choch','break of structure','change of character','supply zone','demand zone',
    'liquidity sweep','htf confluence','ict killzone','ict concepts','price action',
    'smart money concepts','smc','supply & demand','breakout retest','ema bounce',
    'pre-market','off-hours','asian','london','new york','ny/ln overlap'
  ];

  /* Nur als komplettes Label schützen, nie mitten im Satz: Alltagswörter, die
     als Badge englisch bleiben müssen, in Prosa aber übersetzt gehören. */
  var STANDALONE = ['long','short','buy','sell','entry','exit','win','loss','flat',
                    'bullish','bearish','sl','tp','rr','r:r','pnl','p&l','mfe','mae'];

  /* Was als Label statt als Satz gilt. Labels in dieser App sind kurz und
     bestehen aus wenigen Wörtern („Net pips", „Stop (pips)", „Max drawdown");
     alles darüber ist Prosa und wird nur noch auf den Markennamen geprüft.
     Beides muss stimmen: „Fachzeitschrift, quantitative Analytik und Markt
     replay — an einem Ort" ist zwar kurz, aber ein Satz. */
  var PROSE_LEN = 70, PROSE_WORDS = 5;
  function isProse(txt){
    var t = txt.trim();
    if(t.length > PROSE_LEN) return true;
    if(t.split(/\s+/).length > PROSE_WORDS) return true;
    return /[.!?:;] |[.!?]$/.test(t);      // ein Satz bleibt ein Satz
  }

  function reEsc(s){ return s.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&'); }
  function altRe(list){
    // Längere Begriffe zuerst, damit „stop loss" nicht als „loss" zerfällt.
    // Kein Lookbehind (ältere Safari-Versionen werfen darauf einen SyntaxError) —
    // das Zeichen vor dem Begriff wird mitgematcht und danach wieder eingesetzt.
    var alt = list.slice().sort(function(a,b){ return b.length-a.length; }).map(reEsc).join('|');
    return new RegExp('(^|[^\\w-])(' + alt + ')(?![\\w-])', 'gi');
  }
  var BRAND_RE  = altRe(BRAND_TERMS);
  var JARGON_RE = altRe(BRAND_TERMS.concat(JARGON));
  var HAS_BRAND = new RegExp(BRAND_RE.source, 'i');
  var HAS_ANY   = new RegExp(JARGON_RE.source, 'i');
  var STAND_RE = new RegExp('^(?:' + STANDALONE.map(reEsc).join('|') + ')$', 'i');

  /* Numbers are not language. Left to Google Translate, one table showed
     "25.09.2026" next to "2026-09-24", "2,60" next to "2.2" and "1,0927" next
     to "153.455" — which a German reader takes for a hundred and fifty
     thousand. "1M" became "1 Million" and "5m" "5 Mio.". A text node that is
     only figures, dates, times, currency, percent or a unit suffix is never
     handed to GT; the app's own formatting stays exactly as written. */
  var UNIT_AFTER_DIGIT = /(\d)\s?(?:pips?|pts?|lots?|oz|min|[xRkKMmhdDWLs])(?![A-Za-z])/g;
  var CCY_WORD = /(^|[^A-Za-z])(?:UTC|GMT|USD|EUR|GBP|JPY|CHF|AUD|CAD|NZD|USDT)(?![A-Za-z])/g;
  function isNumeric(t){
    t = (t || '').trim();
    if(!t || t.length > 40 || !/\d/.test(t)) return false;
    var rest = t.replace(UNIT_AFTER_DIGIT, '$1').replace(CCY_WORD, '$1')
                .replace(/[\s+\-−–$€£¥₿%.,:\/\d()×·~≈#|]/g, '');
    return rest.length === 0;
  }
  /* A node that is nothing but punctuation — the "." after a protected term,
     a ")" or " · " between two spans — is handed to GT as a sentence of its
     own. GT then invents words for it: the full stop behind "Risk
     consistency" on the Start-my-day card came back as "Die". */
  var PUNCT_ONLY = /^[\s.,;:!?()\[\]·•—–\-\/|…'"«»„“”]+$/;
  function isPunct(t){ return PUNCT_ONLY.test(t || '') && /\S/.test(t || ''); }

  function mkKeep(txt){
    var sp = document.createElement('span');
    sp.className = 'notranslate';
    sp.setAttribute('translate','no');
    sp.textContent = txt;
    return sp;
  }

  function protectBrand(root){
    root = root || document.body;
    if(!root || !document.createTreeWalker) return;
    var walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(n){
        var v = n.nodeValue; if(!v || !v.trim()) return NodeFilter.FILTER_REJECT;
        var re = isProse(v) ? HAS_BRAND : HAS_ANY;
        if(!re.test(v) && !STAND_RE.test(v.trim()) && !isNumeric(v) && !isPunct(v)) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode; if(!p) return NodeFilter.FILTER_REJECT;
        var t = p.nodeName;
        if(t==='SCRIPT'||t==='STYLE'||t==='TEXTAREA'||t==='TITLE') return NodeFilter.FILTER_REJECT;
        // Schon geschützt (z. B. die Rechtstexte) — nicht doppelt verpacken.
        if(p.closest && p.closest('.notranslate,[translate="no"]')) return NodeFilter.FILTER_REJECT;
        // Hand-translated here (Prop mode, landing): the dictionary wins.
        try { if(window.ApexI18n && ApexI18n.hasOwn && ApexI18n.hasOwn(v, p)) return NodeFilter.FILTER_REJECT; } catch(_){}
        /* Die Landing wartet auf ihr Wörterbuch (23.10.2026). GT startet vor
           DOMContentLoaded, das Wörterbuch wird erst danach registriert —
           bis dahin hatte dieser Schutz Sätze mit „Evidence" schon zerteilt,
           und der handgeschriebene Schlüssel passte nie mehr. Gemessen: rund
           40 Absätze liefen deshalb trotz Übersetzung über GT. Die Landing
           holt den Durchlauf nach, sobald das Wörterbuch steht. */
        if(!window.APEX_LP_READY && p.closest && p.closest('#landingPage')) return NodeFilter.FILTER_REJECT;
        // Gleiches für das Upgrade-Fenster (24.10.2026) — sein Wörterbuch kommt ebenfalls erst später.
        if(!window.APEX_UP_READY && p.closest && p.closest('#apexUpgradeOverlay')) return NodeFilter.FILTER_REJECT;
        // GT's own <font> output is already translated — leave its pieces alone.
        if(t==='FONT' && isPunct(v)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var todo = [], n;
    while((n = walk.nextNode())) todo.push(n);   // erst sammeln, dann ersetzen
    todo.forEach(function(node){
      var s = node.nodeValue, frag = document.createDocumentFragment(), last = 0, m;
      /* An <option> cannot hold a span, so the whole entry is kept as
         written. Without this, "Setup" in a select became "Aufstellen" and
         "All playbooks" "Alle Spielbücher" — the guard skipped options. */
      if(node.parentNode && node.parentNode.nodeName === 'OPTION'){
        node.parentNode.setAttribute('translate','no');
        node.parentNode.classList.add('notranslate');
        return;
      }
      if(isNumeric(s) || isPunct(s)){
        // Mark the element itself when the number is all it holds (a table
        // cell, a KPI) — no extra span in every cell of a big table.
        var par = node.parentNode;
        if(par && par.nodeType === 1 && par !== document.body && par.childNodes.length === 1){
          par.setAttribute('translate','no'); par.classList.add('notranslate');
        } else if(par){
          par.replaceChild(mkKeep(s), node);
        }
        return;
      }
      // Reines Label wie „Long" / „SL" — komplett schützen.
      if(STAND_RE.test(s.trim())){
        if(node.parentNode) node.parentNode.replaceChild(mkKeep(s), node);
        return;
      }
      var RE = isProse(s) ? BRAND_RE : JARGON_RE;
      RE.lastIndex = 0;
      while((m = RE.exec(s))){
        var at = m.index + m[1].length, term = m[2];
        // Das Leerzeichen davor wandert mit in den Block, sonst verschluckt GT es.
        var lead = (m[1] === ' ') ? ' ' : '';
        var cut = at - lead.length;
        // Schon vom vorigen Treffer als Nachlauf verbraucht → nicht doppeln.
        if(cut < last){ lead = ''; cut = at; }
        // Ebenso das Leerzeichen DANACH: sonst klebt GT das nächste Wort an
        // („Evidencemisst", „Evidence ProWenn").
        var trail = (s.charAt(at + term.length) === ' ') ? ' ' : '';
        if(cut > last) frag.appendChild(document.createTextNode(s.slice(last, cut)));
        frag.appendChild(mkKeep(lead + term + trail));
        last = at + term.length + trail.length;
      }
      if(!last) return;
      if(last < s.length) frag.appendChild(document.createTextNode(s.slice(last)));
      if(node.parentNode) node.parentNode.replaceChild(frag, node);
    });
    keepSpaces(root);
  }
  window.apexProtectBrand = protectBrand;   // für nachgeladene Ansichten

  /* GT drops the plain space on either side of a protected inline element:
     "170 tradesmit einem Geldwert", "Playbooksund die KI überprüft". A
     no-break space survives, so the one plain space touching a protected
     term is swapped for one — the same thing the hand-written &nbsp; around
     such terms does, now for every place at once. Not in flex/grid rows:
     there a leading space used to collapse and a no-break one would show. */
  var INLINE_TAG = /^(SPAN|B|STRONG|EM|I|A|CODE|KBD|SMALL|MARK|SUP|SUB|U|ABBR)$/;
  function sideText(el, dir){
    for(var p = el, k = 0; p && k < 3; p = p.parentNode, k++){
      var sib = dir > 0 ? p.nextSibling : p.previousSibling;
      if(sib) return sib.nodeType === 3 ? sib : null;
      // Last child of an inline wrapper (<b>Analysis › <span>Playbooks</span></b> and …)
      if(!p.parentNode || !INLINE_TAG.test(p.parentNode.nodeName)) return null;
    }
    return null;
  }
  function flowText(t){
    var p = t.parentNode; if(!p || p.nodeType !== 1) return false;
    if(/^(SCRIPT|STYLE|TEXTAREA|PRE|CODE|OPTION|FONT)$/.test(p.nodeName)) return false;
    if(p.closest && p.closest('.notranslate,[translate="no"]')) return false;   // GT leaves it alone anyway
    return !/flex|grid/.test(getComputedStyle(p).display);
  }
  function keepSpaces(root){
    if(!root || !root.querySelectorAll) return;
    var list = [].slice.call(root.querySelectorAll('.notranslate,[translate="no"]'));
    if(root.matches && root.matches('.notranslate,[translate="no"]')) list.push(root);
    list.forEach(function(el){
      if(!INLINE_TAG.test(el.nodeName)) return;
      var a = sideText(el, 1), b = sideText(el, -1);
      if(a && a.nodeValue.charAt(0) === ' ' && /\S/.test(a.nodeValue) && flowText(a))
        a.nodeValue = '\u00a0' + a.nodeValue.slice(1);
      if(b && b.nodeValue.slice(-1) === ' ' && /\S/.test(b.nodeValue) && flowText(b))
        b.nodeValue = b.nodeValue.slice(0, -1) + '\u00a0';
    });
  }

  /* Die App baut ganze Ansichten zur Laufzeit neu — frisch eingefügter Text
     muss also erneut geschützt werden, sonst übersetzt GT ihn doch. Läuft nur,
     wenn überhaupt übersetzt wird, und gebündelt statt bei jeder Mutation. */
  /* Schützt genau das, was gerade eingefügt wurde, und zwar SOFORT (im
     Microtask der Mutation), nicht 600 ms später über den ganzen Body. Mit
     der Verzögerung war GT bei frisch gebauten Karten oft schneller:
     „Expectancy" wurde zu „Lebenserwartung", „Evidence Score" zu
     „Evidenz-Score", „1M" zu „1 Million". GT sammelt Knoten und ersetzt sie
     erst nach seiner Netzwerkantwort — ein bis dahin schon geschützter Knoten
     bleibt unberührt. */
  function watchProtect(){
    if(window._gtProtectWatching) return; window._gtProtectWatching=true;
    var mo=null;
    var OPTS={ childList:true, subtree:true, characterData:true };
    function handle(recs){
      if(mo) mo.disconnect();                 // eigene Spans nicht selbst wieder auslösen
      try{
        var set=new Set();
        recs.forEach(function(r){
          if(r.type==='characterData'){ if(r.target.parentNode) set.add(r.target.parentNode); return; }
          r.addedNodes.forEach(function(n){
            if(n.nodeType===1) set.add(n);
            else if(n.nodeType===3 && n.parentNode) set.add(n.parentNode);
          });
        });
        set.forEach(function(root){
          if(!root.isConnected) return;
          // Liegt ein Vorfahr schon in der Menge, deckt dessen Durchlauf ihn ab.
          for(var p=root.parentNode; p; p=p.parentNode){ if(set.has(p)) return; }
          try{ protectBrand(root); }catch(e){}
        });
      }catch(e){}
      if(mo) mo.observe(document.body, OPTS);
    }
    try{
      mo=new MutationObserver(handle);
      mo.observe(document.body, OPTS);
    }catch(e){ setInterval(function(){ try{ protectBrand(document.body); }catch(x){} }, 2000); }
  }

  function injectGT(){
    if(window._gtInjected) return; window._gtInjected=true;
    protectBrand();
    watchProtect();
    var _brandTitle = document.title;   // GT übersetzt auch den Seitentitel
    var st=document.createElement('style'); st.textContent=
      '.goog-te-banner-frame,.skiptranslate.goog-te-banner-frame{display:none!important}'+
      'body{top:0!important;position:static!important}'+
      '#google_translate_element{position:absolute!important;left:-9999px!important;top:-9999px!important;height:0!important;overflow:hidden!important}'+
      '.goog-te-gadget{height:0;overflow:hidden}#goog-gt-tt,.goog-te-balloon-frame{display:none!important}'+
      '.goog-text-highlight{background:none!important;box-shadow:none!important}'+
      /* loading spinner / progress overlay (old + new obfuscated classes) */
      'iframe.skiptranslate,.goog-te-spinner-pos,.goog-te-spinner,#goog-gt-tt{display:none!important}'+
      '.VIpgJd-ZVi9od-aZ2wEe-wOHMyf,.VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc,.VIpgJd-ZVi9od-aZ2wEe,.VIpgJd-ZVi9od-aZ2wEe-OiiCO{display:none!important;visibility:hidden!important;opacity:0!important}';
    document.head.appendChild(st);
    var el=document.createElement('div'); el.id='google_translate_element'; el.className='notranslate'; document.body.appendChild(el);
    // Actively remove the lingering Google spinner/banner that GT sometimes fails to clear.
    function gtClean(){ try{
      document.body.style.top='0';
      // Der Titel lässt sich nicht per notranslate schützen — also zurücksetzen.
      if(document.title !== _brandTitle) document.title = _brandTitle;
      var kill=document.querySelectorAll('iframe.skiptranslate,.goog-te-spinner-pos,.goog-te-spinner,.VIpgJd-ZVi9od-aZ2wEe-wOHMyf,.VIpgJd-ZVi9od-aZ2wEe');
      kill.forEach(function(n){ n.style.display='none'; });
    }catch(e){} }
    try{ var mo=new MutationObserver(gtClean); mo.observe(document.body,{childList:true,subtree:true}); }catch(e){}
    /* Der <title> sitzt im <head> — der Body-Beobachter oben sah seine
       Übersetzung nie, der Tab hieß „… | Evidenz" (23.10.2026). */
    try{ var tEl=document.querySelector('head > title'); if(tEl) new MutationObserver(gtClean).observe(tEl,{childList:true,characterData:true,subtree:true}); }catch(e){}
    /* Googles „Originaltext anzeigen": beim Verweilen mit der Maus hängt das
       Widget dem Segment eine Klasse mit Hintergrund und Schatten an — sieht
       aus wie eine blaue Textmarkierung, ist aber keine. Die CSS-Regel dagegen
       nennt den heutigen Klassennamen (VIpgJd-…); der ist von Google generiert
       und ändert sich. Dieser Beobachter greift unabhängig vom Namen: bekommt
       ein Übersetzungs-<font> eine Hintergrundfarbe, wird sie sofort entfernt.
       Nur `class` wird beobachtet, nicht `style` — sonst löst die eigene
       Korrektur die nächste Runde aus. */
    try{
      var gtHi=new MutationObserver(function(ms){
        for(var i=0;i<ms.length;i++){
          var n=ms[i].target;
          if(!n || n.nodeType!==1 || n.tagName!=='FONT') continue;
          var bg=getComputedStyle(n).backgroundColor;
          if(bg && bg!=='rgba(0, 0, 0, 0)' && bg!=='transparent'){
            n.style.setProperty('background','none','important');
            n.style.setProperty('box-shadow','none','important');
          }
        }
      });
      gtHi.observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['class']});
    }catch(e){}
    setInterval(gtClean, 1500);
    window.googleTranslateElementInit=function(){
      try{ new google.translate.TranslateElement({pageLanguage:'en', autoDisplay:false}, 'google_translate_element'); }catch(e){}
      setTimeout(function(){ applyTranslate(resolveLang()); }, 1000);
    };
    var sc=document.createElement('script'); sc.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'; document.head.appendChild(sc);
  }
  function populateLang(sel){ if(!sel) return; sel.innerHTML=LANGS.map(function(l){return '<option value="'+l[0]+'">'+l[1]+'</option>';}).join(''); sel.value=loadSt().lang||'auto'; }
  function updateLangUI(){
    var sel=document.getElementById('apexLangSelect'); if(sel){ if(!sel.options.length) populateLang(sel); sel.value=loadSt().lang||'auto'; }
    var h=document.getElementById('apexLangHint'); if(h){ var rl=resolveLang(); h.textContent='Showing: '+(rl==='en'?'English (original)':rl); }
  }
  window.apexSetLang=function(code){ var st=loadSt(); st.lang=code; saveSt(st); updateLangUI(); applyTranslate(resolveLang()); try{ if(typeof showToast==='function') showToast('🌐 Language updated'); }catch(e){} };

  // Only pull in Google Translate when a translation is actually wanted —
  // an English reader never gets the widget, so nothing can rewrite the page.
  function init(tries){
    tries=tries||0;
    if(resolveLang()==='en') setGoogTrans('en'); else injectGT();
    var sel=document.getElementById('apexCountrySelect');
    if(sel){ populate(sel); populateLang(document.getElementById('apexLangSelect')); window.apexLocale=resolve(); updateUI(); updateLangUI(); applyTranslate(resolveLang()); }
    else if(tries<80){ setTimeout(function(){init(tries+1);},400); }
  }

  // Accounts created before the mirrored copy existed only have the per-uid
  // record — re-resolve once we finally know the uid.
  (function watchUid(){
    var seen='local', tries=0;
    var t=setInterval(function(){
      tries++;
      var now=uid();
      if(now!==seen){
        seen=now;
        saveSt(loadSt());                 // mirror it for the next cold start
        window.apexLocale=resolve(); updateUI(); updateLangUI();
        applyTranslate(resolveLang());
        clearInterval(t);
      }
      if(tries>120) clearInterval(t);
    }, 500);
  })();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){init();}); else init();
})();
} catch (e) { try { console.error("lp-i18n", e); } catch (_) {} }

try {
(function apexKeepNames(){
  'use strict';

  var SEL = [
    /* own identity */
    '#userLabel', '#pName', '.profile-name',
    /* community / traders */
    '.trc-name', '.trc-avatar',
    /* social feed */
    '.sp-author', '.sp-avatar', '.comment-author', '.comment-avatar',
    /* DMs, friends, blocks */
    '.inbox-name', '.inbox-avatar', '.fra-name', '.fra-avatar', '.blocked-user-row',
    /* chat servers: message author, avatar, server name */
    '.cs-mh b', '.cs-av', '.cs-c-name', '.cs-uc-name',
    /* mentor & team */
    '.mt-sname', '.mt-req-n', '.mt-av', '.mt-req-av', '.mt-fb .who', '.mt-team',
    /* user-typed proper nouns */
    '.acx-name', '.acc-menu-i[data-id]:not([data-id="all"])',
    /* landing testimonials */
    '.lp-voice-who',
    /* explicit opt-in for anything added later */
    '[data-apex-name]'
  ].join(',');

  function mark(root){
    var nodes;
    try{ nodes = (root && root.querySelectorAll ? root : document).querySelectorAll(SEL); }
    catch(e){ return; }
    for(var i=0;i<nodes.length;i++){
      var n = nodes[i];
      if(n.getAttribute('translate') === 'no') continue;   // already handled
      n.setAttribute('translate','no');
      n.classList.add('notranslate');
    }
  }
  window.apexKeepName = function(el){ if(el){ el.setAttribute('translate','no'); el.classList.add('notranslate'); } };

  mark(document);   // static markup, before the GT script is even fetched

  // This app rewrites large chunks of DOM constantly, so coalesce bursts into
  // one scan and never run more often than every 60ms.
  var queued = false, lastRun = 0;
  function schedule(){
    if(queued) return;
    queued = true;
    setTimeout(function(){
      queued = false; lastRun = Date.now(); mark(document);
    }, Math.max(0, 60 - (Date.now() - lastRun)));
  }
  try{
    new MutationObserver(schedule).observe(document.documentElement, { childList:true, subtree:true });
  }catch(e){}
  document.addEventListener('DOMContentLoaded', function(){ mark(document); });
  // Cheap safety net for nodes that appear inside a single observer batch
  setInterval(function(){ mark(document); }, 1500);
})();
} catch (e) { try { console.error("lp-i18n", e); } catch (_) {} }

try {
/* ══════════════════════════════════════════════════════════════════
   AUTHORED TRANSLATIONS  —  ApexI18n

   Google Translate stays. What it is bad at is not grammar — it is
   this domain: a machine translation of trading copy reads like a
   translated brochure, and a trader who reads "Verlustbegrenzungsauftrag"
   concludes the product is not finished.

   Two mechanisms already exist and are NOT duplicated here:
     · trading jargon is wrapped in .notranslate so GT cannot touch it
       (see the BRAND_TERMS / JARGON lists above);
     · everything else falls through to GT.

   This layer sits between them: for the strings that carry the most
   weight — navigation, the main buttons, the sentences a new user reads
   first — it substitutes a translation a person wrote, and marks it
   notranslate so GT leaves it alone. Anything not in the table keeps
   working exactly as before.

   Four languages on purpose. German because it is the home market;
   Spanish and French because they are large; Portuguese because Brazil
   is one of the biggest prop-firm markets on earth and essentially no
   journal is localised for it.

   ── HOW TO ADD A STRING ────────────────────────────────────────────
   Add the exact English source text as the key, with the four
   translations. Matching is exact on the trimmed text node, so a key
   must be the whole visible label — not a fragment of a sentence.
   ══════════════════════════════════════════════════════════════════ */
(function(){
  var I = {}; window.ApexI18n = I;

  var LANGS = ['de','es','pt','fr'];

  /* key: en → [de, es, pt, fr] */
  var T = {
    // ── navigation ──
    'Journal':        ['Journal', 'Diario', 'Diário', 'Journal'],
    'Calendar':       ['Kalender', 'Calendario', 'Calendário', 'Calendrier'],
    'Statistics':     ['Statistik', 'Estadísticas', 'Estatísticas', 'Statistiques'],
    'Edge Lab':       ['Edge Lab', 'Edge Lab', 'Edge Lab', 'Edge Lab'],
    'AI Insights':    ['KI-Analyse', 'Análisis IA', 'Análise de IA', 'Analyse IA'],
    'Psychology':     ['Psychologie', 'Psicología', 'Psicologia', 'Psychologie'],
    'Setups':         ['Setups', 'Setups', 'Setups', 'Setups'],
    'Playbooks':      ['Playbooks', 'Playbooks', 'Playbooks', 'Playbooks'],
    'Indicators':     ['Indikatoren', 'Indicadores', 'Indicadores', 'Indicateurs'],
    'Prop Firm':      ['Prop Firm', 'Prop Firm', 'Prop Firm', 'Prop Firm'],
    'Rules Engine':   ['Regelwerk', 'Motor de reglas', 'Motor de regras', 'Moteur de règles'],
    'Calculators':    ['Rechner', 'Calculadoras', 'Calculadoras', 'Calculatrices'],
    'Eco Calendar':   ['Wirtschaftskalender', 'Calendario económico', 'Calendário econômico', 'Calendrier économique'],
    'Academy':        ['Academy', 'Academia', 'Academia', 'Académie'],
    'Drills':         ['Übungen', 'Ejercicios', 'Exercícios', 'Exercices'],
    'Glossary':       ['Glossar', 'Glosario', 'Glossário', 'Glossaire'],
    'Books':          ['Bücher', 'Libros', 'Livros', 'Livres'],
    'Settings':       ['Einstellungen', 'Ajustes', 'Configurações', 'Paramètres'],
    'Overview':       ['Übersicht', 'Resumen', 'Visão geral', 'Aperçu'],
    'Community':      ['Community', 'Comunidad', 'Comunidade', 'Communauté'],
    'Reports':        ['Berichte', 'Informes', 'Relatórios', 'Rapports'],
    'Inbox':          ['Posteingang', 'Bandeja de entrada', 'Caixa de entrada', 'Boîte de réception'],

    // ── the buttons people press every day ──
    'Search':         ['Suchen', 'Buscar', 'Buscar', 'Rechercher'],
    'Save':           ['Speichern', 'Guardar', 'Salvar', 'Enregistrer'],
    'Cancel':         ['Abbrechen', 'Cancelar', 'Cancelar', 'Annuler'],
    'Close':          ['Schließen', 'Cerrar', 'Fechar', 'Fermer'],
    'Delete':         ['Löschen', 'Eliminar', 'Excluir', 'Supprimer'],
    'Import':         ['Importieren', 'Importar', 'Importar', 'Importer'],
    'Export':         ['Exportieren', 'Exportar', 'Exportar', 'Exporter'],
    'Sync now':       ['Jetzt abgleichen', 'Sincronizar ahora', 'Sincronizar agora', 'Synchroniser'],
    'Connect':        ['Verbinden', 'Conectar', 'Conectar', 'Connecter'],
    'Disconnect':     ['Trennen', 'Desconectar', 'Desconectar', 'Déconnecter'],
    'Refresh':        ['Aktualisieren', 'Actualizar', 'Atualizar', 'Actualiser'],
    'Open':           ['Öffnen', 'Abrir', 'Abrir', 'Ouvrir'],
    'Share this':     ['Teilen', 'Compartir', 'Compartilhar', 'Partager'],
    'Save image':     ['Bild speichern', 'Guardar imagen', 'Salvar imagem', 'Enregistrer l’image'],
    'Copy':           ['Kopieren', 'Copiar', 'Copiar', 'Copier'],
    'Add Trade':      ['Trade hinzufügen', 'Añadir operación', 'Adicionar operação', 'Ajouter un trade'],
    'Upgrade to Pro': ['Auf Pro upgraden', 'Pasar a Pro', 'Mudar para o Pro', 'Passer à Pro'],

    // ── connection status, where a wrong word costs trust ──
    'Connection status': ['Verbindungsstatus', 'Estado de la conexión', 'Estado da conexão', 'État de la connexion'],
    'Live':              ['Aktiv', 'Activo', 'Ativo', 'Actif'],
    'Not connected':     ['Nicht verbunden', 'Sin conexión', 'Sem conexão', 'Non connecté'],
    'Needs attention':   ['Fehler — bitte prüfen', 'Requiere atención', 'Requer atenção', 'À vérifier'],

    // ── the import check, which has to be unambiguous in every language ──
    'Check the import':        ['Import prüfen', 'Comprobar la importación', 'Conferir a importação', 'Vérifier l’import'],
    'Rows read from the file': ['Zeilen aus der Datei gelesen', 'Filas leídas del archivo', 'Linhas lidas do arquivo', 'Lignes lues dans le fichier'],
    'Positions built':         ['Positionen gebildet', 'Posiciones construidas', 'Posições construídas', 'Positions construites'],
    'Net P&L in the file':     ['Netto-P&L laut Datei', 'P&L neto en el archivo', 'P&L líquido no arquivo', 'P&L net dans le fichier'],
    'Net P&L in the journal':  ['Netto-P&L im Journal', 'P&L neto en el diario', 'P&L líquido no diário', 'P&L net dans le journal'],
    'Already in your journal': ['Bereits im Journal', 'Ya está en tu diario', 'Já está no seu diário', 'Déjà dans votre journal'],
    'Trades without a stop loss': ['Trades ohne Stop Loss', 'Operaciones sin stop loss', 'Operações sem stop loss', 'Trades sans stop loss'],
    'Timezone':                ['Zeitzone', 'Zona horaria', 'Fuso horário', 'Fuseau horaire'],
    'Back to the mapping':     ['Zurück zur Zuordnung', 'Volver a la asignación', 'Voltar ao mapeamento', 'Retour au mappage'],

    // ── search ──
    'Any result':    ['Alle Ergebnisse', 'Cualquier resultado', 'Qualquer resultado', 'Tous les résultats'],
    'Winners':       ['Gewinner', 'Ganadoras', 'Vencedoras', 'Gagnants'],
    'Losers':        ['Verlierer', 'Perdedoras', 'Perdedoras', 'Perdants'],
    'Any direction': ['Alle Richtungen', 'Cualquier dirección', 'Qualquer direção', 'Toutes directions'],
    'Any session':   ['Alle Sessions', 'Cualquier sesión', 'Qualquer sessão', 'Toutes les sessions'],
    'Any grade':     ['Alle Noten', 'Cualquier nota', 'Qualquer nota', 'Toutes les notes'],
    'Any tag':       ['Alle Tags', 'Cualquier etiqueta', 'Qualquer etiqueta', 'Tous les tags'],
    'Everything':    ['Alles', 'Todo', 'Tudo', 'Tout'],
    'Without a stop':          ['Ohne Stop', 'Sin stop', 'Sem stop', 'Sans stop'],
    'With a note':             ['Mit Notiz', 'Con nota', 'Com anotação', 'Avec note'],
    'With a mistake logged':   ['Mit erfasstem Fehler', 'Con un error registrado', 'Com um erro registrado', 'Avec une erreur notée'],

    // ── options payoff ──
    'Payoff at expiry': ['Auszahlung bei Verfall', 'Pago al vencimiento', 'Retorno no vencimento', 'Gain à l’échéance'],
    'unlimited':        ['unbegrenzt', 'ilimitado', 'ilimitado', 'illimité'],


    /* ══════════════ STUFE 1 ══════════════
       Die Texte, die jeder Nutzer an jedem Tag sieht: Trade-Karte, Übersicht,
       Statistik, Psychologie, Einstellungen, Knöpfe.

       Zwei Sorten stehen bewusst NICHT hier:
       · Satzfragmente. Die App teilt manche Überschrift auf zwei Elemente auf
         ("Unlock Your Full" + "Edge"). Ein Fragment zu übersetzen erzeugt
         genau den Kauderwelsch, den diese Schicht verhindern soll — solche
         Stellen gehören im HTML zusammengefasst, nicht hier eingetragen.
       · Setup- und SMC-Namen (Order Block, FVG, CHoCH …). Das sind Eigennamen
         der Methode und stehen in der JARGON-Liste, die sie englisch lässt. */

    // ── Fehler-Tags an der Trade-Karte ──
    'Early Exit':        ['Zu früh raus', 'Salida temprana', 'Saída antecipada', 'Sortie prématurée'],
    'Moving SL':         ['Stop verschoben', 'Stop movido', 'Stop movido', 'Stop déplacé'],
    'No Stop Loss':      ['Kein Stop Loss', 'Sin stop loss', 'Sem stop loss', 'Pas de stop loss'],
    'Emotional Entry':   ['Emotionaler Einstieg', 'Entrada emocional', 'Entrada emocional', 'Entrée émotionnelle'],
    'Impulsive Trade':   ['Impulsiver Trade', 'Operación impulsiva', 'Operação impulsiva', 'Trade impulsif'],
    'Revenge Trade':     ['Rache-Trade', 'Operación de venganza', 'Operação de vingança', 'Trade de revanche'],
    'Overtrading':       ['Überhandeln', 'Sobreoperar', 'Excesso de operações', 'Surtrading'],
    'Bad Timing':        ['Schlechtes Timing', 'Mal momento', 'Momento ruim', 'Mauvais timing'],
    'No Confirmation':   ['Ohne Bestätigung', 'Sin confirmación', 'Sem confirmação', 'Sans confirmation'],
    'Revenge pattern':   ['Rache-Muster', 'Patrón de venganza', 'Padrão de vingança', 'Schéma de revanche'],

    // ── Was gut lief ──
    'Correct SL':        ['Stop richtig gesetzt', 'Stop correcto', 'Stop correto', 'Stop correct'],
    'Good Timing':       ['Gutes Timing', 'Buen momento', 'Bom momento', 'Bon timing'],
    'Good R:R':          ['Gutes R:R', 'Buen R:R', 'Bom R:R', 'Bon R:R'],
    'No Emotions':       ['Ohne Emotionen', 'Sin emociones', 'Sem emoções', 'Sans émotions'],
    'Followed Plan':     ['Plan eingehalten', 'Seguí el plan', 'Segui o plano', 'Plan respecté'],
    'Patient Entry':     ['Geduldiger Einstieg', 'Entrada paciente', 'Entrada paciente', 'Entrée patiente'],
    'Cut Loss Fast':     ['Verlust schnell begrenzt', 'Corté la pérdida rápido', 'Cortei a perda rápido', 'Perte coupée vite'],
    'Let Winner Run':    ['Gewinner laufen lassen', 'Dejé correr al ganador', 'Deixei o vencedor correr', 'Gagnant laissé courir'],
    'Sized Correctly':   ['Richtig positioniert', 'Tamaño correcto', 'Tamanho correto', 'Taille correcte'],
    'Took Profits':      ['Gewinne mitgenommen', 'Tomé beneficios', 'Realizei lucros', 'Bénéfices pris'],
    'Waited Confirmation': ['Auf Bestätigung gewartet', 'Esperé confirmación', 'Esperei confirmação', 'Confirmation attendue'],

    // ── Felder der Trade-Karte ──
    'Trade Notes':       ['Notizen zum Trade', 'Notas de la operación', 'Notas da operação', 'Notes du trade'],
    'Entry Time':        ['Einstiegszeit', 'Hora de entrada', 'Hora de entrada', 'Heure d’entrée'],
    'Exit Time':         ['Ausstiegszeit', 'Hora de salida', 'Hora de saída', 'Heure de sortie'],
    'Exit Price':        ['Ausstiegskurs', 'Precio de salida', 'Preço de saída', 'Prix de sortie'],
    'Exit Emotion':      ['Gefühl beim Ausstieg', 'Emoción al salir', 'Emoção na saída', 'Émotion à la sortie'],
    'Target':            ['Ziel', 'Objetivo', 'Alvo', 'Objectif'],
    'Symbol':            ['Symbol', 'Símbolo', 'Símbolo', 'Symbole'],
    'Direction':         ['Richtung', 'Dirección', 'Direção', 'Direction'],
    'Date':              ['Datum', 'Fecha', 'Data', 'Date'],
    'Grade':             ['Note', 'Nota', 'Nota', 'Note'],
    'Setup':             ['Setup', 'Setup', 'Setup', 'Setup'],
    'Account':           ['Konto', 'Cuenta', 'Conta', 'Compte'],
    'Accounts':          ['Konten', 'Cuentas', 'Contas', 'Comptes'],
    'Market':            ['Markt', 'Mercado', 'Mercado', 'Marché'],
    'Price':             ['Kurs', 'Precio', 'Preço', 'Prix'],
    'Type':              ['Art', 'Tipo', 'Tipo', 'Type'],
    'Units':             ['Einheiten', 'Unidades', 'Unidades', 'Unités'],
    'Reason':            ['Grund', 'Motivo', 'Motivo', 'Motif'],
    'Source':            ['Quelle', 'Origen', 'Origem', 'Source'],
    'Metric':            ['Kennzahl', 'Métrica', 'Métrica', 'Indicateur'],
    /* Academy. GT read the course level "Foundation" as a charity
       ("Stiftung") and the course "Reading an edge" as the edge of a table
       ("Eine Kante lesen"). */
    'Foundation':        ['Grundlagen', 'Fundamentos', 'Fundamentos', 'Fondamentaux'],
    'Core':              ['Kern', 'Núcleo', 'Essencial', 'Essentiel'],
    'Advanced':          ['Fortgeschritten', 'Avanzado', 'Avançado', 'Avancé'],
    'Reading an edge':   ['Einen Vorteil erkennen', 'Leer una ventaja', 'Ler uma vantagem', 'Lire un avantage'],
    'The psychology of trading': ['Die Psychologie des Tradings', 'La psicología del trading', 'A psicologia do trading', 'La psychologie du trading'],
    'Risk and position size':    ['Risiko und Positionsgröße', 'Riesgo y tamaño de posición', 'Risco e tamanho de posição', 'Risque et taille de position'],
    'Backtesting without fooling yourself': ['Backtesten, ohne sich selbst zu täuschen', 'Backtesting sin engañarte', 'Backtesting sem se enganar', 'Backtester sans se mentir'],
    // GT: "Wöchentlicher Geheimdienstbericht" (secret-service report).
    'Weekly Intelligence Report': ['Wöchentlicher Marktbericht', 'Informe semanal de mercado', 'Relatório semanal de mercado', 'Rapport de marché hebdomadaire'],
    /* Prop-firm vocabulary. GT turned "Trailing floor locks at the starting
       balance" into "Nachlaufende Bodenarretierungen im Ausgangsgleichgewicht". */
    'Trailing floor locks at the starting balance': ['Nachziehende Verlustgrenze stoppt beim Startguthaben', 'El suelo dinámico se fija en el saldo inicial', 'O piso móvel trava no saldo inicial', 'Le plancher suiveur se bloque au solde de départ'],
    'Starting balance of this cycle': ['Startguthaben dieses Zyklus', 'Saldo inicial de este ciclo', 'Saldo inicial deste ciclo', 'Solde de départ de ce cycle'],
    'Daily loss limit (%)': ['Tägliches Verlustlimit (%)', 'Límite de pérdida diaria (%)', 'Limite de perda diária (%)', 'Limite de perte journalière (%)'],
    'Consistency limit (%)': ['Konsistenzgrenze (%)', 'Límite de consistencia (%)', 'Limite de consistência (%)', 'Limite de régularité (%)'],
    /* Google Translate rendered "Expectancy" as "Lebenserwartung" (life
       expectancy) whenever it beat the jargon guard to a freshly built card. */
    'Expectancy':        ['Erwartungswert', 'Esperanza matemática', 'Expectativa', 'Espérance'],
    'Expectancy (R)':    ['Erwartungswert (R)', 'Esperanza (R)', 'Expectativa (R)', 'Espérance (R)'],
    'Expectancy / Trade':['Erwartungswert / Trade', 'Esperanza / operación', 'Expectativa / trade', 'Espérance / trade'],
    'Format':            ['Format', 'Formato', 'Formato', 'Format'],
    'Name':              ['Name', 'Nombre', 'Nome', 'Nom'],
    '+ Add Tag':         ['+ Tag hinzufügen', '+ Añadir etiqueta', '+ Adicionar etiqueta', '+ Ajouter un tag'],
    'No custom tags yet':['Noch keine eigenen Tags', 'Aún no hay etiquetas propias', 'Ainda não há etiquetas próprias', 'Pas encore de tags personnels'],
    '📸 Add Screenshot': ['📸 Screenshot hinzufügen', '📸 Añadir captura', '📸 Adicionar captura', '📸 Ajouter une capture'],
    '📈 Open Chart':     ['📈 Chart öffnen', '📈 Abrir el gráfico', '📈 Abrir o gráfico', '📈 Ouvrir le graphique'],
    '🎙 Voice Note':     ['🎙 Sprachnotiz', '🎙 Nota de voz', '🎙 Nota de voz', '🎙 Note vocale'],
    'Partial exits':  ['Teilausstiege', 'Salidas parciales', 'Saídas parciais', 'Sorties partielles'],
    '＋ Partial exit':   ['＋ Teilausstieg', '＋ Salida parcial', '＋ Saída parcial', '＋ Sortie partielle'],

    // ── Übersicht & Statistik ──
    'Best Trade':        ['Bester Trade', 'Mejor operación', 'Melhor operação', 'Meilleur trade'],
    'Worst Trade':       ['Schlechtester Trade', 'Peor operación', 'Pior operação', 'Pire trade'],
    'Net P&L':           ['Netto-P&L', 'P&L neto', 'P&L líquido', 'P&L net'],
    'Wins':              ['Gewinner', 'Ganadoras', 'Vencedoras', 'Gagnants'],
    'Losses':            ['Verlierer', 'Perdedoras', 'Perdedoras', 'Perdants'],
    'Wins / Losses':     ['Gewinner / Verlierer', 'Ganadoras / Perdedoras', 'Vencedoras / Perdedoras', 'Gagnants / Perdants'],
    'Avg R:R':           ['Ø R:R', 'R:R medio', 'R:R médio', 'R:R moyen'],
    'Avg RR':            ['Ø RR', 'RR medio', 'RR médio', 'RR moyen'],
    'Avg R':             ['Ø R', 'R medio', 'R médio', 'R moyen'],
    'Avg R (net)':       ['Ø R (netto)', 'R medio (neto)', 'R médio (líquido)', 'R moyen (net)'],
    'Max DD':            ['Max. Drawdown', 'Drawdown máx.', 'Drawdown máx.', 'Drawdown max.'],
    'Streak':            ['Serie', 'Racha', 'Sequência', 'Série'],
    'Streaks':           ['Serien', 'Rachas', 'Sequências', 'Séries'],
    'Symbols':           ['Symbole', 'Símbolos', 'Símbolos', 'Symboles'],
    'Performance':       ['Ergebnis', 'Rendimiento', 'Desempenho', 'Performance'],
    'Leaderboard':       ['Rangliste', 'Clasificación', 'Classificação', 'Classement'],
    'Score':             ['Punktzahl', 'Puntuación', 'Pontuação', 'Score'],
    'Day':               ['Tag', 'Día', 'Dia', 'Jour'],
    'Week':              ['Woche', 'Semana', 'Semana', 'Semaine'],
    'Month':             ['Monat', 'Mes', 'Mês', 'Mois'],
    'Daily':             ['Täglich', 'Diario', 'Diário', 'Quotidien'],
    'Monthly':           ['Monatlich', 'Mensual', 'Mensal', 'Mensuel'],
    'Yearly':            ['Jährlich', 'Anual', 'Anual', 'Annuel'],
    'Won':               ['Gewonnen', 'Ganada', 'Ganha', 'Gagné'],
    'Lost':              ['Verloren', 'Perdida', 'Perdida', 'Perdu'],
    'Best':              ['Bestes', 'Mejor', 'Melhor', 'Meilleur'],
    'Saved':             ['Gespeichert', 'Guardado', 'Salvo', 'Enregistré'],
    'Level':             ['Stufe', 'Nivel', 'Nível', 'Niveau'],
    'Habit':             ['Gewohnheit', 'Hábito', 'Hábito', 'Habitude'],
    'All setups':        ['Alle Setups', 'Todos los setups', 'Todos os setups', 'Tous les setups'],
    'All':               ['Alle', 'Todos', 'Todos', 'Tous'],
    'Custom':            ['Eigene', 'Personalizado', 'Personalizado', 'Personnalisé'],
    'Other':             ['Andere', 'Otro', 'Outro', 'Autre'],
    'Long & Short':      ['Long & Short', 'Largo y corto', 'Comprado e vendido', 'Long & short'],
    'Win & Loss':        ['Gewinn & Verlust', 'Ganancia y pérdida', 'Ganho e perda', 'Gain & perte'],

    // ── Psychologie ──
    'Discipline':        ['Disziplin', 'Disciplina', 'Disciplina', 'Discipline'],
    'Disciplined':       ['Diszipliniert', 'Disciplinado', 'Disciplinado', 'Discipliné'],
    'Confidence':        ['Selbstvertrauen', 'Confianza', 'Confiança', 'Confiance'],
    'Focus':             ['Fokus', 'Concentración', 'Foco', 'Concentration'],
    'Patience':          ['Geduld', 'Paciencia', 'Paciência', 'Patience'],
    'Fear':              ['Angst', 'Miedo', 'Medo', 'Peur'],
    'Greed':             ['Gier', 'Codicia', 'Ganância', 'Avidité'],
    'Calm':              ['Ruhig', 'Tranquilo', 'Calmo', 'Calme'],
    'Tilt':              ['Tilt', 'Tilt', 'Tilt', 'Tilt'],
    'Rest':              ['Erholung', 'Descanso', 'Descanso', 'Repos'],
    'Risk consistency':  ['Risiko-Konstanz', 'Consistencia del riesgo', 'Consistência do risco', 'Constance du risque'],
    'Slept 7h+':      ['7 Std.+ geschlafen', 'Dormí 7 h o más', 'Dormi 7 h ou mais', 'Dormi 7 h ou plus'],
    'Exercised':      ['Sport gemacht', 'Hice ejercicio', 'Me exercitei', 'J’ai fait du sport'],
    'Ate well':       ['Gut gegessen', 'Comí bien', 'Comi bem', 'J’ai bien mangé'],
    'Calm / meditated': ['Ruhig / meditiert', 'Tranquilo / medité', 'Calmo / meditei', 'Calme / médité'],
    'No distractions': ['Keine Ablenkung', 'Sin distracciones', 'Sem distrações', 'Sans distractions'],
    'Prepared / reviewed plan': ['Plan vorbereitet', 'Plan preparado', 'Plano preparado', 'Plan préparé'],

    // ── Märkte ──
    'Crypto':            ['Krypto', 'Cripto', 'Cripto', 'Crypto'],
    'Indices':           ['Indizes', 'Índices', 'Índices', 'Indices'],
    'Stocks':            ['Aktien', 'Acciones', 'Ações', 'Actions'],
    'Futures':           ['Futures', 'Futuros', 'Futuros', 'Futures'],
    'Options':           ['Optionen', 'Opciones', 'Opções', 'Options'],
    'Gold':              ['Gold', 'Oro', 'Ouro', 'Or'],

    // ── Wirtschaftskalender ──
    'Actual':            ['Ist', 'Real', 'Real', 'Réel'],
    'Forecast':          ['Prognose', 'Previsión', 'Previsão', 'Prévision'],
    'Previous':          ['Zuvor', 'Anterior', 'Anterior', 'Précédent'],
    '🔴 High':           ['🔴 Hoch', '🔴 Alto', '🔴 Alto', '🔴 Élevé'],
    '🟡 Medium':         ['🟡 Mittel', '🟡 Medio', '🟡 Médio', '🟡 Moyen'],
    '⚪ Low':            ['⚪ Niedrig', '⚪ Bajo', '⚪ Baixo', '⚪ Faible'],

    // ── Wochentage ──
    'Mon': ['Mo', 'Lun', 'Seg', 'Lun'],
    'Tue': ['Di', 'Mar', 'Ter', 'Mar'],
    'Wed': ['Mi', 'Mié', 'Qua', 'Mer'],
    'Thu': ['Do', 'Jue', 'Qui', 'Jeu'],
    'Fri': ['Fr', 'Vie', 'Sex', 'Ven'],
    'Sat': ['Sa', 'Sáb', 'Sáb', 'Sam'],
    'Sun': ['So', 'Dom', 'Dom', 'Dim'],

    // ── Einstellungen & Konto ──
    'Notifications':     ['Benachrichtigungen', 'Notificaciones', 'Notificações', 'Notifications'],
    'Privacy':           ['Datenschutz', 'Privacidad', 'Privacidade', 'Confidentialité'],
    'Profile':           ['Profil', 'Perfil', 'Perfil', 'Profil'],
    'Email':             ['E-Mail', 'Correo', 'E-mail', 'E-mail'],
    'Country':           ['Land', 'País', 'País', 'Pays'],
    'Subscription':      ['Abo', 'Suscripción', 'Assinatura', 'Abonnement'],
    'Manage Subscription': ['Abo verwalten', 'Gestionar suscripción', 'Gerenciar assinatura', 'Gérer l’abonnement'],
    'Auto Tracking':     ['Auto-Tracking', 'Seguimiento automático', 'Rastreamento automático', 'Suivi automatique'],
    'Auto-Sync':         ['Auto-Sync', 'Sincronización automática', 'Sincronização automática', 'Synchronisation auto'],
    'Connect':           ['Verbinden', 'Conectar', 'Conectar', 'Connecter'],
    'Streaming':         ['Streaming', 'Streaming', 'Streaming', 'Streaming'],
    'Funded Mode':       ['Funded-Modus', 'Modo fondeado', 'Modo fundado', 'Mode financé'],
    'Bug Report & Rating': ['Fehler melden & bewerten', 'Reportar error y valorar', 'Relatar erro e avaliar', 'Signaler un bug & noter'],
    'Experience Level':  ['Erfahrungsstufe', 'Nivel de experiencia', 'Nível de experiência', 'Niveau d’expérience'],
    'Trading Strategy':  ['Handelsstrategie', 'Estrategia de trading', 'Estratégia de trading', 'Stratégie de trading'],
    'Getting started':   ['Erste Schritte', 'Primeros pasos', 'Primeiros passos', 'Premiers pas'],
    'Troubleshooting':   ['Fehlerbehebung', 'Solución de problemas', 'Solução de problemas', 'Dépannage'],
    'Beginner (under 1 year)': ['Anfänger (unter 1 Jahr)', 'Principiante (menos de 1 año)', 'Iniciante (menos de 1 ano)', 'Débutant (moins d’un an)'],
    'Intermediate (1–3 years)': ['Fortgeschritten (1–3 Jahre)', 'Intermedio (1–3 años)', 'Intermediário (1–3 anos)', 'Intermédiaire (1–3 ans)'],
    'Advanced (3+ years / funded)': ['Erfahren (3+ Jahre / funded)', 'Avanzado (3+ años / fondeado)', 'Avançado (3+ anos / fundado)', 'Confirmé (3+ ans / financé)'],
    'Demo / Practice':   ['Demo / Übung', 'Demo / práctica', 'Demo / prática', 'Démo / entraînement'],
    'Funded Account':    ['Funded-Konto', 'Cuenta fondeada', 'Conta fundada', 'Compte financé'],
    'Personal Live Account': ['Eigenes Live-Konto', 'Cuenta real propia', 'Conta real própria', 'Compte réel personnel'],
    'Challenge Phase 1': ['Challenge Phase 1', 'Desafío fase 1', 'Desafio fase 1', 'Challenge phase 1'],
    'Challenge Phase 2': ['Challenge Phase 2', 'Desafío fase 2', 'Desafio fase 2', 'Challenge phase 2'],
    'Phase':             ['Phase', 'Fase', 'Fase', 'Phase'],
    'Reconnect':         ['Neu verbinden', 'Volver a conectar', 'Reconectar', 'Reconnecter'],
    'Install':           ['Installieren', 'Instalar', 'Instalar', 'Installer'],
    'Login':             ['Anmelden', 'Iniciar sesión', 'Entrar', 'Connexion'],
    'Sign In':           ['Anmelden', 'Iniciar sesión', 'Entrar', 'Se connecter'],
    'Invite':            ['Einladen', 'Invitar', 'Convidar', 'Inviter'],
    'Create':            ['Erstellen', 'Crear', 'Criar', 'Créer'],
    'Enable':            ['Aktivieren', 'Activar', 'Ativar', 'Activer'],
    'Actions':           ['Aktionen', 'Acciones', 'Ações', 'Actions'],
    'Mode':              ['Modus', 'Modo', 'Modo', 'Mode'],
    'Team':              ['Team', 'Equipo', 'Equipe', 'Équipe'],
    'Servers':           ['Server', 'Servidores', 'Servidores', 'Serveurs'],
    'Feed':              ['Feed', 'Feed', 'Feed', 'Fil'],
    'Social':            ['Social', 'Social', 'Social', 'Social'],
    'Tools':             ['Werkzeuge', 'Herramientas', 'Ferramentas', 'Outils'],
    'Analysis':          ['Analyse', 'Análisis', 'Análise', 'Analyse'],
    'Trading':           ['Trading', 'Trading', 'Trading', 'Trading'],
    'Home':              ['Start', 'Inicio', 'Início', 'Accueil'],
    'View':              ['Ansicht', 'Vista', 'Visualização', 'Vue'],

    // ── Knöpfe & Zustände ──
    '+ Add':             ['+ Hinzufügen', '+ Añadir', '+ Adicionar', '+ Ajouter'],
    '✕ Remove':          ['✕ Entfernen', '✕ Quitar', '✕ Remover', '✕ Retirer'],
    '✕ Close':           ['✕ Schließen', '✕ Cerrar', '✕ Fechar', '✕ Fermer'],
    '💾 Save':           ['💾 Speichern', '💾 Guardar', '💾 Salvar', '💾 Enregistrer'],
    '↻ Refresh':         ['↻ Aktualisieren', '↻ Actualizar', '↻ Atualizar', '↻ Actualiser'],
    '📤 Share':          ['📤 Teilen', '📤 Compartir', '📤 Compartilhar', '📤 Partager'],
    '📤 Post':           ['📤 Posten', '📤 Publicar', '📤 Publicar', '📤 Publier'],
    'Next →':            ['Weiter →', 'Siguiente →', 'Próximo →', 'Suivant →'],
    '＋ New':            ['＋ Neu', '＋ Nuevo', '＋ Novo', '＋ Nouveau'],
    'Send':              ['Senden', 'Enviar', 'Enviar', 'Envoyer'],
    'Message':           ['Nachricht', 'Mensaje', 'Mensagem', 'Message'],
    'Watch':             ['Ansehen', 'Ver', 'Assistir', 'Regarder'],
    'Alert':             ['Alarm', 'Alerta', 'Alerta', 'Alerte'],
    'Clear':             ['Leeren', 'Vaciar', 'Limpar', 'Vider'],
    'Never':             ['Nie', 'Nunca', 'Nunca', 'Jamais'],
    'Later':             ['Später', 'Más tarde', 'Mais tarde', 'Plus tard'],
    'Caution':           ['Achtung', 'Atención', 'Atenção', 'Attention'],
    'Needed':            ['Nötig', 'Necesario', 'Necessário', 'Requis'],
    'Broken':            ['Gebrochen', 'Roto', 'Quebrado', 'Rompu'],
    'Static':            ['Statisch', 'Estático', 'Estático', 'Statique'],
    'Resets':            ['Resets', 'Reinicios', 'Reinícios', 'Réinitialisations'],
    'Spent':             ['Ausgegeben', 'Gastado', 'Gasto', 'Dépensé'],
    'Nothing arrives':   ['Es kommt nichts an', 'No llega nada', 'Não chega nada', 'Rien n’arrive'],
    'No pending requests': ['Keine offenen Anfragen', 'Sin solicitudes pendientes', 'Sem solicitações pendentes', 'Aucune demande en attente'],
    'Off-Hours':         ['Randzeiten', 'Fuera de horario', 'Fora do horário', 'Hors séance'],


    /* ── Platzhalter, Tooltips, Vorlesetexte ──
       Sichtbarer Text, der in keinem Textknoten steht. Bewusst NICHT dabei:
       die Namen der Wirtschaftstermine (CPI m/m, Chicago PMI …). Die kommen
       aus dem Kalender-Feed, sind international so gebräuchlich und wären
       übersetzt schlechter auffindbar, nicht besser. */
    'Edit':              ['Bearbeiten', 'Editar', 'Editar', 'Modifier'],
    'Edit trade':        ['Trade bearbeiten', 'Editar operación', 'Editar operação', 'Modifier le trade'],
    'Hide':              ['Ausblenden', 'Ocultar', 'Ocultar', 'Masquer'],
    'Archive':           ['Archivieren', 'Archivar', 'Arquivar', 'Archiver'],
    'Set goal':          ['Ziel setzen', 'Fijar objetivo', 'Definir meta', 'Définir un objectif'],
    'Clear all':         ['Alles leeren', 'Vaciar todo', 'Limpar tudo', 'Tout effacer'],
    'Skip setup':        ['Einrichtung überspringen', 'Omitir configuración', 'Pular configuração', 'Passer la configuration'],
    'Enter value':       ['Wert eingeben', 'Introduce un valor', 'Digite um valor', 'Saisir une valeur'],
    'Enter a label…':    ['Bezeichnung eingeben…', 'Escribe una etiqueta…', 'Digite um rótulo…', 'Saisir un libellé…'],
    'Switch account':    ['Konto wechseln', 'Cambiar de cuenta', 'Trocar de conta', 'Changer de compte'],
    'Trading Sessions':  ['Handelssitzungen', 'Sesiones de trading', 'Sessões de trading', 'Sessions de trading'],
    'What is it about?': ['Worum geht es?', '¿De qué se trata?', 'Do que se trata?', 'De quoi s’agit-il ?'],
    'No data':           ['Keine Daten', 'Sin datos', 'Sem dados', 'Aucune donnée'],
    'From':              ['Von', 'Desde', 'De', 'Du'],
    'To':                ['Bis', 'Hasta', 'Até', 'Au'],
    'From date':         ['Von Datum', 'Fecha desde', 'Data inicial', 'Date de début'],
    'To date':           ['Bis Datum', 'Fecha hasta', 'Data final', 'Date de fin'],
    'Search your journal (Ctrl/Cmd + K)':
      ['Journal durchsuchen (Strg/Cmd + K)', 'Buscar en tu diario (Ctrl/Cmd + K)',
       'Buscar no seu diário (Ctrl/Cmd + K)', 'Rechercher dans le journal (Ctrl/Cmd + K)'],

    // ── Gefühlslagen ──
    '😊 Happy':          ['😊 Zufrieden', '😊 Contento', '😊 Contente', '😊 Content'],
    '😐 Neutral':        ['😐 Neutral', '😐 Neutral', '😐 Neutro', '😐 Neutre'],
    '😡 Angry':          ['😡 Wütend', '😡 Enfadado', '😡 Com raiva', '😡 En colère'],
    '😰 Anxious':        ['😰 Ängstlich', '😰 Ansioso', '😰 Ansioso', '😰 Anxieux'],
    '😌 Confident':      ['😌 Sicher', '😌 Seguro', '😌 Seguro', '😌 Confiant'],
    '🤔 Uncertain':      ['🤔 Unsicher', '🤔 Inseguro', '🤔 Inseguro', '🤔 Incertain'],
    '😤 Frustrated':     ['😤 Frustriert', '😤 Frustrado', '😤 Frustrado', '😤 Frustré'],
    '🚀 Euphoric':       ['🚀 Euphorisch', '🚀 Eufórico', '🚀 Eufórico', '🚀 Euphorique'],


    /* ══════════════ STUFE 2 — ganze Sätze ══════════════
       Leerzustände, Erklärhinweise, Bestätigungen. Hier richtet eine
       Maschinenübersetzung den meisten Schaden an: ein holpriger Satz liest
       sich nicht wie ein Übersetzungsfehler, sondern wie ein unfertiges
       Produkt.

       Bewusst NICHT hier: Sätze mit eingesetzten Zahlen („Occurred 13× on
       losing trades."). Die entstehen zur Laufzeit, der Schlüssel würde nie
       exakt passen — sie brauchen übersetzte Bausteine, nicht einen fertigen
       Satz, und das ist Stufe 3. */

    'What do you mainly trade?':
      ['Was handelst du hauptsächlich?', '¿Qué operas principalmente?',
       'O que você opera principalmente?', 'Que tradez-vous principalement ?'],
    'Pick one habit per chapter.':
      ['Wähle eine Gewohnheit pro Kapitel.', 'Elige un hábito por capítulo.',
       'Escolha um hábito por capítulo.', 'Choisissez une habitude par chapitre.'],
    'No trading account to select.':
      ['Kein Handelskonto vorhanden.', 'No hay cuenta de trading para elegir.',
       'Nenhuma conta de trading para escolher.', 'Aucun compte de trading à sélectionner.'],
    'Pick your broker or platform.':
      ['Wähle deinen Broker oder deine Plattform.', 'Elige tu bróker o plataforma.',
       'Escolha sua corretora ou plataforma.', 'Choisissez votre courtier ou plateforme.'],
    'Your report goes straight to us.':
      ['Deine Meldung geht direkt an uns.', 'Tu informe llega directamente a nosotros.',
       'Seu relato vai direto para nós.', 'Votre signalement nous parvient directement.'],
    'Who can send you direct messages?':
      ['Wer darf dir Nachrichten schicken?', '¿Quién puede enviarte mensajes directos?',
       'Quem pode te enviar mensagens diretas?', 'Qui peut vous envoyer des messages ?'],
    'No traders yet. You are the first!':
      ['Noch keine Trader. Du bist der Erste!', 'Aún no hay traders. ¡Eres el primero!',
       'Ainda não há traders. Você é o primeiro!', 'Aucun trader pour l’instant. Vous êtes le premier !'],
    'Who can view your profile and stats?':
      ['Wer darf dein Profil und deine Zahlen sehen?', '¿Quién puede ver tu perfil y tus cifras?',
       'Quem pode ver seu perfil e seus números?', 'Qui peut voir votre profil et vos chiffres ?'],
    'No rules yet. Add your first rule below.':
      ['Noch keine Regeln. Lege unten deine erste an.', 'Aún no hay reglas. Añade la primera abajo.',
       'Ainda não há regras. Adicione a primeira abaixo.', 'Aucune règle. Ajoutez la première ci-dessous.'],
    'Gemini Vision is analysing your chart...':
      ['Gemini Vision analysiert deinen Chart …', 'Gemini Vision está analizando tu gráfico…',
       'O Gemini Vision está analisando seu gráfico…', 'Gemini Vision analyse votre graphique…'],
    'Your daily drawdown limit has been reached.':
      ['Dein Tagesverlustlimit ist erreicht.', 'Has alcanzado tu límite de pérdida diaria.',
       'Você atingiu seu limite de perda diária.', 'Votre limite de perte quotidienne est atteinte.'],
    'Which market gives you the highest win rate?':
      ['In welchem Markt triffst du am häufigsten?', '¿En qué mercado aciertas más?',
       'Em qual mercado você acerta mais?', 'Sur quel marché réussissez-vous le plus ?'],
    'Pass rates below count decided attempts only.':
      ['Die Quoten unten zählen nur entschiedene Versuche.',
       'Las tasas de abajo cuentan solo intentos ya decididos.',
       'As taxas abaixo contam apenas tentativas já decididas.',
       'Les taux ci-dessous ne comptent que les tentatives déjà tranchées.'],
    'Log setups to see which performs best for you.':
      ['Erfasse Setups, um zu sehen, welches bei dir am besten läuft.',
       'Registra setups para ver cuál te funciona mejor.',
       'Registre setups para ver qual funciona melhor para você.',
       'Enregistrez vos setups pour voir lequel fonctionne le mieux.'],
    'Tag your trade sessions to discover your edge.':
      ['Markiere deine Sessions, um deinen Vorteil zu finden.',
       'Etiqueta tus sesiones para descubrir tu ventaja.',
       'Marque suas sessões para descobrir sua vantagem.',
       'Marquez vos sessions pour découvrir votre avantage.'],
    'Enter your email — we\'ll send you a reset link.':
      ['Gib deine E-Mail ein — wir schicken dir einen Link zum Zurücksetzen.',
       'Introduce tu correo — te enviaremos un enlace para restablecerla.',
       'Digite seu e-mail — enviaremos um link para redefinir.',
       'Saisissez votre e-mail — nous vous enverrons un lien de réinitialisation.'],
    'Tailor the AI Coach to your level and strategy.':
      ['Stelle den KI-Coach auf dein Niveau und deine Strategie ein.',
       'Ajusta el coach de IA a tu nivel y tu estrategia.',
       'Ajuste o coach de IA ao seu nível e à sua estratégia.',
       'Adaptez le coach IA à votre niveau et votre stratégie.'],
    'Track your position sizing discipline over time.':
      ['Verfolge über die Zeit, wie diszipliniert du positionierst.',
       'Sigue en el tiempo cuán disciplinado es tu tamaño de posición.',
       'Acompanhe ao longo do tempo a disciplina no seu tamanho de posição.',
       'Suivez dans le temps la discipline de votre taille de position.'],
    'Prevents cluster zones from the same price area.':
      ['Verhindert gehäufte Zonen im selben Kursbereich.',
       'Evita zonas amontonadas en la misma franja de precio.',
       'Evita zonas amontoadas na mesma faixa de preço.',
       'Évite les zones groupées dans la même plage de prix.'],
    'Every friend you bring pays for a month of yours.':
      ['Jeder geworbene Freund bezahlt dir einen Monat.',
       'Cada amigo que traes te paga un mes.',
       'Cada amigo que você traz paga um mês para você.',
       'Chaque ami parrainé vous offre un mois.'],
    'Your account. Fully secure. Available everywhere.':
      ['Dein Konto. Sicher. Überall verfügbar.', 'Tu cuenta. Segura. Disponible en todas partes.',
       'Sua conta. Segura. Disponível em qualquer lugar.', 'Votre compte. Sécurisé. Disponible partout.'],
    'Mistake tags will reveal your recurring patterns.':
      ['Fehler-Tags zeigen dir, was sich bei dir wiederholt.',
       'Las etiquetas de error revelan tus patrones recurrentes.',
       'As etiquetas de erro revelam seus padrões recorrentes.',
       'Les tags d’erreur révèlent vos schémas récurrents.'],
    'Set your account size to start tracking drawdown.':
      ['Trage deine Kontogröße ein, dann beginnt die Drawdown-Verfolgung.',
       'Indica el tamaño de tu cuenta para empezar a seguir el drawdown.',
       'Informe o tamanho da sua conta para começar a acompanhar o drawdown.',
       'Indiquez la taille du compte pour suivre le drawdown.'],
    'Number of horizontal buckets in the volume profile.':
      ['Anzahl der waagerechten Stufen im Volumenprofil.',
       'Número de tramos horizontales del perfil de volumen.',
       'Número de faixas horizontais do perfil de volume.',
       'Nombre de paliers horizontaux du profil de volume.'],
    'Timeframe data will show your optimal hold duration.':
      ['Die Zeitebenen zeigen dir deine ideale Haltedauer.',
       'Los marcos temporales mostrarán tu duración ideal de posición.',
       'Os tempos gráficos mostrarão sua duração ideal de posição.',
       'Les unités de temps révéleront votre durée de détention idéale.'],
    'Some firms charge this once you pass the evaluation.':
      ['Manche Firmen berechnen das erst nach bestandener Prüfung.',
       'Algunas firmas lo cobran solo al superar la evaluación.',
       'Algumas empresas cobram isso só depois da avaliação aprovada.',
       'Certaines sociétés le facturent une fois l’évaluation réussie.'],
    'Maximum number of simultaneous active zones on chart.':
      ['Höchstzahl gleichzeitig aktiver Zonen im Chart.',
       'Número máximo de zonas activas a la vez en el gráfico.',
       'Número máximo de zonas ativas ao mesmo tempo no gráfico.',
       'Nombre maximal de zones actives simultanées.'],
    'Pick your firm below and the rules fill themselves in.':
      ['Wähle unten deine Firma — die Regeln tragen sich von selbst ein.',
       'Elige tu firma abajo y las reglas se rellenan solas.',
       'Escolha sua empresa abaixo e as regras se preenchem sozinhas.',
       'Choisissez votre société ci-dessous, les règles se remplissent seules.'],
    'Terms change — always verify against your own contract.':
      ['Bedingungen ändern sich — prüfe immer deinen eigenen Vertrag.',
       'Las condiciones cambian — verifica siempre tu propio contrato.',
       'As condições mudam — verifique sempre o seu próprio contrato.',
       'Les conditions changent — vérifiez toujours votre propre contrat.'],
    'The real cost of drawdown — and what it takes to recover.':
      ['Was ein Drawdown wirklich kostet — und was die Erholung verlangt.',
       'Lo que cuesta de verdad un drawdown — y lo que exige recuperarse.',
       'O que um drawdown custa de verdade — e o que exige para recuperar.',
       'Le vrai coût d’un drawdown — et ce qu’il faut pour s’en remettre.'],
    'Import a statement, connect live, or enter a single trade.':
      ['Statement importieren, live verbinden oder einen Trade eintragen.',
       'Importa un extracto, conecta en vivo o anota una operación.',
       'Importe um extrato, conecte ao vivo ou anote uma operação.',
       'Importez un relevé, connectez en direct ou saisissez un trade.'],
    'No setup, no trade. Run your checklist before every click.':
      ['Kein Setup, kein Trade. Checkliste vor jedem Klick.',
       'Sin setup no hay operación. Repasa tu lista antes de cada clic.',
       'Sem setup não há operação. Passe pela lista antes de cada clique.',
       'Pas de setup, pas de trade. Votre check-list avant chaque clic.'],
    'Not enough Saturdays logged yet to say anything about them.':
      ['Noch zu wenige Samstage erfasst, um etwas darüber zu sagen.',
       'Aún hay pocos sábados registrados para decir algo.',
       'Ainda há poucos sábados registrados para dizer algo.',
       'Trop peu de samedis enregistrés pour en dire quoi que ce soit.'],
    'How many bars back the indicator searches for active zones.':
      ['Wie viele Kerzen zurück der Indikator nach Zonen sucht.',
       'Cuántas velas hacia atrás busca zonas el indicador.',
       'Quantos candles para trás o indicador procura zonas.',
       'Combien de bougies en arrière l’indicateur cherche des zones.'],
    'This helps calibrate your pip calculator and default symbol.':
      ['Damit stimmen dein Pip-Rechner und dein Standardsymbol.',
       'Con esto se ajustan tu calculadora de pips y tu símbolo por defecto.',
       'Assim sua calculadora de pips e seu símbolo padrão ficam certos.',
       'Cela cale votre calculateur de pips et votre symbole par défaut.'],
    'Your upgrade is confirmed. All Pro features are now unlocked.':
      ['Dein Upgrade ist bestätigt. Alle Pro-Funktionen sind freigeschaltet.',
       'Tu mejora está confirmada. Todas las funciones Pro están activas.',
       'Sua atualização foi confirmada. Todos os recursos Pro estão liberados.',
       'Votre passage à Pro est confirmé. Toutes les fonctions sont débloquées.'],
    'If a zone falls below minimum it gets expanded to this value.':
      ['Fällt eine Zone unter das Minimum, wird sie auf diesen Wert erweitert.',
       'Si una zona queda bajo el mínimo, se amplía a este valor.',
       'Se uma zona ficar abaixo do mínimo, é ampliada para este valor.',
       'Si une zone passe sous le minimum, elle est élargie à cette valeur.'],
    'Height of the entry box as a percentage of total zone height.':
      ['Höhe des Einstiegsfelds als Anteil der gesamten Zonenhöhe.',
       'Altura de la caja de entrada como porcentaje de la zona.',
       'Altura da caixa de entrada como porcentagem da zona.',
       'Hauteur de la zone d’entrée en pourcentage de la zone totale.'],
    'Calculate your exact lot size based on account risk parameters.':
      ['Berechne deine genaue Positionsgröße aus deinen Risikovorgaben.',
       'Calcula tu tamaño exacto de lote según tu riesgo por operación.',
       'Calcule seu tamanho exato de lote conforme seu risco por operação.',
       'Calculez votre taille de lot exacte selon vos paramètres de risque.'],
    'Visualize your risk-reward structure before entering any trade.':
      ['Sieh dein Chancen-Risiko-Verhältnis, bevor du einsteigst.',
       'Visualiza tu relación riesgo-beneficio antes de entrar.',
       'Visualize sua relação risco-retorno antes de entrar.',
       'Visualisez votre rapport risque/rendement avant d’entrer.'],
    'Already injected into the code below — no manual pasting needed.':
      ['Steht schon im Code unten — nichts von Hand einzufügen.',
       'Ya está insertado en el código de abajo — no hay que pegar nada.',
       'Já está inserido no código abaixo — não precisa colar nada.',
       'Déjà inséré dans le code ci-dessous — rien à coller.'],
    'Your first read-out: win rate, expectancy, best and worst hours.':
      ['Deine erste Auswertung: Trefferquote, Erwartungswert, beste und schlechteste Stunden.',
       'Tu primera lectura: acierto, esperanza matemática, mejores y peores horas.',
       'Sua primeira leitura: acerto, expectativa, melhores e piores horas.',
       'Votre première lecture : réussite, espérance, meilleures et pires heures.'],
    'Tag mistakes on your trades to surface your most costly patterns.':
      ['Markiere Fehler an deinen Trades, um die teuersten Muster sichtbar zu machen.',
       'Etiqueta errores en tus operaciones para ver los patrones más caros.',
       'Marque erros nas suas operações para ver os padrões mais caros.',
       'Taguez vos erreurs pour faire ressortir les schémas les plus coûteux.'],
    'Wait for your setup — chasing a move usually means buying the top.':
      ['Warte auf dein Setup — einer Bewegung hinterherzulaufen heißt meist, oben zu kaufen.',
       'Espera tu setup — perseguir un movimiento suele ser comprar el techo.',
       'Espere seu setup — correr atrás do movimento costuma ser comprar o topo.',
       'Attendez votre setup — courir après un mouvement, c’est acheter le haut.'],
    'Let winners run to target. Cutting early caps your R:R and your edge.':
      ['Lass Gewinner bis zum Ziel laufen. Zu früh schließen deckelt R:R und Vorteil.',
       'Deja correr a los ganadores. Cerrar pronto limita tu R:R y tu ventaja.',
       'Deixe os vencedores correrem. Fechar cedo limita seu R:R e sua vantagem.',
       'Laissez courir les gagnants. Couper tôt plafonne votre R:R et votre avantage.'],
    'Always define risk before entry. One unstopped trade can erase weeks.':
      ['Lege das Risiko vor dem Einstieg fest. Ein Trade ohne Stop löscht Wochen aus.',
       'Define el riesgo antes de entrar. Una operación sin stop borra semanas.',
       'Defina o risco antes de entrar. Uma operação sem stop apaga semanas.',
       'Définissez le risque avant d’entrer. Un trade sans stop efface des semaines.'],
    'Push your trades into other tools, or pull them out with the REST API.':
      ['Schiebe deine Trades in andere Werkzeuge — oder hole sie über die REST-API heraus.',
       'Envía tus operaciones a otras herramientas o extráelas con la API REST.',
       'Envie suas operações para outras ferramentas ou extraia-as pela API REST.',
       'Envoyez vos trades vers d’autres outils, ou récupérez-les via l’API REST.'],
    'Flags a re-entry made shortly after a loss at an unusually large size.':
      ['Meldet einen Wiedereinstieg kurz nach einem Verlust mit ungewöhnlich großer Position.',
       'Señala una reentrada poco después de una pérdida con tamaño inusualmente grande.',
       'Sinaliza uma reentrada logo após uma perda com tamanho fora do normal.',
       'Signale une réentrée juste après une perte, avec une taille inhabituelle.'],
    'Unlock AI Coach, S&D Zones, Weekly Reports, Advanced Analytics and more.':
      ['Schalte KI-Coach, S&D-Zonen, Wochenberichte, erweiterte Auswertungen und mehr frei.',
       'Desbloquea coach de IA, zonas S&D, informes semanales, analítica avanzada y más.',
       'Libere coach de IA, zonas S&D, relatórios semanais, análises avançadas e mais.',
       'Débloquez le coach IA, les zones S&D, les rapports hebdomadaires et plus.'],
    'Set your current account type — used by the AI Coach and prop firm mode.':
      ['Lege deine Kontoart fest — KI-Coach und Prop-Modus richten sich danach.',
       'Indica tu tipo de cuenta — lo usan el coach de IA y el modo prop.',
       'Informe seu tipo de conta — usado pelo coach de IA e pelo modo prop.',
       'Indiquez le type de compte — utilisé par le coach IA et le mode prop.'],
    'Step away after a loss. Re-entering to win it back compounds the damage.':
      ['Nach einem Verlust aufstehen. Sofort zurückholen zu wollen verdoppelt den Schaden.',
       'Levántate tras una pérdida. Querer recuperarla enseguida agrava el daño.',
       'Levante-se após uma perda. Querer recuperá-la na hora agrava o estrago.',
       'Levez-vous après une perte. Vouloir la reprendre aggrave les dégâts.'],
    'Shown in the nav bar and on your community profile. JPG or PNG, max 5 MB.':
      ['Erscheint in der Navigation und auf deinem Community-Profil. JPG oder PNG, max. 5 MB.',
       'Aparece en la barra y en tu perfil de comunidad. JPG o PNG, máx. 5 MB.',
       'Aparece na barra e no seu perfil da comunidade. JPG ou PNG, máx. 5 MB.',
       'Affiché dans la barre et sur votre profil. JPG ou PNG, 5 Mo max.'],
    'Pick a broker above and this step tells you exactly where to click in it.':
      ['Wähle oben deinen Broker — dann steht hier, wo genau du klicken musst.',
       'Elige tu bróker arriba y aquí verás exactamente dónde hacer clic.',
       'Escolha sua corretora acima e aqui aparece exatamente onde clicar.',
       'Choisissez votre courtier ci-dessus : cette étape dira où cliquer.'],
    'Entered by hand, once per challenge. Nothing is read from a bank account.':
      ['Einmal pro Challenge von Hand eingetragen. Es wird kein Bankkonto ausgelesen.',
       'Se introduce a mano, una vez por desafío. No se lee ninguna cuenta bancaria.',
       'Digitado à mão, uma vez por desafio. Nenhuma conta bancária é lida.',
       'Saisi à la main, une fois par challenge. Aucun compte bancaire n’est lu.'],
    'Your position size calculator will use this as the default risk per trade.':
      ['Der Positionsrechner nimmt das als Standardrisiko je Trade.',
       'Tu calculadora usará esto como riesgo por operación por defecto.',
       'Sua calculadora usará isso como risco padrão por operação.',
       'Le calculateur utilisera ceci comme risque par défaut par trade.'],
    'Your challenge rules, tracked against the real drawdown model your firm uses.':
      ['Deine Challenge-Regeln, gemessen am echten Drawdown-Modell deiner Firma.',
       'Tus reglas del desafío, medidas con el modelo de drawdown real de tu firma.',
       'Suas regras do desafio, medidas pelo modelo de drawdown real da sua empresa.',
       'Vos règles de challenge, mesurées sur le vrai modèle de drawdown de votre société.'],
    'Three steps. Everything else in the app can wait until there is data to look at.':
      ['Drei Schritte. Alles andere kann warten, bis es Daten zu sehen gibt.',
       'Tres pasos. Lo demás puede esperar a que haya datos que mirar.',
       'Três passos. O resto pode esperar até haver dados para olhar.',
       'Trois étapes. Le reste peut attendre qu’il y ait des données à regarder.'],
    'Pick your firm to prefill, then adjust anything your programme does differently.':
      ['Firma wählen zum Vorausfüllen, dann anpassen, was dein Programm anders macht.',
       'Elige tu firma para prerrellenar y ajusta lo que tu programa haga distinto.',
       'Escolha sua empresa para preencher e ajuste o que seu programa faz diferente.',
       'Choisissez la société pour préremplir, puis ajustez ce qui diffère.'],
    'Sunday summary of your trading week. Nothing is sent in a week you did not trade.':
      ['Sonntags die Zusammenfassung deiner Handelswoche. In einer Woche ohne Trades kommt nichts.',
       'Resumen dominical de tu semana. En una semana sin operaciones no se envía nada.',
       'Resumo de domingo da sua semana. Em uma semana sem operações nada é enviado.',
       'Résumé du dimanche. Rien n’est envoyé une semaine sans trade.'],
    'Static never moves. EOD trails your daily closes. Intraday trails every new high.':
      ['Statisch bleibt fest. EOD folgt den Tagesschlüssen. Intraday folgt jedem neuen Hoch.',
       'Estático no se mueve. EOD sigue los cierres diarios. Intradía sigue cada nuevo máximo.',
       'Estático não se move. EOD segue os fechamentos diários. Intradiário segue cada nova máxima.',
       'Statique ne bouge pas. EOD suit les clôtures. Intraday suit chaque nouveau sommet.'],
    'Manage your monthly subscription — cancel, update payment method, or view invoices.':
      ['Abo verwalten — kündigen, Zahlungsmittel ändern oder Rechnungen ansehen.',
       'Gestiona tu suscripción — cancelar, cambiar el pago o ver facturas.',
       'Gerencie sua assinatura — cancelar, trocar o pagamento ou ver faturas.',
       'Gérez votre abonnement — résilier, changer de moyen de paiement, voir les factures.'],
    'Enables prop firm logic: daily DD limit, maximum total drawdown and automatic stops.':
      ['Aktiviert die Prop-Logik: Tageslimit, maximaler Gesamt-Drawdown und automatische Stopps.',
       'Activa la lógica prop: límite diario, drawdown total máximo y paradas automáticas.',
       'Ativa a lógica prop: limite diário, drawdown total máximo e paradas automáticas.',
       'Active la logique prop : limite quotidienne, drawdown total et arrêts automatiques.'],
    'You have logged enough trades to have an opinion. Two sentences would genuinely help.':
      ['Du hast genug Trades erfasst, um dir ein Urteil zu bilden. Zwei Sätze würden uns wirklich helfen.',
       'Ya has registrado suficientes operaciones para opinar. Dos frases nos ayudarían de verdad.',
       'Você já registrou operações suficientes para ter uma opinião. Duas frases ajudariam muito.',
       'Vous avez assez de trades pour avoir un avis. Deux phrases nous aideraient vraiment.'],
    'Shows a precise entry box inside the zone — calculated from FVG, OB, POC and Liquidity.':
      ['Zeigt ein genaues Einstiegsfeld in der Zone — aus FVG, OB, POC und Liquidität berechnet.',
       'Muestra una caja de entrada precisa dentro de la zona — desde FVG, OB, POC y liquidez.',
       'Mostra uma caixa de entrada precisa dentro da zona — a partir de FVG, OB, POC e liquidez.',
       'Affiche une zone d’entrée précise — calculée depuis FVG, OB, POC et liquidité.'],
    'Define your strategies with a checklist and rules — then see which ones actually make money.':
      ['Definiere deine Strategien mit Checkliste und Regeln — und sieh dann, welche wirklich Geld bringen.',
       'Define tus estrategias con lista y reglas — y mira cuáles ganan dinero de verdad.',
       'Defina suas estratégias com lista e regras — e veja quais realmente dão dinheiro.',
       'Définissez vos stratégies avec check-list et règles — puis voyez lesquelles rapportent.'],
    'Add your own mistake and positive tags. They appear in every trade card alongside the built-in ones.':
      ['Lege eigene Fehler- und Positiv-Tags an. Sie erscheinen in jeder Trade-Karte neben den mitgelieferten.',
       'Crea tus propias etiquetas de error y acierto. Aparecen en cada operación junto a las de serie.',
       'Crie suas próprias etiquetas de erro e acerto. Elas aparecem em cada operação junto às padrão.',
       'Créez vos propres tags d’erreur et de réussite. Ils apparaissent sur chaque trade.'],
    'Permanently delete your account and synced journal data. This cannot be undone and requires your password.':
      ['Konto und synchronisiertes Journal endgültig löschen. Nicht rückgängig zu machen, Passwort erforderlich.',
       'Elimina definitivamente tu cuenta y el diario sincronizado. Es irreversible y pide tu contraseña.',
       'Exclui definitivamente sua conta e o diário sincronizado. É irreversível e exige sua senha.',
       'Supprime définitivement votre compte et votre journal. Irréversible, mot de passe requis.'],
    'Rules are automatically checked against each trade. Violations are flagged in your journal with a warning badge.':
      ['Regeln werden bei jedem Trade geprüft. Verstöße bekommen im Journal ein Warnzeichen.',
       'Las reglas se comprueban en cada operación. Las infracciones se marcan en el diario.',
       'As regras são checadas em cada operação. As infrações são marcadas no diário.',
       'Les règles sont vérifiées à chaque trade. Les manquements sont signalés dans le journal.'],
    'You can cancel anytime — access remains active until the end of your billing period. Managed securely via Stripe.':
      ['Jederzeit kündbar — der Zugang bleibt bis zum Ende des Abrechnungszeitraums aktiv. Abwicklung über Stripe.',
       'Cancela cuando quieras — el acceso sigue hasta el fin del periodo facturado. Gestionado por Stripe.',
       'Cancele quando quiser — o acesso continua até o fim do período faturado. Gerenciado pela Stripe.',
       'Résiliable à tout moment — l’accès court jusqu’à la fin de la période. Géré via Stripe.'],
    'Your professional trading journal is ready. Let\'s set it up in 3 quick steps so your dashboard is ready from day one.':
      ['Dein Handelsjournal steht. In drei Schritten eingerichtet, damit die Übersicht vom ersten Tag an stimmt.',
       'Tu diario profesional está listo. Configúralo en 3 pasos para tenerlo todo desde el primer día.',
       'Seu diário profissional está pronto. Configure em 3 passos para começar já no primeiro dia.',
       'Votre journal est prêt. Trois étapes pour qu’il soit utile dès le premier jour.'],
    'Hard limits checked every time you log a trade. Warnings appear above your trade list while the day is still salvageable.':
      ['Harte Grenzen, bei jedem erfassten Trade geprüft. Warnungen erscheinen über der Liste, solange der Tag noch zu retten ist.',
       'Límites duros comprobados en cada operación. Los avisos salen sobre la lista mientras el día aún se salva.',
       'Limites rígidos checados a cada operação. Os avisos aparecem acima da lista enquanto o dia ainda dá para salvar.',
       'Limites strictes vérifiées à chaque trade. Les alertes s’affichent tant que la journée est récupérable.'],
    'Your trades arrive by themselves, every 10 minutes, whether or not the app is open. No CSV export, no upload. Requires Pro.':
      ['Deine Trades kommen von allein, alle 10 Minuten, ob die App offen ist oder nicht. Kein CSV-Export, kein Hochladen. Erfordert Pro.',
       'Tus operaciones llegan solas, cada 10 minutos, esté la app abierta o no. Sin CSV, sin subidas. Requiere Pro.',
       'Suas operações chegam sozinhas, a cada 10 minutos, com o app aberto ou não. Sem CSV, sem upload. Requer Pro.',
       'Vos trades arrivent seuls, toutes les 10 minutes, app ouverte ou non. Sans CSV ni import. Pro requis.'],
    'Your equity curve, win rate, streaks and session breakdowns are all waiting — they just need your first trade to come alive.':
      ['Kapitalkurve, Trefferquote, Serien und Session-Auswertung warten schon — sie brauchen nur deinen ersten Trade.',
       'Tu curva, tu acierto, tus rachas y tus sesiones ya esperan — solo les falta tu primera operación.',
       'Sua curva, seu acerto, suas sequências e suas sessões já esperam — só falta sua primeira operação.',
       'Courbe, taux de réussite, séries et sessions attendent déjà — il ne manque que votre premier trade.'],
    'Your existing trades, run against a firm\'s published rules. Everything after a breach is ignored — in a real challenge the account would already have been closed.':
      ['Deine vorhandenen Trades gegen die veröffentlichten Regeln einer Firma gerechnet. Alles nach einem Verstoß wird ignoriert — in einer echten Challenge wäre das Konto da schon geschlossen.',
       'Tus operaciones existentes contra las reglas publicadas de una firma. Todo lo posterior a una infracción se ignora — en un desafío real la cuenta ya estaría cerrada.',
       'Suas operações existentes contra as regras publicadas de uma empresa. Tudo após uma infração é ignorado — em um desafio real a conta já estaria fechada.',
       'Vos trades existants confrontés aux règles publiées d’une société. Tout ce qui suit un manquement est ignoré — le compte aurait déjà été fermé.'],
    'Rate your discipline, confidence, focus, and patience every day. Over time, the system will correlate your mental state with your P&L to identify peak performance conditions.':
      ['Bewerte täglich Disziplin, Selbstvertrauen, Fokus und Geduld. Mit der Zeit verknüpft das System deinen Zustand mit deinem Ergebnis und zeigt, wann du am besten bist.',
       'Valora cada día tu disciplina, confianza, concentración y paciencia. Con el tiempo el sistema cruza tu estado con tu P&L y muestra cuándo rindes mejor.',
       'Avalie todo dia sua disciplina, confiança, foco e paciência. Com o tempo o sistema cruza seu estado com seu P&L e mostra quando você rende melhor.',
       'Notez chaque jour discipline, confiance, concentration et patience. Avec le temps, le système croise votre état et votre P&L.'],
    'Auto-import your trades from any of these platforms. Pick your platform — each connects a different way, but they all land in the same journal with chart snapshots, timestamps and SL/TP.':
      ['Importiere deine Trades automatisch von einer dieser Plattformen. Jede verbindet sich anders, aber alle landen im selben Journal — mit Chartbild, Zeitstempel und SL/TP.',
       'Importa automáticamente desde cualquiera de estas plataformas. Cada una conecta distinto, pero todas caen en el mismo diario con captura, hora y SL/TP.',
       'Importe automaticamente de qualquer uma destas plataformas. Cada uma conecta de um jeito, mas todas caem no mesmo diário com captura, horário e SL/TP.',
       'Importez automatiquement depuis ces plateformes. Chacune se connecte autrement, mais tout arrive dans le même journal.'],


    /* ── Seitentitel (zweigeteilt im HTML, siehe data-i18n-head) ── */
    'Performance Overview': ['Performance-Übersicht', 'Resumen de rendimiento', 'Visão geral do desempenho', 'Aperçu des performances'],
    'Daily Journal':        ['Tägliches Journal', 'Diario del día', 'Diário do dia', 'Journal quotidien'],
    'Calendar View':        ['Kalenderansicht', 'Vista de calendario', 'Visão de calendário', 'Vue calendrier'],
    'Performance Statistics': ['Leistungsstatistik', 'Estadísticas de rendimiento', 'Estatísticas de desempenho', 'Statistiques de performance'],
    'Psychology Dashboard': ['Psychologie-Übersicht', 'Panel de psicología', 'Painel de psicologia', 'Tableau psychologie'],
    'Trade Insights':       ['Trade-Erkenntnisse', 'Hallazgos de tus operaciones', 'Descobertas das operações', 'Enseignements des trades'],
    'Economic Calendar':    ['Wirtschaftskalender', 'Calendario económico', 'Calendário econômico', 'Calendrier économique'],
    'Trade Calculators':    ['Trade-Rechner', 'Calculadoras de trading', 'Calculadoras de trading', 'Calculatrices de trading'],
    'Setup Tracking':       ['Setup-Verfolgung', 'Seguimiento de setups', 'Acompanhamento de setups', 'Suivi des setups'],
    'News & Offers':        ['Neues & Angebote', 'Novedades y ofertas', 'Novidades e ofertas', 'Actualités & offres'],
    'Setup Feed':           ['Setup-Feed', 'Feed de setups', 'Feed de setups', 'Fil des setups'],
    'Community Leaderboard':['Community-Rangliste', 'Clasificación de la comunidad', 'Classificação da comunidade', 'Classement de la communauté'],
    'My Inbox':             ['Mein Posteingang', 'Mi bandeja de entrada', 'Minha caixa de entrada', 'Ma boîte de réception'],
    'App Settings':         ['App-Einstellungen', 'Ajustes de la app', 'Configurações do app', 'Paramètres de l’app'],
    'Quantitative Edge Lab':['Quantitatives Edge Lab', 'Edge Lab cuantitativo', 'Edge Lab quantitativo', 'Edge Lab quantitatif'],
    'Community Servers':    ['Community-Server', 'Servidores de la comunidad', 'Servidores da comunidade', 'Serveurs de la communauté'],
    'Accounts & Comparison':['Konten & Vergleich', 'Cuentas y comparación', 'Contas e comparação', 'Comptes & comparaison'],
    'Mentor & Team':        ['Mentor & Team', 'Mentor y equipo', 'Mentor e equipe', 'Mentor & équipe'],
    'Prop Firm':            ['Prop Firm', 'Prop firm', 'Prop firm', 'Prop firm'],
    'Developer & Integrations': ['Entwickler & Anbindungen', 'Desarrollo e integraciones', 'Desenvolvimento e integrações', 'Développeur & intégrations'],
    'Trading Academy':      ['Trading-Academy', 'Academia de trading', 'Academia de trading', 'Académie de trading'],
    'Strategy Drills':      ['Strategie-Übungen', 'Ejercicios de estrategia', 'Exercícios de estratégia', 'Exercices de stratégie'],
    'Trading Glossary':     ['Trading-Glossar', 'Glosario de trading', 'Glossário de trading', 'Glossaire du trading'],
    'Evidence Trading — Coach Report': ['Evidence Trading — Coach-Bericht', 'Evidence Trading — informe del coach', 'Evidence Trading — relatório do coach', 'Evidence Trading — rapport du coach'],


    /* ── Vorlagen mit Zahlen ──
       {n} steht für eine Zahl aus dem Journal. Sie wird der Reihe nach wieder
       eingesetzt, also muss die Reihenfolge der Platzhalter in jeder Sprache
       dieselbe sein wie im Original. Wo eine Sprache die Satzstellung ändern
       würde, ist der Satz hier bewusst so gebaut, dass die Zahlen in ihrer
       Reihenfolge bleiben. */

    'Occurred {n}× on losing trades.':
      ['Kam bei Verlust-Trades {n}× vor.', 'Ocurrió {n}× en operaciones perdedoras.',
       'Ocorreu {n}× em operações perdedoras.', 'Survenu {n}× sur des trades perdants.'],
    'This mistake appears {n}× on losing trades. Before every entry ask: "Am I committing Revenge Trade?" Only enter if the answer is No.':
      ['Dieser Fehler taucht {n}× bei Verlust-Trades auf. Frag dich vor jedem Einstieg: „Ist das ein Rache-Trade?" Steig nur ein, wenn die Antwort Nein lautet.',
       'Este error aparece {n}× en operaciones perdedoras. Antes de cada entrada pregúntate: «¿Es una operación de venganza?» Entra solo si la respuesta es no.',
       'Este erro aparece {n}× em operações perdedoras. Antes de cada entrada pergunte: “Isto é uma operação de vingança?” Só entre se a resposta for não.',
       'Cette erreur revient {n}× sur des trades perdants. Avant chaque entrée, demandez-vous : « Est-ce un trade de revanche ? » N’entrez que si la réponse est non.'],
    // Landing-Knöpfe mit Zähler (23.10.2026)
    '{n} published reviews': ['{n} veröffentlichte Bewertungen', '{n} reseñas publicadas', '{n} avaliações publicadas', '{n} avis publiés'],
    '{n} published review': ['{n} veröffentlichte Bewertung', '{n} reseña publicada', '{n} avaliação publicada', '{n} avis publié'],
    'Show all {n} included features': ['Alle {n} enthaltenen Funktionen zeigen', 'Ver las {n} funciones incluidas', 'Ver os {n} recursos incluídos', 'Voir les {n} fonctions incluses'],
    'Show all {n}': ['Alle {n} zeigen', 'Ver los {n}', 'Ver todos os {n}', 'Voir les {n}'],
    'Log at least {n} trades with complete data — symbol, session, setup, and mistakes — to unlock AI-powered pattern analysis. The more you log, the smarter your insights become.':
      ['Erfasse mindestens {n} Trades vollständig — Symbol, Session, Setup und Fehler —, um die KI-Mustererkennung freizuschalten. Je mehr du erfasst, desto schärfer werden die Hinweise.',
       'Registra al menos {n} operaciones completas — símbolo, sesión, setup y errores — para activar el análisis de patrones con IA. Cuanto más registres, mejores serán las conclusiones.',
       'Registre pelo menos {n} operações completas — símbolo, sessão, setup e erros — para liberar a análise de padrões com IA. Quanto mais registrar, melhores as conclusões.',
       'Enregistrez au moins {n} trades complets — symbole, session, setup et erreurs — pour activer l’analyse de schémas par IA. Plus vous en saisissez, plus les constats sont fins.'],
    'Daily self-ratings ({n}–{n}) across your last {n} logged sessions':
      ['Tägliche Selbsteinschätzung ({n}–{n}) über deine letzten {n} erfassten Sitzungen',
       'Autoevaluación diaria ({n}–{n}) en tus últimas {n} sesiones registradas',
       'Autoavaliação diária ({n}–{n}) nas suas últimas {n} sessões registradas',
       'Auto-évaluation quotidienne ({n}–{n}) sur vos {n} dernières sessions'],
    'Clean day = at least {n} trade logged, “Followed Plan” tagged, zero mistakes':
      ['Sauberer Tag = mindestens {n} Trade erfasst, „Plan eingehalten" markiert, kein Fehler',
       'Día limpio = al menos {n} operación registrada, «Seguí el plan» marcado, cero errores',
       'Dia limpo = pelo menos {n} operação registrada, “Segui o plano” marcado, zero erros',
       'Journée propre = au moins {n} trade saisi, « Plan respecté » coché, zéro erreur'],
    'Alerts {n} min before the event':
      ['Hinweis {n} Min vor dem Termin', 'Aviso {n} min antes del evento',
       'Aviso {n} min antes do evento', 'Alerte {n} min avant l’événement'],
    'Password (min. {n} characters)':
      ['Passwort (mind. {n} Zeichen)', 'Contraseña (mín. {n} caracteres)',
       'Senha (mín. {n} caracteres)', 'Mot de passe ({n} caractères min.)'],
    '{n} of {n} seats left':
      ['Noch {n} von {n} Plätzen', 'Quedan {n} de {n} plazas',
       'Restam {n} de {n} vagas', 'Il reste {n} places sur {n}'],
    '🎁 Try {n} days free':
      ['🎁 {n} Tage kostenlos testen', '🎁 Prueba {n} días gratis',
       '🎁 Teste {n} dias grátis', '🎁 Essayez {n} jours gratuitement'],
    'No credit card required · ends automatically after {n} days':
      ['Keine Kreditkarte nötig · endet nach {n} Tagen von selbst',
       'Sin tarjeta · termina solo a los {n} días',
       'Sem cartão · termina sozinho após {n} dias',
       'Sans carte · se termine seul après {n} jours'],
    'Standard entry. Loss of {n} pips — review whether the entry trigger was really there.':
      ['Normaler Einstieg. Verlust von {n} Pips — prüfe, ob der Auslöser wirklich da war.',
       'Entrada normal. Pérdida de {n} pips — revisa si el disparador estaba realmente ahí.',
       'Entrada normal. Perda de {n} pips — verifique se o gatilho estava realmente lá.',
       'Entrée normale. Perte de {n} pips — vérifiez si le déclencheur était vraiment là.'],
    '🧠 Coach insight: Revenge-trade pattern — Trades taken right after a loss win only {n}% (vs {n}% overall). Consider a mandatory pause after any loss.':
      ['🧠 Coach-Hinweis: Rache-Muster — Trades direkt nach einem Verlust gewinnen nur zu {n}% (gegenüber {n}% insgesamt). Eine feste Pause nach jedem Verlust wäre einen Versuch wert.',
       '🧠 Nota del coach: patrón de venganza — las operaciones justo tras una pérdida ganan solo el {n}% (frente al {n}% general). Plantéate una pausa obligatoria tras cada pérdida.',
       '🧠 Nota do coach: padrão de vingança — operações logo após uma perda ganham só {n}% (contra {n}% no geral). Considere uma pausa obrigatória após cada perda.',
       '🧠 Note du coach : schéma de revanche — les trades pris juste après une perte ne gagnent que {n}% (contre {n}% au total). Envisagez une pause obligatoire après chaque perte.'],
    'Fix Your #{n} Leak: "Revenge Trade"':
      ['Dein Leck Nr. {n}: „Rache-Trade"', 'Tu fuga n.º {n}: «Operación de venganza»',
       'Seu vazamento nº {n}: “Operação de vingança”', 'Votre fuite n° {n} : « Trade de revanche »'],
    'Recap of {n} August':
      ['Rückblick auf den {n}. August', 'Resumen del {n} de agosto',
       'Retrospectiva de {n} de agosto', 'Récapitulatif du {n} août'],
    'Open · {n}:{n}:{n} left':
      ['Offen · noch {n}:{n}:{n}', 'Abierto · quedan {n}:{n}:{n}',
       'Aberto · restam {n}:{n}:{n}', 'Ouvert · {n}:{n}:{n} restant'],

    /* ── langer Schwanz: Edge Lab, Prop-Cockpit, Reports, Spaces ── */
    'Metrics':           ['Kennzahlen', 'Métricas', 'Métricas', 'Indicateurs'],
    'Stat Lab':          ['Stat Lab', 'Stat Lab', 'Stat Lab', 'Stat Lab'],
    'R & Risk':          ['R & Risiko', 'R y riesgo', 'R e risco', 'R & risque'],
    'Timing & Exits':    ['Timing & Ausstiege', 'Timing y salidas', 'Timing e saídas', 'Timing & sorties'],
    'What-If':           ['Was wäre wenn', 'Qué pasaría si', 'E se', 'Et si'],
    'Replay':            ['Replay', 'Repetición', 'Replay', 'Replay'],
    'Market Replay':     ['Markt-Replay', 'Repetición de mercado', 'Replay de mercado', 'Replay du marché'],
    'Strategy Lab':      ['Strategie-Labor', 'Laboratorio de estrategias', 'Laboratório de estratégias', 'Labo de stratégies'],
    'Journal Backtest':  ['Journal-Backtest', 'Backtest del diario', 'Backtest do diário', 'Backtest du journal'],
    'Gallery':           ['Galerie', 'Galería', 'Galeria', 'Galerie'],
    'Missed Trades':     ['Verpasste Trades', 'Operaciones perdidas', 'Operações perdidas', 'Trades manqués'],
    'Coach Share':       ['Coach-Freigabe', 'Compartir con el coach', 'Compartilhar com o coach', 'Partage coach'],
    'Group by':          ['Gruppieren nach', 'Agrupar por', 'Agrupar por', 'Grouper par'],
    'Break down by':     ['Aufschlüsseln nach', 'Desglosar por', 'Detalhar por', 'Ventiler par'],
    'No breakdown':      ['Keine Aufschlüsselung', 'Sin desglose', 'Sem detalhamento', 'Sans ventilation'],
    'Search':            ['Suchen', 'Buscar', 'Buscar', 'Rechercher'],
    'All groups':        ['Alle Gruppen', 'Todos los grupos', 'Todos os grupos', 'Tous les groupes'],
    'Instrument':        ['Instrument', 'Instrumento', 'Instrumento', 'Instrument'],
    'Start date':        ['Startdatum', 'Fecha de inicio', 'Data inicial', 'Date de début'],
    'Start time (UTC)':  ['Startzeit (UTC)', 'Hora de inicio (UTC)', 'Hora inicial (UTC)', 'Heure de début (UTC)'],
    'Length':            ['Länge', 'Duración', 'Duração', 'Durée'],
    'Timeframe':         ['Zeitebene', 'Marco temporal', 'Tempo gráfico', 'Unité de temps'],
    'Saved backtests':   ['Gespeicherte Backtests', 'Backtests guardados', 'Backtests salvos', 'Backtests enregistrés'],
    'Random date':       ['Zufälliges Datum', 'Fecha aleatoria', 'Data aleatória', 'Date aléatoire'],
    'Tick precision':    ['Tick-Genauigkeit', 'Precisión por tick', 'Precisão por tick', 'Précision au tick'],
    'Live candle':       ['Live-Kerze', 'Vela en vivo', 'Vela ao vivo', 'Bougie en direct'],
    'Go to':             ['Springe zu', 'Ir a', 'Ir para', 'Aller à'],
    'Next day':          ['Nächster Tag', 'Día siguiente', 'Próximo dia', 'Jour suivant'],
    'Balance':           ['Kontostand', 'Saldo', 'Saldo', 'Solde'],
    'Equity':            ['Equity', 'Equity', 'Equity', 'Equity'],
    'Profit':            ['Gewinn', 'Beneficio', 'Lucro', 'Bénéfice'],
    'Tightest Buffer':   ['Geringster Abstand', 'Margen más estrecho', 'Menor margem', 'Marge la plus faible'],
    'Payout':            ['Auszahlung', 'Retiro', 'Saque', 'Retrait'],
    'Payouts':           ['Auszahlungen', 'Retiros', 'Saques', 'Retraits'],
    'Fee':               ['Gebühr', 'Cuota', 'Taxa', 'Frais'],
    'Activation':        ['Freischaltung', 'Activación', 'Ativação', 'Activation'],
    'Outcome':           ['Ergebnis', 'Resultado', 'Resultado', 'Résultat'],
    'Passed':            ['Bestanden', 'Aprobado', 'Aprovado', 'Réussi'],
    'Failed':            ['Nicht bestanden', 'Suspendido', 'Reprovado', 'Échoué'],
    'Running':           ['Läuft', 'En curso', 'Em andamento', 'En cours'],
    'Consistency':       ['Konstanz', 'Consistencia', 'Consistência', 'Constance'],
    'Cycle start':       ['Zyklusbeginn', 'Inicio del ciclo', 'Início do ciclo', 'Début du cycle'],
    'Payout date':       ['Auszahlungstermin', 'Fecha de retiro', 'Data do saque', 'Date de retrait'],
    'Add':               ['Hinzufügen', 'Añadir', 'Adicionar', 'Ajouter'],
    'Filters':           ['Filter', 'Filtros', 'Filtros', 'Filtres'],
    'Presets':           ['Vorlagen', 'Plantillas', 'Modelos', 'Modèles'],
    'Members':           ['Mitglieder', 'Miembros', 'Membros', 'Membres'],
    'Channels':          ['Kanäle', 'Canales', 'Canais', 'Salons'],
    'Post':              ['Beitrag', 'Publicación', 'Publicação', 'Publication'],
    'Reply':             ['Antworten', 'Responder', 'Responder', 'Répondre'],
    'Pinned':            ['Angeheftet', 'Fijado', 'Fixado', 'Épinglé'],
    'Moderator':         ['Moderator', 'Moderador', 'Moderador', 'Modérateur'],
    'Admin':             ['Admin', 'Administrador', 'Administrador', 'Admin'],

    // ── prop firm & funded mode ──
    // Brazil is one of the largest prop-firm markets in the world and almost
    // nothing in this category is localised for it, so the Portuguese column
    // gets the same care as the German one rather than a literal rendering.
    'Funded mode':       ['Funded-Modus', 'Modo fondeado', 'Modo fundado', 'Mode financé'],
    'Start challenge':   ['Challenge starten', 'Iniciar el desafío', 'Iniciar o desafio', 'Démarrer le challenge'],
    'Start replay':      ['Replay starten', 'Iniciar la repetición', 'Iniciar o replay', 'Démarrer le replay'],
    'Challenge from here': ['Challenge ab hier', 'Desafío desde aquí', 'Desafio a partir daqui', 'Challenge à partir d’ici'],
    'Account size':      ['Kontogröße', 'Tamaño de la cuenta', 'Tamanho da conta', 'Taille du compte'],
    'Start balance':     ['Startkapital', 'Saldo inicial', 'Saldo inicial', 'Solde de départ'],
    'Profit Target':     ['Gewinnziel', 'Objetivo de beneficio', 'Meta de lucro', 'Objectif de gain'],
    'Trading Days':      ['Handelstage', 'Días operados', 'Dias operados', 'Jours de trading'],
    'Drawdown Floor':    ['Drawdown-Grenze', 'Límite de drawdown', 'Limite de drawdown', 'Plancher de drawdown'],
    'Buffer to Floor':   ['Abstand zur Grenze', 'Margen hasta el límite', 'Margem até o limite', 'Marge avant le plancher'],
    'Daily Loss Limit':  ['Tagesverlustlimit', 'Límite de pérdida diaria', 'Limite de perda diária', 'Limite de perte quotidienne'],
    'Would these trades have passed a challenge?':
      ['Hätten diese Trades eine Challenge bestanden?',
       '¿Estas operaciones habrían superado un desafío?',
       'Estas operações teriam passado em um desafio?',
       'Ces trades auraient-ils passé un challenge ?'],
    'You would have passed': ['Du hättest bestanden', 'Habrías aprobado', 'Você teria passado', 'Vous auriez réussi'],
    'You would have failed': ['Du wärst gescheitert', 'Habrías fallado', 'Você teria falhado', 'Vous auriez échoué'],

    // ── dashboards ──
    'Dashboards':        ['Dashboards', 'Paneles', 'Painéis', 'Tableaux de bord'],
    'Add widget':        ['Widget hinzufügen', 'Añadir widget', 'Adicionar widget', 'Ajouter un widget'],
    'Single number':     ['Einzelwert', 'Valor único', 'Valor único', 'Valeur unique'],
    'Bars':              ['Balken', 'Barras', 'Barras', 'Barres'],
    'Table':             ['Tabelle', 'Tabla', 'Tabela', 'Tableau'],
    'Rename':            ['Umbenennen', 'Renombrar', 'Renomear', 'Renommer'],
    'Reset':             ['Zurücksetzen', 'Restablecer', 'Redefinir', 'Réinitialiser'],
    'My dashboard':      ['Mein Dashboard', 'Mi panel', 'Meu painel', 'Mon tableau de bord'],

    // ── confluence ──
    'Single conditions': ['Einzelne Bedingungen', 'Condiciones individuales', 'Condições individuais', 'Conditions seules'],
    'Up to pairs':       ['Bis zu Paaren', 'Hasta pares', 'Até pares', 'Jusqu’aux paires'],
    'Up to triples':     ['Bis zu Dreiergruppen', 'Hasta tríos', 'Até trios', 'Jusqu’aux triplets'],
    'What helps most':   ['Was am meisten hilft', 'Lo que más ayuda', 'O que mais ajuda', 'Ce qui aide le plus'],
    'What costs most':   ['Was am meisten kostet', 'Lo que más cuesta', 'O que mais custa', 'Ce qui coûte le plus'],
    'Conditions':        ['Bedingungen', 'Condiciones', 'Condições', 'Conditions'],
    'Trades':            ['Trades', 'Operaciones', 'Operações', 'Trades'],
    'Win rate':          ['Trefferquote', 'Tasa de acierto', 'Taxa de acerto', 'Taux de réussite'],
    'Profit factor':     ['Profitfaktor', 'Factor de beneficio', 'Fator de lucro', 'Facteur de profit'],
    'Net':               ['Netto', 'Neto', 'Líquido', 'Net'],

    // ── export ──
    'Export to Notion':  ['Export nach Notion', 'Exportar a Notion', 'Exportar para o Notion', 'Exporter vers Notion'],
    'Export':            ['Exportieren', 'Exportar', 'Exportar', 'Exporter'],
    'Compare':           ['Vergleichen', 'Comparar', 'Comparar', 'Comparer'],
    'Save preset':       ['Vorlage speichern', 'Guardar plantilla', 'Salvar predefinição', 'Enregistrer le modèle'],

    // ── the sentences a new user meets first ──
    'Sign in':           ['Anmelden', 'Iniciar sesión', 'Entrar', 'Se connecter'],
    'Sign up':           ['Registrieren', 'Crear cuenta', 'Criar conta', 'S’inscrire'],
    'Log out':           ['Abmelden', 'Cerrar sesión', 'Sair', 'Se déconnecter'],
    'Skip':              ['Überspringen', 'Omitir', 'Pular', 'Passer'],
    'Continue':          ['Weiter', 'Continuar', 'Continuar', 'Continuer'],
    'Done':              ['Fertig', 'Listo', 'Concluído', 'Terminé'],
    'Back':              ['Zurück', 'Atrás', 'Voltar', 'Retour'],
    'Next':              ['Weiter', 'Siguiente', 'Próximo', 'Suivant'],
    'Loading…':          ['Wird geladen…', 'Cargando…', 'Carregando…', 'Chargement…'],
    'No trades yet':     ['Noch keine Trades', 'Aún no hay operaciones', 'Ainda não há operações', 'Aucun trade pour l’instant'],
    'Today':             ['Heute', 'Hoy', 'Hoje', 'Aujourd’hui'],
    'This week':         ['Diese Woche', 'Esta semana', 'Esta semana', 'Cette semaine'],
    'This month':        ['Dieser Monat', 'Este mes', 'Este mês', 'Ce mois-ci'],
    'All time':          ['Gesamt', 'Histórico', 'Desde o início', 'Depuis le début']
  };

  function lang(){
    /* Reuses whatever the existing language switch resolved to — there is
       one language setting in this app and this is not a second one. */
    var l = '';
    try { l = String(window.apexResolvedLang || document.documentElement.lang || '').toLowerCase(); } catch(e){}
    if (!l){
      try { l = String((window.apexLocale && window.apexLocale.lang) || '').toLowerCase(); } catch(e){}
    }
    l = l.split('-')[0];
    return LANGS.indexOf(l) >= 0 ? l : null;
  }

  /* Ganze Sätze stehen im HTML oft über mehrere Zeilen, eingerückt — im
     Textknoten steht dann „…automatically.\n          Anything unknown…".
     Ein Schlüsselvergleich Zeichen für Zeichen scheitert daran immer, und
     zwar unsichtbar: der Eintrag ist da, er greift nur nie. Deshalb wird für
     den Vergleich jede Folge von Leerraum auf ein Leerzeichen gebracht. */
  function norm(s){ return String(s).replace(/\s+/g, ' ').trim(); }
  function escHtml(s){
    return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; });
  }

  var _idx = null;
  function index(){
    if (_idx) return _idx;
    _idx = {};
    Object.keys(T).forEach(function(k){ _idx[norm(k)] = T[k]; });
    return _idx;
  }

  /* ── Sätze mit eingesetzten Zahlen ──
     „Occurred 13× on losing trades." entsteht zur Laufzeit; ein fertiger Satz
     als Schlüssel passt nie, weil die Zahl jedes Mal eine andere ist.

     Der Ausweg braucht KEINE Änderung am erzeugenden Code — und das ist der
     Punkt: die Sätze werden an Dutzenden Stellen in dieser Datei gebaut, und
     jede davon anzufassen wäre die Sorte Umbau, die Zahlen kaputt macht.
     Stattdessen werden hier im fertigen Text alle Zahlen durch {n} ersetzt,
     die Vorlage nachgeschlagen und die Zahlen anschließend der Reihe nach
     wieder eingesetzt. Die Zahl selbst wird nie übersetzt, sie wird
     durchgereicht — sie stammt aus dem Journal und bleibt, was sie ist. */
  var NUM_RE = /-?\d[\d.,]*/g;
  var _tidx = null;
  function tmplIndex(){
    if (_tidx) return _tidx;
    _tidx = {};
    Object.keys(T).forEach(function(k){
      if (k.indexOf('{n}') >= 0) _tidx[norm(k)] = T[k];
    });
    return _tidx;
  }
  function tmplLookup(text, code){
    var nums = [];
    var key = norm(text).replace(NUM_RE, function(m){ nums.push(m); return '{n}'; });
    if (!nums.length) return null;
    var row = tmplIndex()[key];
    if (!row) return null;
    var v = row[LANGS.indexOf(code)];
    if (!v) return null;
    var i = 0;
    return v.replace(/\{n\}/g, function(){
      var out = nums[i]; i++;
      return out === undefined ? '{n}' : out;
    });
  }

  /* ── Wörterbücher, die nur in einem Bereich gelten ──
     Die Landingpage braucht kurze Schlüssel wie „Plans" oder „check", die
     in der App etwas anderes heissen können. Ein Eintrag hier wirkt nur
     unterhalb von `sel` und hat dort Vorrang vor T. */
  var SCOPED = [];
  /* True when a hand-written scoped translation exists for this text at
     this place — the jargon/brand wrapper then leaves the node alone, so the
     authored sentence wins instead of a half-English, half-machine mix. */
  I.hasOwn = function(text, el){ try { return !!scopedRow(text, el); } catch (e) { return false; } };
  I.addScoped = function(sel, table){
    var idx = {}; Object.keys(table).forEach(function(k){ idx[norm(k)] = table[k]; });
    SCOPED.push({ sel: sel, idx: idx });
  };
  function scopedRow(text, el){
    if (!SCOPED.length || !el || !el.closest) return null;
    for (var i = 0; i < SCOPED.length; i++){
      if (el.closest(SCOPED[i].sel)){ var r = SCOPED[i].idx[norm(text)]; if (r) return r; }
    }
    return null;
  }
  function lookupAt(text, code, el){
    var r = scopedRow(text, el);
    /* Im Bereichs-Wörterbuch heißt „gleich wie das Original" absichtlich
       „so lassen": „Journal" und „Dashboard" sind auf Deutsch dieselben
       Wörter, Google machte daraus „Zeitschrift" und „Armaturenbrett".
       Der Treffer wird dadurch gesperrt statt an GT durchgereicht. */
    if (r){ var v = r[LANGS.indexOf(code)]; if (v) return v; }
    return lookup(text, code);
  }

  function lookup(text, code){
    var row = T[text] || index()[norm(text)];
    if (row){
      var v = row[LANGS.indexOf(code)];
      /* Gleich wie das Original heißt „so lassen" (24.10.2026): 'Trading',
         'Social', 'Team', 'Feed' stehen absichtlich unverändert im Wörterbuch.
         Vorher ging so ein Treffer still an Google und kam als „Handel" und
         „Soziale Medien" zurück. Jetzt wird er gesperrt. */
      return v ? v : null;
    }
    return tmplLookup(text, code);
  }

  /* Walks text nodes and swaps the ones we have authored. The replacement
     is wrapped in .notranslate for the same reason the jargon is: once a
     person has written the sentence, a machine must not rewrite it. */
  /* NUR SCHREIBEN, WENN SICH ETWAS AENDERT (30.09.2026).
     apply() laeuft ueber einen MutationObserver auf document.body. Jede
     Zuweisung an innerHTML/textContent ist selbst eine Mutation — auch wenn
     der Text gleich bleibt. Die Ueberschriften wurden deshalb alle 500 ms neu
     geschrieben, ohne Ende (gemessen: 12x in 6 s auf der Uebersicht), und
     Google Translate, das bei Deutsch zusaetzlich laeuft, sah jedes Mal
     frischen Text und liess „Performance-Übersicht" zwischen Deutsch und
     Englisch springen. Vergleichen, dann schreiben — und handuebersetzte
     Stellen fuer Google Translate sperren, damit es sie nicht nochmal
     anfasst. */
  function setHead(el, text){
    var words = text.split(' ');
    var last = words.pop();
    var gold = el.querySelector('span');
    var style = (gold && gold.getAttribute('style')) || 'color:var(--gold)';
    var html = escHtml(words.join(' ')) + (words.length ? ' ' : '') +
      '<span style="' + escHtml(style) + '">' + escHtml(last) + '</span>';
    if (el.innerHTML !== html) el.innerHTML = html;
  }
  function setText(el, text){ if (el.textContent !== text) el.textContent = text; }
  function setAttr(el, attr, v){ if (el.getAttribute(attr) !== v) el.setAttribute(attr, v); }
  function guard(el, on){
    if (on) {
      if (el.getAttribute('translate') !== 'no') el.setAttribute('translate', 'no');
      if (!el.classList.contains('notranslate')) el.classList.add('notranslate');
      el.setAttribute('data-i18n-guard', '1');
    } else if (el.hasAttribute('data-i18n-guard')) {
      // Nur die eigene Sperre zuruecknehmen, nie eine, die im HTML stand.
      el.removeAttribute('translate'); el.classList.remove('notranslate'); el.removeAttribute('data-i18n-guard');
    }
  }

  function apply(root){
    var code = lang();
    if (!document.createTreeWalker) return 0;
    root = root || document.body;

    /* Zurück auf Englisch — oder auf eine Sprache, für die es keine
       handgeschriebene Fassung gibt: dann muss das Original wieder her.
       Ohne das blieb nach „Portugiesisch → Englisch" alles portugiesisch
       stehen, weil ohne Sprachcode gar nichts mehr lief. Englisch ist die
       Quellsprache, das Original ist also immer die richtige Antwort. */
    if (!code){
      root.querySelectorAll('[data-i18n]').forEach(function(el){
        setText(el, el.getAttribute('data-i18n'));   // volles Original inkl. Leerraum
        guard(el, false);
      });
      root.querySelectorAll('[data-i18n-head]').forEach(function(el){
        setHead(el, el.getAttribute('data-i18n-head'));
        guard(el, false);
      });
      ['placeholder', 'title', 'aria-label'].forEach(function(attr){
        root.querySelectorAll('[data-i18n-' + attr + ']').forEach(function(el){
          setAttr(el, attr, el.getAttribute('data-i18n-' + attr));
        });
      });
      return 0;
    }
    var walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(n){
        var v = n.nodeValue;
        /* 90 Zeichen war die Grenze, solange nur Labels im Wörterbuch standen.
           Mit Stufe 2 stehen dort ganze Absätze — die längsten knapp 300.
           23.10.2026: 800, weil sechs Landing-Absätze (FAQ, Auftragsverarbeiter,
           Futures-Replay) darüber lagen und deshalb trotz Übersetzung an GT gingen. */
        if (!v || !v.trim() || v.length > 800) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        if (!T[v.trim()] && !index()[norm(v)] && !scopedRow(v, p) &&
            !tmplIndex()[norm(v).replace(NUM_RE, '{n}')]) return NodeFilter.FILTER_REJECT;
        if (!p) return NodeFilter.FILTER_REJECT;
        var t = p.nodeName;
        if (t==='SCRIPT'||t==='STYLE'||t==='TEXTAREA'||t==='TITLE') return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest('.notranslate,[translate="no"]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    /* Attribute zuerst: `placeholder`, `title` und `aria-label` sind sichtbarer
       Text, stehen aber in keinem Textknoten — der Walker unten sieht sie nie.
       Aufgefallen an „Trade Notes": im Wörterbuch, auf dem Bildschirm trotzdem
       englisch, weil es der Platzhalter eines Textfelds ist. Google Translate
       übersetzt Attribute übrigens auch, nur eben maschinell. */
    ['placeholder', 'title', 'aria-label'].forEach(function(attr){
      root.querySelectorAll('[' + attr + ']').forEach(function(el){
        var raw = el.getAttribute(attr);
        if (!raw) return;
        var t = lookupAt(raw.trim(), code, el);
        if (!t) return;
        /* Das Original merken, sonst kann ein zweiter Durchlauf nach einem
           Sprachwechsel die bereits übersetzte Fassung nicht mehr zuordnen. */
        if (!el.hasAttribute('data-i18n-' + attr)) el.setAttribute('data-i18n-' + attr, raw);
        setAttr(el, attr, raw.replace(raw.trim(), t));
      });
      // Beim Sprachwechsel vom gemerkten Original aus neu übersetzen.
      root.querySelectorAll('[data-i18n-' + attr + ']').forEach(function(el){
        var orig = el.getAttribute('data-i18n-' + attr);
        var t = lookupAt(String(orig).trim(), code, el);
        if (t) setAttr(el, attr, t);
      });
    });

    /* ── zweigeteilte Überschriften ──
       Die Seitentitel stehen im HTML als „Performance <span>Overview</span>",
       also in zwei Textknoten. Beide Hälften einzeln zu übersetzen ist genau
       der Fehler, aus dem Google Translate „Theaterbücher" gemacht hat — und
       der Wortschutz kann ein Wort nicht schützen, das er nie als Ganzes
       sieht. `data-i18n-head` trägt deshalb den vollständigen englischen
       Titel; übersetzt wird der Satz, und danach wird das LETZTE Wort golden
       gesetzt. Das letzte und nicht das zweite, weil die Wortstellung sich
       zwischen den Sprachen ändert — „Übersicht der Performance" hätte sonst
       das falsche Wort hervorgehoben. */
    root.querySelectorAll('[data-i18n-head]').forEach(function(el){
      var orig = el.getAttribute('data-i18n-head');
      var t = lookup(orig, code);
      if (!t) return;
      setHead(el, t);
      guard(el, true);
    });

    /* Zuerst alles neu übersetzen, was schon einmal übersetzt wurde — vom
       gemerkten Original aus, nicht vom sichtbaren Text. */
    root.querySelectorAll('[data-i18n]').forEach(function(el){
      var orig = el.getAttribute('data-i18n');
      var k = orig.trim();
      var t = lookupAt(k, code, el.parentNode || el);
      if (!t) return;
      // Exakt wie beim ersten Mal — samt Leerraum links und rechts.
      setText(el, orig.indexOf(k) >= 0 ? orig.replace(k, t) : t);
      guard(el, true);
    });

    var todo = [], n;
    while ((n = walk.nextNode())) todo.push(n);
    todo.forEach(function(node){
      var src = node.nodeValue, key = src.trim();
      var hit = lookupAt(key, code, node.parentNode);
      if (!hit) return;
      /* <option> cannot hold an element child, so the text is replaced in
         place there and the select is marked instead. */
      var p = node.parentNode;
      if (p && p.nodeName === 'OPTION'){
        p.setAttribute('translate','no');
        p.classList.add('notranslate');
        if (!p.hasAttribute('data-i18n')) p.setAttribute('data-i18n', src);
        node.nodeValue = src.replace(key, hit);
        return;
      }
      var sp = document.createElement('span');
      sp.className = 'notranslate';
      sp.setAttribute('translate','no');
      /* Das englische Original mitschreiben. Ohne das ist der Schlüssel nach
         der ersten Übersetzung verschwunden, und ein Sprachwechsel im
         laufenden Betrieb findet nichts mehr zu übersetzen — der Text bliebe
         in der zuvor gewählten Sprache stehen. Genau so gesehen: von
         Portugiesisch auf Französisch umgestellt, alles blieb portugiesisch. */
      /* Das VOLLE Original mitschreiben, nicht nur den getrimmten Schlüssel:
         der erneute Durchlauf unten baut daraus wieder auf, und mit dem
         getrimmten Schlüssel gingen dabei die angrenzenden Leerzeichen
         verloren. Genau so entstand „EvidencePontuação88" — der erste
         Durchlauf war richtig, der zweite hat es zusammengezogen. */
      sp.setAttribute('data-i18n', src);
      guard(sp, true);
      /* Bei einem normalisierten Treffer steht `key` so nicht im Text — dann
         wird der Knoten ganz ersetzt statt in ihm gesucht.

         Der führende und der abschließende Leerraum müssen dabei ERHALTEN
         bleiben. Ohne das klebte „Evidence Score 88" als „EvidencePontuação88"
         zusammen: das Leerzeichen stand im ersetzten Knoten, und das
         Zusammenziehen auf den reinen Treffer hat es geschluckt. Dieselbe
         Falle, gegen die der Markenschutz weiter oben das angrenzende
         Leerzeichen mit in seinen Block nimmt. */
      if (src.indexOf(key) >= 0) {
        sp.textContent = src.replace(key, hit);
      } else {
        var lead  = (src.match(/^\s*/) || [''])[0];
        var trail = (src.match(/\s*$/) || [''])[0];
        sp.textContent = lead + hit + trail;
      }
      if (p) p.replaceChild(sp, node);
    });
    return todo.length;
  }

  I.apply = apply;
  /* Prüft denselben Weg wie lookup(): exakt, normalisiert und über eine
     Zahlen-Vorlage. Vorher sah nur der exakte Schlüssel — womit jede
     Abdeckungsmessung zu schlecht ausfiel und mehrzeilige Texte sowie alle
     Vorlagen als „fehlt" gezählt wurden. */
  I.has   = function(s){
    if (!s) return false;
    var k = String(s).trim();
    if (T[k] || index()[norm(k)]) return true;
    return !!tmplIndex()[norm(k).replace(NUM_RE, '{n}')];
  };
  I.t     = function(s){ var c = lang(); return (c && lookup(s, c)) || s; };
  I.langs = LANGS.slice();
  I.size  = function(){ return Object.keys(T).length; };

  /* The app rebuilds whole views at runtime, so this runs on the same
     rhythm as the jargon protection rather than once at load. */
  function watch(){
    if (window._i18nWatching) return;
    window._i18nWatching = true;
    var queued = false;
    function run(){ queued = false; try { apply(); } catch(e){} }
    function schedule(){ if (queued) return; queued = true; setTimeout(run, 500); }
    try {
      new MutationObserver(schedule).observe(document.body,
        { childList:true, subtree:true, characterData:true });
    } catch(e){ setInterval(run, 2500); }
    run();
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(watch, 900); });
  else setTimeout(watch, 900);
})();
} catch (e) { try { console.error("lp-i18n", e); } catch (_) {} }

try {
(function () {
  'use strict';
  var LP = {
    // Prop-Sektion (07.10.2026) — handgeschrieben, weil Google „prop" zu
    // „Requisiten" und „Then pass." zu „Dann lassen Sie es." machte.
    'Built for prop challenges': ['Gebaut für Prop-Challenges', 'Hecho para challenges de prop firms', 'Feito para challenges de prop firms', 'Conçu pour les challenges de prop firms'],
    'Tell it your firm once.': ['Gib einmal deine Firma an.', 'Indica tu prop firm una vez.', 'Informe sua prop firm uma vez.', 'Indiquez votre prop firm une fois.'],
    'Then pass.': ['Dann bestehst du.', 'Y a aprobar.', 'Depois, é passar.', 'Puis réussissez.'],
    'Accounts are rarely lost to one bad trade. They are lost to a drawdown line that moved while you were looking at the chart. Pick your firm, size and phase — and every page of the app measures that account with the firm’s real rules.':
      ['Konten gehen selten an einem einzigen schlechten Trade verloren, sondern an einer Drawdown-Linie, die sich bewegt hat, während du auf den Chart geschaut hast. Wähle Firma, Größe und Phase — und jede Seite der App misst dieses Konto mit den echten Regeln der Firma.',
       'Las cuentas rara vez se pierden por una mala operación. Se pierden por una línea de drawdown que se movió mientras mirabas el gráfico. Elige tu firma, el tamaño y la fase, y cada página de la app mide esa cuenta con las reglas reales de la firma.',
       'Contas raramente se perdem por uma única operação ruim. Elas se perdem por uma linha de drawdown que se moveu enquanto você olhava o gráfico. Escolha sua firma, o tamanho e a fase — e cada página do app mede essa conta com as regras reais da firma.',
       'Un compte se perd rarement sur un seul mauvais trade. Il se perd sur une ligne de drawdown qui a bougé pendant que vous regardiez le graphique. Choisissez votre firme, la taille et la phase — et chaque page de l’app mesure ce compte avec les vraies règles de la firme.'],
    'The rules your firm actually uses': ['Die Regeln, die deine Firma wirklich anwendet', 'Las reglas que tu firma aplica de verdad', 'As regras que sua firma realmente aplica', 'Les règles que votre firme applique vraiment'],
    'Static, end-of-day or intraday trailing drawdown, a floor that stops at your starting balance where the firm does that, the daily limit on the firm’s own clock, the consistency rule and minimum days.':
      ['Statischer, Tagesende- oder Intraday-Trailing-Drawdown, eine Grenze, die beim Startguthaben stehen bleibt, wo die Firma das so macht, das Tageslimit nach der Uhr der Firma, die Konsistenzregel und Mindesttage.',
       'Drawdown estático, trailing al cierre del día o intradía, un límite que se detiene en tu saldo inicial cuando la firma lo hace así, el límite diario según el reloj de la firma, la regla de consistencia y los días mínimos.',
       'Drawdown estático, trailing no fim do dia ou intradiário, um limite que para no seu saldo inicial quando a firma faz assim, o limite diário pelo relógio da firma, a regra de consistência e os dias mínimos.',
       'Drawdown statique, trailing en fin de journée ou intraday, un plancher qui s’arrête à votre solde de départ quand la firme fonctionne ainsi, la limite journalière selon l’horloge de la firme, la règle de consistance et les jours minimum.'],
    'Each preset carries the date its rules were checked. Any other firm works with your own numbers.':
      ['Jede Vorlage trägt das Datum, an dem ihre Regeln geprüft wurden. Jede andere Firma funktioniert mit deinen eigenen Zahlen.',
       'Cada plantilla lleva la fecha en que se revisaron sus reglas. Cualquier otra firma funciona con tus propios números.',
       'Cada modelo traz a data em que as regras foram conferidas. Qualquer outra firma funciona com os seus próprios números.',
       'Chaque modèle porte la date de vérification de ses règles. Toute autre firme fonctionne avec vos propres chiffres.'],
    'On every page': ['Auf jeder Seite', 'En cada página', 'Em cada página', 'Sur chaque page'],
    'A bar under the navigation shows the distance to the floor and the room left today. The overview opens with your challenge, and a trade card warns when its stop would take most of today’s room.':
      ['Eine Leiste unter der Navigation zeigt den Abstand zur Grenze und den Spielraum für heute. Die Übersicht beginnt mit deiner Challenge, und eine Trade-Karte warnt, wenn ihr Stop den Großteil des heutigen Spielraums kosten würde.',
       'Una barra bajo la navegación muestra la distancia al límite y el margen que te queda hoy. El resumen empieza con tu challenge, y la ficha de una operación avisa cuando su stop se llevaría casi todo el margen de hoy.',
       'Uma barra abaixo da navegação mostra a distância até o limite e a margem que resta hoje. A visão geral começa com o seu challenge, e o card de uma operação avisa quando o stop consumiria quase toda a margem de hoje.',
       'Une barre sous la navigation affiche la distance au plancher et la marge restante du jour. L’aperçu s’ouvre sur votre challenge, et une fiche de trade vous prévient quand son stop prendrait l’essentiel de la marge du jour.'],
    'A stop before the firm’s': ['Ein Stopp vor dem der Firma', 'Un stop antes que el de la firma', 'Um stop antes do da firma', 'Un stop avant celui de la firme'],
    'Your personal stop sits at half the firm’s daily limit unless you choose otherwise. You end a bad day with room to spare, not at the line.':
      ['Dein persönlicher Stopp liegt bei der Hälfte des Tageslimits der Firma, wenn du nichts anderes wählst. Ein schlechter Tag endet mit Luft, nicht an der Linie.',
       'Tu stop personal está en la mitad del límite diario de la firma, salvo que elijas otra cosa. Un mal día termina con margen de sobra, no en la línea.',
       'Seu stop pessoal fica na metade do limite diário da firma, a menos que você escolha outro valor. Um dia ruim termina com folga, não na linha.',
       'Votre stop personnel se situe à la moitié de la limite journalière de la firme, sauf si vous en décidez autrement. Une mauvaise journée se termine avec de la marge, pas sur la ligne.'],
    'Phases, and the moment you pass': ['Phasen — und der Moment, in dem du bestehst', 'Fases, y el momento en que apruebas', 'Fases, e o momento em que você passa', 'Les phases, et le moment où vous réussissez'],
    'Phase 1, Phase 2, funded — each with its own target. When every condition is met, the app says so. When a rule breaks, it names the rule and the day.':
      ['Phase 1, Phase 2, Funded — jede mit ihrem eigenen Ziel. Sind alle Bedingungen erfüllt, sagt die App es dir. Wird eine Regel verletzt, nennt sie die Regel und den Tag.',
       'Fase 1, fase 2, funded: cada una con su propio objetivo. Cuando se cumplen todas las condiciones, la app te lo dice. Cuando se rompe una regla, te dice cuál y qué día.',
       'Fase 1, fase 2, funded — cada uma com sua própria meta. Quando todas as condições são cumpridas, o app avisa. Quando uma regra é quebrada, ele diz qual e em que dia.',
       'Phase 1, phase 2, funded — chacune avec son propre objectif. Quand toutes les conditions sont remplies, l’app vous le dit. Quand une règle est enfreinte, elle indique laquelle et quel jour.'],
    'Would you have passed?': ['Hättest du bestanden?', '¿Habrías aprobado?', 'Você teria passado?', 'Auriez-vous réussi ?'],
    'Run your existing trades against any of the presets. Everything after the first breach is ignored — in a real challenge the account would already be closed.':
      ['Lass deine bisherigen Trades gegen jede der Vorlagen laufen. Alles nach dem ersten Verstoß zählt nicht — in einer echten Challenge wäre das Konto dann schon geschlossen.',
       'Pasa tus operaciones actuales por cualquiera de las plantillas. Todo lo que viene después de la primera infracción se ignora: en un challenge real la cuenta ya estaría cerrada.',
       'Rode suas operações atuais contra qualquer um dos modelos. Tudo depois da primeira violação é ignorado — num challenge real a conta já estaria fechada.',
       'Faites passer vos trades existants par n’importe quel modèle. Tout ce qui suit la première infraction est ignoré — dans un vrai challenge, le compte serait déjà clôturé.'],
    'See a running challenge in the demo ↗': ['Laufende Challenge in der Demo ansehen ↗', 'Ver un challenge en curso en la demo ↗', 'Ver um challenge em andamento na demo ↗', 'Voir un challenge en cours dans la démo ↗'],
    // Navigation
    'Live Demo':       ['Live-Demo', 'Demo en vivo', 'Demo ao vivo', 'Démo en direct'],
    'Features':        ['Funktionen', 'Funciones', 'Recursos', 'Fonctionnalités'],
    'Replay':          ['Replay', 'Replay', 'Replay', 'Replay'],
    'AI':              ['KI', 'IA', 'IA', 'IA'],
    'Pricing':         ['Preise', 'Precios', 'Preços', 'Tarifs'],
    'Login':           ['Anmelden', 'Iniciar sesión', 'Entrar', 'Connexion'],
    // Hero
    'Professional Trading Intelligence': ['Professionelle Trading-Analyse', 'Análisis profesional de trading', 'Análise profissional de trading', 'Analyse de trading professionnelle'],
    'The trading journal that fills itself': ['Das Trading-Journal, das sich selbst füllt', 'El diario de trading que se llena solo', 'O diário de trading que se preenche sozinho', 'Le journal de trading qui se remplit tout seul'],
    'Auto-synced from your broker, quant analytics and market replay — in one place.': [
      'Automatisch von deinem Broker synchronisiert, Quant-Analysen und Market Replay – an einem Ort.',
      'Sincronizado con tu bróker, análisis cuantitativo y market replay, todo en un solo lugar.',
      'Sincronizado com sua corretora, análise quantitativa e market replay — tudo em um só lugar.',
      'Synchronisé avec votre courtier, analyses quantitatives et market replay — au même endroit.'],
    'Other journals show you what happened.': ['Andere Journale zeigen dir, was passiert ist.', 'Otros diarios te muestran lo que pasó.', 'Outros diários mostram o que aconteceu.', 'Les autres journaux vous montrent ce qui s’est passé.'],
    'Evidence measures whether you changed.': ['Evidence misst, ob du dich verändert hast.', 'Evidence mide si has cambiado.', 'O Evidence mede se você mudou.', 'Evidence mesure si vous avez changé.'],
    'measures whether you changed.': ['misst, ob du dich verändert hast.', 'mide si has cambiado.', 'mede se você mudou.', 'mesure si vous avez changé.'],
    'See it live ↓':   ['Live ansehen ↓', 'Verlo en vivo ↓', 'Ver ao vivo ↓', 'Voir en direct ↓'],
    // Live-Demo
    'See it working':  ['So sieht es aus', 'Míralo en acción', 'Veja funcionando', 'Voyez-le en action'],
    'The real app,':   ['Die echte App,', 'La app real,', 'O app de verdade,', 'La vraie application,'],
    'running right here': ['direkt hier im Browser', 'funcionando aquí mismo', 'rodando aqui mesmo', 'qui tourne ici même'],
    'Start the interactive demo': ['Interaktive Demo starten', 'Iniciar la demo interactiva', 'Iniciar a demo interativa', 'Lancer la démo interactive'],
    'Open the full demo ↗': ['Ganze Demo öffnen ↗', 'Abrir la demo completa ↗', 'Abrir a demo completa ↗', 'Ouvrir la démo complète ↗'],
    'Create free account →': ['Kostenloses Konto erstellen →', 'Crear cuenta gratis →', 'Criar conta grátis →', 'Créer un compte gratuit →'],
    'Try before you trust': ['Erst testen, dann vertrauen', 'Pruébalo antes de confiar', 'Teste antes de confiar', 'Essayez avant de faire confiance'],
    '7 days Pro, no card': ['7 Tage Pro, ohne Karte', '7 días de Pro, sin tarjeta', '7 dias de Pro, sem cartão', '7 jours de Pro, sans carte'],
    'Your journal stays yours': ['Dein Journal bleibt deins', 'Tu diario sigue siendo tuyo', 'Seu diário continua seu', 'Votre journal reste à vous'],
    // Über
    'What is': ['Was ist', 'Qué es', 'O que é', 'Qu’est-ce que'],
    // Funktionen
    'Capabilities':    ['Funktionen', 'Capacidades', 'Recursos', 'Capacités'],
    // „Key <em>Features</em>“ = zwei Textknoten → ergibt „Die wichtigsten Funktionen“, „Principales Funciones“ …
    'Importing your trades': ['Deine Trades importieren', 'Importar tus operaciones', 'Importar suas operações', 'Importer vos trades'],
    'without typing them': ['ohne sie abzutippen', 'sin escribirlas a mano', 'sem digitá-las', 'sans les saisir'],
    'Your trading journal': ['Dein Trading-Journal', 'Tu diario de trading', 'Seu diário de trading', 'Votre journal de trading'],
    'the part you actually sit in every evening': ['der Teil, in dem du jeden Abend sitzt', 'la parte en la que te sientas cada noche', 'a parte em que você se senta toda noite', 'la partie où vous passez chaque soirée'],
    'Where your edge really is': ['Wo dein Vorteil wirklich liegt', 'Dónde está de verdad tu ventaja', 'Onde está de verdade sua vantagem', 'Où se trouve vraiment votre avantage'],
    'numbers, not impressions': ['Zahlen statt Eindrücke', 'números, no impresiones', 'números, não impressões', 'des chiffres, pas des impressions'],
    'The part that loses the money': ['Der Teil, der das Geld verliert', 'La parte que pierde el dinero', 'A parte que perde o dinheiro', 'La partie qui perd l’argent'],
    'you, on a bad day': ['du, an einem schlechten Tag', 'tú, en un mal día', 'você, num dia ruim', 'vous, un mauvais jour'],
    'Not on your own': ['Nicht allein', 'No estás solo', 'Você não está sozinho', 'Pas seul'],
    'and the small tools around it': ['und die kleinen Werkzeuge drumherum', 'y las pequeñas herramientas a su alrededor', 'e as pequenas ferramentas em volta', 'et les petits outils autour'],
    'Live Auto-Tracking': ['Live-Auto-Tracking', 'Seguimiento automático en vivo', 'Rastreamento automático ao vivo', 'Suivi automatique en direct'],
    'Crypto — direct connection': ['Krypto – direkte Verbindung', 'Cripto: conexión directa', 'Cripto — conexão direta', 'Crypto — connexion directe'],
    'Academy':         ['Academy', 'Academia', 'Academia', 'Académie'],
    'Set up in three steps': ['In drei Schritten eingerichtet', 'Configurado en tres pasos', 'Configurado em três passos', 'Configuré en trois étapes'],
    'Structured trading journal': ['Strukturiertes Trading-Journal', 'Diario de trading estructurado', 'Diário de trading estruturado', 'Journal de trading structuré'],
    'An AI coach that reads your journal': ['Ein KI-Coach, der dein Journal liest', 'Un coach de IA que lee tu diario', 'Um coach de IA que lê seu diário', 'Un coach IA qui lit votre journal'],
    // Schlagwörter
    'Learn':           ['Lernen', 'Aprender', 'Aprender', 'Apprendre'],
    'Guided start':    ['Geführter Start', 'Inicio guiado', 'Início guiado', 'Démarrage guidé'],
    'Read-only keys':  ['Nur-Lese-Schlüssel', 'Claves de solo lectura', 'Chaves somente leitura', 'Clés en lecture seule'],
    '4 platforms':     ['4 Plattformen', '4 plataformas', '4 plataformas', '4 plateformes'],
    'Routine':         ['Routine', 'Rutina', 'Rotina', 'Routine'],
    'Less admin':      ['Weniger Verwaltung', 'Menos trabajo manual', 'Menos trabalho manual', 'Moins d’administratif'],
    'Analytics':       ['Analyse', 'Análisis', 'Análise', 'Analyse'],
    'Reports':         ['Berichte', 'Informes', 'Relatórios', 'Rapports'],
    'Discipline':      ['Disziplin', 'Disciplina', 'Disciplina', 'Discipline'],
    'Tools':           ['Werkzeuge', 'Herramientas', 'Ferramentas', 'Outils'],
    // Replay
    "Practise, don't guess": ['Üben statt raten', 'Practica, no adivines', 'Pratique, não adivinhe', 'Entraînez-vous, ne devinez pas'],
    'Trade a day that': ['Handle einen Tag, der', 'Opera un día que', 'Opere um dia que', 'Tradez une journée qui'],
    'already happened': ['schon vorbei ist', 'ya ocurrió', 'já aconteceu', 'a déjà eu lieu'],
    'Not a simulator with made-up prices': ['Kein Simulator mit erfundenen Kursen', 'No es un simulador con precios inventados', 'Não é um simulador com preços inventados', 'Pas un simulateur aux prix inventés'],
    'Manage it like a real position': ['Wie eine echte Position verwalten', 'Gestiónala como una posición real', 'Gerencie como uma posição real', 'Gérez-la comme une vraie position'],
    'It admits what it cannot know': ['Es sagt, was es nicht wissen kann', 'Admite lo que no puede saber', 'Admite o que não pode saber', 'Il admet ce qu’il ne peut pas savoir'],
    'Study it properly': ['Gründlich studieren', 'Estúdialo a fondo', 'Estude com calma', 'Étudiez-le à fond'],
    'Set the same day for someone else': ['Denselben Tag für jemand anderen stellen', 'Prepara el mismo día para otra persona', 'Prepare o mesmo dia para outra pessoa', 'Proposez la même journée à quelqu’un d’autre'],
    'Open Market Replay in the demo ↗': ['Market Replay in der Demo öffnen ↗', 'Abrir Market Replay en la demo ↗', 'Abrir o Market Replay na demo ↗', 'Ouvrir Market Replay dans la démo ↗'],
    'See plans ↓':     ['Preise ansehen ↓', 'Ver planes ↓', 'Ver planos ↓', 'Voir les offres ↓'],
    // Academy
    'Learn, then prove it changed': ['Lernen – und dann belegen, dass es wirkt', 'Aprende y demuestra que cambió', 'Aprenda e comprove que mudou', 'Apprenez, puis prouvez que ça a changé'],
    'The only trading course that can': ['Der einzige Trading-Kurs, der', 'El único curso de trading que puede', 'O único curso de trading que consegue', 'Le seul cours de trading qui peut'],
    'check':           ['prüft,', 'comprobar', 'verificar', 'vérifier'],
    'whether it worked': ['ob er gewirkt hat', 'si funcionó', 'se funcionou', 's’il a fonctionné'],
    'Your own numbers under every chapter': ['Deine eigenen Zahlen unter jedem Kapitel', 'Tus propios números en cada capítulo', 'Seus próprios números em cada capítulo', 'Vos propres chiffres sous chaque chapitre'],
    'One commitment per chapter': ['Ein Vorsatz pro Kapitel', 'Un compromiso por capítulo', 'Um compromisso por capítulo', 'Un engagement par chapitre'],
    'Your strategy, written up as a book': ['Deine Strategie, als Buch aufgeschrieben', 'Tu estrategia, escrita como un libro', 'Sua estratégia, escrita como um livro', 'Votre stratégie, rédigée comme un livre'],
    // Spaces
    'For mentors and groups': ['Für Mentoren und Gruppen', 'Para mentores y grupos', 'Para mentores e grupos', 'Pour les mentors et les groupes'],
    'A board that ranks process, not profit': ['Eine Rangliste für Prozess statt Gewinn', 'Un ranking de proceso, no de beneficio', 'Um ranking de processo, não de lucro', 'Un classement du processus, pas du profit'],
    "Nobody's journal is visible by default": ['Kein Journal ist von sich aus sichtbar', 'Ningún diario es visible por defecto', 'Nenhum diário é visível por padrão', 'Aucun journal n’est visible par défaut'],
    'Publish your playbooks and courses': ['Veröffentliche deine Playbooks und Kurse', 'Publica tus playbooks y cursos', 'Publique seus playbooks e cursos', 'Publiez vos playbooks et vos cours'],
    'Who has gone quiet': ['Wer still geworden ist', 'Quién se ha quedado callado', 'Quem ficou em silêncio', 'Qui s’est tu'],
    // KI
    'One system, not seven features': ['Ein System, nicht sieben Funktionen', 'Un sistema, no siete funciones', 'Um sistema, não sete recursos', 'Un système, pas sept fonctionnalités'],
    'and never does the maths': ['und rechnet nie selbst', 'y nunca hace los cálculos', 'e nunca faz as contas', 'et ne fait jamais les calculs'],
    'What it does today': ['Was sie heute kann', 'Lo que hace hoy', 'O que ela faz hoje', 'Ce qu’elle fait aujourd’hui'],
    'Warns you while it is still avoidable': ['Warnt dich, solange es noch vermeidbar ist', 'Te avisa cuando aún se puede evitar', 'Avisa enquanto ainda dá para evitar', 'Vous prévient tant que c’est encore évitable'],
    'Turns plain words into testable rules': ['Macht aus einfachen Worten prüfbare Regeln', 'Convierte palabras sencillas en reglas comprobables', 'Transforma palavras simples em regras testáveis', 'Transforme des mots simples en règles testables'],
    'Tags, writes and explains': ['Taggt, schreibt und erklärt', 'Etiqueta, escribe y explica', 'Marca, escreve e explica', 'Tague, rédige et explique'],
    'Says when it does not know': ['Sagt, wenn sie es nicht weiss', 'Dice cuando no lo sabe', 'Diz quando não sabe', 'Dit quand elle ne sait pas'],
    'Where your data goes:': ['Wohin deine Daten gehen:', 'Adónde van tus datos:', 'Para onde vão seus dados:', 'Où vont vos données :'],
    // Kundenstimmen
    'From people who use it': ['Von Leuten, die es nutzen', 'De quienes lo usan', 'De quem usa', 'Par ceux qui l’utilisent'],
    'What traders':    ['Was Trader', 'Lo que los traders', 'O que os traders', 'Ce que les traders'],
    'actually say':    ['wirklich sagen', 'dicen de verdad', 'realmente dizem', 'en disent vraiment'],
    // Umzug
    'Coming from another journal': ['Du kommst von einem anderen Journal?', '¿Vienes de otro diario?', 'Vem de outro diário?', 'Vous venez d’un autre journal ?'],
    'Bring your history with you.': ['Nimm deine Historie mit.', 'Trae tu historial contigo.', 'Traga seu histórico.', 'Emportez votre historique.'],
    'Your data stays yours.': ['Deine Daten bleiben deine.', 'Tus datos siguen siendo tuyos.', 'Seus dados continuam seus.', 'Vos données restent les vôtres.'],
    'Export from your current app': ['Aus deiner bisherigen App exportieren', 'Exporta desde tu app actual', 'Exporte do seu app atual', 'Exportez depuis votre application actuelle'],
    'Upload the file': ['Datei hochladen', 'Sube el archivo', 'Envie o arquivo', 'Importez le fichier'],
    'Review before importing': ['Vor dem Import prüfen', 'Revisa antes de importar', 'Revise antes de importar', 'Vérifiez avant d’importer'],
    'You can take all of your data with you': ['Du kannst alle deine Daten mitnehmen', 'Puedes llevarte todos tus datos', 'Você pode levar todos os seus dados', 'Vous pouvez emporter toutes vos données'],
    'Full backup as JSON': ['Vollständige Sicherung als JSON', 'Copia completa en JSON', 'Backup completo em JSON', 'Sauvegarde complète en JSON'],
    'CSV, PDF and Notion': ['CSV, PDF und Notion', 'CSV, PDF y Notion', 'CSV, PDF e Notion', 'CSV, PDF et Notion'],
    'Read-only API':   ['Nur-Lese-API', 'API de solo lectura', 'API somente leitura', 'API en lecture seule'],
    'Delete everything': ['Alles löschen', 'Borrar todo', 'Apagar tudo', 'Tout supprimer'],
    // Preise
    'Plans':           ['Tarife', 'Planes', 'Planos', 'Offres'],
    'Start Free.':     ['Kostenlos starten.', 'Empieza gratis.', 'Comece grátis.', 'Commencez gratuitement.'],
    'Go Pro.':         ['Wechsle zu Pro.', 'Pásate a Pro.', 'Vá de Pro.', 'Passez à Pro.'],
    'Free Forever':    ['Für immer kostenlos', 'Gratis para siempre', 'Grátis para sempre', 'Gratuit pour toujours'],
    '/ month':         ['/ Monat', '/ mes', '/ mês', '/ mois'],
    'Everything in Free': ['Alles aus Free', 'Todo lo de Free', 'Tudo do Free', 'Tout ce qu’il y a dans Free'],
    // Founding traders
    'Founding traders': ['Gründungs-Trader', 'Traders fundadores', 'Traders fundadores', 'Traders fondateurs'],
    'Help build it.':  ['Bau es mit auf.', 'Ayúdanos a construirlo.', 'Ajude a construir.', 'Aidez à le construire.'],
    'Get Pro for three months.': ['Drei Monate Pro geschenkt.', 'Consigue Pro durante tres meses.', 'Ganhe três meses de Pro.', 'Obtenez Pro pendant trois mois.'],
    // FAQ
    'Questions':       ['Fragen', 'Preguntas', 'Perguntas', 'Questions'],
    'before you sign up': ['vor der Anmeldung', 'antes de registrarte', 'antes de se cadastrar', 'avant de vous inscrire'],
    'Which brokers and platforms can I connect?': ['Welche Broker und Plattformen kann ich verbinden?', '¿Qué brókers y plataformas puedo conectar?', 'Quais corretoras e plataformas posso conectar?', 'Quels courtiers et plateformes puis-je connecter ?'],
    'Is there a free plan?': ['Gibt es einen kostenlosen Tarif?', '¿Hay un plan gratuito?', 'Existe um plano gratuito?', 'Existe-t-il une offre gratuite ?'],
    'How does the trial work?': ['Wie funktioniert die Testphase?', '¿Cómo funciona la prueba?', 'Como funciona o teste?', 'Comment fonctionne l’essai ?'],
    'How do I cancel a subscription?': ['Wie kündige ich ein Abo?', '¿Cómo cancelo una suscripción?', 'Como cancelo uma assinatura?', 'Comment résilier un abonnement ?'],
    'I already use another trading journal. Can I import my trade history?': ['Ich nutze schon ein anderes Trading-Journal. Kann ich meine Trade-Historie importieren?', 'Ya uso otro diario de trading. ¿Puedo importar mi historial de operaciones?', 'Já uso outro diário de trading. Posso importar meu histórico de operações?', 'J’utilise déjà un autre journal de trading. Puis-je importer mon historique ?'],
    'Who can see my journal?': ['Wer kann mein Journal sehen?', '¿Quién puede ver mi diario?', 'Quem pode ver meu diário?', 'Qui peut voir mon journal ?'],
    'Is there a mobile app?': ['Gibt es eine App fürs Handy?', '¿Hay una app móvil?', 'Existe um app para celular?', 'Existe-t-il une application mobile ?'],
    'Does the AI make numbers up?': ['Erfindet die KI Zahlen?', '¿La IA se inventa números?', 'A IA inventa números?', 'L’IA invente-t-elle des chiffres ?'],
    'Which markets can I replay?': ['Welche Märkte kann ich im Replay handeln?', '¿Qué mercados puedo reproducir?', 'Quais mercados posso reproduzir no replay?', 'Quels marchés puis-je rejouer ?'],
    // Abschluss
    'Stop guessing.':  ['Hör auf zu raten.', 'Deja de adivinar.', 'Pare de adivinhar.', 'Arrêtez de deviner.'],
    'Start measuring.': ['Fang an zu messen.', 'Empieza a medir.', 'Comece a medir.', 'Commencez à mesurer.'],
    // Überarbeitung 18.10.2026 — neue und umbenannte Texte (Satzschreibung,
    // Preise mit Jahr/Lifetime, Sicherheitsbereich für alle Verbindungen).
    // Umbenannte Schlüssel behalten die bisherige Übersetzung.
    "Read-only broker access": ["Broker-Zugriff nur lesend", "Acceso de solo lectura al bróker", "Acesso somente leitura à corretora", "Accès courtier en lecture seule"],
    "No trade execution": ["Keine Orderausführung", "Sin ejecución de órdenes", "Sem execução de ordens", "Aucune exécution d’ordres"],
    "A journal built for": ["Ein Journal für", "Un diario hecho para", "Um diário feito para", "Un journal conçu pour"],
    "serious traders": ["ernsthafte Trader", "traders serios", "traders sérios", "les traders sérieux"],
    "Trades placed or modified": ["Trades platziert oder geändert", "Operaciones abiertas o modificadas", "Operações abertas ou alteradas", "Trades passés ou modifiés"],
    "Days Pro, no card": ["Tage Pro, ohne Karte", "días de Pro, sin tarjeta", "dias de Pro, sem cartão", "jours de Pro, sans carte"],
    "Calendar, setups & playbooks": ["Kalender, Setups & Playbooks", "Calendario, setups y playbooks", "Calendário, setups e playbooks", "Calendrier, setups et playbooks"],
    "Auto-tagging & chart frames": ["Auto-Tagging & Chart-Rahmen", "Etiquetado automático y marcos de gráfico", "Tags automáticas e quadros de gráfico", "Tags automatiques et cadres de graphique"],
    "Dashboard & statistics": ["Dashboard & Statistik", "Panel y estadísticas", "Painel e estatísticas", "Tableau de bord et statistiques"],
    "Reports you can send": ["Berichte zum Weitergeben", "Informes que puedes enviar", "Relatórios que você pode enviar", "Des rapports à partager"],
    "A warning before, a grade after": ["Vorher eine Warnung, danach eine Note", "Un aviso antes, una nota después", "Um aviso antes, uma nota depois", "Un avertissement avant, une note après"],
    "Psychology & rules": ["Psychologie & Regeln", "Psicología y reglas", "Psicologia e regras", "Psychologie et règles"],
    "Mentor & team mode": ["Mentor- & Team-Modus", "Modo mentor y equipo", "Modo mentor e equipe", "Mode mentor et équipe"],
    "Community & your language": ["Community & deine Sprache", "Comunidad y tu idioma", "Comunidade e seu idioma", "Communauté et votre langue"],
    "The rest of the desk": ["Rund um den Handelstisch", "Todo lo demás de tu mesa", "O resto da sua mesa", "Le reste de votre bureau"],
    "Start free": ["Kostenlos starten", "Empezar gratis", "Começar grátis", "Commencer gratuitement"],
    "Apply for a founding place →": ["Um einen Gründungsplatz bewerben →", "Solicitar una plaza fundadora →", "Candidatar-se a uma vaga fundadora →", "Postuler pour une place fondatrice →"],
    "Open the live demo ↗": ["Live-Demo öffnen ↗", "Abrir la demo en vivo ↗", "Abrir a demo ao vivo ↗", "Ouvrir la démo en direct ↗"],
    "Prop": ["Prop", "Prop", "Prop", "Prop"],
    "Start free →": ["Kostenlos starten →", "Empezar gratis →", "Começar grátis →", "Commencer gratuitement →"],
    "— trades from your phone, journalled automatically": ["— Trades vom Handy, automatisch im Journal", "— operaciones desde el móvil, registradas automáticamente", "— operações do celular, registradas automaticamente", "— vos trades depuis le téléphone, journalisés automatiquement"],
    "Brokers & prop firms": ["Broker & Prop-Firmen", "Brókers y prop firms", "Corretoras e prop firms", "Courtiers et prop firms"],
    "Replay instruments": ["Instrumente im Replay", "Instrumentos en el replay", "Instrumentos no replay", "Instruments en replay"],
    "What it": ["Was es", "Lo que", "O que", "Ce qu’il"],
    "does": ["kann", "hace", "faz", "fait"],
    "Everything else: import a statement": ["Alles andere: Kontoauszug importieren", "Todo lo demás: importa un extracto", "Todo o resto: importe um extrato", "Tout le reste : importez un relevé"],
    "Multi-account": ["Mehrere Konten", "Multicuenta", "Multicontas", "Multi-comptes"],
    "Free": ["Kostenlos", "Gratis", "Grátis", "Gratuit"],
    "Edge Lab & Strategy Lab": ["Edge Lab & Strategy Lab", "Edge Lab y Strategy Lab", "Edge Lab e Strategy Lab", "Edge Lab et Strategy Lab"],
    "Start 7 days Pro — no card →": ["7 Tage Pro starten — ohne Karte →", "Empezar 7 días de Pro, sin tarjeta →", "Começar 7 dias de Pro — sem cartão →", "Démarrer 7 jours de Pro — sans carte →"],
    "one challenge, with everything above.": ["eine Challenge, mit allem oben Genannten.", "un challenge, con todo lo anterior.", "um challenge, com tudo o que está acima.", "un challenge, avec tout ce qui précède."],
    "several at once, each with its own rules; phases and a payout tracker; what each challenge cost and paid; what ended the failed ones; and the largest size your stop allows today, on the chart.": ["mehrere gleichzeitig, jede mit eigenen Regeln; Phasen und ein Auszahlungs-Tracker; was jede Challenge gekostet und eingebracht hat; woran die gescheiterten endeten; und die größte Positionsgröße, die dein Stop heute erlaubt, direkt im Chart.", "varios a la vez, cada uno con sus propias reglas; fases y un registro de pagos; lo que costó y pagó cada challenge; qué hizo fracasar a los fallidos; y el tamaño máximo que tu stop permite hoy, en el gráfico.", "vários ao mesmo tempo, cada um com suas próprias regras; fases e um controle de pagamentos; quanto cada challenge custou e pagou; o que encerrou os que falharam; e o maior tamanho que seu stop permite hoje, no gráfico.", "plusieurs à la fois, chacun avec ses propres règles ; les phases et un suivi des paiements ; ce que chaque challenge a coûté et rapporté ; ce qui a mis fin aux challenges échoués ; et la taille maximale que votre stop autorise aujourd’hui, sur le graphique."],
    "Not affiliated with any prop firm — check the rules against your own contract.": ["Keine Verbindung zu einer Prop-Firma — prüfe die Regeln an deinem eigenen Vertrag.", "Sin afiliación con ninguna prop firm: comprueba las reglas con tu propio contrato.", "Sem afiliação com nenhuma prop firm — confira as regras no seu próprio contrato.", "Aucune affiliation avec une prop firm — vérifiez les règles dans votre propre contrat."],
    "7 days free · no card": ["7 Tage gratis · ohne Karte", "7 días gratis · sin tarjeta", "7 dias grátis · sem cartão", "7 jours gratuits · sans carte"],
    "Monthly": ["Monatlich", "Mensual", "Mensal", "Mensuel"],
    "Yearly": ["Jährlich", "Anual", "Anual", "Annuel"],
    "Lifetime": ["Einmalig", "Vitalicio", "Vitalício", "À vie"],
    "Cancel any time, in the app.": ["Jederzeit in der App kündbar.", "Cancela cuando quieras, en la app.", "Cancele quando quiser, no app.", "Résiliable à tout moment, dans l’app."],
    "/ year": ["/ Jahr", "/ año", "/ ano", "/ an"],
    "That is": ["Das sind", "Son", "São", "Soit"],
    "a month, billed once a year.": ["im Monat, einmal im Jahr abgerechnet.", "al mes, facturados una vez al año.", "por mês, cobrados uma vez por ano.", "par mois, facturés une fois par an."],
    "once": ["einmalig", "una vez", "uma vez", "une fois"],
    "Pay once, Pro for good — limited to": ["Einmal zahlen, Pro für immer — begrenzt auf", "Pagas una vez y tienes Pro para siempre — limitado a", "Pague uma vez e tenha Pro para sempre — limitado a", "Payez une fois, Pro pour toujours — limité à"],
    "founding seats.": ["Gründungsplätze.", "plazas fundadoras.", "vagas fundadoras.", "places fondatrices."],
    "Everything in Free, plus automatic sync, Market Replay, the AI coach and the full analytics.": ["Alles aus Free, dazu automatischer Sync, Market Replay, der KI-Coach und die volle Analyse.", "Todo lo de Free, más sincronización automática, Market Replay, el coach de IA y el análisis completo.", "Tudo do Free, mais sincronização automática, Market Replay, o coach de IA e a análise completa.", "Tout ce qu’offre Free, plus la synchronisation automatique, le Market Replay, le coach IA et l’analyse complète."],
    "Try Pro free for 7 days": ["Pro 7 Tage gratis testen", "Prueba Pro gratis 7 días", "Teste o Pro grátis por 7 dias", "Essayez Pro gratuitement pendant 7 jours"],
    "Every feature, line by line. Click a group to see all of it.": ["Jede Funktion, Zeile für Zeile. Klick auf eine Gruppe, um alles zu sehen.", "Cada función, línea por línea. Haz clic en un grupo para verlo entero.", "Cada recurso, linha por linha. Clique em um grupo para ver tudo.", "Chaque fonction, ligne par ligne. Cliquez sur un groupe pour tout voir."],
    "Prices in US dollars and final — no VAT is charged (small-business rule, § 19 UStG, Germany). Monthly and yearly plans cancel in the app or with the link at the bottom of this page.": ["Preise in US-Dollar, Endpreise — gemäß § 19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer berechnet. Monats- und Jahresabo kündigst du in der App oder über den Link unten auf dieser Seite.", "Precios en dólares estadounidenses y finales: no se cobra IVA (régimen de pequeña empresa, § 19 UStG, Alemania). Los planes mensual y anual se cancelan en la app o con el enlace al final de esta página.", "Preços em dólares americanos e finais — não é cobrado IVA (regime de pequena empresa, § 19 UStG, Alemanha). Os planos mensal e anual são cancelados no app ou pelo link no fim desta página.", "Prix en dollars américains, prix finaux — aucune TVA n’est facturée (régime des petites entreprises, § 19 UStG, Allemagne). Les abonnements mensuel et annuel se résilient dans l’app ou via le lien en bas de cette page."],
    "· built, not switched on yet": ["· gebaut, noch nicht eingeschaltet", "· construido, aún no activado", "· pronto, ainda não ativado", "· construit, pas encore activé"],
    "You get": ["Du bekommst", "Recibes", "Você recebe", "Vous recevez"],
    "You give": ["Du gibst", "Aportas", "Você oferece", "Vous apportez"],
    "What does Pro cost?": ["Was kostet Pro?", "¿Cuánto cuesta Pro?", "Quanto custa o Pro?", "Combien coûte Pro ?"],
    "Can I work with a coach in Evidence?": ["Kann ich in Evidence mit einem Coach arbeiten?", "¿Puedo trabajar con un coach en Evidence?", "Posso trabalhar com um coach no Evidence?", "Puis-je travailler avec un coach dans Evidence ?"],
    "Broker access": ["Broker-Zugriff", "Acceso al bróker", "Acesso à corretora", "Accès au courtier"],
    "What each connection can do": ["Was jede Verbindung darf", "Lo que puede hacer cada conexión", "O que cada conexão pode fazer", "Ce que chaque connexion peut faire"],
    "Data handling": ["Umgang mit Daten", "Tratamiento de datos", "Tratamento de dados", "Traitement des données"],
    "What happens to your data": ["Was mit deinen Daten passiert", "Qué pasa con tus datos", "O que acontece com seus dados", "Ce que deviennent vos données"],
    "Your broker": ["Dein Broker", "Tu bróker", "Sua corretora", "Votre courtier"],
    "Your journal": ["Dein Journal", "Tu diario", "Seu diário", "Votre journal"],
    "You only": ["Nur du", "Solo tú", "Só você", "Vous seul"],
    "Stored in the EU": ["Gespeichert in der EU", "Guardado en la UE", "Armazenado na UE", "Stocké dans l’UE"],
    "Private by default": ["Standardmäßig privat", "Privado por defecto", "Privado por padrão", "Privé par défaut"],
    "Security & privacy": ["Sicherheit & Datenschutz", "Seguridad y privacidad", "Segurança e privacidade", "Sécurité et confidentialité"],
    "Free for good — no trial clock, no card.": ["Dauerhaft kostenlos — ohne Ablaufdatum, ohne Karte.", "Gratis para siempre: sin fecha de caducidad ni tarjeta.", "Grátis para sempre — sem prazo e sem cartão.", "Gratuit pour de bon — sans échéance ni carte."],
    "Journal, import and measure your trades — including one prop challenge.": ["Trades erfassen, importieren und auswerten — inklusive einer Prop-Challenge.", "Registra, importa y mide tus operaciones, incluido un challenge de prop firm.", "Registre, importe e meça suas operações — incluindo um challenge de prop firm.", "Notez, importez et mesurez vos trades — y compris un challenge de prop firm."],
    // Preiskarten und Vergleichstabelle (18.10.2026) — vorher von Google
    // übersetzt, mit „Herausforderung" statt Challenge und Sie statt du.
    "Manual trade entry & journal": ["Manuelle Trade-Erfassung & Journal", "Registro manual de operaciones y diario", "Registro manual de operações e diário", "Saisie manuelle des trades et journal"],
    "Statement import": ["Kontoauszug-Import", "Importación de extractos", "Importação de extratos", "Import de relevés"],
    "brokers & prop firms,": ["Broker & Prop-Firmen,", "brókers y prop firms,", "corretoras e prop firms,", "courtiers et prop firms,"],
    "formats, checked before anything is written": ["Formate, geprüft, bevor irgendetwas gespeichert wird", "formatos, revisados antes de guardar nada", "formatos, verificados antes de qualquer gravação", "formats, vérifiés avant tout enregistrement"],
    "Move from another journal": ["Umzug aus einem anderen Journal", "Cambio desde otro diario", "Mudança de outro diário", "Venir d’un autre journal"],
    "— TradeZella, TraderSync, Tradervue, TradesViz, Edgewonk & Trademetria": ["— TradeZella, TraderSync, Tradervue, TradesViz, Edgewonk & Trademetria", "— TradeZella, TraderSync, Tradervue, TradesViz, Edgewonk y Trademetria", "— TradeZella, TraderSync, Tradervue, TradesViz, Edgewonk e Trademetria", "— TradeZella, TraderSync, Tradervue, TradesViz, Edgewonk et Trademetria"],
    "Prop mode": ["Prop-Modus", "Modo prop", "Modo prop", "Mode prop"],
    "— one challenge measured with your firm’s real rules on every page, and a personal stop before the firm’s": ["— eine Challenge, auf jeder Seite mit den echten Regeln deiner Firma gemessen, und ein persönlicher Stop vor dem der Firma", "— un challenge medido con las reglas reales de tu firma en cada página, y un stop personal antes del de la firma", "— um challenge medido com as regras reais da sua firma em cada página, e um stop pessoal antes do da firma", "— un challenge mesuré selon les vraies règles de votre firme sur chaque page, et un stop personnel avant celui de la firme"],
    "Guardrails": ["Guardrails", "Guardrails", "Guardrails", "Garde-fous"],
    "— loss limit, trade cap & revenge detection": ["— Verlustlimit, Trade-Obergrenze & Revenge-Erkennung", "— límite de pérdidas, tope de operaciones y detección de revenge trading", "— limite de perda, teto de operações e detecção de revenge trading", "— limite de perte, plafond de trades et détection du revenge trading"],
    "Confidence on every number": ["Konfidenz an jeder Zahl", "Confianza en cada cifra", "Confiança em cada número", "Fiabilité sur chaque chiffre"],
    "— each statistic says how many trades stand behind it": ["— jede Kennzahl sagt, wie viele Trades dahinterstehen", "— cada estadística indica cuántas operaciones la respaldan", "— cada estatística mostra quantas operações a sustentam", "— chaque statistique indique combien de trades la soutiennent"],
    "Forex, indices, crypto,": ["Forex, Indizes, Krypto,", "Forex, índices, cripto,", "Forex, índices, cripto,", "Forex, indices, crypto,"],
    "futures & options": ["Futures & Optionen", "futuros y opciones", "futuros e opções", "futures et options"],
    "Win rate, pips & basic performance stats": ["Trefferquote, Pips & Basis-Statistiken", "Tasa de acierto, pips y estadísticas básicas", "Taxa de acerto, pips e estatísticas básicas", "Taux de réussite, pips et statistiques de base"],
    "Live chart — every instrument TradingView carries, with your own drawings": ["Live-Chart — jedes Instrument, das TradingView führt, mit deinen eigenen Zeichnungen", "Gráfico en vivo — todos los instrumentos de TradingView, con tus propios dibujos", "Gráfico ao vivo — todo instrumento do TradingView, com seus próprios desenhos", "Graphique en direct — tous les instruments de TradingView, avec vos propres tracés"],
    "Rules engine · Mindset log · Goal tracker": ["Regel-Engine · Mindset-Log · Ziel-Tracker", "Motor de reglas · Registro de mentalidad · Seguimiento de objetivos", "Motor de regras · Registro de mentalidade · Controle de metas", "Moteur de règles · Journal d’état d’esprit · Suivi d’objectifs"],
    "— all 27 chapters to read": ["— alle 27 Kapitel lesbar", "— los 27 capítulos para leer", "— todos os 27 capítulos para ler", "— les 27 chapitres à lire"],
    "Spaces": ["Spaces", "Spaces", "Spaces", "Spaces"],
    "— join a community or run your own": ["— einer Community beitreten oder eine eigene führen", "— únete a una comunidad o dirige la tuya", "— entre em uma comunidade ou administre a sua", "— rejoignez une communauté ou animez la vôtre"],
    "Search your journal — notes, setups, tags & mistakes": ["Journal durchsuchen — Notizen, Setups, Tags & Fehler", "Busca en tu diario — notas, setups, etiquetas y errores", "Pesquise no seu diário — notas, setups, tags e erros", "Recherche dans le journal — notes, setups, tags et erreurs"],
    "Trading glossary — 429 terms, written out & explained": ["Trading-Glossar — 429 Begriffe, ausgeschrieben & erklärt", "Glosario de trading — 429 términos, desarrollados y explicados", "Glossário de trading — 429 termos, por extenso e explicados", "Glossaire du trading — 429 termes, développés et expliqués"],
    "Books": ["Bücher", "Libros", "Livros", "Livres"],
    "— write, draw & paste images like in a real notebook (3 books)": ["— schreiben, zeichnen & Bilder einfügen wie in einem echten Notizbuch (3 Bücher)", "— escribe, dibuja y pega imágenes como en un cuaderno real (3 libros)", "— escreva, desenhe e cole imagens como num caderno de verdade (3 livros)", "— écrivez, dessinez et collez des images comme dans un vrai carnet (3 livres)"],
    "Sign in with Google · cloud sync across devices": ["Anmelden mit Google · Cloud-Sync über alle Geräte", "Inicio de sesión con Google · sincronización en la nube entre dispositivos", "Login com Google · sincronização na nuvem entre dispositivos", "Connexion avec Google · synchronisation cloud entre appareils"],
    "Automatic sync": ["Automatischer Sync", "Sincronización automática", "Sincronização automática", "Synchronisation automatique"],
    "— cTrader (keeps running while the app is closed), MT5 Cloud Sync with your investor password, Auto-Tracking for MT5 · ATAS · Quantower · TradingView · NinjaTrader (beta), Binance & Bybit": ["— cTrader (läuft auch bei geschlossener App weiter), MT5 Cloud Sync mit deinem Investor-Passwort, Auto-Tracking für MT5 · ATAS · Quantower · TradingView · NinjaTrader (Beta), Binance & Bybit", "— cTrader (sigue funcionando con la app cerrada), MT5 Cloud Sync con tu contraseña de inversor, Auto-Tracking para MT5 · ATAS · Quantower · TradingView · NinjaTrader (beta), Binance y Bybit", "— cTrader (continua rodando com o app fechado), MT5 Cloud Sync com sua senha de investidor, Auto-Tracking para MT5 · ATAS · Quantower · TradingView · NinjaTrader (beta), Binance e Bybit", "— cTrader (continue de tourner app fermée), MT5 Cloud Sync avec votre mot de passe investisseur, Auto-Tracking pour MT5 · ATAS · Quantower · TradingView · NinjaTrader (bêta), Binance et Bybit"],
    "Market Replay": ["Market Replay", "Market Replay", "Market Replay", "Market Replay"],
    "— rewind any past day & trade it candle by candle": ["— spul zu jedem vergangenen Tag zurück & handle ihn Kerze für Kerze", "— vuelve a cualquier día pasado y opéralo vela a vela", "— volte a qualquer dia passado e opere vela a vela", "— revenez à n’importe quel jour passé et tradez-le bougie par bougie"],
    "AI Trading Coach": ["KI-Trading-Coach", "Coach de trading con IA", "Coach de trading com IA", "Coach de trading IA"],
    "+ proactive insights": ["+ proaktive Hinweise", "+ avisos proactivos", "+ alertas proativos", "+ conseils proactifs"],
    "Live trade alerts & automatic A–F trade review": ["Live-Trade-Warnungen & automatische A–F-Bewertung", "Alertas en vivo y revisión automática A–F", "Alertas ao vivo e avaliação automática A–F", "Alertes en direct et note automatique de A à F"],
    "Edge & Leaks": ["Edge & Leaks", "Edge & Leaks", "Edge & Leaks", "Edge & Leaks"],
    "— every condition in your journal tested against your other trades, with a correction for testing many at once": ["— jede Bedingung in deinem Journal gegen deine übrigen Trades getestet, mit Korrektur für viele Tests auf einmal", "— cada condición de tu diario probada contra tus demás operaciones, con corrección por múltiples pruebas", "— cada condição do seu diário testada contra suas outras operações, com correção para muitos testes ao mesmo tempo", "— chaque condition de votre journal testée contre vos autres trades, avec une correction pour les tests multiples"],
    "Prop challenges": ["Prop-Challenges", "Challenges de prop", "Challenges de prop", "Challenges prop"],
    "— several at once, phases & a payout tracker, costs, what ended the failed ones, and your firm’s rules in the replay": ["— mehrere gleichzeitig, Phasen & Auszahlungs-Tracker, Kosten, woran die gescheiterten endeten, und die Regeln deiner Firma im Replay", "— varios a la vez, fases y registro de pagos, costes, qué terminó con los fallidos y las reglas de tu firma en el replay", "— vários ao mesmo tempo, fases e controle de pagamentos, custos, o que encerrou os que falharam e as regras da sua firma no replay", "— plusieurs à la fois, phases et suivi des paiements, coûts, ce qui a mis fin aux échecs, et les règles de votre firme dans le replay"],
    "Stat Lab": ["Stat Lab", "Stat Lab", "Stat Lab", "Stat Lab"],
    "— 68 metrics in 6 groups, sliced by any of 12 dimensions": ["— 68 Kennzahlen in 6 Gruppen, aufgeteilt nach jeder von 12 Dimensionen", "— 68 métricas en 6 grupos, desglosadas por cualquiera de 12 dimensiones", "— 68 métricas em 6 grupos, divididas por qualquer uma de 12 dimensões", "— 68 métriques en 6 groupes, ventilées selon 12 dimensions au choix"],
    "Evidence Score": ["Evidence Score", "Evidence Score", "Evidence Score", "Evidence Score"],
    "— one number for how well you are trading, four fifths of it process not P&L": ["— eine Zahl dafür, wie gut du tradest, zu vier Fünfteln Prozess statt P&L", "— un número que dice lo bien que operas, cuatro quintos proceso y no P&L", "— um número para o quão bem você opera, quatro quintos processo e não P&L", "— un chiffre qui dit si vous tradez bien, aux quatre cinquièmes le processus et non le P&L"],
    "Strategy Lab": ["Strategy Lab", "Strategy Lab", "Strategy Lab", "Strategy Lab"],
    "— automated indicator backtesting + optimiser": ["— automatisiertes Indikator-Backtesting + Optimierer", "— backtesting automático de indicadores + optimizador", "— backtesting automático de indicadores + otimizador", "— backtest automatisé d’indicateurs + optimiseur"],
    "Chart AI": ["Chart-KI", "IA de gráficos", "IA de gráficos", "IA graphique"],
    "— five timeframes read at once, zones judged against your playbook, setup with a live R ladder": ["— fünf Zeitebenen auf einmal gelesen, Zonen an deinem Playbook gemessen, Setup mit Live-R-Leiter", "— cinco temporalidades leídas a la vez, zonas evaluadas con tu playbook, setup con escala de R en vivo", "— cinco tempos gráficos lidos de uma vez, zonas avaliadas pelo seu playbook, setup com escada de R ao vivo", "— cinq unités de temps lues d’un coup, zones jugées selon votre playbook, setup avec échelle de R en direct"],
    "Multi-Account": ["Mehrere Konten", "Multicuenta", "Multicontas", "Multi-comptes"],
    "— compare brokers, prop & demo accounts": ["— Broker-, Prop- & Demokonten vergleichen", "— compara cuentas de bróker, prop y demo", "— compare contas de corretora, prop e demo", "— comparez comptes courtier, prop et démo"],
    "Start my day": ["Start my day", "Start my day", "Start my day", "Start my day"],
    "— pre-market brief: today's events and how you actually trade this weekday": ["— Briefing vor Marktöffnung: die heutigen Termine und wie du an diesem Wochentag tatsächlich tradest", "— resumen antes de la apertura: los eventos de hoy y cómo operas realmente este día de la semana", "— resumo antes da abertura: os eventos de hoje e como você realmente opera neste dia da semana", "— briefing avant l’ouverture : les événements du jour et comment vous tradez vraiment ce jour de la semaine"],
    "— custom pivots, compare & shareable links": ["— eigene Pivots, Vergleiche & teilbare Links", "— pivotes personalizados, comparaciones y enlaces para compartir", "— pivôs personalizados, comparações e links compartilháveis", "— pivots personnalisés, comparaisons et liens partageables"],
    "Zones view": ["Zonenansicht", "Vista de zonas", "Visão de zonas", "Vue des zones"],
    "— every zone the analysis found, drawn on its own chart with a measured hold rate; keeps updating without the AI": ["— jede gefundene Zone auf eigenem Chart mit gemessener Haltequote; aktualisiert sich auch ohne KI", "— cada zona encontrada en su propio gráfico con tasa de respeto medida; se actualiza sin la IA", "— cada zona encontrada em seu próprio gráfico com taxa de respeito medida; atualiza sem a IA", "— chaque zone trouvée sur son propre graphique avec un taux de tenue mesuré ; se met à jour sans l’IA"],
    "Zone confluence & tests": ["Zonen-Konfluenz & Tests", "Confluencia y pruebas de zonas", "Confluência e testes de zonas", "Confluence et tests des zones"],
    "— a 0–100 score per zone with the reasons listed, and every past test held or broken": ["— eine Bewertung von 0–100 je Zone mit den Gründen, und jeder frühere Test gehalten oder gebrochen", "— una puntuación 0–100 por zona con los motivos, y cada prueba pasada respetada o rota", "— uma nota de 0–100 por zona com os motivos, e cada teste anterior respeitado ou rompido", "— un score de 0 à 100 par zone avec ses raisons, et chaque test passé tenu ou cassé"],
    "Zone alerts, replay & plan": ["Zonen-Alarme, Replay & Plan", "Alertas, replay y plan de zonas", "Alertas, replay e plano de zonas", "Alertes, replay et plan des zones"],
    "— alert when price gets close, enters or breaks; replay from any candle and trade the zones; save the plan to your journal": ["— Alarm, wenn der Kurs nahe kommt, eintritt oder durchbricht; Replay ab jeder Kerze und die Zonen handeln; den Plan im Journal speichern", "— alerta cuando el precio se acerca, entra o rompe; replay desde cualquier vela operando las zonas; guarda el plan en tu diario", "— alerta quando o preço se aproxima, entra ou rompe; replay a partir de qualquer vela operando as zonas; salve o plano no seu diário", "— alerte quand le prix approche, entre ou casse ; replay depuis n’importe quelle bougie pour trader les zones ; plan enregistré dans votre journal"],
    "Zone to trade to result": ["Von der Zone zum Trade zum Ergebnis", "De la zona a la operación y al resultado", "Da zona à operação e ao resultado", "De la zone au trade puis au résultat"],
    "— entry, stop & several targets per zone, then measured": ["— Einstieg, Stop & mehrere Ziele je Zone, dann gemessen", "— entrada, stop y varios objetivos por zona, y después medido", "— entrada, stop e vários alvos por zona, depois medido", "— entrée, stop et plusieurs objectifs par zone, puis mesurés"],
    "Setup watcher": ["Setup-Wächter", "Vigilante de setups", "Vigia de setups", "Veilleur de setups"],
    "— tells you when price reaches a zone, and while a trade runs": ["— meldet sich, wenn der Kurs eine Zone erreicht, und während ein Trade läuft", "— avisa cuando el precio llega a una zona y mientras una operación está abierta", "— avisa quando o preço chega a uma zona e enquanto uma operação está aberta", "— vous prévient quand le prix atteint une zone, et pendant qu’un trade est ouvert"],
    "Tick footprint": ["Tick-Footprint", "Footprint de ticks", "Footprint de ticks", "Footprint de ticks"],
    "— price ticks per level inside each candle, in the replay and the zones view": ["— Kursticks je Preisstufe in jeder Kerze, im Replay und in der Zonenansicht", "— ticks de precio por nivel dentro de cada vela, en el replay y en la vista de zonas", "— ticks de preço por nível dentro de cada vela, no replay e na visão de zonas", "— ticks de prix par niveau dans chaque bougie, dans le replay et la vue des zones"],
    "Liquidity heatmap": ["Liquiditäts-Heatmap", "Mapa de calor de liquidez", "Mapa de calor de liquidez", "Heatmap de liquidité"],
    "— Bookmap-style stop pools, swept bands and volume bubbles, in the replay and the zones view": ["— Stop-Pools im Bookmap-Stil, abgeräumte Bänder und Volumenblasen, im Replay und in der Zonenansicht", "— pools de stops al estilo Bookmap, bandas barridas y burbujas de volumen, en el replay y en la vista de zonas", "— pools de stops no estilo Bookmap, faixas varridas e bolhas de volume, no replay e na visão de zonas", "— pools de stops façon Bookmap, bandes balayées et bulles de volume, dans le replay et la vue des zones"],
    "Chart workspace": ["Chart-Werkstatt", "Espacio de gráficos", "Espaço de gráficos", "Espace graphique"],
    "— toolbar, stage and dock, no page scrolling": ["— Werkzeugleiste, Bühne und Dock, kein Seiten-Scrollen", "— barra de herramientas, escenario y dock, sin desplazar la página", "— barra de ferramentas, palco e dock, sem rolar a página", "— barre d’outils, scène et dock, sans défilement de page"],
    "23 drawing tools with favourites — editable afterwards, with a position tool": ["23 Zeichenwerkzeuge mit Favoriten — nachträglich bearbeitbar, mit Positionswerkzeug", "23 herramientas de dibujo con favoritos — editables después, con herramienta de posición", "23 ferramentas de desenho com favoritos — editáveis depois, com ferramenta de posição", "23 outils de dessin avec favoris — modifiables ensuite, avec un outil de position"],
    "Candlestick charts — drag entry / SL / TP": ["Kerzencharts — Einstieg / SL / TP ziehen", "Gráficos de velas — arrastra entrada / SL / TP", "Gráficos de velas — arraste entrada / SL / TP", "Graphiques en bougies — glissez entrée / SL / TP"],
    "Auto-Tagging": ["Auto-Tagging", "Etiquetado automático", "Tags automáticas", "Tags automatiques"],
    "rules + AI tags · Multi-Frame charts": ["Regeln + KI-Tags · Multi-Frame-Charts", "reglas + etiquetas de IA · gráficos multi-marco", "regras + tags de IA · gráficos multiquadro", "règles + tags IA · graphiques multi-cadres"],
    "S&D Zones TradingView Indicator": ["S&D-Zones-Indikator für TradingView", "Indicador S&D Zones para TradingView", "Indicador S&D Zones para TradingView", "Indicateur S&D Zones pour TradingView"],
    "Economic calendar + event alerts": ["Wirtschaftskalender + Termin-Alarme", "Calendario económico + alertas de eventos", "Calendário econômico + alertas de eventos", "Calendrier économique + alertes d’événements"],
    "Connection health": ["Verbindungsstatus", "Estado de conexiones", "Saúde das conexões", "État des connexions"],
    "— every sync on one page, plus an email when one breaks and a check of your broker's P&L against the journal": ["— jeder Sync auf einer Seite, dazu eine E-Mail, wenn einer ausfällt, und ein Abgleich des Broker-P&L mit dem Journal", "— cada sincronización en una página, un correo cuando una falla y una comprobación del P&L del bróker frente al diario", "— cada sincronização em uma página, um e-mail quando uma falha e uma conferência do P&L da corretora com o diário", "— chaque synchronisation sur une page, un e-mail quand l’une tombe, et un contrôle du P&L du courtier face au journal"],
    "REST API": ["REST API", "API REST", "API REST", "API REST"],
    "— read your journal from any tool with your own key": ["— lies dein Journal aus jedem Tool mit deinem eigenen Schlüssel", "— lee tu diario desde cualquier herramienta con tu propia clave", "— leia seu diário em qualquer ferramenta com sua própria chave", "— lisez votre journal depuis n’importe quel outil avec votre propre clé"],
    "Outgoing webhooks": ["Ausgehende Webhooks", "Webhooks salientes", "Webhooks de saída", "Webhooks sortants"],
    "— send trades, day summaries & rule breaches to Zapier, Make, Discord or Slack": ["— Trades, Tageszusammenfassungen & Regelbrüche an Zapier, Make, Discord oder Slack senden", "— envía operaciones, resúmenes del día e incumplimientos de reglas a Zapier, Make, Discord o Slack", "— envie operações, resumos do dia e quebras de regras para Zapier, Make, Discord ou Slack", "— envoyez trades, résumés du jour et infractions aux règles vers Zapier, Make, Discord ou Slack"],
    "Futures & prop accounts": ["Futures- & Prop-Konten", "Cuentas de futuros y prop", "Contas de futuros e prop", "Comptes futures et prop"],
    "— Topstep, Apex, MyFundedFutures, NinjaTrader, Rithmic and Tradovate statements imported and mapped once": ["— Kontoauszüge von Topstep, Apex, MyFundedFutures, NinjaTrader, Rithmic und Tradovate einmal importiert und zugeordnet", "— extractos de Topstep, Apex, MyFundedFutures, NinjaTrader, Rithmic y Tradovate importados y asignados una vez", "— extratos de Topstep, Apex, MyFundedFutures, NinjaTrader, Rithmic e Tradovate importados e mapeados uma vez", "— relevés Topstep, Apex, MyFundedFutures, NinjaTrader, Rithmic et Tradovate importés et associés une seule fois"],
    "Weekly Intelligence Reports & PDF export": ["Wöchentliche Intelligence-Berichte & PDF-Export", "Informes semanales de inteligencia y exportación a PDF", "Relatórios semanais de inteligência e exportação em PDF", "Rapports hebdomadaires et export PDF"],
    "Psychology dashboard": ["Psychologie-Dashboard", "Panel de psicología", "Painel de psicologia", "Tableau de bord psychologique"],
    "— Mind Score, trends, mistake & strength heatmaps, discipline streak": ["— Mind Score, Trends, Heatmaps für Fehler & Stärken, Disziplin-Serie", "— Mind Score, tendencias, mapas de calor de errores y fortalezas, racha de disciplina", "— Mind Score, tendências, mapas de calor de erros e pontos fortes, sequência de disciplina", "— Mind Score, tendances, heatmaps des erreurs et des forces, série de discipline"],
    "Tiltmeter & Habit Tracker": ["Tiltmeter & Gewohnheits-Tracker", "Tiltmeter y seguimiento de hábitos", "Tiltmeter e controle de hábitos", "Tiltmeter et suivi des habitudes"],
    "Futures replay": ["Futures-Replay", "Replay de futuros", "Replay de futuros", "Replay des futures"],
    "— ES, NQ, YM, GC, CL & micros in whole contracts with CME tick values (CFD price data)": ["— ES, NQ, YM, GC, CL & Micros in ganzen Kontrakten mit CME-Tickwerten (CFD-Kursdaten)", "— ES, NQ, YM, GC, CL y micros en contratos enteros con valores de tick de CME (datos de precio CFD)", "— ES, NQ, YM, GC, CL e micros em contratos inteiros com valores de tick da CME (dados de preço CFD)", "— ES, NQ, YM, GC, CL et micros en contrats entiers avec les valeurs de tick CME (données de prix CFD)"],
    "Multi-chart replay": ["Multi-Chart-Replay", "Replay multigráfico", "Replay com vários gráficos", "Replay multi-graphiques"],
    "— optional 2 or 4 synced charts on higher timeframes, the forming candle built only from what you have seen": ["— optional 2 oder 4 synchrone Charts auf höheren Zeitebenen, die laufende Kerze nur aus dem, was du schon gesehen hast", "— 2 o 4 gráficos sincronizados opcionales en temporalidades mayores, con la vela en formación hecha solo de lo que ya viste", "— 2 ou 4 gráficos sincronizados opcionais em tempos maiores, com a vela em formação feita só do que você já viu", "— 2 ou 4 graphiques synchronisés en option sur des unités supérieures, la bougie en cours construite uniquement à partir de ce que vous avez vu"],
    "Replay trade management — multi-TP, break-even, trailing & partials": ["Trade-Management im Replay — Multi-TP, Break-even, Trailing & Teilschließungen", "Gestión de operaciones en el replay — multi-TP, break-even, trailing y cierres parciales", "Gestão de operações no replay — multi-TP, break-even, trailing e parciais", "Gestion des trades dans le replay — multi-TP, break-even, trailing et clôtures partielles"],
    "Replay sessions": ["Replay-Sitzungen", "Sesiones de replay", "Sessões de replay", "Sessions de replay"],
    "— presets, pick up where you left off, blind mode that hides the date, and a review against your playbook": ["— Vorlagen, weitermachen, wo du aufgehört hast, Blindmodus ohne Datum und eine Auswertung gegen dein Playbook", "— plantillas, retoma donde lo dejaste, modo ciego que oculta la fecha y una revisión frente a tu playbook", "— modelos, retome de onde parou, modo cego que esconde a data e uma revisão contra seu playbook", "— modèles, reprise là où vous vous êtes arrêté, mode aveugle qui masque la date et une revue face à votre playbook"],
    "Saved backtests — reopen a run and keep trading it": ["Gespeicherte Backtests — einen Lauf wieder öffnen und weiterhandeln", "Backtests guardados — reabre una sesión y sigue operando", "Backtests salvos — reabra uma sessão e continue operando", "Backtests enregistrés — rouvrez une session et continuez à trader"],
    "61 instruments in the replay": ["61 Instrumente im Replay", "61 instrumentos en el replay", "61 instrumentos no replay", "61 instruments dans le replay"],
    "— gold, silver, 43 FX pairs, 10 indices, WTI, Brent & crypto": ["— Gold, Silber, 43 Devisenpaare, 10 Indizes, WTI, Brent & Krypto", "— oro, plata, 43 pares de divisas, 10 índices, WTI, Brent y cripto", "— ouro, prata, 43 pares de moedas, 10 índices, WTI, Brent e cripto", "— or, argent, 43 paires de devises, 10 indices, WTI, Brent et crypto"],
    "Daily & weekly replay": ["Tages- & Wochen-Replay", "Replay diario y semanal", "Replay diário e semanal", "Replay journalier et hebdomadaire"],
    "— the whole top-down read, not just the entry timeframe": ["— die ganze Top-down-Analyse, nicht nur die Einstiegs-Zeitebene", "— todo el análisis top-down, no solo la temporalidad de entrada", "— toda a leitura top-down, não só o tempo gráfico de entrada", "— toute la lecture top-down, pas seulement l’unité de temps d’entrée"],
    "Shared replay sessions": ["Geteilte Replay-Sitzungen", "Sesiones de replay compartidas", "Sessões de replay compartilhadas", "Sessions de replay partagées"],
    "— set a student the same day with an empty account, then compare": ["— gib einem Schüler denselben Tag mit leerem Konto und vergleicht danach", "— da a un alumno el mismo día con una cuenta vacía y después comparad", "— dê a um aluno o mesmo dia com a conta vazia e depois comparem", "— donnez à un élève le même jour avec un compte vide, puis comparez"],
    "Tick-precision replay": ["Tick-genaues Replay", "Replay con precisión de tick", "Replay com precisão de tick", "Replay au tick près"],
    "— real fills when stop & target share a candle": ["— echte Ausführungen, wenn Stop & Ziel in derselben Kerze liegen", "— ejecuciones reales cuando stop y objetivo caen en la misma vela", "— execuções reais quando stop e alvo estão na mesma vela", "— exécutions réelles quand le stop et l’objectif tombent dans la même bougie"],
    "Edge Lab": ["Edge Lab", "Edge Lab", "Edge Lab", "Edge Lab"],
    "— Backtest, Trade & Day Replay, Monte-Carlo": ["— Backtest, Trade- & Day-Replay, Monte-Carlo", "— backtest, replay de operación y de día, Monte Carlo", "— backtest, replay de operação e de dia, Monte Carlo", "— backtest, replay de trade et de journée, Monte-Carlo"],
    "Strategy in plain words": ["Strategie in Klartext", "Estrategia en palabras sencillas", "Estratégia em palavras simples", "Stratégie en langage courant"],
    "— describe your setup and get testable rules, shown to you before anything runs": ["— beschreibe dein Setup und erhalte prüfbare Regeln, die dir gezeigt werden, bevor etwas läuft", "— describe tu setup y recibe reglas comprobables que ves antes de que se ejecute nada", "— descreva seu setup e receba regras testáveis, mostradas antes de qualquer execução", "— décrivez votre setup et recevez des règles testables, montrées avant tout lancement"],
    "Smart-money rules": ["Smart-Money-Regeln", "Reglas smart money", "Regras smart money", "Règles smart money"],
    "— FVG, iFVG, CHoCH, BOS, sweeps, OTE, Power of Three, ADR & SMT divergence": ["— FVG, iFVG, CHoCH, BOS, Sweeps, OTE, Power of Three, ADR & SMT-Divergenz", "— FVG, iFVG, CHoCH, BOS, sweeps, OTE, Power of Three, ADR y divergencia SMT", "— FVG, iFVG, CHoCH, BOS, sweeps, OTE, Power of Three, ADR e divergência SMT", "— FVG, iFVG, CHoCH, BOS, sweeps, OTE, Power of Three, ADR et divergence SMT"],
    "Your own metrics": ["Eigene Kennzahlen", "Tus propias métricas", "Suas próprias métricas", "Vos propres métriques"],
    "— build formulas from any statistic": ["— Formeln aus jeder Statistik bauen", "— crea fórmulas a partir de cualquier estadística", "— crie fórmulas a partir de qualquer estatística", "— créez des formules à partir de n’importe quelle statistique"],
    "Confluence": ["Konfluenz", "Confluencia", "Confluência", "Confluence"],
    "— which of your conditions actually pay, alone and combined": ["— welche deiner Bedingungen sich wirklich auszahlen, einzeln und kombiniert", "— cuáles de tus condiciones rinden de verdad, solas y combinadas", "— quais das suas condições realmente pagam, sozinhas e combinadas", "— lesquelles de vos conditions paient vraiment, seules et combinées"],
    "Session review": ["Sitzungsauswertung", "Revisión de la sesión", "Revisão da sessão", "Revue de session"],
    "— sequence, size drift & revenge-window detection": ["— Reihenfolge, Positionsgrößen-Drift & Revenge-Fenster", "— secuencia, deriva del tamaño y ventanas de revenge trading", "— sequência, desvio de tamanho e janelas de revenge trading", "— séquence, dérive de taille et fenêtres de revenge trading"],
    "Auto MFE / MAE from real price data": ["Automatisches MFE / MAE aus echten Kursdaten", "MFE / MAE automáticos con datos de precio reales", "MFE / MAE automáticos com dados de preço reais", "MFE / MAE automatiques à partir de vraies données de prix"],
    "Decision Trainer — random blind moments of real history: call it, state how sure you are, see if your 80 % are really 80 %": ["Entscheidungs-Training – zufällige blinde Momente echter Historie: entscheiden, sagen wie sicher, sehen ob deine 80 % wirklich 80 % sind", "Entrenador de decisiones: momentos a ciegas al azar de historia real; decide, di qué tan seguro estás y comprueba si tu 80 % es de verdad 80 %", "Treino de decisões — momentos aleatórios às cegas de histórico real: decida, diga o quão seguro está e veja se seus 80 % são mesmo 80 %", "Entraîneur de décisions — des moments à l’aveugle d’un historique réel : décide, dis à quel point tu es sûr, vois si tes 80 % sont vraiment 80 %"],
    "Rule Contract — sign your rules, Evidence checks every day on your synced trades; clean days build a streak, a broken day tightens tomorrow": ["Regel-Vertrag – unterschreib deine Regeln, Evidence prüft jeden Tag an deinen synchronisierten Trades; saubere Tage bauen eine Serie auf, ein gebrochener Tag verschärft den nächsten", "Contrato de reglas: firma tus reglas, Evidence comprueba cada día con tus operaciones sincronizadas; los días limpios crean una racha y un día roto endurece el siguiente", "Contrato de regras — assine suas regras, o Evidence verifica todos os dias nas suas operações sincronizadas; dias limpos criam uma sequência, um dia quebrado endurece o seguinte", "Contrat de règles — signe tes règles, Evidence vérifie chaque jour sur tes trades synchronisés ; les jours propres font une série, un jour rompu durcit le lendemain"],
    "Market Weather — every condition of today (weekday, news, yesterday, streak, sleep, volatility) looked up in your journal: storm, cloudy, fair or sunny, with a size": ["Marktwetter – jede Bedingung von heute (Wochentag, News, gestern, Serie, Schlaf, Volatilität) in deinem Journal nachgeschlagen: Sturm, bewölkt, heiter oder sonnig, mit Positionsgröße", "Clima de mercado: cada condición de hoy (día, noticias, ayer, racha, sueño, volatilidad) consultada en tu diario: tormenta, nublado, despejado o soleado, con un tamaño", "Clima de mercado — cada condição de hoje (dia, notícias, ontem, sequência, sono, volatilidade) consultada no seu diário: tempestade, nublado, firme ou ensolarado, com um tamanho", "Météo de marché — chaque condition du jour (jour, news, la veille, série, sommeil, volatilité) cherchée dans ton journal : tempête, nuageux, beau ou ensoleillé, avec une taille"],
    "Blind Duel — send a link, everyone plays the same hidden day in Market Replay, the ranking counts result and rule-keeping (playing an invite is free)": ["Blind-Duell – Link schicken, alle spielen denselben verborgenen Tag im Market Replay, die Rangliste zählt Ergebnis und Regeltreue (eine Einladung zu spielen ist kostenlos)", "Duelo a ciegas: envía un enlace, todos juegan el mismo día oculto en Market Replay y la clasificación cuenta resultado y respeto de las reglas (jugar una invitación es gratis)", "Duelo às cegas — envie um link, todos jogam o mesmo dia oculto no Market Replay, o ranking conta resultado e respeito às regras (jogar um convite é grátis)", "Duel à l’aveugle — envoie un lien, tout le monde joue la même journée cachée dans Market Replay, le classement compte le résultat et le respect des règles (jouer une invitation est gratuit)"],
    "Prop Challenge Simulator — a whole FTMO, Topstep or other firm challenge, day after day on real history, Phase 1 to funded": ["Prop-Challenge-Simulator – eine ganze FTMO-, Topstep- oder andere Firmen-Challenge, Tag für Tag auf echter Historie, von Phase 1 bis funded", "Simulador de desafíos prop: un desafío completo de FTMO, Topstep u otra firma, día a día con historia real, de la fase 1 a fondeado", "Simulador de desafios prop — um desafio inteiro da FTMO, Topstep ou outra firma, dia após dia em histórico real, da fase 1 ao financiado", "Simulateur de challenge prop — un challenge FTMO, Topstep ou autre complet, jour après jour sur un historique réel, de la phase 1 au financement"],
    "Your Twin — your exact entries with your own rules kept every time; see in R and money what each habit costs you": ["Dein Zwilling – exakt deine Einstiege, deine eigenen Regeln jedes Mal eingehalten; in R und Geld sehen, was dich jede Gewohnheit kostet", "Tu gemelo: exactamente tus entradas con tus reglas cumplidas siempre; ve en R y en dinero lo que te cuesta cada hábito", "Seu gêmeo — exatamente suas entradas com suas regras cumpridas sempre; veja em R e em dinheiro quanto cada hábito custa", "Ton jumeau — exactement tes entrées, tes propres règles respectées à chaque fois ; vois en R et en argent ce que coûte chaque habitude"],
    "Exit Lab — your entries replayed on real prices: set and forget, fixed targets, break-even, trailing and time stops, and the price after your exit": ["Exit-Labor – deine Einstiege auf echten Kursen nachgespielt: Stop und Ziel stehen lassen, feste Ziele, Break-even, Trailing- und Zeitstopps und der Kurs nach deinem Ausstieg", "Laboratorio de salidas: tus entradas reproducidas con precios reales — dejar stop y objetivo, objetivos fijos, break-even, trailing y stops por tiempo, y el precio tras tu salida", "Laboratório de saídas — suas entradas reproduzidas com preços reais: deixar stop e alvo, alvos fixos, break-even, trailing e stops por tempo, e o preço após sua saída", "Labo des sorties — tes entrées rejouées sur des prix réels : stop et objectif laissés, objectifs fixes, break-even, stops suiveurs et temporels, et le prix après ta sortie"],
    "Risk of Ruin, Sharpe & Expectancy / setup": ["Risk of Ruin, Sharpe & Erwartungswert je Setup", "Riesgo de ruina, Sharpe y esperanza por setup", "Risco de ruína, Sharpe e expectativa por setup", "Risque de ruine, Sharpe et espérance par setup"],
    "Benchmark vs buy & hold": ["Benchmark gegen Buy & Hold", "Benchmark frente a comprar y mantener", "Benchmark contra buy & hold", "Benchmark face au buy & hold"],
    "— your Sharpe against S&P 500, Nasdaq, MSCI World, 60/40, gold & BTC": ["— dein Sharpe gegen S&P 500, Nasdaq, MSCI World, 60/40, Gold & BTC", "— tu Sharpe frente a S&P 500, Nasdaq, MSCI World, 60/40, oro y BTC", "— seu Sharpe contra S&P 500, Nasdaq, MSCI World, 60/40, ouro e BTC", "— votre Sharpe face au S&P 500, Nasdaq, MSCI World, 60/40, or et BTC"],
    "R-Multiple & Kelly": ["R-Multiple & Kelly", "Múltiplos de R y Kelly", "Múltiplos de R e Kelly", "Multiples de R et Kelly"],
    "— R distribution, R per setup, optimal risk": ["— R-Verteilung, R je Setup, optimales Risiko", "— distribución de R, R por setup, riesgo óptimo", "— distribuição de R, R por setup, risco ideal", "— distribution des R, R par setup, risque optimal"],
    "Hold-time analysis & scale-out effectiveness": ["Haltedauer-Analyse & Wirksamkeit von Teilausstiegen", "Análisis del tiempo en posición y eficacia de las salidas parciales", "Análise do tempo em posição e eficácia das saídas parciais", "Analyse de la durée de détention et efficacité des sorties partielles"],
    "Options exposure": ["Options-Exposure", "Exposición en opciones", "Exposição em opções", "Exposition options"],
    "— net Greeks by underlying & expiry": ["— Netto-Griechen nach Basiswert & Verfall", "— griegas netas por subyacente y vencimiento", "— gregas líquidas por ativo-objeto e vencimento", "— grecques nettes par sous-jacent et échéance"],
    "— 27 chapters on psychology, risk, edge & backtesting, with your own numbers beside every one": ["— 27 Kapitel zu Psychologie, Risiko, Edge & Backtesting, mit deinen eigenen Zahlen neben jedem", "— 27 capítulos sobre psicología, riesgo, edge y backtesting, con tus propias cifras junto a cada uno", "— 27 capítulos sobre psicologia, risco, edge e backtesting, com seus próprios números ao lado de cada um", "— 27 chapitres sur la psychologie, le risque, l’edge et le backtest, avec vos propres chiffres à côté de chacun"],
    "Strategy Drills": ["Strategie-Drills", "Drills de estrategia", "Drills de estratégia", "Exercices de stratégie"],
    "— practise your own setup on real history with the future hidden": ["— übe dein eigenes Setup an echter Historie, die Zukunft verdeckt", "— practica tu propio setup sobre historia real con el futuro oculto", "— pratique seu próprio setup em histórico real com o futuro escondido", "— entraînez votre propre setup sur l’historique réel, futur masqué"],
    "Commitments": ["Vorsätze", "Compromisos", "Compromissos", "Engagements"],
    "— pick one habit per chapter; Evidence measures whether it actually changed": ["— wähle eine Gewohnheit pro Kapitel; Evidence misst, ob sie sich wirklich geändert hat", "— elige un hábito por capítulo; Evidence mide si de verdad cambió", "— escolha um hábito por capítulo; o Evidence mede se ele realmente mudou", "— choisissez une habitude par chapitre ; Evidence mesure si elle a vraiment changé"],
    "Your strategy as a book": ["Deine Strategie als Buch", "Tu estrategia como libro", "Sua estratégia como livro", "Votre stratégie en livre"],
    "— written up from your description, with your own trades as examples": ["— aus deiner Beschreibung geschrieben, mit deinen eigenen Trades als Beispielen", "— escrito a partir de tu descripción, con tus propias operaciones como ejemplos", "— escrito a partir da sua descrição, com suas próprias operações como exemplos", "— rédigé à partir de votre description, avec vos propres trades en exemples"],
    "Mentor & Team": ["Mentor & Team", "Mentor y equipo", "Mentor e equipe", "Mentor et équipe"],
    "— coach cockpit, 1:1 sessions, trade feedback & goals": ["— Coach-Cockpit, 1:1-Sitzungen, Trade-Feedback & Ziele", "— cabina del coach, sesiones 1:1, feedback de operaciones y objetivos", "— cockpit do coach, sessões 1:1, feedback de operações e metas", "— cockpit du coach, séances individuelles, retours sur les trades et objectifs"],
    "Coaching calls & bookings": ["Coaching-Calls & Buchungen", "Llamadas de coaching y reservas", "Chamadas de coaching e agendamentos", "Appels de coaching et réservations"],
    "— voice, video, screen share; students book your free slots": ["— Sprache, Video, Bildschirmfreigabe; Schüler buchen deine freien Termine", "— voz, vídeo, pantalla compartida; los alumnos reservan tus huecos libres", "— voz, vídeo, compartilhamento de tela; alunos agendam seus horários livres", "— voix, vidéo, partage d’écran ; les élèves réservent vos créneaux libres"],
    "Coach chat & pre-trade checks": ["Coach-Chat & Checks vor dem Trade", "Chat con el coach y comprobaciones previas", "Chat com o coach e checagens antes da operação", "Chat coach et vérifications avant le trade"],
    "— students ask before a trade, you answer Go / Wait / No": ["— Schüler fragen vor einem Trade, du antwortest Go / Wait / No", "— los alumnos preguntan antes de operar, tú respondes Go / Wait / No", "— alunos perguntam antes de operar, você responde Go / Wait / No", "— les élèves demandent avant un trade, vous répondez Go / Wait / No"],
    "Live student feed & process radar": ["Live-Schüler-Feed & Prozess-Radar", "Feed de alumnos en vivo y radar de proceso", "Feed de alunos ao vivo e radar de processo", "Fil des élèves en direct et radar de processus"],
    "— trades as they happen, six process scores per week": ["— Trades in dem Moment, in dem sie passieren, sechs Prozess-Werte pro Woche", "— operaciones en el momento en que ocurren, seis puntuaciones de proceso por semana", "— operações no momento em que acontecem, seis notas de processo por semana", "— les trades au moment où ils ont lieu, six scores de processus par semaine"],
    "Programmes & coach page": ["Programme & Coach-Seite", "Programas y página del coach", "Programas e página do coach", "Programmes et page coach"],
    "— step-by-step courses, reviews, applications & waitlist": ["— Kurse Schritt für Schritt, Bewertungen, Bewerbungen & Warteliste", "— cursos paso a paso, reseñas, solicitudes y lista de espera", "— cursos passo a passo, avaliações, candidaturas e lista de espera", "— cours pas à pas, avis, candidatures et liste d’attente"],
    "Coaching servers": ["Coaching-Server", "Servidores de coaching", "Servidores de coaching", "Serveurs de coaching"],
    "— one invite link makes someone member, student and mentee; assistant coaches, homework, review requests": ["— ein Einladungslink macht jemanden zu Mitglied, Schüler und Mentee; Assistenz-Coaches, Hausaufgaben, Review-Anfragen", "— un enlace de invitación convierte a alguien en miembro, alumno y mentoreado; coaches asistentes, deberes, solicitudes de revisión", "— um link de convite torna alguém membro, aluno e mentorado; coaches assistentes, tarefas, pedidos de revisão", "— un lien d’invitation fait de quelqu’un un membre, un élève et un mentoré ; coachs assistants, devoirs, demandes de revue"],
    "Books with trade cards": ["Bücher mit Trade-Karten", "Libros con tarjetas de operaciones", "Livros com cartões de operações", "Livres avec cartes de trades"],
    "— paste past trades as cards, compare them, build galleries; unlimited books": ["— vergangene Trades als Karten einfügen, vergleichen, Galerien bauen; unbegrenzt viele Bücher", "— pega operaciones pasadas como tarjetas, compáralas, crea galerías; libros ilimitados", "— cole operações passadas como cartões, compare-as, monte galerias; livros ilimitados", "— collez d’anciens trades en cartes, comparez-les, créez des galeries ; livres illimités"],
    "Share books read-only": ["Bücher nur lesend teilen", "Comparte libros en modo lectura", "Compartilhe livros só para leitura", "Partage de livres en lecture seule"],
    "— with a server, your coach, students or single traders; nobody can edit or pass it on": ["— mit einem Server, deinem Coach, Schülern oder einzelnen Tradern; niemand kann bearbeiten oder weitergeben", "— con un servidor, tu coach, alumnos o traders concretos; nadie puede editar ni reenviar", "— com um servidor, seu coach, alunos ou traders específicos; ninguém pode editar nem repassar", "— avec un serveur, votre coach, des élèves ou des traders précis ; personne ne peut modifier ni transmettre"],
    "included": ["inklusive", "incluido", "incluído", "inclus"],
    "— fitness, sleep & nutrition tracking with all AI features, linked to your journal": ["— Fitness-, Schlaf- & Ernährungs-Tracking mit allen KI-Funktionen, verbunden mit deinem Journal", "— seguimiento de fitness, sueño y nutrición con todas las funciones de IA, vinculado a tu diario", "— acompanhamento de treino, sono e nutrição com todos os recursos de IA, ligado ao seu diário", "— suivi fitness, sommeil et nutrition avec toutes les fonctions IA, relié à ton journal"],
    "+ Evidence Fit included": ["+ Evidence Fit inklusive", "+ Evidence Fit incluido", "+ Evidence Fit incluído", "+ Evidence Fit inclus"],
    "— the fitness & sleep app with every AI feature, normally €4.99 / $5.59 a month": ["— die Fitness- & Schlaf-App mit allen KI-Funktionen, sonst 4,99 € / 5,59 $ im Monat", "— la app de fitness y sueño con todas las funciones de IA, normalmente 4,99 € / 5,59 $ al mes", "— o app de treino e sono com todos os recursos de IA, normalmente 4,99 € / 5,59 $ por mês", "— l’app fitness et sommeil avec toutes les fonctions IA, normalement 4,99 € / 5,59 $ par mois"],
    "included — fitness, sleep & check-in app with all AI features, tested against your trades (normally €4.99 / $5.59 a month)": ["inklusive – Fitness-, Schlaf- & Check-in-App mit allen KI-Funktionen, gegen deine Trades getestet (sonst 4,99 € / 5,59 $ im Monat)", "incluido: app de fitness, sueño y check-in con todas las funciones de IA, probada contra tus operaciones (normalmente 4,99 € / 5,59 $ al mes)", "incluído — app de treino, sono e check-in com todos os recursos de IA, testado contra as suas operações (normalmente 4,99 € / 5,59 $ por mês)", "inclus — app fitness, sommeil et check-in avec toutes les fonctions IA, testée face à tes trades (normalement 4,99 € / 5,59 $ par mois)"],
    "Glossary AI lookup": ["Glossar-KI-Suche", "Búsqueda con IA en el glosario", "Busca com IA no glossário", "Recherche IA dans le glossaire"],
    "— any term the 429 curated ones do not cover, explained on demand": ["— jeder Begriff, den die 429 kuratierten nicht abdecken, auf Abruf erklärt", "— cualquier término que no cubran los 429 seleccionados, explicado al momento", "— qualquer termo fora dos 429 selecionados, explicado na hora", "— tout terme absent des 429 sélectionnés, expliqué à la demande"],
    "Manual trade journal & notes": ["Manuelles Trade-Journal & Notizen", "Diario manual de operaciones y notas", "Diário manual de operações e notas", "Journal de trading manuel et notes"],
    "Cloud sync across devices": ["Cloud-Sync über alle Geräte", "Sincronización en la nube entre dispositivos", "Sincronização na nuvem entre dispositivos", "Synchronisation cloud entre appareils"],
    "Win rate, pips & basic stats": ["Trefferquote, Pips & Basis-Statistiken", "Tasa de acierto, pips y estadísticas básicas", "Taxa de acerto, pips e estatísticas básicas", "Taux de réussite, pips et statistiques de base"],
    "Community feed": ["Community-Feed", "Feed de la comunidad", "Feed da comunidade", "Fil de la communauté"],
    "Live chart — every instrument TradingView carries, your own drawings, every timeframe": ["Live-Chart — jedes Instrument, das TradingView führt, eigene Zeichnungen, jede Zeitebene", "Gráfico en vivo — todos los instrumentos de TradingView, tus propios dibujos, todas las temporalidades", "Gráfico ao vivo — todo instrumento do TradingView, seus próprios desenhos, todos os tempos gráficos", "Graphique en direct — tous les instruments de TradingView, vos propres tracés, toutes les unités de temps"],
    "Journal search — notes, setups, tags & mistakes": ["Journal-Suche — Notizen, Setups, Tags & Fehler", "Búsqueda en el diario — notas, setups, etiquetas y errores", "Busca no diário — notas, setups, tags e erros", "Recherche dans le journal — notes, setups, tags et erreurs"],
    "Confidence on every number — how many trades stand behind each statistic": ["Konfidenz an jeder Zahl — wie viele Trades hinter jeder Kennzahl stehen", "Confianza en cada cifra — cuántas operaciones respaldan cada estadística", "Confiança em cada número — quantas operações sustentam cada estatística", "Fiabilité sur chaque chiffre — combien de trades soutiennent chaque statistique"],
    "Sign in with Google": ["Anmelden mit Google", "Inicio de sesión con Google", "Login com Google", "Connexion avec Google"],
    "16 display currencies & auto-translation": ["16 Anzeigewährungen & automatische Übersetzung", "16 divisas de visualización y traducción automática", "16 moedas de exibição e tradução automática", "16 devises d’affichage et traduction automatique"],
    "Match-Trader & TradeLocker Auto-Sync — prop-firm platforms, read-only token or a sign-in whose password is never stored": ["Match-Trader- & TradeLocker-Auto-Sync – Prop-Firm-Plattformen, nur lesender Token oder eine Anmeldung, deren Passwort nie gespeichert wird", "Sincronización automática de Match-Trader y TradeLocker: plataformas de prop firms, token de solo lectura o un inicio de sesión cuya contraseña nunca se guarda", "Sincronização automática Match-Trader e TradeLocker — plataformas de prop firms, token somente leitura ou um login cuja senha nunca é guardada", "Synchro auto Match-Trader et TradeLocker — plateformes de prop firms, jeton en lecture seule ou une connexion dont le mot de passe n’est jamais stocké"],
    "MCP server — ask Claude, ChatGPT or Cursor about your own journal, read-only": ["MCP-Server – frag Claude, ChatGPT oder Cursor nach deinem eigenen Journal, nur lesend", "Servidor MCP: pregunta a Claude, ChatGPT o Cursor sobre tu propio diario, solo lectura", "Servidor MCP — pergunte ao Claude, ChatGPT ou Cursor sobre o seu próprio diário, somente leitura", "Serveur MCP — interroge Claude, ChatGPT ou Cursor sur ton propre journal, en lecture seule"],
    "Merge and split trades — partial fills into one position, undo any time": ["Trades zusammenführen und aufteilen – Teilausführungen zu einer Position, jederzeit rückgängig", "Unir y dividir operaciones: ejecuciones parciales en una posición, reversible en cualquier momento", "Juntar e dividir operações — execuções parciais em uma posição, reversível a qualquer momento", "Fusionner et scinder des trades — exécutions partielles en une position, réversible à tout moment"],
    "Fee templates per account — commission filled in where a statement has none": ["Gebühren-Vorlagen pro Konto – Kommission wird ergänzt, wo ein Kontoauszug keine hat", "Plantillas de comisiones por cuenta: la comisión se completa donde el extracto no la trae", "Modelos de taxas por conta — a comissão é preenchida onde o extrato não a tem", "Modèles de frais par compte — la commission est ajoutée là où le relevé n’en a pas"],
    "Account currency per account — booked P&L converted at daily ECB rates, 16 display currencies & auto-translation": ["Kontowährung je Konto – gebuchter G&V zum EZB-Tageskurs umgerechnet, 16 Anzeigewährungen & automatische Übersetzung", "Divisa por cuenta: P&L contabilizado convertido al tipo diario del BCE, 16 divisas de visualización y traducción automática", "Moeda por conta — P&L lançado convertido à taxa diária do BCE, 16 moedas de exibição e tradução automática", "Devise par compte — P&L comptabilisé converti au taux BCE du jour, 16 devises d’affichage et traduction automatique"],
    "Forex, indices, crypto, futures & multi-leg options": ["Forex, Indizes, Krypto, Futures & mehrbeinige Optionen", "Forex, índices, cripto, futuros y opciones de varias patas", "Forex, índices, cripto, futuros e opções com várias pernas", "Forex, indices, crypto, futures et options à plusieurs jambes"],
    "Partial exits & scale-out logging": ["Teilausstiege & Scale-out-Erfassung", "Salidas parciales y registro de scale-out", "Saídas parciais e registro de scale-out", "Sorties partielles et suivi des scale-out"],
    "Guardrails — daily loss limit, trade cap, cooldown & revenge detection": ["Guardrails — tägliches Verlustlimit, Trade-Obergrenze, Abkühlpause & Revenge-Erkennung", "Guardrails — límite diario de pérdidas, tope de operaciones, pausa y detección de revenge trading", "Guardrails — limite diário de perda, teto de operações, pausa e detecção de revenge trading", "Garde-fous — limite de perte quotidienne, plafond de trades, pause et détection du revenge trading"],
    "Prop mode — one challenge with your firm’s real rules on every page: three drawdown models (trailing that stops at your starting balance included), daily limit on the firm’s clock, consistency rule, personal stop": ["Prop-Modus — eine Challenge mit den echten Regeln deiner Firma auf jeder Seite: drei Drawdown-Modelle (inklusive Trailing, das bei deinem Startkapital stoppt), Tageslimit nach der Uhr der Firma, Konsistenzregel, persönlicher Stop", "Modo prop — un challenge con las reglas reales de tu firma en cada página: tres modelos de drawdown (incluido el trailing que se detiene en tu saldo inicial), límite diario según el reloj de la firma, regla de consistencia, stop personal", "Modo prop — um challenge com as regras reais da sua firma em cada página: três modelos de drawdown (incluindo o trailing que para no saldo inicial), limite diário no relógio da firma, regra de consistência, stop pessoal", "Mode prop — un challenge avec les vraies règles de votre firme sur chaque page : trois modèles de drawdown (dont le trailing qui s’arrête à votre capital de départ), limite quotidienne à l’heure de la firme, règle de consistance, stop personnel"],
    "Several prop challenges at once, with a cost & payout ledger and “what ended your challenges”": ["Mehrere Prop-Challenges gleichzeitig, mit Kosten- & Auszahlungsbuch und „woran deine Challenges endeten“", "Varios challenges de prop a la vez, con libro de costes y pagos y «qué terminó con tus challenges»", "Vários challenges de prop ao mesmo tempo, com livro de custos e pagamentos e “o que encerrou seus challenges”", "Plusieurs challenges prop à la fois, avec registre des coûts et paiements et « ce qui a mis fin à vos challenges »"],
    "Prop phases with their history, and a payout tracker for funded accounts (winning days, consistency, buffer)": ["Prop-Phasen mit Verlauf und ein Auszahlungs-Tracker für finanzierte Konten (Gewinntage, Konsistenz, Puffer)", "Fases de prop con su historial y registro de pagos para cuentas fondeadas (días ganadores, consistencia, colchón)", "Fases de prop com histórico e controle de pagamentos para contas financiadas (dias vencedores, consistência, margem)", "Phases prop avec leur historique et suivi des paiements pour les comptes financés (jours gagnants, consistance, marge)"],
    "What each challenge cost and paid — fees, resets, payouts, ROI and pass rate per firm": ["Was jede Challenge gekostet und eingebracht hat — Gebühren, Resets, Auszahlungen, ROI und Bestehensquote je Firma", "Lo que costó y pagó cada challenge — tarifas, resets, pagos, ROI y tasa de aprobación por firma", "Quanto cada challenge custou e pagou — taxas, resets, pagamentos, ROI e taxa de aprovação por firma", "Ce que chaque challenge a coûté et rapporté — frais, resets, paiements, ROI et taux de réussite par firme"],
    "Separate rules per prop account — run a Topstep and an Apex Trader Funding challenge side by side": ["Eigene Regeln je Prop-Konto — eine Topstep- und eine Apex-Trader-Funding-Challenge nebeneinander", "Reglas separadas por cuenta prop — un challenge de Topstep y otro de Apex Trader Funding en paralelo", "Regras separadas por conta prop — um challenge da Topstep e outro da Apex Trader Funding lado a lado", "Règles séparées par compte prop — un challenge Topstep et un Apex Trader Funding côte à côte"],
    "Outgoing webhooks — Zapier, Make, n8n, Discord & Slack": ["Ausgehende Webhooks — Zapier, Make, n8n, Discord & Slack", "Webhooks salientes — Zapier, Make, n8n, Discord y Slack", "Webhooks de saída — Zapier, Make, n8n, Discord e Slack", "Webhooks sortants — Zapier, Make, n8n, Discord et Slack"],
    "Guided setup — broker, import, first read-out in three steps": ["Geführter Start — Broker, Import, erste Auswertung in drei Schritten", "Inicio guiado — bróker, importación y primera lectura en tres pasos", "Início guiado — corretora, importação e primeira leitura em três passos", "Démarrage guidé — courtier, import et première lecture en trois étapes"],
    "Referral programme — a free month of Pro for every friend who subscribes": ["Empfehlungsprogramm — ein Monat Pro gratis für jeden Freund, der abonniert", "Programa de referidos — un mes de Pro gratis por cada amigo que se suscriba", "Programa de indicação — um mês de Pro grátis para cada amigo que assinar", "Parrainage — un mois de Pro offert pour chaque ami qui s’abonne"],
    "Market Replay — trade any past day candle by candle": ["Market Replay — jeden vergangenen Tag Kerze für Kerze handeln", "Market Replay — opera cualquier día pasado vela a vela", "Market Replay — opere qualquer dia passado vela a vela", "Market Replay — tradez n’importe quel jour passé bougie par bougie"],
    "Evidence Score — a single 0–100 read on your trading, weighted to process over profit, with the full breakdown": ["Evidence Score — eine einzige Zahl von 0–100 für dein Trading, Prozess vor Gewinn gewichtet, mit voller Aufschlüsselung", "Evidence Score — una sola lectura de 0–100 de tu trading, ponderada hacia el proceso más que el beneficio, con el desglose completo", "Evidence Score — uma única leitura de 0–100 do seu trading, com peso maior no processo do que no lucro, com detalhamento completo", "Evidence Score — une seule note de 0 à 100 de votre trading, pondérée vers le processus plutôt que le profit, avec le détail complet"],
    "Stat Lab — 68 metrics in 6 groups, broken down by any of 12 dimensions": ["Stat Lab — 68 Kennzahlen in 6 Gruppen, aufgeteilt nach jeder von 12 Dimensionen", "Stat Lab — 68 métricas en 6 grupos, desglosadas por cualquiera de 12 dimensiones", "Stat Lab — 68 métricas em 6 grupos, divididas por qualquer uma de 12 dimensões", "Stat Lab — 68 métriques en 6 groupes, ventilées selon 12 dimensions au choix"],
    "Edge & Leaks — what to do more of and what to stop, statistically tested": ["Edge & Leaks — wovon du mehr tun und womit du aufhören solltest, statistisch geprüft", "Edge & Leaks — qué hacer más y qué dejar de hacer, probado estadísticamente", "Edge & Leaks — o que fazer mais e o que parar de fazer, testado estatisticamente", "Edge & Leaks — ce qu’il faut faire davantage et ce qu’il faut arrêter, testé statistiquement"],
    "Custom metrics — write your own formula over any statistic": ["Eigene Kennzahlen — schreib deine eigene Formel über jede Statistik", "Métricas propias — escribe tu propia fórmula sobre cualquier estadística", "Métricas próprias — escreva sua própria fórmula sobre qualquer estatística", "Métriques personnalisées — écrivez votre propre formule sur n’importe quelle statistique"],
    "Options exposure — net delta, gamma, theta & vega by underlying and expiry": ["Options-Exposure — Netto-Delta, Gamma, Theta & Vega nach Basiswert und Verfall", "Exposición en opciones — delta, gamma, theta y vega netos por subyacente y vencimiento", "Exposição em opções — delta, gama, theta e vega líquidos por ativo-objeto e vencimento", "Exposition options — delta, gamma, thêta et véga nets par sous-jacent et échéance"],
    "Session review — give-back, size drift, revenge windows & rule adherence": ["Sitzungsauswertung — Gewinnrückgabe, Positionsgrößen-Drift, Revenge-Fenster & Regeltreue", "Revisión de la sesión — beneficio devuelto, deriva del tamaño, ventanas de revenge y cumplimiento de reglas", "Revisão da sessão — lucro devolvido, desvio de tamanho, janelas de revenge e aderência às regras", "Revue de session — gains rendus, dérive de taille, fenêtres de revenge et respect des règles"],
    "Futures replay — ES, NQ, YM, GC, CL & micros in whole contracts (CFD price data)": ["Futures-Replay — ES, NQ, YM, GC, CL & Micros in ganzen Kontrakten (CFD-Kursdaten)", "Replay de futuros — ES, NQ, YM, GC, CL y micros en contratos enteros (datos de precio CFD)", "Replay de futuros — ES, NQ, YM, GC, CL e micros em contratos inteiros (dados de preço CFD)", "Replay des futures — ES, NQ, YM, GC, CL et micros en contrats entiers (données de prix CFD)"],
    "Multi-chart replay — 2 or 4 synced charts, no look-ahead": ["Multi-Chart-Replay — 2 oder 4 synchrone Charts, kein Blick in die Zukunft", "Replay multigráfico — 2 o 4 gráficos sincronizados, sin ver el futuro", "Replay com vários gráficos — 2 ou 4 gráficos sincronizados, sem olhar o futuro", "Replay multi-graphiques — 2 ou 4 graphiques synchronisés, sans regard vers le futur"],
    "Tradovate Auto-Sync — live futures fills, including while the app is closed": ["Tradovate-Auto-Sync — Live-Futures-Ausführungen, auch bei geschlossener App", "Auto-Sync de Tradovate — ejecuciones de futuros en vivo, también con la app cerrada", "Auto-Sync da Tradovate — execuções de futuros ao vivo, mesmo com o app fechado", "Auto-Sync Tradovate — exécutions futures en direct, même app fermée"],
    "Replay across 61 instruments — metals, 43 FX pairs, 10 indices, oil and crypto": ["Replay über 61 Instrumente — Metalle, 43 Devisenpaare, 10 Indizes, Öl und Krypto", "Replay en 61 instrumentos — metales, 43 pares de divisas, 10 índices, petróleo y cripto", "Replay em 61 instrumentos — metais, 43 pares de moedas, 10 índices, petróleo e cripto", "Replay sur 61 instruments — métaux, 43 paires de devises, 10 indices, pétrole et crypto"],
    "Replay timeframes from 1 minute to weekly, with session jumps and 0.5×–100× playback": ["Replay-Zeitebenen von 1 Minute bis Woche, mit Sitzungssprüngen und 0,5×–100× Abspielgeschwindigkeit", "Temporalidades de replay de 1 minuto a semanal, con saltos de sesión y velocidad de 0,5×–100×", "Tempos gráficos de replay de 1 minuto a semanal, com saltos de sessão e velocidade de 0,5×–100×", "Unités de temps du replay d’une minute à la semaine, avec sauts de session et lecture de 0,5× à 100×"],
    "Share a replay session — review mode, or the same day with an empty account for a student": ["Eine Replay-Sitzung teilen — Ansichtsmodus oder derselbe Tag mit leerem Konto für einen Schüler", "Comparte una sesión de replay — modo revisión o el mismo día con cuenta vacía para un alumno", "Compartilhe uma sessão de replay — modo revisão ou o mesmo dia com conta vazia para um aluno", "Partager une session de replay — mode revue, ou le même jour avec un compte vide pour un élève"],
    "Describe a strategy in plain words and get testable rules back for review": ["Beschreib eine Strategie in Klartext und erhalte prüfbare Regeln zur Durchsicht zurück", "Describe una estrategia con palabras sencillas y recibe reglas comprobables para revisar", "Descreva uma estratégia em palavras simples e receba regras testáveis para revisar", "Décrivez une stratégie en langage courant et recevez des règles testables à relire"],
    "Smart-money rule vocabulary — FVG, iFVG, CHoCH, BOS, liquidity sweeps, OTE, Power of Three, ADR, Asian range, SMT": ["Smart-Money-Regelvokabular — FVG, iFVG, CHoCH, BOS, Liquidity Sweeps, OTE, Power of Three, ADR, Asia-Range, SMT", "Vocabulario de reglas smart money — FVG, iFVG, CHoCH, BOS, barridos de liquidez, OTE, Power of Three, ADR, rango asiático, SMT", "Vocabulário de regras smart money — FVG, iFVG, CHoCH, BOS, varridas de liquidez, OTE, Power of Three, ADR, range asiático, SMT", "Vocabulaire de règles smart money — FVG, iFVG, CHoCH, BOS, balayages de liquidité, OTE, Power of Three, ADR, range asiatique, SMT"],
    "Academy — 27 chapters across four courses, free to read at": ["Academy — 27 Kapitel in vier Kursen, frei lesbar unter", "Academy — 27 capítulos en cuatro cursos, gratis para leer en", "Academy — 27 capítulos em quatro cursos, grátis para ler em", "Academy — 27 chapitres en quatre cours, à lire gratuitement sur"],
    "/academy": ["/academy", "/academy", "/academy", "/academy"],
    "Every chapter answered with your own journal numbers instead of an example": ["Jedes Kapitel mit deinen eigenen Journal-Zahlen beantwortet statt mit einem Beispiel", "Cada capítulo respondido con las cifras de tu diario en lugar de un ejemplo", "Cada capítulo respondido com os números do seu diário em vez de um exemplo", "Chaque chapitre illustré par les chiffres de votre journal plutôt que par un exemple"],
    "Interactive blocks — position sizer, losing-run simulation, sample-size check": ["Interaktive Bausteine — Positionsrechner, Verlustserien-Simulation, Stichproben-Check", "Bloques interactivos — calculadora de posición, simulación de rachas perdedoras, comprobación del tamaño de muestra", "Blocos interativos — calculadora de posição, simulação de sequências de perdas, checagem do tamanho da amostra", "Blocs interactifs — calculateur de position, simulation de séries perdantes, contrôle de la taille d’échantillon"],
    "Chapters that surface themselves when your own numbers cross a line": ["Kapitel, die sich von selbst melden, wenn deine Zahlen eine Grenze überschreiten", "Capítulos que aparecen solos cuando tus cifras cruzan un límite", "Capítulos que aparecem sozinhos quando seus números passam de um limite", "Des chapitres qui apparaissent d’eux-mêmes quand vos chiffres franchissent un seuil"],
    "Strategy Drills — real historical locations from your own rules, future hidden": ["Strategie-Drills — echte historische Stellen aus deinen eigenen Regeln, Zukunft verdeckt", "Drills de estrategia — ubicaciones históricas reales según tus reglas, futuro oculto", "Drills de estratégia — pontos históricos reais a partir das suas regras, futuro escondido", "Exercices de stratégie — de vrais moments historiques tirés de vos règles, futur masqué"],
    "Join a Space — chat, voice, feed, board and library": ["Einem Space beitreten — Chat, Sprache, Feed, Board und Bibliothek", "Unirse a un Space — chat, voz, feed, tablero y biblioteca", "Entrar em um Space — chat, voz, feed, quadro e biblioteca", "Rejoindre un Space — chat, vocal, fil, classement et bibliothèque"],
    "Create and run your own Space": ["Einen eigenen Space gründen und führen", "Crear y dirigir tu propio Space", "Criar e administrar seu próprio Space", "Créer et animer votre propre Space"],
    "Server roles, channel rights, AutoMod and a moderation queue": ["Server-Rollen, Kanalrechte, AutoMod und eine Moderations-Warteschlange", "Roles de servidor, permisos de canal, AutoMod y cola de moderación", "Cargos do servidor, permissões de canal, AutoMod e fila de moderação", "Rôles du serveur, droits des salons, AutoMod et file de modération"],
    "Public track record — broker-synced trades only, in R, checked by Evidence on request": ["Öffentlicher Track Record — nur broker-synchronisierte Trades, in R, auf Anfrage von Evidence geprüft", "Historial público — solo operaciones sincronizadas con el bróker, en R, verificado por Evidence bajo petición", "Histórico público — só operações sincronizadas com a corretora, em R, verificado pelo Evidence a pedido", "Track record public — uniquement les trades synchronisés depuis le courtier, en R, vérifié par Evidence sur demande"],
    "Feed posts that carry the real trade data, with a replay button on each": ["Feed-Beiträge mit den echten Trade-Daten und einem Replay-Knopf an jedem", "Publicaciones con los datos reales de la operación y un botón de replay en cada una", "Posts com os dados reais da operação e um botão de replay em cada um", "Des publications avec les vraies données du trade et un bouton replay sur chacune"],
    "Space board ranked by Evidence Score, with per-figure consent": ["Space-Board nach Evidence Score sortiert, mit Einwilligung je Zahl", "Tablero del Space ordenado por Evidence Score, con consentimiento por cifra", "Quadro do Space ordenado pelo Evidence Score, com consentimento por número", "Classement du Space trié par Evidence Score, avec consentement chiffre par chiffre"],
    "Publish playbooks and courses to your members": ["Playbooks und Kurse für deine Mitglieder veröffentlichen", "Publica playbooks y cursos para tus miembros", "Publique playbooks e cursos para seus membros", "Publiez des playbooks et des cours pour vos membres"],
    "Owner view — who has gone quiet, whose process is slipping": ["Inhaber-Ansicht — wer still geworden ist, wessen Prozess nachlässt", "Vista del propietario — quién se ha quedado en silencio y a quién se le resiente el proceso", "Visão do dono — quem ficou quieto e cujo processo está piorando", "Vue du propriétaire — qui s’est tu, dont le processus se dégrade"],
    "Drills score rule adherence, and include the setups that lost by the rules": ["Drills bewerten Regeltreue und enthalten auch die Setups, die regelkonform verloren haben", "Los drills puntúan el cumplimiento de reglas e incluyen los setups que perdieron siguiéndolas", "Os drills avaliam a aderência às regras e incluem os setups que perderam seguindo as regras", "Les exercices notent le respect des règles et incluent les setups perdants malgré des règles suivies"],
    "Commitments — a habit per chapter, measured against your journal before and after": ["Vorsätze — eine Gewohnheit pro Kapitel, vorher und nachher an deinem Journal gemessen", "Compromisos — un hábito por capítulo, medido en tu diario antes y después", "Compromissos — um hábito por capítulo, medido no seu diário antes e depois", "Engagements — une habitude par chapitre, mesurée dans votre journal avant et après"],
    "Spaced repetition — questions you got wrong come back after 7 and 30 days": ["Verteilte Wiederholung — falsch beantwortete Fragen kommen nach 7 und 30 Tagen wieder", "Repaso espaciado — las preguntas que fallaste vuelven a los 7 y 30 días", "Repetição espaçada — as perguntas que você errou voltam após 7 e 30 dias", "Répétition espacée — les questions ratées reviennent après 7 et 30 jours"],
    "Your strategy written up as a book, with your own trades as the examples": ["Deine Strategie als Buch, mit deinen eigenen Trades als Beispielen", "Tu estrategia escrita como libro, con tus propias operaciones como ejemplos", "Sua estratégia escrita como livro, com suas próprias operações como exemplos", "Votre stratégie rédigée en livre, avec vos propres trades en exemples"],
    "Tick-precision fills — real tick order when stop and target share a candle": ["Tick-genaue Ausführungen — echte Tick-Reihenfolge, wenn Stop und Ziel in derselben Kerze liegen", "Ejecuciones con precisión de tick — orden real de ticks cuando stop y objetivo están en la misma vela", "Execuções com precisão de tick — ordem real dos ticks quando stop e alvo estão na mesma vela", "Exécutions au tick près — ordre réel des ticks quand stop et objectif sont dans la même bougie"],
    "Replay trade management — multi-TP scale-out, break-even, trailing stop, partial closes": ["Trade-Management im Replay — Multi-TP-Teilausstiege, Break-even, Trailing-Stop, Teilschließungen", "Gestión en el replay — salidas multi-TP, break-even, trailing stop, cierres parciales", "Gestão no replay — saídas multi-TP, break-even, trailing stop, fechamentos parciais", "Gestion dans le replay — sorties multi-TP, break-even, trailing stop, clôtures partielles"],
    "Drag stop & targets on the chart while the trade runs": ["Stop & Ziele im Chart ziehen, während der Trade läuft", "Arrastra stop y objetivos en el gráfico con la operación abierta", "Arraste stop e alvos no gráfico com a operação aberta", "Déplacez stop et objectifs sur le graphique pendant que le trade tourne"],
    "Saved backtests — reopen a run, review it or keep trading it": ["Gespeicherte Backtests — einen Lauf wieder öffnen, auswerten oder weiterhandeln", "Backtests guardados — reabre una sesión, revísala o sigue operando", "Backtests salvos — reabra uma sessão, revise ou continue operando", "Backtests enregistrés — rouvrez une session, relisez-la ou continuez à trader"],
    "Replay sessions — presets, resume, blind mode & a review against your playbook": ["Replay-Sitzungen — Vorlagen, Fortsetzen, Blindmodus & Auswertung gegen dein Playbook", "Sesiones de replay — plantillas, retomar, modo ciego y revisión frente a tu playbook", "Sessões de replay — modelos, retomar, modo cego e revisão contra seu playbook", "Sessions de replay — modèles, reprise, mode aveugle et revue face à votre playbook"],
    "Tick footprint — price ticks per level inside each candle (replay & zones view)": ["Tick-Footprint — Kursticks je Preisstufe in jeder Kerze (Replay & Zonenansicht)", "Footprint de ticks — ticks de precio por nivel dentro de cada vela (replay y vista de zonas)", "Footprint de ticks — ticks de preço por nível dentro de cada vela (replay e visão de zonas)", "Footprint de ticks — ticks de prix par niveau dans chaque bougie (replay et vue des zones)"],
    "Liquidity heatmap — Bookmap-style stop pools & volume bubbles (replay & zones view)": ["Liquiditäts-Heatmap — Stop-Pools im Bookmap-Stil & Volumenblasen (Replay & Zonenansicht)", "Mapa de calor de liquidez — pools de stops al estilo Bookmap y burbujas de volumen (replay y vista de zonas)", "Mapa de calor de liquidez — pools de stops no estilo Bookmap e bolhas de volume (replay e visão de zonas)", "Heatmap de liquidité — pools de stops façon Bookmap et bulles de volume (replay et vue des zones)"],
    "Strategy backtest & Monte-Carlo projection": ["Strategie-Backtest & Monte-Carlo-Projektion", "Backtest de estrategia y proyección Monte Carlo", "Backtest de estratégia e projeção de Monte Carlo", "Backtest de stratégie et projection Monte-Carlo"],
    "Trade Replay — your own trades played back candle by candle": ["Trade-Replay — deine eigenen Trades Kerze für Kerze abgespielt", "Replay de operaciones — tus propias operaciones reproducidas vela a vela", "Replay de operações — suas próprias operações reproduzidas vela a vela", "Replay de trades — vos propres trades rejoués bougie par bougie"],
    "Day Replay — a whole session, every trade in the order you took them": ["Day-Replay — eine ganze Sitzung, jeder Trade in der Reihenfolge, in der du ihn genommen hast", "Replay del día — una sesión entera, cada operación en el orden en que la tomaste", "Replay do dia — uma sessão inteira, cada operação na ordem em que você a fez", "Replay de journée — une session entière, chaque trade dans l’ordre où vous l’avez pris"],
    "Higher timeframe alongside the entry, running on the same clock": ["Höhere Zeitebene neben dem Einstieg, auf derselben Uhr", "Temporalidad mayor junto a la entrada, con el mismo reloj", "Tempo gráfico maior ao lado da entrada, no mesmo relógio", "Unité de temps supérieure à côté de l’entrée, sur la même horloge"],
    "Notes, tags & chart snapshots written during the replay": ["Notizen, Tags & Chart-Schnappschüsse während des Replays", "Notas, etiquetas y capturas del gráfico durante el replay", "Notas, tags e capturas do gráfico durante o replay", "Notes, tags et captures du graphique pendant le replay"],
    "Stop-vs-target collisions resolved from real ticks, not guessed": ["Stop-gegen-Ziel-Kollisionen aus echten Ticks entschieden, nicht geraten", "Choques entre stop y objetivo resueltos con ticks reales, no adivinados", "Colisões entre stop e alvo resolvidas com ticks reais, não adivinhadas", "Collisions stop/objectif tranchées avec les vrais ticks, pas devinées"],
    "Auto MFE / MAE from price data": ["Automatisches MFE / MAE aus Kursdaten", "MFE / MAE automáticos con datos de precio", "MFE / MAE automáticos com dados de preço", "MFE / MAE automatiques à partir des données de prix"],
    "Decision Trainer — calibration of your confidence: hit rate per stated confidence, Brier score, R per conviction level": ["Entscheidungs-Training – Kalibrierung deiner Sicherheit: Trefferquote je angegebener Sicherheit, Brier-Score, R je Überzeugungsstufe", "Entrenador de decisiones: calibración de tu confianza; acierto por confianza declarada, puntuación Brier, R por nivel de convicción", "Treino de decisões — calibração da sua confiança: acerto por confiança declarada, pontuação Brier, R por nível de convicção", "Entraîneur de décisions — calibration de ta confiance : réussite par confiance annoncée, score de Brier, R par niveau de conviction"],
    "Rule Contract — daily check on synced trades, clean-day streak, penalty day with tightened Guardrails, value of keeping it": ["Regel-Vertrag – tägliche Prüfung an synchronisierten Trades, Serie sauberer Tage, Straftag mit engeren Guardrails, was das Einhalten wert ist", "Contrato de reglas: control diario con operaciones sincronizadas, racha de días limpios, día de penalización con Guardrails más estrictos y lo que vale cumplirlo", "Contrato de regras — verificação diária nas operações sincronizadas, sequência de dias limpos, dia de penalidade com Guardrails mais rígidos, o valor de cumpri-lo", "Contrat de règles — contrôle quotidien sur les trades synchronisés, série de jours propres, jour de pénalité avec Guardrails plus stricts, ce que vaut le respecter"],
    "Market Weather — conditions of today vs your record, ridge-combined, walk-forward checked, optional Guardrails on storm days": ["Marktwetter – heutige Bedingungen gegen deine Bilanz, per Ridge kombiniert, Walk-forward geprüft, optional Guardrails an Sturmtagen", "Clima de mercado: condiciones de hoy frente a tu historial, combinadas con ridge, comprobadas walk-forward, Guardrails opcionales en días de tormenta", "Clima de mercado — condições de hoje vs. seu histórico, combinadas por ridge, verificadas walk-forward, Guardrails opcionais em dias de tempestade", "Météo de marché — conditions du jour face à ton historique, combinées par ridge, vérifiées en walk-forward, Guardrails optionnels les jours de tempête"],
    "Blind Duel — create duels on hidden days of history and rank everyone who plays them (joining an invite is free)": ["Blind-Duell – Duelle auf verborgenen Tagen der Historie erstellen und alle Teilnehmer ranken (eine Einladung anzunehmen ist kostenlos)", "Duelo a ciegas: crea duelos en días ocultos de la historia y clasifica a todos los que los juegan (aceptar una invitación es gratis)", "Duelo às cegas — crie duelos em dias ocultos do histórico e classifique todos que jogam (aceitar um convite é grátis)", "Duel à l’aveugle — crée des duels sur des journées cachées de l’historique et classe tous ceux qui les jouent (rejoindre une invitation est gratuit)"],
    "Prop Challenge Simulator — multi-day challenge on real history, account carried day to day, firm rules, pass/fail report": ["Prop-Challenge-Simulator – mehrtägige Challenge auf echter Historie, Konto von Tag zu Tag weitergeführt, Firmenregeln, Bericht zu Bestanden/Gescheitert", "Simulador de desafíos prop: desafío de varios días con historia real, cuenta llevada día a día, reglas de la firma, informe de aprobado/suspendido", "Simulador de desafios prop — desafio de vários dias em histórico real, conta levada dia a dia, regras da firma, relatório de aprovado/reprovado", "Simulateur de challenge prop — challenge sur plusieurs jours sur un historique réel, compte reporté de jour en jour, règles de la firme, rapport réussi/échoué"],
    "Your Twin — same entries, your rules kept: exits, revenge trades, overtrading and position size priced one by one": ["Dein Zwilling – gleiche Einstiege, deine Regeln eingehalten: Ausstiege, Revenge-Trades, Overtrading und Positionsgröße einzeln beziffert", "Tu gemelo: mismas entradas, tus reglas cumplidas; salidas, operaciones de venganza, sobreoperar y tamaño de posición valorados uno a uno", "Seu gêmeo — mesmas entradas, suas regras cumpridas: saídas, operações de vingança, overtrading e tamanho da posição avaliados um a um", "Ton jumeau — mêmes entrées, tes règles respectées : sorties, trades de revanche, surtrading et taille de position chiffrés un par un"],
    "Exit Lab — set and forget vs your exits, best target tested out of sample, price after the exit": ["Exit-Labor – Stop und Ziel stehen lassen gegen deine Ausstiege, bestes Ziel außerhalb der Stichprobe geprüft, Kurs nach dem Ausstieg", "Laboratorio de salidas: dejar stop y objetivo frente a tus salidas, mejor objetivo probado fuera de muestra, precio tras la salida", "Laboratório de saídas — deixar stop e alvo vs. suas saídas, melhor alvo testado fora da amostra, preço após a saída", "Labo des sorties — stop et objectif laissés contre tes sorties, meilleur objectif testé hors échantillon, prix après la sortie"],
    "Benchmark vs buy & hold — annualised Sharpe against S&P 500, Nasdaq 100, MSCI World, 60/40, gold & Bitcoin": ["Benchmark gegen Buy & Hold — annualisierter Sharpe gegen S&P 500, Nasdaq 100, MSCI World, 60/40, Gold & Bitcoin", "Benchmark frente a comprar y mantener — Sharpe anualizado frente a S&P 500, Nasdaq 100, MSCI World, 60/40, oro y Bitcoin", "Benchmark contra buy & hold — Sharpe anualizado contra S&P 500, Nasdaq 100, MSCI World, 60/40, ouro e Bitcoin", "Benchmark face au buy & hold — Sharpe annualisé face au S&P 500, Nasdaq 100, MSCI World, 60/40, or et Bitcoin"],
    "R-Multiple analytics — distribution, cumulative R & R per setup": ["R-Multiple-Analyse — Verteilung, kumuliertes R & R je Setup", "Análisis de múltiplos de R — distribución, R acumulado y R por setup", "Análise de múltiplos de R — distribuição, R acumulado e R por setup", "Analyse des multiples de R — distribution, R cumulé et R par setup"],
    "Kelly criterion — growth-optimal risk per trade": ["Kelly-Kriterium — wachstumsoptimales Risiko pro Trade", "Criterio de Kelly — riesgo óptimo para el crecimiento por operación", "Critério de Kelly — risco ideal para crescimento por operação", "Critère de Kelly — risque optimal pour la croissance par trade"],
    "Challenge mode — your prop firm's rules enforced inside the replay; break one and the session stops": ["Challenge-Modus — die Regeln deiner Prop-Firma gelten im Replay; brich eine und die Sitzung endet", "Modo challenge — las reglas de tu prop firm se aplican en el replay; rompe una y la sesión termina", "Modo challenge — as regras da sua prop firm valem no replay; quebre uma e a sessão termina", "Mode challenge — les règles de votre prop firm s’appliquent dans le replay ; enfreignez-en une et la session s’arrête"],
    "Prop size on the chart and the challenge in Start my day & the coach": ["Prop-Positionsgröße im Chart und die Challenge in Start my day & im Coach", "Tamaño prop en el gráfico y el challenge en Start my day y en el coach", "Tamanho prop no gráfico e o challenge no Start my day e no coach", "Taille prop sur le graphique et le challenge dans Start my day et le coach"],
    "Confluence — which of your conditions pay alone and in combination, with a minimum sample enforced": ["Konfluenz — welche deiner Bedingungen sich einzeln und kombiniert auszahlen, mit Mindeststichprobe", "Confluencia — cuáles de tus condiciones rinden solas y combinadas, con una muestra mínima obligatoria", "Confluência — quais das suas condições pagam sozinhas e combinadas, com amostra mínima obrigatória", "Confluence — lesquelles de vos conditions paient seules et combinées, avec un échantillon minimum imposé"],
    "Chart workspace — toolbar, stage and dock in one frame, no page scrolling": ["Chart-Werkstatt — Werkzeugleiste, Bühne und Dock in einem Rahmen, kein Seiten-Scrollen", "Espacio de gráficos — barra de herramientas, escenario y dock en un marco, sin desplazar la página", "Espaço de gráficos — barra de ferramentas, palco e dock em um quadro, sem rolar a página", "Espace graphique — barre d’outils, scène et dock dans un cadre, sans défilement de page"],
    "23 drawing tools with favourites — editable afterwards, plus a position tool with live R:R": ["23 Zeichenwerkzeuge mit Favoriten — nachträglich bearbeitbar, dazu ein Positionswerkzeug mit Live-R:R", "23 herramientas de dibujo con favoritos — editables después, más una herramienta de posición con R:R en vivo", "23 ferramentas de desenho com favoritos — editáveis depois, mais uma ferramenta de posição com R:R ao vivo", "23 outils de dessin avec favoris — modifiables ensuite, plus un outil de position avec R:R en direct"],
    "AI Trading Coach — reads your journal, not a chatbot bolted on": ["KI-Trading-Coach — liest dein Journal, kein angeflanschter Chatbot", "Coach de trading con IA — lee tu diario, no es un chatbot añadido", "Coach de trading com IA — lê seu diário, não é um chatbot acoplado", "Coach de trading IA — lit votre journal, pas un chatbot greffé"],
    "Start my day — the day's high-impact events plus your own record on this weekday and session": ["Start my day — die wichtigen Termine des Tages plus deine eigene Bilanz an diesem Wochentag und in dieser Sitzung", "Start my day — los eventos de alto impacto del día y tu propio historial en este día y sesión", "Start my day — os eventos de alto impacto do dia e seu próprio histórico neste dia da semana e sessão", "Start my day — les événements à fort impact du jour et votre propre bilan ce jour de la semaine et sur cette session"],
    "Proactive AI insights (every 10 trades)": ["Proaktive KI-Hinweise (alle 10 Trades)", "Avisos proactivos de IA (cada 10 operaciones)", "Alertas proativos de IA (a cada 10 operações)", "Conseils IA proactifs (tous les 10 trades)"],
    "Auto-Tagging rules + AI tag suggestions": ["Auto-Tagging-Regeln + KI-Tag-Vorschläge", "Reglas de etiquetado automático + sugerencias de etiquetas con IA", "Regras de tags automáticas + sugestões de tags por IA", "Règles de tags automatiques + suggestions de tags par IA"],
    "Live trade alerts + auto A–F trade review": ["Live-Trade-Warnungen + automatische A–F-Bewertung", "Alertas en vivo + revisión automática A–F", "Alertas ao vivo + avaliação automática A–F", "Alertes en direct + note automatique de A à F"],
    "Chart AI — five timeframes read at once, supply & demand areas scored, judged against your own playbook, setup with a live R ladder": ["Chart-KI — fünf Zeitebenen auf einmal gelesen, Angebots- & Nachfragezonen bewertet, an deinem eigenen Playbook gemessen, Setup mit Live-R-Leiter", "IA de gráficos — cinco temporalidades a la vez, zonas de oferta y demanda puntuadas, evaluadas con tu propio playbook, setup con escala de R en vivo", "IA de gráficos — cinco tempos gráficos de uma vez, zonas de oferta e demanda pontuadas, avaliadas pelo seu playbook, setup com escada de R ao vivo", "IA graphique — cinq unités de temps lues d’un coup, zones d’offre et de demande notées, jugées selon votre playbook, setup avec échelle de R en direct"],
    "Click a zone for entry, stop and several take-profits — with every number checked against the candles": ["Klick auf eine Zone für Einstieg, Stop und mehrere Take-Profits — jede Zahl gegen die Kerzen geprüft", "Haz clic en una zona para entrada, stop y varios take-profits — cada número comprobado con las velas", "Clique em uma zona para entrada, stop e vários take-profits — cada número conferido com as velas", "Cliquez sur une zone pour l’entrée, le stop et plusieurs take-profits — chaque chiffre vérifié sur les bougies"],
    "Setup watcher — an alert when price reaches a zone, and while a trade of yours is running": ["Setup-Wächter — ein Alarm, wenn der Kurs eine Zone erreicht und während ein Trade von dir läuft", "Vigilante de setups — una alerta cuando el precio llega a una zona y mientras tienes una operación abierta", "Vigia de setups — um alerta quando o preço chega a uma zona e enquanto uma operação sua está aberta", "Veilleur de setups — une alerte quand le prix atteint une zone, et pendant qu’un de vos trades est ouvert"],
    "Zones chart — every timeframe M1–D1, up to 4 charts, drawing tools, indicators, sessions & news, your own zones": ["Zonen-Chart — jede Zeitebene M1–D1, bis zu 4 Charts, Zeichenwerkzeuge, Indikatoren, Sitzungen & News, deine eigenen Zonen", "Gráfico de zonas — todas las temporalidades M1–D1, hasta 4 gráficos, herramientas de dibujo, indicadores, sesiones y noticias, tus propias zonas", "Gráfico de zonas — todos os tempos M1–D1, até 4 gráficos, ferramentas de desenho, indicadores, sessões e notícias, suas próprias zonas", "Graphique des zones — toutes les unités M1–D1, jusqu’à 4 graphiques, outils de dessin, indicateurs, sessions et news, vos propres zones"],
    "Zones view — every analysed zone on its own chart with a measured hold rate, updating without the AI": ["Zonenansicht — jede analysierte Zone auf eigenem Chart mit gemessener Haltequote, aktualisiert sich ohne KI", "Vista de zonas — cada zona analizada en su propio gráfico con tasa de respeto medida, se actualiza sin la IA", "Visão de zonas — cada zona analisada em seu próprio gráfico com taxa de respeito medida, atualiza sem a IA", "Vue des zones — chaque zone analysée sur son propre graphique avec un taux de tenue mesuré, mise à jour sans l’IA"],
    "Zone confluence score, test history, zone alerts, zone replay and plan to journal": ["Zonen-Konfluenzwert, Testverlauf, Zonen-Alarme, Zonen-Replay und Plan ins Journal", "Puntuación de confluencia, historial de pruebas, alertas, replay de zonas y plan al diario", "Nota de confluência, histórico de testes, alertas, replay de zonas e plano para o diário", "Score de confluence, historique des tests, alertes, replay des zones et plan vers le journal"],
    "Every zone idea tracked to its result — so you can see whether trading with the AI actually pays": ["Jede Zonen-Idee bis zum Ergebnis verfolgt — so siehst du, ob sich das Traden mit der KI wirklich lohnt", "Cada idea de zona seguida hasta su resultado — para ver si operar con la IA rinde de verdad", "Cada ideia de zona acompanhada até o resultado — para ver se operar com a IA realmente compensa", "Chaque idée de zone suivie jusqu’au résultat — pour voir si trader avec l’IA paie vraiment"],
    "Tiltmeter — automatic tilt detection": ["Tiltmeter — automatische Tilt-Erkennung", "Tiltmeter — detección automática del tilt", "Tiltmeter — detecção automática de tilt", "Tiltmeter — détection automatique du tilt"],
    "Habit Tracker + performance correlation": ["Gewohnheits-Tracker + Korrelation mit der Performance", "Seguimiento de hábitos + correlación con el rendimiento", "Controle de hábitos + correlação com o desempenho", "Suivi des habitudes + corrélation avec la performance"],
    "Mindset log on every journal day": ["Mindset-Log an jedem Journaltag", "Registro de mentalidad en cada día del diario", "Registro de mentalidade em cada dia do diário", "Journal d’état d’esprit chaque jour"],
    "Psychology dashboard — Mind Score, trends, mistake & strength heatmaps": ["Psychologie-Dashboard — Mind Score, Trends, Heatmaps für Fehler & Stärken", "Panel de psicología — Mind Score, tendencias, mapas de calor de errores y fortalezas", "Painel de psicologia — Mind Score, tendências, mapas de calor de erros e pontos fortes", "Tableau de bord psychologique — Mind Score, tendances, heatmaps des erreurs et des forces"],
    "Glossary AI lookup for terms outside the curated 429": ["Glossar-KI-Suche für Begriffe außerhalb der kuratierten 429", "Búsqueda con IA en el glosario para términos fuera de los 429 seleccionados", "Busca com IA no glossário para termos fora dos 429 selecionados", "Recherche IA dans le glossaire pour les termes hors des 429 sélectionnés"],
    "Books — handwriting fonts, images, drawing, page-turn animation (up to 3 books, 100 pages each)": ["Bücher — Handschrift-Schriften, Bilder, Zeichnen, Umblätter-Animation (bis zu 3 Bücher mit je 100 Seiten)", "Libros — fuentes manuscritas, imágenes, dibujo, animación de pasar página (hasta 3 libros de 100 páginas)", "Livros — fontes manuscritas, imagens, desenho, animação de virar página (até 3 livros de 100 páginas)", "Livres — polices manuscrites, images, dessin, animation de page tournée (jusqu’à 3 livres de 100 pages)"],
    "Unlimited books, pages & images": ["Unbegrenzt viele Bücher, Seiten & Bilder", "Libros, páginas e imágenes ilimitados", "Livros, páginas e imagens ilimitados", "Livres, pages et images illimités"],
    "Trade cards, trade comparisons & gallery pages in books": ["Trade-Karten, Trade-Vergleiche & Galerieseiten in Büchern", "Tarjetas de operaciones, comparaciones y páginas de galería en los libros", "Cartões de operações, comparações e páginas de galeria nos livros", "Cartes de trades, comparaisons et pages galerie dans les livres"],
    "Share books read-only with servers, coach, students or traders": ["Bücher nur lesend mit Servern, Coach, Schülern oder Tradern teilen", "Comparte libros en modo lectura con servidores, coach, alumnos o traders", "Compartilhe livros só para leitura com servidores, coach, alunos ou traders", "Partagez des livres en lecture seule avec des serveurs, votre coach, des élèves ou des traders"],
    "Book export (PDF, image) and AI handwriting-to-text & page summaries": ["Buch-Export (PDF, Bild) und KI-Handschrift-zu-Text & Seitenzusammenfassungen", "Exportación de libros (PDF, imagen) y paso de manuscrito a texto y resúmenes de página con IA", "Exportação de livros (PDF, imagem) e conversão de manuscrito em texto e resumos de página por IA", "Export des livres (PDF, image) et transcription de l’écriture et résumés de page par IA"],
    "Reading books others shared with you": ["Bücher lesen, die andere mit dir geteilt haben", "Lee libros que otros compartieron contigo", "Leia livros que outras pessoas compartilharam com você", "Lisez les livres que d’autres ont partagés avec vous"],
    "cTrader Auto-Sync (Live & Demo)": ["cTrader-Auto-Sync (Live & Demo)", "Auto-Sync de cTrader (real y demo)", "Auto-Sync do cTrader (real e demo)", "Auto-Sync cTrader (réel et démo)"],
    "Background sync — cTrader syncs while the app is closed": ["Hintergrund-Sync — cTrader synchronisiert bei geschlossener App", "Sincronización en segundo plano — cTrader sincroniza con la app cerrada", "Sincronização em segundo plano — o cTrader sincroniza com o app fechado", "Synchronisation en arrière-plan — cTrader se synchronise app fermée"],
    "MT5 Cloud Sync — investor password, no EA or PC needed": ["MT5 Cloud Sync — Investor-Passwort, kein EA oder PC nötig", "MT5 Cloud Sync — contraseña de inversor, sin EA ni PC", "MT5 Cloud Sync — senha de investidor, sem EA nem PC", "MT5 Cloud Sync — mot de passe investisseur, sans EA ni PC"],
    "Auto-Tracking — MT5 / ATAS / Quantower / TradingView / NinjaTrader (beta)": ["Auto-Tracking — MT5 / ATAS / Quantower / TradingView / NinjaTrader (Beta)", "Auto-Tracking — MT5 / ATAS / Quantower / TradingView / NinjaTrader (beta)", "Auto-Tracking — MT5 / ATAS / Quantower / TradingView / NinjaTrader (beta)", "Auto-Tracking — MT5 / ATAS / Quantower / TradingView / NinjaTrader (bêta)"],
    "Where are your trades now?": ["Wo liegen deine Trades gerade?", "¿Dónde están tus operaciones ahora?", "Onde estão suas operações agora?", "Où sont tes trades aujourd’hui ?"],
    "Create your free account and the import opens with the right preset and the export steps for that app.": ["Erstelle dein kostenloses Konto – der Import öffnet sich mit der passenden Vorlage und den Export-Schritten für diese App.", "Crea tu cuenta gratuita y la importación se abre con la plantilla correcta y los pasos de exportación de esa app.", "Crie sua conta gratuita e a importação abre com o modelo certo e os passos de exportação desse app.", "Crée ton compte gratuit et l’import s’ouvre avec le bon modèle et les étapes d’export de cette app."],
    "Stream overlay": ["Stream-Overlay", "Overlay para stream", "Overlay para live", "Overlay de stream"],
    "— your day live in OBS or Streamlabs, straight from the journal, with your referral code": ["— dein Tag live in OBS oder Streamlabs, direkt aus dem Journal, mit deinem Empfehlungscode", "— tu día en directo en OBS o Streamlabs, directo desde el diario, con tu código de referido", "— seu dia ao vivo no OBS ou Streamlabs, direto do diário, com seu código de indicação", "— ta journée en direct dans OBS ou Streamlabs, depuis le journal, avec ton code de parrainage"],
    "Stream overlay for OBS / Streamlabs — live P&L or R, win rate, streak and open trade, with a read-only overlay key": ["Stream-Overlay für OBS / Streamlabs – live P&L oder R, Trefferquote, Serie und offener Trade, mit eigenem Nur-Lese-Overlay-Key", "Overlay para OBS / Streamlabs: P&L o R en directo, tasa de acierto, racha y operación abierta, con una clave de solo lectura", "Overlay para OBS / Streamlabs — P&L ou R ao vivo, taxa de acerto, sequência e operação aberta, com chave só de leitura", "Overlay pour OBS / Streamlabs — P&L ou R en direct, taux de réussite, série et trade ouvert, avec une clé en lecture seule"],
    "TopstepX auto-sync": ["TopstepX-Auto-Sync", "Auto-sync de TopstepX", "Auto-sync do TopstepX", "Synchro auto TopstepX"],
    "— your Topstep accounts on ProjectX fill the journal by themselves, scale-outs joined into one trade": ["— deine Topstep-Konten auf ProjectX füllen das Journal von selbst, Teilausstiege werden zu einem Trade zusammengeführt", "— tus cuentas de Topstep en ProjectX llenan el diario solas; las salidas parciales se unen en una operación", "— suas contas Topstep no ProjectX preenchem o diário sozinhas; saídas parciais viram uma única operação", "— tes comptes Topstep sur ProjectX remplissent le journal tout seuls, les sorties partielles réunies en un trade"],
    "TopstepX Auto-Sync — futures prop accounts on ProjectX, partial exits joined into one trade": ["TopstepX-Auto-Sync — Futures-Prop-Konten auf ProjectX, Teilausstiege zu einem Trade zusammengeführt", "Auto-sync de TopstepX: cuentas prop de futuros en ProjectX, salidas parciales unidas en una operación", "Auto-sync do TopstepX — contas prop de futuros no ProjectX, saídas parciais unidas em uma operação", "Synchro auto TopstepX — comptes prop futures sur ProjectX, sorties partielles réunies en un trade"],
    "Crypto Auto-Sync — Binance & Bybit read-only API key": ["Krypto-Auto-Sync — Binance & Bybit mit Nur-Lese-API-Schlüssel", "Auto-Sync cripto — clave API de solo lectura de Binance y Bybit", "Auto-Sync cripto — chave de API somente leitura da Binance e Bybit", "Auto-Sync crypto — clé API en lecture seule Binance et Bybit"],
    "Statement import — every supported broker & prop firm, the format detected automatically": ["Kontoauszug-Import — jeder unterstützte Broker & jede Prop-Firma, Format automatisch erkannt", "Importación de extractos — todos los brókers y prop firms compatibles, formato detectado automáticamente", "Importação de extratos — toda corretora e prop firm suportada, formato detectado automaticamente", "Import de relevés — tous les courtiers et prop firms pris en charge, format détecté automatiquement"],
    "Import from another journal — TradeZella, TraderSync, Tradervue, TradesViz, Edgewonk, Trademetria": ["Import aus einem anderen Journal — TradeZella, TraderSync, Tradervue, TradesViz, Edgewonk, Trademetria", "Importación desde otro diario — TradeZella, TraderSync, Tradervue, TradesViz, Edgewonk, Trademetria", "Importação de outro diário — TradeZella, TraderSync, Tradervue, TradesViz, Edgewonk, Trademetria", "Import depuis un autre journal — TradeZella, TraderSync, Tradervue, TradesViz, Edgewonk, Trademetria"],
    "Import check — executions, the file's own P&L, duplicates, missing stops and timezone, shown before anything is written": ["Import-Check — Ausführungen, das eigene P&L der Datei, Duplikate, fehlende Stops und Zeitzone, gezeigt bevor etwas gespeichert wird", "Revisión de importación — ejecuciones, el P&L del propio archivo, duplicados, stops que faltan y zona horaria, antes de guardar nada", "Checagem de importação — execuções, o P&L do próprio arquivo, duplicados, stops ausentes e fuso horário, antes de gravar qualquer coisa", "Contrôle d’import — exécutions, P&L du fichier, doublons, stops manquants et fuseau horaire, affichés avant tout enregistrement"],
    "Connection health — every sync on one page, with an email when one stops delivering and a broker P&L check": ["Verbindungsstatus — jeder Sync auf einer Seite, mit E-Mail, wenn einer nicht mehr liefert, und Broker-P&L-Abgleich", "Estado de conexiones — cada sincronización en una página, con un correo cuando una deja de entregar y comprobación del P&L del bróker", "Saúde das conexões — cada sincronização em uma página, com e-mail quando uma para de entregar e conferência do P&L da corretora", "État des connexions — chaque synchronisation sur une page, avec un e-mail quand l’une ne livre plus et un contrôle du P&L du courtier"],
    "Free column mapping & saved import presets": ["Freie Spaltenzuordnung & gespeicherte Import-Vorlagen", "Asignación libre de columnas y plantillas de importación guardadas", "Mapeamento livre de colunas e modelos de importação salvos", "Association libre des colonnes et modèles d’import enregistrés"],
    "Reports — custom pivots, compare & share links": ["Berichte — eigene Pivots, Vergleiche & Teilen-Links", "Informes — pivotes personalizados, comparaciones y enlaces para compartir", "Relatórios — pivôs personalizados, comparações e links de compartilhamento", "Rapports — pivots personnalisés, comparaisons et liens de partage"],
    "REST API keys — read your journal from any external tool": ["REST-API-Schlüssel — lies dein Journal aus jedem externen Tool", "Claves API REST — lee tu diario desde cualquier herramienta externa", "Chaves de API REST — leia seu diário em qualquer ferramenta externa", "Clés API REST — lisez votre journal depuis n’importe quel outil externe"],
    "Strategy Lab — indicator rules backtested on real market data": ["Strategy Lab — Indikatorregeln an echten Marktdaten getestet", "Strategy Lab — reglas de indicadores probadas con datos reales de mercado", "Strategy Lab — regras de indicadores testadas com dados reais de mercado", "Strategy Lab — règles d’indicateurs testées sur de vraies données de marché"],
    "Parameter optimiser + walk-forward test": ["Parameter-Optimierer + Walk-forward-Test", "Optimizador de parámetros + prueba walk-forward", "Otimizador de parâmetros + teste walk-forward", "Optimiseur de paramètres + test walk-forward"],
    "Chart indicators (EMA, RSI, MACD, Bollinger, SuperTrend…)": ["Chart-Indikatoren (EMA, RSI, MACD, Bollinger, SuperTrend…)", "Indicadores de gráfico (EMA, RSI, MACD, Bollinger, SuperTrend…)", "Indicadores de gráfico (EMA, RSI, MACD, Bollinger, SuperTrend…)", "Indicateurs graphiques (EMA, RSI, MACD, Bollinger, SuperTrend…)"],
    "Multi-Frame charts (HTF/LTF, before/after)": ["Multi-Frame-Charts (HTF/LTF, vorher/nachher)", "Gráficos multi-marco (HTF/LTF, antes/después)", "Gráficos multiquadro (HTF/LTF, antes/depois)", "Graphiques multi-cadres (HTF/LTF, avant/après)"],
    "Multi-Account & account comparison (all major brokers)": ["Mehrere Konten & Kontenvergleich (alle großen Broker)", "Multicuenta y comparación de cuentas (todos los brókers principales)", "Multicontas e comparação de contas (todas as principais corretoras)", "Multi-comptes et comparaison des comptes (tous les grands courtiers)"],
    "Mentor / Team mode — coach cockpit, feedback & goals": ["Mentor-/Team-Modus — Coach-Cockpit, Feedback & Ziele", "Modo mentor / equipo — cabina del coach, feedback y objetivos", "Modo mentor / equipe — cockpit do coach, feedback e metas", "Mode mentor / équipe — cockpit du coach, retours et objectifs"],
    "Being coached — calls, chat, bookings, programmes and pre-trade checks with your coach": ["Gecoacht werden — Calls, Chat, Buchungen, Programme und Checks vor dem Trade mit deinem Coach", "Recibir coaching — llamadas, chat, reservas, programas y comprobaciones previas con tu coach", "Ser treinado — chamadas, chat, agendamentos, programas e checagens antes da operação com seu coach", "Être coaché — appels, chat, réservations, programmes et vérifications avant le trade avec votre coach"],
    "Coaching tools — calls with screen share, bookings, live student feed, process radar, programmes, client records, public coach page": ["Coaching-Werkzeuge — Calls mit Bildschirmfreigabe, Buchungen, Live-Schüler-Feed, Prozess-Radar, Programme, Kundenakten, öffentliche Coach-Seite", "Herramientas de coaching — llamadas con pantalla compartida, reservas, feed de alumnos en vivo, radar de proceso, programas, fichas de clientes, página pública del coach", "Ferramentas de coaching — chamadas com tela compartilhada, agendamentos, feed de alunos ao vivo, radar de processo, programas, fichas de clientes, página pública do coach", "Outils de coaching — appels avec partage d’écran, réservations, fil des élèves en direct, radar de processus, programmes, dossiers clients, page coach publique"],
    "Coaching server — invite link with journal sharing, assistant coaches, homework, measurable goals": ["Coaching-Server — Einladungslink mit Journal-Freigabe, Assistenz-Coaches, Hausaufgaben, messbare Ziele", "Servidor de coaching — enlace de invitación con diario compartido, coaches asistentes, deberes, objetivos medibles", "Servidor de coaching — link de convite com diário compartilhado, coaches assistentes, tarefas, metas mensuráveis", "Serveur de coaching — lien d’invitation avec partage du journal, coachs assistants, devoirs, objectifs mesurables"],
    "Coach tools — attention queue, 1:1 session log, weekly review drafted from the data": ["Coach-Werkzeuge — Aufmerksamkeitsliste, 1:1-Protokoll, Wochenauswertung aus den Daten vorformuliert", "Herramientas del coach — cola de atención, registro de sesiones 1:1, revisión semanal redactada a partir de los datos", "Ferramentas do coach — fila de atenção, registro de sessões 1:1, revisão semanal redigida a partir dos dados", "Outils du coach — file d’attention, journal des séances individuelles, revue hebdomadaire rédigée à partir des données"],
    "Being mentored as a student (coach needs Pro)": ["Als Schüler betreut werden (der Coach braucht Pro)", "Ser mentoreado como alumno (el coach necesita Pro)", "Ser mentorado como aluno (o coach precisa de Pro)", "Être mentoré en tant qu’élève (le coach a besoin de Pro)"],
    "Pre-trade rule check & rules engine": ["Regel-Check vor dem Trade & Regel-Engine", "Comprobación de reglas antes de operar y motor de reglas", "Checagem de regras antes da operação e motor de regras", "Vérification des règles avant le trade et moteur de règles"],
    "S&D Zones TradingView indicator — V4, zones built only after a measured impulse": ["S&D-Zones-Indikator für TradingView — V4, Zonen erst nach einem gemessenen Impuls", "Indicador S&D Zones para TradingView — V4, zonas solo tras un impulso medido", "Indicador S&D Zones para TradingView — V4, zonas só após um impulso medido", "Indicateur S&D Zones pour TradingView — V4, zones construites seulement après une impulsion mesurée"],
    "Weekly Intelligence Reports + PDF export": ["Wöchentliche Intelligence-Berichte + PDF-Export", "Informes semanales de inteligencia + exportación a PDF", "Relatórios semanais de inteligência + exportação em PDF", "Rapports hebdomadaires + export PDF"],
    "Goal tracker": ["Ziel-Tracker", "Seguimiento de objetivos", "Controle de metas", "Suivi d’objectifs"],
    "Journaling & Basics": ["Journal & Grundlagen", "Diario y fundamentos", "Diário e fundamentos", "Journal et bases"],
    "Edge Lab & Quant Analytics": ["Edge Lab & Quant-Analyse", "Edge Lab y análisis cuantitativo", "Edge Lab e análise quantitativa", "Edge Lab et analyse quantitative"],
    "AI & Psychology": ["KI & Psychologie", "IA y psicología", "IA e psicologia", "IA et psychologie"],
    "Integrations, Reports & Tools": ["Integrationen, Berichte & Werkzeuge", "Integraciones, informes y herramientas", "Integrações, relatórios e ferramentas", "Intégrations, rapports et outils"],
    "Feature": ["Funktion", "Función", "Recurso", "Fonction"],
    "Export your trades as a CSV file from": ["Exportiere deine Trades als CSV-Datei aus", "Exporta tus operaciones como archivo CSV desde", "Exporte suas operações como arquivo CSV a partir de", "Exportez vos trades en fichier CSV depuis"],
    "or": ["oder", "o", "ou", "ou"],
    "There is an import preset for each of these apps. Symbol, direction, prices, size, P&L, setup and notes are matched automatically. If a column does not match, you assign it once by hand, and the preset remembers it.": ["Für jede dieser Apps gibt es eine Import-Vorlage. Symbol, Richtung, Preise, Größe, P&L, Setup und Notizen werden automatisch zugeordnet. Passt eine Spalte nicht, ordnest du sie einmal von Hand zu, und die Vorlage merkt es sich.", "Hay una plantilla de importación para cada una de estas apps. Símbolo, dirección, precios, tamaño, P&L, setup y notas se asignan automáticamente. Si una columna no coincide, la asignas una vez a mano y la plantilla lo recuerda.", "Há um modelo de importação para cada um desses apps. Símbolo, direção, preços, tamanho, P&L, setup e notas são associados automaticamente. Se uma coluna não bater, você a associa uma vez à mão e o modelo lembra.", "Il existe un modèle d’import pour chacune de ces apps. Symbole, sens, prix, taille, P&L, setup et notes sont associés automatiquement. Si une colonne ne correspond pas, vous l’associez une fois à la main et le modèle s’en souvient."],
    "The import check shows duplicates, missing stops and timezone problems before any trade is saved. Nothing is imported until you confirm.": ["Der Import-Check zeigt Duplikate, fehlende Stops und Zeitzonenprobleme, bevor ein Trade gespeichert wird. Importiert wird erst, wenn du bestätigst.", "La revisión de importación muestra duplicados, stops que faltan y problemas de zona horaria antes de guardar ninguna operación. No se importa nada hasta que confirmes.", "A checagem de importação mostra duplicados, stops ausentes e problemas de fuso horário antes de gravar qualquer operação. Nada é importado até você confirmar.", "Le contrôle d’import montre les doublons, les stops manquants et les problèmes de fuseau horaire avant tout enregistrement. Rien n’est importé avant votre confirmation."],
    "Screenshots and chart images are not included, because these apps do not put them into their export files. Importing is free on every plan — no trial and no card needed.": ["Screenshots und Chartbilder kommen nicht mit, weil diese Apps sie nicht in ihre Exportdateien schreiben. Der Import ist in jedem Plan kostenlos — ohne Testphase und ohne Karte.", "Las capturas y las imágenes de gráficos no se incluyen, porque estas apps no las ponen en sus archivos de exportación. Importar es gratis en todos los planes, sin prueba ni tarjeta.", "Capturas de tela e imagens de gráficos não vêm junto, porque esses apps não as colocam nos arquivos de exportação. Importar é grátis em todos os planos — sem teste e sem cartão.", "Les captures et images de graphiques ne suivent pas, car ces apps ne les mettent pas dans leurs fichiers d’export. L’import est gratuit dans toutes les offres — sans essai ni carte."],
    "For streamers": ["Für Streamer", "Para streamers", "Para streamers", "Pour les streamers"],
    "Trade live. ": ["Live traden. ", "Opera en vivo. ", "Opere ao vivo. ", "Tradez en direct. "],
    "Show the real numbers.": ["Zeig die echten Zahlen.", "Muestra los números reales.", "Mostre os números reais.", "Montrez les vrais chiffres."],
    "Live overlay": ["Live-Overlay", "Overlay en vivo", "Overlay ao vivo", "Overlay en direct"],
    "Today's R, P&L or pips, win rate and open trades — updated from your journal while you trade. Hide money amounts with one switch.": ["Heutiges R, P&L oder Pips, Trefferquote und offene Trades — aus deinem Journal aktualisiert, während du tradest. Geldbeträge mit einem Schalter ausblenden.", "R, P&L o pips de hoy, tasa de acierto y operaciones abiertas, actualizados desde tu diario mientras operas. Oculta los importes con un interruptor.", "R, P&L ou pips de hoje, taxa de acerto e trades abertos — atualizados do seu diário enquanto você opera. Oculte valores com um botão.", "R, P&L ou pips du jour, taux de réussite et trades ouverts — mis à jour depuis votre journal pendant que vous tradez. Masquez les montants d’un clic."],
    "Copy, paste, done": ["Kopieren, einfügen, fertig", "Copiar, pegar, listo", "Copiar, colar, pronto", "Copier, coller, terminé"],
    "Add your live numbers to OBS or Streamlabs as a browser source — straight from your journal. Streaming regularly? Streamer partners also get a 3D sponsor banner with their own code and earn on every subscription.": ["Bring deine Live-Zahlen als Browserquelle in OBS oder Streamlabs — direkt aus deinem Journal. Du streamst regelmäßig? Streamer-Partner bekommen zusätzlich ein 3D-Sponsorbanner mit eigenem Code und verdienen an jedem Abo.", "Añade tus números en vivo a OBS o Streamlabs como fuente de navegador, directamente desde tu diario. ¿Haces streams con regularidad? Los partners streamers reciben además un banner de patrocinio 3D con su propio código y ganan con cada suscripción.", "Leve seus números ao vivo para o OBS ou Streamlabs como fonte de navegador — direto do seu diário. Faz streams com frequência? Parceiros streamers também recebem um banner de patrocínio 3D com código próprio e ganham em cada assinatura.", "Ajoutez vos chiffres en direct à OBS ou Streamlabs comme source navigateur — directement depuis votre journal. Vous streamez régulièrement ? Les partenaires streamers reçoivent aussi une bannière sponsor 3D avec leur propre code et gagnent sur chaque abonnement."],
    "3D sponsor banner for partners": ["3D-Sponsorbanner für Partner", "Banner de patrocinio 3D para partners", "Banner de patrocínio 3D para parceiros", "Bannière sponsor 3D pour les partenaires"],
    "Streamer partners get this gold banner with their own code, in landscape for Twitch and YouTube or portrait for TikTok, Reels and Shorts — and earn on every subscription.": ["Streamer-Partner bekommen dieses Goldbanner mit eigenem Code, quer für Twitch und YouTube oder hochkant für TikTok, Reels und Shorts — und verdienen an jedem Abo.", "Los partners streamers reciben este banner dorado con su propio código, horizontal para Twitch y YouTube o vertical para TikTok, Reels y Shorts, y ganan con cada suscripción.", "Parceiros streamers recebem este banner dourado com código próprio, horizontal para Twitch e YouTube ou vertical para TikTok, Reels e Shorts — e ganham em cada assinatura.", "Les partenaires streamers reçoivent cette bannière dorée avec leur propre code, en paysage pour Twitch et YouTube ou en portrait pour TikTok, Reels et Shorts — et gagnent sur chaque abonnement."],
    "Settings → Streaming gives you the overlay link. Paste it as a browser source — no plugin, no download.": ["Unter Einstellungen → Streaming bekommst du den Overlay-Link. Als Browserquelle einfügen — kein Plugin, kein Download.", "En Ajustes → Streaming tienes el enlace del overlay. Pégalo como fuente de navegador, sin plugin ni descarga.", "Em Configurações → Streaming você recebe o link do overlay. Cole como fonte de navegador — sem plugin, sem download.", "Paramètres → Streaming vous donne le lien de l’overlay. Collez-le comme source navigateur — sans plugin ni téléchargement."],
    "Live preview of the partner banner": ["Live-Vorschau des Partner-Banners", "Vista previa en vivo del banner de partner", "Prévia ao vivo do banner de parceiro", "Aperçu en direct de la bannière partenaire"],
    "Apply as a streamer partner →": ["Als Streamer-Partner bewerben →", "Solicitar ser partner streamer →", "Candidatar-se como parceiro streamer →", "Devenir partenaire streamer →"],
    "Most traders who try a new journal already keep one somewhere else. Starting from zero would throw away your history, and your history is the whole point of a journal.": ["Die meisten, die ein neues Journal ausprobieren, führen schon irgendwo eins. Bei null anzufangen hieße, deine Historie wegzuwerfen, und genau die ist der Sinn eines Journals.", "La mayoría de los traders que prueban un diario nuevo ya llevan uno en otra parte. Empezar de cero sería tirar tu historial, y tu historial es todo el sentido de un diario.", "A maioria dos traders que testam um novo diário já mantém um em outro lugar. Começar do zero jogaria fora seu histórico, e seu histórico é todo o sentido de um diário.", "La plupart des traders qui essaient un nouveau journal en tiennent déjà un ailleurs. Repartir de zéro jetterait votre historique, et votre historique est tout l’intérêt d’un journal."],
    "Written inside the app by people who use it, and published only after review. Nothing here is scripted or bought.": ["Geschrieben in der App von Leuten, die sie nutzen, und erst nach Prüfung veröffentlicht. Nichts davon ist gestellt oder gekauft.", "Escrito dentro de la app por personas que la usan, y publicado solo tras una revisión. Nada aquí está guionizado ni comprado.", "Escrito dentro do app por pessoas que o usam, e publicado só depois de revisado. Nada aqui é roteirizado ou comprado.", "Rédigé dans l’app par des personnes qui l’utilisent, et publié seulement après vérification. Rien ici n’est scénarisé ni acheté."],
    "soon": ["bald", "pronto", "em breve", "bientôt"],
    // Sprach-Aufräumen 23.10.2026 — alle Landing-Texte, die bis dahin
    // Google Translate überlassen waren (gemessen: 280 Textknoten).
    "MT5 Cloud Sync": ["MT5 Cloud Sync","MT5 Cloud Sync","MT5 Cloud Sync","MT5 Cloud Sync"],
    "No mockups and no edited video. What you see below is the actual Evidence application, loaded with a sample journal of ~170 trades across three accounts. Click the tabs, scroll inside it, open any screen. It is fully interactive, and nothing you do is saved anywhere.": ["Keine Mockups, kein geschnittenes Video. Was du unten siehst, ist die echte Evidence-App, geladen mit einem Beispiel-Journal aus ~170 Trades auf drei Konten. Klick die Reiter an, scroll darin, öffne jeden Bildschirm. Alles ist bedienbar, und nichts, was du tust, wird gespeichert.","Sin maquetas ni vídeo editado. Lo que ves abajo es la app real de Evidence, cargada con un diario de ejemplo de ~170 operaciones en tres cuentas. Pulsa las pestañas, desplázate dentro, abre cualquier pantalla. Es totalmente interactiva y nada de lo que hagas se guarda.","Sem mockups e sem vídeo editado. O que você vê abaixo é o app real do Evidence, carregado com um diário de exemplo de ~170 operações em três contas. Clique nas abas, role dentro dele, abra qualquer tela. É totalmente interativo e nada do que você faz é salvo.","Pas de maquette ni de vidéo montée. Ce que vous voyez ci-dessous est la vraie application Evidence, chargée avec un journal d’exemple d’environ 170 trades sur trois comptes. Cliquez sur les onglets, faites défiler, ouvrez n’importe quel écran. Tout est interactif et rien de ce que vous faites n’est enregistré."],
    "evidencetrading.com / overview": ["evidencetrading.com / Übersicht","evidencetrading.com / resumen","evidencetrading.com / visão geral","evidencetrading.com / aperçu"],
    "Live demo": ["Live-Demo","Demo en vivo","Demo ao vivo","Démo en direct"],
    "Loads the full application with sample data — about 2 seconds, no account needed.": ["Lädt die komplette App mit Beispieldaten – etwa 2 Sekunden, ohne Konto.","Carga la app completa con datos de ejemplo: unos 2 segundos, sin cuenta.","Carrega o app completo com dados de exemplo — cerca de 2 segundos, sem conta.","Charge l’application complète avec des données d’exemple — environ 2 secondes, sans compte."],
    "Dashboard": ["Dashboard","Panel","Painel","Tableau de bord"],
    "Everything at a glance: equity curve, net result, win rate, profit factor and today's discipline — recalculated from every trade you log or sync.": ["Alles auf einen Blick: Equity-Kurve, Nettoergebnis, Win-Rate, Profit-Faktor und deine heutige Disziplin – neu berechnet aus jedem Trade, den du einträgst oder synchronisierst.","Todo de un vistazo: curva de equity, resultado neto, win rate, profit factor y la disciplina de hoy, recalculado con cada operación que registras o sincronizas.","Tudo num relance: curva de equity, resultado líquido, win rate, profit factor e a disciplina de hoje — recalculado a cada operação registrada ou sincronizada.","Tout d’un coup d’œil : courbe d’equity, résultat net, win rate, profit factor et discipline du jour — recalculés à chaque trade saisi ou synchronisé."],
    "Demo data only · nothing is stored · the tour stops as soon as you use the app": ["Nur Demodaten · nichts wird gespeichert · die Tour endet, sobald du die App benutzt","Solo datos de demo · no se guarda nada · el recorrido se detiene en cuanto usas la app","Apenas dados de demonstração · nada é salvo · o tour para assim que você usa o app","Données de démo uniquement · rien n’est enregistré · la visite s’arrête dès que vous utilisez l’application"],
    "Evidence is young and we would rather show the product than quote anonymous praise. The demo above is the complete app — every Pro feature unlocked, nothing hidden behind a form.": ["Evidence ist jung, und wir zeigen lieber das Produkt, als anonymes Lob zu zitieren. Die Demo oben ist die komplette App – jede Pro-Funktion freigeschaltet, nichts hinter einem Formular versteckt.","Evidence es joven y preferimos mostrar el producto antes que citar elogios anónimos. La demo de arriba es la app completa: todas las funciones Pro desbloqueadas, nada oculto tras un formulario.","O Evidence é jovem e preferimos mostrar o produto a citar elogios anônimos. A demo acima é o app completo — todos os recursos Pro liberados, nada escondido atrás de um formulário.","Evidence est jeune et nous préférons montrer le produit plutôt que citer des éloges anonymes. La démo ci-dessus est l’application complète — toutes les fonctions Pro débloquées, rien de caché derrière un formulaire."],
    "Register with an email, then start the trial with one click. No payment details, no auto-renewal trap — when the week ends you simply drop back to the free plan.": ["Registrier dich mit deiner E-Mail und starte die Testphase mit einem Klick. Keine Zahlungsdaten, keine Abo-Falle – nach einer Woche bist du einfach wieder im kostenlosen Plan.", "Regístrate con un email y activa la prueba con un clic. Sin datos de pago ni renovación automática: al acabar la semana vuelves sin más al plan gratuito.", "Cadastre-se com um e-mail e comece o teste com um clique. Sem dados de pagamento, sem renovação automática — ao fim da semana você simplesmente volta ao plano grátis.", "Inscrivez-vous avec un e-mail, puis lancez l’essai en un clic. Aucune donnée de paiement, aucun renouvellement piège — à la fin de la semaine, vous revenez simplement au plan gratuit."],
    "Trades, notes and screenshots live in a document only your account can read. Broker access is read-only, and you can delete everything with one button in settings.": ["Trades, Notizen und Screenshots liegen in einem Dokument, das nur dein Konto lesen kann. Der Broker-Zugriff ist nur lesend, und mit einem Knopf in den Einstellungen löschst du alles.","Operaciones, notas y capturas están en un documento que solo tu cuenta puede leer. El acceso al bróker es de solo lectura y puedes borrarlo todo con un botón en los ajustes.","Operações, notas e capturas ficam num documento que só a sua conta pode ler. O acesso à corretora é somente leitura, e você apaga tudo com um botão nas configurações.","Trades, notes et captures sont dans un document que seul votre compte peut lire. L’accès au courtier est en lecture seule, et un bouton dans les réglages efface tout."],
    "What is Evidence": ["Was ist Evidence","Qué es Evidence","O que é o Evidence","Qu’est-ce qu’Evidence"],
    "is a journal and analytics app for active traders: a structured record of what you did, hard numbers on whether it worked, and a place to practise the parts that did not.": ["ist eine Journal- und Analyse-App für aktive Trader: eine geordnete Aufzeichnung dessen, was du getan hast, harte Zahlen dazu, ob es funktioniert hat, und ein Ort, um zu üben, was nicht funktioniert hat.","es una app de diario y análisis para traders activos: un registro ordenado de lo que hiciste, cifras claras sobre si funcionó y un lugar para practicar lo que no.","é um app de diário e análise para traders ativos: um registro organizado do que você fez, números concretos sobre se funcionou e um lugar para praticar o que não funcionou.","est une application de journal et d’analyse pour traders actifs : un registre structuré de ce que vous avez fait, des chiffres nets sur ce qui a marché, et un endroit pour travailler ce qui n’a pas marché."],
    "Getting trades in is not your job.": ["Trades einzutragen ist nicht deine Aufgabe.","Meter las operaciones no es tu trabajo.","Lançar operações não é trabalho seu.","Saisir vos trades n’est pas votre travail."],
    "and": ["und","y","e","et"],
    "sync on their own — even while the app is closed and you trade from your phone —": ["synchronisieren von selbst – auch wenn die App zu ist und du vom Handy aus tradest –","se sincronizan solos, incluso con la app cerrada y operando desde el móvil;","sincronizam sozinhos — mesmo com o app fechado e você operando pelo celular —","se synchronisent seuls — même application fermée, quand vous tradez depuis votre téléphone —"],
    "report fills live, and": ["melden Ausführungen live, und","envían las ejecuciones en vivo, y","enviam as execuções ao vivo, e","transmettent les exécutions en direct, et"],
    "connect with a read-only key. Anything else comes in as a statement from": ["verbinden sich mit einem Nur-Lese-Schlüssel. Alles andere kommt als Kontoauszug von","se conectan con una clave de solo lectura. Todo lo demás llega como extracto de","conectam com uma chave somente leitura. O resto chega como extrato de","se connectent avec une clé en lecture seule. Tout le reste arrive en relevé depuis"],
    "brokers and prop firms": ["Brokern und Prop-Firmen","brókers y prop firms","corretoras e prop firms","courtiers et prop firms"],
    ", or by hand.": [", oder von Hand.",", o a mano.",", ou à mão.",", ou à la main."],
    "Then the work starts: statistics that say how many trades stand behind each number, a replay that lets you trade any past day again, an AI coach that names the pattern behind your losing streaks — and a course that measures whether you actually changed.": ["Dann beginnt die Arbeit: Statistiken, die sagen, wie viele Trades hinter jeder Zahl stehen, ein Replay, mit dem du jeden vergangenen Tag noch einmal tradest, ein KI-Coach, der das Muster hinter deinen Verlustserien benennt – und ein Kurs, der misst, ob du dich wirklich verändert hast.","Luego empieza el trabajo: estadísticas que dicen cuántas operaciones hay detrás de cada cifra, un replay para volver a operar cualquier día pasado, un coach de IA que nombra el patrón detrás de tus rachas perdedoras y un curso que mide si de verdad cambiaste.","Aí começa o trabalho: estatísticas que dizem quantas operações estão por trás de cada número, um replay para operar de novo qualquer dia passado, um coach de IA que aponta o padrão por trás das suas sequências de perdas — e um curso que mede se você realmente mudou.","Ensuite, le vrai travail commence : des statistiques qui disent combien de trades se cachent derrière chaque chiffre, un replay pour retrader n’importe quel jour passé, un coach IA qui nomme le schéma derrière vos séries de pertes — et un cours qui mesure si vous avez vraiment changé."],
    "A journal only changes something if five things happen: your trades get in, get written up, get measured, get looked at honestly, and then get practised. Evidence does all five.": ["Ein Journal verändert nur etwas, wenn fünf Dinge passieren: Deine Trades kommen rein, werden aufgeschrieben, gemessen, ehrlich angeschaut und dann geübt. Evidence macht alle fünf.","Un diario solo cambia algo si pasan cinco cosas: tus operaciones entran, se documentan, se miden, se miran con honestidad y luego se practican. Evidence hace las cinco.","Um diário só muda algo se cinco coisas acontecerem: suas operações entram, são registradas, medidas, olhadas com honestidade e depois praticadas. O Evidence faz as cinco.","Un journal ne change quelque chose que si cinq choses se produisent : vos trades entrent, sont rédigés, mesurés, regardés honnêtement, puis travaillés. Evidence fait les cinq."],
    "Enter server, account number and the": ["Gib Server, Kontonummer und das","Introduce servidor, número de cuenta y la","Informe servidor, número da conta e a","Saisissez serveur, numéro de compte et le"],
    "read-only investor password": ["Investor-Passwort (nur lesend)","contraseña de inversor de solo lectura","senha de investidor somente leitura","mot de passe investisseur en lecture seule"],
    "once. Our MT5 server keeps the account in view around the clock, so every trade lands in your journal — opened on the phone, the desktop or a VPS — with SL/TP, commission and swap. No Expert Advisor, no PC left running.": ["einmal ein. Unser MT5-Server behält das Konto rund um die Uhr im Blick, sodass jeder Trade in deinem Journal landet – ob am Handy, am Desktop oder auf einem VPS eröffnet – mit SL/TP, Kommission und Swap. Kein Expert Advisor, kein PC, der durchlaufen muss.","una sola vez. Nuestro servidor MT5 vigila la cuenta día y noche, así que cada operación llega a tu diario —abierta en el móvil, el escritorio o un VPS— con SL/TP, comisión y swap. Sin Expert Advisor ni PC encendido.","uma única vez. Nosso servidor MT5 acompanha a conta 24 horas, então cada operação chega ao seu diário — aberta no celular, no desktop ou num VPS — com SL/TP, comissão e swap. Sem Expert Advisor, sem PC ligado.","une seule fois. Notre serveur MT5 surveille le compte jour et nuit, si bien que chaque trade arrive dans votre journal — ouvert sur téléphone, ordinateur ou VPS — avec SL/TP, commission et swap. Pas d’Expert Advisor, pas de PC allumé."],
    "How it works →": ["So funktioniert es →","Cómo funciona →","Como funciona →","Comment ça marche →"],
    "How it works": ["So funktioniert es","Cómo funciona","Como funciona","Comment ça marche"],
    "cTrader Auto-Sync": ["cTrader Auto-Sync","cTrader Auto-Sync","cTrader Auto-Sync","cTrader Auto-Sync"],
    "Live and demo accounts through the cTrader Open API. Switch on background sync and it keeps going with the app closed — capturing stop and target while the position is still open, the only moment your broker will tell anyone. Read-only: Evidence can see trades, never place or change one.": ["Live- und Demokonten über die cTrader Open API. Schalte den Hintergrund-Sync ein, und er läuft auch bei geschlossener App weiter – er erfasst Stop und Ziel, solange die Position noch offen ist, der einzige Moment, in dem dein Broker das überhaupt verrät. Nur lesend: Evidence sieht Trades, kann aber nie einen eröffnen oder ändern.","Cuentas reales y demo mediante la cTrader Open API. Activa la sincronización en segundo plano y sigue con la app cerrada, capturando stop y objetivo mientras la posición sigue abierta, el único momento en que tu bróker lo revela. Solo lectura: Evidence ve operaciones, nunca abre ni cambia una.","Contas reais e demo pela cTrader Open API. Ative a sincronização em segundo plano e ela continua com o app fechado — capturando stop e alvo enquanto a posição ainda está aberta, o único momento em que sua corretora informa isso. Somente leitura: o Evidence vê operações, nunca abre nem altera uma.","Comptes réels et démo via la cTrader Open API. Activez la synchronisation en arrière-plan et elle continue application fermée — en capturant stop et objectif tant que la position est ouverte, seul moment où votre courtier le révèle. Lecture seule : Evidence voit les trades, n’en ouvre ni n’en modifie jamais."],
    "A small tracker on": ["Ein kleiner Tracker in","Un pequeño tracker en","Um pequeno tracker no","Un petit tracker sur"],
    "MT5, ATAS, Quantower or TradingView": ["MT5, ATAS, Quantower oder TradingView","MT5, ATAS, Quantower o TradingView","MT5, ATAS, Quantower ou TradingView","MT5, ATAS, Quantower ou TradingView"],
    "reports your fills as they happen, so the journal fills itself there too. NinjaTrader is in beta.": ["meldet deine Ausführungen in dem Moment, in dem sie passieren – so füllt sich das Journal auch dort von selbst. NinjaTrader ist in der Beta.","envía tus ejecuciones al momento, así que el diario también se llena solo. NinjaTrader está en beta.","envia suas execuções na hora, então o diário também se preenche sozinho. NinjaTrader está em beta.","transmet vos exécutions au moment où elles ont lieu : là aussi, le journal se remplit seul. NinjaTrader est en bêta."],
    "Paste a": ["Füge einen","Pega una clave API de","Cole uma chave de API","Collez une clé API en"],
    "read-only": ["nur lesenden","solo lectura","somente leitura","lecture seule"],
    "API key from": ["API-Schlüssel von","de","da","de"],
    "and your fills arrive every ten minutes, app open or not. A key that is allowed to trade or withdraw is refused at the door.": ["ein, und deine Ausführungen kommen alle zehn Minuten an, ob die App offen ist oder nicht. Ein Schlüssel, der handeln oder abheben darf, wird gleich abgewiesen.","y tus ejecuciones llegan cada diez minutos, con la app abierta o no. Una clave que puede operar o retirar se rechaza en la puerta.","e suas execuções chegam a cada dez minutos, com o app aberto ou não. Uma chave que pode operar ou sacar é recusada na entrada.","et vos exécutions arrivent toutes les dix minutes, application ouverte ou non. Une clé autorisée à trader ou à retirer est refusée d’emblée."],
    "brokers and prop firms in all. Search yours by name, or map any CSV once. Honest caveat: a statement carries prices and P&L, but": ["Broker und Prop-Firmen insgesamt. Such deinen nach Namen oder ordne eine beliebige CSV einmal zu. Ehrlicher Hinweis: Ein Kontoauszug enthält Preise und P&L, aber","brókers y prop firms en total. Busca el tuyo por nombre o mapea cualquier CSV una vez. Aviso honesto: un extracto trae precios y P&L, pero","corretoras e prop firms no total. Procure a sua pelo nome ou mapeie qualquer CSV uma vez. Aviso honesto: um extrato traz preços e P&L, mas","courtiers et prop firms au total. Cherchez le vôtre par son nom ou mappez n’importe quel CSV une fois. Réserve honnête : un relevé contient prix et P&L, mais"],
    "not": ["nicht","no","não","pas"],
    "the stop you actually had on.": ["den Stop, den du wirklich gesetzt hattest.","el stop que realmente tenías puesto.","o stop que você realmente tinha.","le stop que vous aviez réellement."],
    "A new account gets one question at a time:": ["Ein neues Konto bekommt eine Frage nach der anderen:","Una cuenta nueva recibe una pregunta cada vez:","Uma conta nova recebe uma pergunta por vez:","Un nouveau compte reçoit une question à la fois :"],
    "which broker you trade, how your trades get in, and what they say about you": ["bei welchem Broker du tradest, wie deine Trades reinkommen und was sie über dich aussagen","con qué bróker operas, cómo entran tus operaciones y qué dicen de ti","em qual corretora você opera, como suas operações entram e o que dizem sobre você","chez quel courtier vous tradez, comment vos trades arrivent et ce qu’ils disent de vous"],
    ". Skippable at any point, and nothing is locked behind finishing it.": [". Jederzeit überspringbar, und nichts ist gesperrt, bis du fertig bist.",". Se puede saltar en cualquier momento y nada queda bloqueado hasta terminar.",". Dá para pular a qualquer momento, e nada fica bloqueado até terminar.",". On peut passer à tout moment, et rien n’est verrouillé tant que ce n’est pas fini."],
    "One card per trade: entry, stop, target, R:R, screenshots, the mistakes you made and what you did right — plus an automatic A–F grade with a one-line review.": ["Eine Karte pro Trade: Einstieg, Stop, Ziel, R:R, Screenshots, deine Fehler und was du richtig gemacht hast – dazu eine automatische Note von A bis F mit einer Zeile Bewertung.","Una ficha por operación: entrada, stop, objetivo, R:R, capturas, los errores y lo que hiciste bien, más una nota automática de A a F con una línea de revisión.","Um cartão por operação: entrada, stop, alvo, R:R, capturas, os erros e o que você fez certo — mais uma nota automática de A a F com uma linha de revisão.","Une fiche par trade : entrée, stop, objectif, R:R, captures, vos erreurs et ce que vous avez bien fait — plus une note automatique de A à F avec une ligne d’analyse."],
    "Journal": ["Journal","Diario","Diário","Journal"],
    "A month at a time, coloured by result. Name your setups, give each playbook its checklist and rules, and see per-playbook stats — including how much your adherence is worth.": ["Monat für Monat, nach Ergebnis eingefärbt. Benenne deine Setups, gib jedem Playbook seine Checkliste und Regeln und sieh Statistiken pro Playbook – auch, wie viel deine Regeltreue wert ist.","Mes a mes, coloreado por resultado. Nombra tus setups, da a cada playbook su checklist y reglas, y ve estadísticas por playbook, incluido cuánto vale tu disciplina.","Mês a mês, colorido pelo resultado. Nomeie seus setups, dê a cada playbook seu checklist e regras e veja estatísticas por playbook — inclusive quanto vale sua disciplina.","Mois par mois, coloré selon le résultat. Nommez vos setups, donnez à chaque playbook sa checklist et ses règles, et voyez les stats par playbook — y compris ce que vaut votre discipline."],
    "Rules tag trades as they arrive, with AI suggestions you can dismiss. Attach several chart frames per trade — higher and lower timeframe, before and after.": ["Regeln taggen Trades schon beim Eintreffen, dazu KI-Vorschläge, die du verwerfen kannst. Hänge mehrere Chartbilder pro Trade an – höherer und niedrigerer Timeframe, vorher und nachher.","Las reglas etiquetan las operaciones al llegar, con sugerencias de IA que puedes descartar. Adjunta varios gráficos por operación: timeframe mayor y menor, antes y después.","Regras marcam as operações assim que chegam, com sugestões de IA que você pode descartar. Anexe vários gráficos por operação — timeframe maior e menor, antes e depois.","Des règles taguent les trades dès leur arrivée, avec des suggestions IA que vous pouvez écarter. Joignez plusieurs graphiques par trade — timeframe supérieur et inférieur, avant et après."],
    "Equity curve, win rate, average R:R, max drawdown and profit factor — then broken down by session, weekday, symbol, direction, setup and timeframe.": ["Equity-Kurve, Win-Rate, durchschnittliches R:R, maximaler Drawdown und Profit-Faktor – dann aufgeschlüsselt nach Session, Wochentag, Symbol, Richtung, Setup und Timeframe.","Curva de equity, win rate, R:R medio, drawdown máximo y profit factor, desglosados por sesión, día, símbolo, dirección, setup y timeframe.","Curva de equity, win rate, R:R médio, drawdown máximo e profit factor — depois detalhados por sessão, dia da semana, símbolo, direção, setup e timeframe.","Courbe d’equity, win rate, R:R moyen, drawdown max et profit factor — puis détaillés par session, jour, symbole, sens, setup et timeframe."],
    "Strategy Lab — build indicator rules by clicking and backtest them on years of real bars, then sweep the parameters and check them out-of-sample · risk of ruin, Sharpe and per-setup expectancy · MFE / MAE heat vs. outcome · what-if scenarios · Monte-Carlo projections · missed trades · screenshot gallery.": ["Strategy Lab – Indikatorregeln per Klick bauen und auf Jahren echter Kerzen backtesten, dann Parameter durchprobieren und außerhalb der Stichprobe prüfen · Ruinrisiko, Sharpe und Erwartungswert pro Setup · MFE/MAE gegen Ergebnis · Was-wäre-wenn-Szenarien · Monte-Carlo-Projektionen · verpasste Trades · Screenshot-Galerie.","Strategy Lab: crea reglas de indicadores con clics y haz backtest sobre años de velas reales, luego barre los parámetros y compruébalos fuera de muestra · riesgo de ruina, Sharpe y expectativa por setup · MFE / MAE frente al resultado · escenarios hipotéticos · proyecciones Monte Carlo · operaciones perdidas · galería de capturas.","Strategy Lab — monte regras de indicadores com cliques e faça backtest em anos de candles reais, depois varra os parâmetros e confira fora da amostra · risco de ruína, Sharpe e expectativa por setup · MFE / MAE vs. resultado · cenários hipotéticos · projeções Monte Carlo · operações perdidas · galeria de capturas.","Strategy Lab — construisez des règles d’indicateurs en quelques clics et backtestez-les sur des années de bougies réelles, puis balayez les paramètres et vérifiez-les hors échantillon · risque de ruine, Sharpe et espérance par setup · MFE / MAE face au résultat · scénarios « et si » · projections Monte-Carlo · trades manqués · galerie de captures."],
    "Pivot any dimension against any metric, drill into the trades behind a number, save the view as a preset, export it as CSV or PDF — or hand someone a share link.": ["Stell jede Dimension jeder Kennzahl gegenüber, spring zu den Trades hinter einer Zahl, speichere die Ansicht als Vorlage, exportiere sie als CSV oder PDF – oder gib jemandem einen Teilen-Link.","Cruza cualquier dimensión con cualquier métrica, entra en las operaciones detrás de una cifra, guarda la vista como preset, expórtala en CSV o PDF, o comparte un enlace.","Cruze qualquer dimensão com qualquer métrica, abra as operações por trás de um número, salve a visão como preset, exporte em CSV ou PDF — ou envie um link.","Croisez n’importe quelle dimension avec n’importe quelle métrique, ouvrez les trades derrière un chiffre, enregistrez la vue en préréglage, exportez-la en CSV ou PDF — ou partagez un lien."],
    "Not a chatbot bolted on the side: it works through your own trades and comes back with the behavioural patterns behind your losing streaks — unprompted, every ten trades.": ["Kein angeflanschter Chatbot: Er arbeitet sich durch deine eigenen Trades und meldet die Verhaltensmuster hinter deinen Verlustserien – ungefragt, alle zehn Trades.","No es un chatbot añadido: revisa tus propias operaciones y vuelve con los patrones de conducta detrás de tus rachas perdedoras, sin que se lo pidas, cada diez operaciones.","Não é um chatbot acoplado: ele percorre suas próprias operações e traz os padrões de comportamento por trás das suas sequências de perdas — sem você pedir, a cada dez operações.","Pas un chatbot greffé : il parcourt vos propres trades et revient avec les schémas de comportement derrière vos séries de pertes — sans qu’on le lui demande, tous les dix trades."],
    "Opening something that looks like revenge trading, overtrading or a weak session gets you a warning while it is still avoidable. Closing it gets you an automatic A–F review.": ["Eröffnest du etwas, das nach Revenge-Trading, Overtrading oder einer schwachen Session aussieht, bekommst du eine Warnung, solange es noch vermeidbar ist. Beim Schließen gibt es eine automatische Bewertung von A bis F.","Si abres algo que parece revenge trading, overtrading o una sesión floja, recibes un aviso mientras aún puedes evitarlo. Al cerrarlo, una revisión automática de A a F.","Abrir algo que parece revenge trading, overtrading ou uma sessão fraca gera um alerta enquanto ainda dá para evitar. Ao fechar, você recebe uma revisão automática de A a F.","Ouvrir quelque chose qui ressemble à du revenge trading, de l’overtrading ou une session faible déclenche une alerte tant que c’est évitable. À la clôture, une évaluation automatique de A à F."],
    "Live": ["Live","En vivo","Ao vivo","En direct"],
    "Tiltmeter detects tilt from rule breaks and P&L patterns. Habits are correlated against performance. And your own rules can be checked before the trade, not after.": ["Das Tiltmeter erkennt Tilt an Regelbrüchen und P&L-Mustern. Gewohnheiten werden mit der Performance abgeglichen. Und deine eigenen Regeln lassen sich vor dem Trade prüfen, nicht erst danach.","El Tiltmeter detecta el tilt por reglas rotas y patrones de P&L. Los hábitos se correlacionan con el rendimiento. Y tus propias reglas se comprueban antes de la operación, no después.","O Tiltmeter detecta tilt por regras quebradas e padrões de P&L. Hábitos são correlacionados com o desempenho. E suas próprias regras podem ser checadas antes da operação, não depois.","Le Tiltmeter détecte le tilt à partir des règles enfreintes et des schémas de P&L. Les habitudes sont corrélées à la performance. Et vos propres règles se vérifient avant le trade, pas après."],
    "Give a coach a scoped view of your journal — you decide what they see — or run your own students from a cockpit: who needs attention, a live feed of their trades, calls with screen share, bookings, a coach chat with pre-trade checks, a process radar and step-by-step programmes. Being mentored is free.": ["Gib einem Coach einen begrenzten Einblick in dein Journal – du entscheidest, was er sieht – oder betreue eigene Schüler aus einem Cockpit: wer Aufmerksamkeit braucht, ein Live-Feed ihrer Trades, Calls mit Bildschirmfreigabe, Terminbuchung, ein Coach-Chat mit Vor-Trade-Checks, ein Prozess-Radar und Schritt-für-Schritt-Programme. Gecoacht zu werden ist kostenlos.","Da a un coach una vista acotada de tu diario —tú decides qué ve— o gestiona tus propios alumnos desde un cockpit: quién necesita atención, un feed en vivo de sus operaciones, llamadas con pantalla compartida, reservas, un chat de coach con checks previos, un radar de proceso y programas paso a paso. Recibir mentoría es gratis.","Dê a um coach uma visão limitada do seu diário — você decide o que ele vê — ou acompanhe seus próprios alunos num cockpit: quem precisa de atenção, um feed ao vivo das operações, chamadas com compartilhamento de tela, agendamentos, chat com checagens pré-operação, um radar de processo e programas passo a passo. Ser mentorado é grátis.","Donnez à un coach une vue limitée de votre journal — vous décidez de ce qu’il voit — ou suivez vos propres élèves depuis un cockpit : qui a besoin d’attention, un flux en direct de leurs trades, des appels avec partage d’écran, des réservations, un chat coach avec vérifications avant trade, un radar de process et des programmes pas à pas. Être coaché est gratuit."],
    "Coaching": ["Coaching","Coaching","Coaching","Coaching"],
    "A moderated feed, leaderboards by pips or by discipline, and direct messages. The whole app translates into your language and shows P&L in 16 currencies.": ["Ein moderierter Feed, Ranglisten nach Pips oder nach Disziplin und Direktnachrichten. Die ganze App übersetzt sich in deine Sprache und zeigt P&L in 16 Währungen.","Un feed moderado, rankings por pips o por disciplina y mensajes directos. Toda la app se traduce a tu idioma y muestra el P&L en 16 divisas.","Um feed moderado, rankings por pips ou por disciplina e mensagens diretas. O app inteiro se traduz para o seu idioma e mostra o P&L em 16 moedas.","Un fil modéré, des classements par pips ou par discipline, et des messages directs. Toute l’application se traduit dans votre langue et affiche le P&L en 16 devises."],
    "Community": ["Community","Comunidad","Comunidade","Communauté"],
    "27 written chapters": ["27 geschriebene Kapitel","27 capítulos escritos","27 capítulos escritos","27 chapitres rédigés"],
    "across four courses — psychology, risk, edge and backtesting — free to read. Under each one, your own numbers from your journal, and questions you got wrong come back a week later.": ["in vier Kursen – Psychologie, Risiko, Edge und Backtesting – kostenlos lesbar. Unter jedem stehen deine eigenen Zahlen aus deinem Journal, und Fragen, die du falsch beantwortet hast, kommen eine Woche später wieder.","en cuatro cursos —psicología, riesgo, edge y backtesting— de lectura gratuita. Bajo cada uno, tus propias cifras del diario, y las preguntas que fallaste vuelven una semana después.","em quatro cursos — psicologia, risco, edge e backtesting — de leitura grátis. Abaixo de cada um, seus próprios números do diário, e as perguntas que você errou voltam uma semana depois.","répartis sur quatre cours — psychologie, risque, edge et backtesting — en lecture libre. Sous chacun, vos propres chiffres tirés du journal, et les questions ratées reviennent une semaine plus tard."],
    "A glossary of 429 trading terms (free; AI lookup beyond that with Pro), economic calendar with event alerts, position-size and risk calculators, the S&D Zones TradingView indicator — and an installable app with notifications on phone and desktop.": ["Ein Glossar mit 429 Trading-Begriffen (kostenlos; KI-Nachschlagen darüber hinaus mit Pro), ein Wirtschaftskalender mit Termin-Warnungen, Positionsgrößen- und Risikorechner, der S&D-Zones-Indikator für TradingView – und eine installierbare App mit Benachrichtigungen auf Handy und Desktop.","Un glosario de 429 términos de trading (gratis; consulta con IA más allá con Pro), calendario económico con alertas, calculadoras de tamaño de posición y riesgo, el indicador S&D Zones para TradingView y una app instalable con notificaciones en móvil y escritorio.","Um glossário de 429 termos de trading (grátis; consulta por IA além disso com Pro), calendário econômico com alertas, calculadoras de tamanho de posição e risco, o indicador S&D Zones para TradingView — e um app instalável com notificações no celular e no desktop.","Un glossaire de 429 termes de trading (gratuit ; recherche IA au-delà avec Pro), un calendrier économique avec alertes, des calculateurs de taille de position et de risque, l’indicateur S&D Zones pour TradingView — et une application installable avec notifications sur téléphone et ordinateur."],
    "MetaTrader 5 · Cloud Sync": ["MetaTrader 5 · Cloud Sync","MetaTrader 5 · Cloud Sync","MetaTrader 5 · Cloud Sync","MetaTrader 5 · Cloud Sync"],
    "Trade on your phone. It's": ["Trade am Handy.","Opera desde el móvil.","Opere pelo celular.","Tradez sur votre téléphone."],
    "already journalled.": ["Schon im Journal.","Ya está en el diario.","Já está no diário.","C’est déjà dans le journal."],
    "Log in once with your account's investor password. From then on our MT5 server keeps your account in view around the clock. Every trade you open, adjust or close reaches your journal, whether you placed it in the MT5 phone app, on your desktop or on a VPS. No Expert Advisor to install, no PC left running.": ["Melde dich einmal mit dem Investor-Passwort deines Kontos an. Ab dann behält unser MT5-Server dein Konto rund um die Uhr im Blick. Jeder Trade, den du eröffnest, anpasst oder schließt, landet in deinem Journal – ob aus der MT5-Handy-App, vom Desktop oder von einem VPS. Kein Expert Advisor zu installieren, kein PC, der durchlaufen muss.","Entra una vez con la contraseña de inversor de tu cuenta. Desde entonces nuestro servidor MT5 vigila tu cuenta día y noche. Cada operación que abres, ajustas o cierras llega a tu diario, la hayas hecho en la app móvil de MT5, en el escritorio o en un VPS. Sin Expert Advisor que instalar ni PC encendido.","Entre uma vez com a senha de investidor da sua conta. A partir daí nosso servidor MT5 acompanha sua conta 24 horas. Cada operação que você abre, ajusta ou fecha chega ao seu diário, seja pelo app de celular do MT5, pelo desktop ou por um VPS. Nenhum Expert Advisor para instalar, nenhum PC ligado.","Connectez-vous une fois avec le mot de passe investisseur de votre compte. Dès lors, notre serveur MT5 surveille votre compte jour et nuit. Chaque trade ouvert, ajusté ou clôturé arrive dans votre journal, qu’il vienne de l’application mobile MT5, de votre ordinateur ou d’un VPS. Aucun Expert Advisor à installer, aucun PC allumé."],
    "Your MT5 account": ["Dein MT5-Konto","Tu cuenta MT5","Sua conta MT5","Votre compte MT5"],
    "phone · desktop · VPS": ["Handy · Desktop · VPS","móvil · escritorio · VPS","celular · desktop · VPS","téléphone · ordinateur · VPS"],
    "Evidence MT5 server": ["Evidence-MT5-Server","Servidor MT5 de Evidence","Servidor MT5 do Evidence","Serveur MT5 d’Evidence"],
    "read-only · 24/7": ["nur lesend · 24/7","solo lectura · 24/7","somente leitura · 24/7","lecture seule · 24/7"],
    "waiting when you open it": ["wartet schon, wenn du es öffnest","te espera al abrirlo","esperando quando você abre","vous attend à l’ouverture"],
    "Three fields, about a minute": ["Drei Felder, etwa eine Minute","Tres campos, un minuto más o menos","Três campos, cerca de um minuto","Trois champs, environ une minute"],
    "Server": ["Server","Servidor","Servidor","Serveur"],
    "exactly as MT5 shows it — e.g. your prop firm's demo or live server.": ["genau so, wie MT5 ihn anzeigt – z. B. der Demo- oder Live-Server deiner Prop-Firma.","tal como lo muestra MT5, p. ej. el servidor demo o real de tu prop firm.","exatamente como o MT5 mostra — por ex. o servidor demo ou real da sua prop firm.","exactement comme MT5 l’affiche — p. ex. le serveur démo ou réel de votre prop firm."],
    "Account number": ["Kontonummer","Número de cuenta","Número da conta","Numéro de compte"],
    "and the": ["und das","y la","e a","et le"],
    "investor password": ["Investor-Passwort","contraseña de inversor","senha de investidor","mot de passe investisseur"],
    "— the read-only one, not your trading password.": ["– das nur lesende, nicht dein Trading-Passwort.","— la de solo lectura, no la de operar.","— a somente leitura, não a senha de operação.","— celui en lecture seule, pas votre mot de passe de trading."],
    "History": ["Verlauf","Historial","Histórico","Historique"],
    "— bring in the last 30 or 90 days, or start fresh.": ["– hol die letzten 30 oder 90 Tage rein oder starte neu.","— trae los últimos 30 o 90 días, o empieza de cero.","— traga os últimos 30 ou 90 dias, ou comece do zero.","— importez les 30 ou 90 derniers jours, ou repartez de zéro."],
    "Read-only by design": ["Nur lesend – von der Bauart her","Solo lectura por diseño","Somente leitura por design","Lecture seule par conception"],
    "The investor password cannot place, change or close an order — that is how MetaTrader itself is built, not a promise we make. Evidence sees trades; it can never take one.": ["Mit dem Investor-Passwort lässt sich keine Order eröffnen, ändern oder schließen – so ist MetaTrader selbst gebaut, das ist kein Versprechen von uns. Evidence sieht Trades; es kann nie einen ausführen.","La contraseña de inversor no puede abrir, cambiar ni cerrar una orden: así está construido MetaTrader, no es una promesa nuestra. Evidence ve operaciones; nunca puede ejecutar una.","A senha de investidor não consegue abrir, alterar nem fechar uma ordem — é assim que o próprio MetaTrader foi feito, não uma promessa nossa. O Evidence vê operações; nunca executa uma.","Le mot de passe investisseur ne peut ni ouvrir, ni modifier, ni clôturer un ordre — c’est ainsi que MetaTrader est conçu, pas une promesse de notre part. Evidence voit les trades ; il ne peut jamais en passer un."],
    "Numbers straight from the broker": ["Zahlen direkt vom Broker","Cifras directas del bróker","Números direto da corretora","Chiffres directement du courtier"],
    "Entry, exit, lot size, stop and target — including every SL/TP change while the trade is open — and the exact result with commission and swap, not a recalculation.": ["Einstieg, Ausstieg, Lotgröße, Stop und Ziel – inklusive jeder SL/TP-Änderung, solange der Trade offen ist – und das exakte Ergebnis mit Kommission und Swap, nicht nachgerechnet.","Entrada, salida, tamaño de lote, stop y objetivo —incluido cada cambio de SL/TP con la operación abierta— y el resultado exacto con comisión y swap, no un recálculo.","Entrada, saída, tamanho do lote, stop e alvo — incluindo cada mudança de SL/TP com a operação aberta — e o resultado exato com comissão e swap, não um recálculo.","Entrée, sortie, taille de lot, stop et objectif — y compris chaque modification de SL/TP pendant que le trade est ouvert — et le résultat exact avec commission et swap, pas un recalcul."],
    "Built for prop accounts": ["Für Prop-Konten gebaut","Pensado para cuentas de prop","Feito para contas de prop","Conçu pour les comptes prop"],
    "Connect up to three MT5 accounts — a challenge, a funded account and a personal one side by side. Each lands in its own account, so one switch filters the whole journal to it. If a sync ever stops, you get an email instead of a silent gap.": ["Verbinde bis zu drei MT5-Konten – eine Challenge, ein Funded-Konto und ein privates nebeneinander. Jedes landet in einem eigenen Konto, ein Schalter filtert also das ganze Journal darauf. Bricht ein Sync einmal ab, bekommst du eine E-Mail statt einer stillen Lücke.","Conecta hasta tres cuentas MT5: un challenge, una cuenta fondeada y una personal, una al lado de otra. Cada una va a su propia cuenta, así que un selector filtra todo el diario. Si un sync se detiene, recibes un email en lugar de un hueco silencioso.","Conecte até três contas MT5 — um challenge, uma conta financiada e uma pessoal lado a lado. Cada uma vai para sua própria conta, então um seletor filtra o diário inteiro. Se um sync parar, você recebe um e-mail em vez de uma lacuna silenciosa.","Connectez jusqu’à trois comptes MT5 — un challenge, un compte financé et un compte perso côte à côte. Chacun arrive dans son propre compte, un sélecteur filtre donc tout le journal. Si une synchro s’arrête, vous recevez un e-mail plutôt qu’un trou silencieux."],
    "Stored encrypted, deleted when you leave": ["Verschlüsselt gespeichert, gelöscht, wenn du gehst","Guardada cifrada, borrada al irte","Guardada criptografada, apagada quando você sai","Stocké chiffré, supprimé à votre départ"],
    "The password is kept AES-256 encrypted on our MT5 server — never in the app database, never in a log — and deleted the moment you disconnect, delete your account, or seven days after Pro ends.": ["Das Passwort liegt AES-256-verschlüsselt auf unserem MT5-Server – nie in der App-Datenbank, nie in einem Log – und wird gelöscht, sobald du die Verbindung trennst, dein Konto löschst oder sieben Tage nach dem Ende von Pro.","La contraseña se guarda cifrada con AES-256 en nuestro servidor MT5 —nunca en la base de datos de la app ni en un log— y se borra en cuanto desconectas, eliminas tu cuenta o siete días después de terminar Pro.","A senha fica criptografada com AES-256 no nosso servidor MT5 — nunca no banco de dados do app, nunca em log — e é apagada assim que você desconecta, exclui a conta ou sete dias após o fim do Pro.","Le mot de passe est conservé chiffré en AES-256 sur notre serveur MT5 — jamais dans la base de l’application, jamais dans un journal système — et supprimé dès que vous déconnectez, supprimez votre compte, ou sept jours après la fin de Pro."],
    "Where the line is, plainly:": ["Wo die Grenze liegt, ganz offen:","Dónde está el límite, claramente:","Onde fica o limite, com clareza:","Où est la limite, clairement :"],
    "MetaTrader 5 only — MT4 keeps the free Expert Advisor route. A handful of brokers run custom servers that cannot be reached this way; if yours is one of them you will know within a minute, and the Expert Advisor still works.": ["Nur MetaTrader 5 – für MT4 bleibt der kostenlose Weg über den Expert Advisor. Einige wenige Broker betreiben eigene Server, die so nicht erreichbar sind; ist deiner dabei, weißt du es innerhalb einer Minute, und der Expert Advisor funktioniert weiterhin.","Solo MetaTrader 5: MT4 sigue con la vía gratuita del Expert Advisor. Unos pocos brókers usan servidores propios inaccesibles de esta forma; si el tuyo es uno, lo sabrás en un minuto y el Expert Advisor seguirá funcionando.","Somente MetaTrader 5 — o MT4 continua com a via gratuita do Expert Advisor. Algumas corretoras usam servidores próprios que não dá para alcançar assim; se for a sua, você saberá em um minuto, e o Expert Advisor continua funcionando.","MetaTrader 5 uniquement — MT4 garde la voie gratuite de l’Expert Advisor. Quelques courtiers utilisent des serveurs propres inaccessibles ainsi ; si c’est le vôtre, vous le saurez en une minute, et l’Expert Advisor fonctionne toujours."],
    "See it in the demo ↗": ["In der Demo ansehen ↗","Verlo en la demo ↗","Ver na demo ↗","Voir dans la démo ↗"],
    "Reading your statistics tells you what went wrong. It does not give you the reps to fix it. Market Replay rewinds the real market to any past date, hides everything after it, and lets you trade forward one candle at a time, on the same screen as your journal.": ["Deine Statistik zeigt dir, was schiefgelaufen ist. Die Wiederholungen, um es zu beheben, gibt sie dir nicht. Market Replay spult den echten Markt auf jedes vergangene Datum zurück, verbirgt alles danach und lässt dich Kerze für Kerze vorwärts traden – auf demselben Bildschirm wie dein Journal.","Leer tus estadísticas te dice qué salió mal. No te da las repeticiones para corregirlo. Market Replay rebobina el mercado real a cualquier fecha pasada, oculta todo lo posterior y te deja operar hacia delante vela a vela, en la misma pantalla que tu diario.","Ler suas estatísticas mostra o que deu errado. Não dá as repetições para corrigir. O Market Replay volta o mercado real a qualquer data passada, esconde tudo depois e deixa você operar adiante candle a candle, na mesma tela do seu diário.","Lire vos statistiques vous dit ce qui a mal tourné. Cela ne vous donne pas les répétitions pour le corriger. Market Replay rembobine le vrai marché à n’importe quelle date passée, masque tout ce qui suit et vous laisse trader bougie après bougie, sur le même écran que votre journal."],
    "instruments": ["Instrumente","instrumentos","instrumentos","instruments"],
    ", from free tick-accurate Dukascopy data, on every timeframe from one minute to weekly — so a top-down read runs on the same screen as the entry. You buy at the ask and sell at the bid using the spread that actually existed at that moment, not a convenient constant.": [", aus kostenlosen tickgenauen Dukascopy-Daten, auf jedem Timeframe von einer Minute bis wöchentlich – die Top-down-Analyse läuft also auf demselben Bildschirm wie der Einstieg. Du kaufst zum Ask und verkaufst zum Bid, mit dem Spread, der in dem Moment wirklich bestand, nicht mit einer bequemen Konstante.",", con datos gratuitos de Dukascopy precisos al tick, en todos los timeframes de un minuto a semanal, así que el análisis top-down va en la misma pantalla que la entrada. Compras al ask y vendes al bid con el spread que existía de verdad en ese momento, no una constante cómoda.",", com dados gratuitos da Dukascopy precisos ao tick, em todo timeframe de um minuto a semanal — então a leitura top-down roda na mesma tela da entrada. Você compra no ask e vende no bid com o spread que realmente existia naquele momento, não uma constante conveniente.",", à partir de données Dukascopy gratuites précises au tick, sur chaque timeframe d’une minute à l’hebdomadaire — l’analyse top-down se fait donc sur le même écran que l’entrée. Vous achetez à l’ask et vendez au bid avec le spread qui existait réellement à ce moment, pas une constante commode."],
    "Gold and silver · the seven FX majors and 21 crosses · 15 minors including SEK, NOK, PLN, TRY, ZAR, MXN, CNH and SGD · Nasdaq 100, S&P 500, Dow 30, DAX 40, FTSE 100, CAC 40, IBEX 35, Nikkei 225, ASX 200, Hang Seng · WTI and Brent · Bitcoin, Ethereum, Litecoin and XRP.": ["Gold und Silber · die sieben FX-Majors und 21 Crosses · 15 Minors, darunter SEK, NOK, PLN, TRY, ZAR, MXN, CNH und SGD · Nasdaq 100, S&P 500, Dow 30, DAX 40, FTSE 100, CAC 40, IBEX 35, Nikkei 225, ASX 200, Hang Seng · WTI und Brent · Bitcoin, Ethereum, Litecoin und XRP.","Oro y plata · los siete majors de FX y 21 cruces · 15 minors, entre ellos SEK, NOK, PLN, TRY, ZAR, MXN, CNH y SGD · Nasdaq 100, S&P 500, Dow 30, DAX 40, FTSE 100, CAC 40, IBEX 35, Nikkei 225, ASX 200, Hang Seng · WTI y Brent · Bitcoin, Ethereum, Litecoin y XRP.","Ouro e prata · os sete majors de FX e 21 crosses · 15 minors, incluindo SEK, NOK, PLN, TRY, ZAR, MXN, CNH e SGD · Nasdaq 100, S&P 500, Dow 30, DAX 40, FTSE 100, CAC 40, IBEX 35, Nikkei 225, ASX 200, Hang Seng · WTI e Brent · Bitcoin, Ethereum, Litecoin e XRP.","Or et argent · les sept majors FX et 21 croisées · 15 mineures dont SEK, NOK, PLN, TRY, ZAR, MXN, CNH et SGD · Nasdaq 100, S&P 500, Dow 30, DAX 40, FTSE 100, CAC 40, IBEX 35, Nikkei 225, ASX 200, Hang Seng · WTI et Brent · Bitcoin, Ethereum, Litecoin et XRP."],
    "futures (ES, NQ, YM, GC, CL and the micros) replay in whole contracts with the exchange's tick values, but on the CFD price that tracks each one — CME's own data is licensed, so levels sit a little away from the futures chart. Stocks and options you can journal and analyse in full, but not replay. We would rather say so now than have you find out after you subscribe.": ["Futures (ES, NQ, YM, GC, CL und die Micros) laufen im Replay in ganzen Kontrakten mit den Tickwerten der Börse, aber auf dem CFD-Kurs, der dem jeweiligen Future folgt – die CME-Daten selbst sind lizenzpflichtig, die Kursniveaus liegen also etwas neben dem Futures-Chart. Aktien und Optionen kannst du voll erfassen und auswerten, aber nicht im Replay handeln. Das sagen wir lieber jetzt, als dass du es nach dem Abschluss merkst.","Los futuros (ES, NQ, YM, GC, CL y los micros) se reproducen en contratos enteros con los valores de tick de la bolsa, pero sobre el precio CFD que sigue a cada uno: los datos propios de CME tienen licencia, así que los niveles quedan algo separados del gráfico de futuros. Acciones y opciones puedes registrarlas y analizarlas por completo, pero no reproducirlas. Preferimos decirlo ahora a que lo descubras tras suscribirte.","Futuros (ES, NQ, YM, GC, CL e os micros) rodam no replay em contratos inteiros com os valores de tick da bolsa, mas sobre o preço CFD que acompanha cada um — os dados da própria CME são licenciados, então os níveis ficam um pouco afastados do gráfico de futuros. Ações e opções você registra e analisa por completo, mas não faz replay. Preferimos dizer agora a você descobrir depois de assinar.","Les futures (ES, NQ, YM, GC, CL et les micros) se rejouent en contrats entiers avec les valeurs de tick de la bourse, mais sur le prix CFD qui suit chacun — les données propres au CME sont sous licence, les niveaux sont donc un peu décalés du graphique du future. Actions et options se journalisent et s’analysent entièrement, mais ne se rejouent pas. Nous préférons le dire maintenant plutôt que vous le découvriez après l’abonnement."],
    "Several take-profits that scale out, break-even, a trailing stop, partial closes — and you can drag the stop or any target straight on the chart while the trade is running.": ["Mehrere Take-Profits zum Teilausstieg, Break-even, ein Trailing-Stop, Teilschließungen – und du ziehst den Stop oder jedes Ziel direkt im Chart, während der Trade läuft.","Varios take-profits escalonados, break-even, trailing stop, cierres parciales, y puedes arrastrar el stop o cualquier objetivo en el gráfico con la operación en curso.","Vários take-profits escalonados, break-even, trailing stop, fechamentos parciais — e você arrasta o stop ou qualquer alvo direto no gráfico com a operação em andamento.","Plusieurs take-profits échelonnés, break-even, trailing stop, clôtures partielles — et vous déplacez le stop ou n’importe quel objectif directement sur le graphique pendant le trade."],
    "If your stop and your target were both inside one candle, no chart can say which came first. Evidence books the loss, marks the trade, and can settle it for real against the tick data. Most backtests quietly book the win.": ["Lagen Stop und Ziel beide in einer Kerze, kann kein Chart sagen, was zuerst kam. Evidence bucht den Verlust, markiert den Trade und kann ihn gegen die Tickdaten wirklich auflösen. Die meisten Backtests buchen still den Gewinn.","Si tu stop y tu objetivo quedaron dentro de una misma vela, ningún gráfico puede decir cuál llegó primero. Evidence registra la pérdida, marca la operación y puede resolverla de verdad con los datos de tick. La mayoría de backtests se apuntan la ganancia en silencio.","Se o stop e o alvo ficaram dentro do mesmo candle, nenhum gráfico sabe qual veio primeiro. O Evidence registra a perda, marca a operação e pode resolvê-la de verdade com os dados de tick. A maioria dos backtests registra o ganho em silêncio.","Si votre stop et votre objectif se trouvaient dans la même bougie, aucun graphique ne peut dire lequel est venu en premier. Evidence comptabilise la perte, marque le trade et peut le trancher réellement avec les données tick. La plupart des backtests comptent le gain en silence."],
    "Play at half speed or ten times it, step one candle, jump straight to the London or New York open, or to any date in the session. Trend lines, boxes, Fibonacci and notes stay glued to the candles — and your account, drawdown and profit factor are tracked the whole way.": ["Abspielen mit halber oder zehnfacher Geschwindigkeit, Kerze für Kerze, direkt zur London- oder New-York-Eröffnung springen oder zu jedem Datum der Session. Trendlinien, Boxen, Fibonacci und Notizen kleben an den Kerzen – und Konto, Drawdown und Profit-Faktor laufen die ganze Zeit mit.","Reproduce a media velocidad o a diez veces, avanza vela a vela, salta directo a la apertura de Londres o Nueva York, o a cualquier fecha de la sesión. Líneas de tendencia, cajas, Fibonacci y notas quedan pegadas a las velas, y tu cuenta, drawdown y profit factor se siguen todo el tiempo.","Reproduza em meia velocidade ou dez vezes mais rápido, avance um candle, pule direto para a abertura de Londres ou Nova York, ou para qualquer data da sessão. Linhas de tendência, caixas, Fibonacci e notas ficam presas aos candles — e conta, drawdown e profit factor são acompanhados o tempo todo.","Lecture à demi-vitesse ou dix fois plus vite, bougie par bougie, saut direct à l’ouverture de Londres ou de New York, ou à n’importe quelle date de la session. Lignes de tendance, rectangles, Fibonacci et notes restent collés aux bougies — et compte, drawdown et profit factor sont suivis tout du long."],
    "Send a session as a link. Either they watch what you did, or — and this is the one coaches want — they get the identical instrument and dates with an empty account and trade it themselves. Your entries deliberately do not travel, so it is a test rather than a copy.": ["Schick eine Session als Link. Entweder sieht der andere, was du getan hast, oder – und das wollen Coaches – er bekommt dasselbe Instrument und dieselben Daten mit leerem Konto und tradet sie selbst. Deine Einstiege reisen absichtlich nicht mit, es ist also ein Test und keine Kopie.","Envía una sesión como enlace. O ven lo que hiciste o —y esto es lo que quieren los coaches— reciben el mismo instrumento y fechas con una cuenta vacía y la operan ellos. Tus entradas no viajan a propósito, así que es una prueba, no una copia.","Envie uma sessão como link. Ou a pessoa assiste ao que você fez, ou — e é isso que os coaches querem — recebe o mesmo instrumento e datas com a conta vazia e opera sozinha. Suas entradas não vão junto de propósito, então é um teste e não uma cópia.","Envoyez une session sous forme de lien. Soit on regarde ce que vous avez fait, soit — et c’est ce que veulent les coachs — on reçoit le même instrument et les mêmes dates avec un compte vide pour les trader soi-même. Vos entrées ne suivent pas, exprès : c’est un test, pas une copie."],
    "Pro": ["Pro","Pro","Pro","Pro"],
    "Every trading psychology course tells you not to revenge trade. None of them can tell you whether you stopped. Evidence can, because it already has your trades. So a chapter does not end with advice; it ends with a number.": ["Jeder Kurs zur Trading-Psychologie sagt dir, du sollst kein Revenge-Trading machen. Keiner kann dir sagen, ob du damit aufgehört hast. Evidence kann es, weil es deine Trades schon hat. Ein Kapitel endet deshalb nicht mit einem Rat, sondern mit einer Zahl.","Todo curso de psicología del trading te dice que no hagas revenge trading. Ninguno puede decirte si lo dejaste. Evidence sí, porque ya tiene tus operaciones. Así que un capítulo no acaba con un consejo; acaba con una cifra.","Todo curso de psicologia do trading diz para não fazer revenge trading. Nenhum consegue dizer se você parou. O Evidence consegue, porque já tem suas operações. Então um capítulo não termina com um conselho; termina com um número.","Chaque cours de psychologie du trading vous dit de ne pas faire de revenge trading. Aucun ne peut vous dire si vous avez arrêté. Evidence le peut, car il a déjà vos trades. Un chapitre ne se termine donc pas par un conseil, mais par un chiffre."],
    "All 27 chapters are free to read, right now, without an account:": ["Alle 27 Kapitel sind kostenlos lesbar, sofort, ohne Konto:","Los 27 capítulos se leen gratis, ahora mismo, sin cuenta:","Os 27 capítulos são de leitura grátis, agora mesmo, sem conta:","Les 27 chapitres se lisent gratuitement, tout de suite, sans compte :"],
    "open the Academy →": ["Academy öffnen →","abrir la Academia →","abrir a Academia →","ouvrir l’Académie →"],
    "Four books, then one thing you commit to, then the measurement": ["Vier Bücher, dann eine Sache, auf die du dich festlegst, dann die Messung","Cuatro libros, luego un compromiso, luego la medición","Quatro livros, depois um compromisso, depois a medição","Quatre livres, puis un engagement, puis la mesure"],
    "Twenty-seven written chapters across four courses:": ["Siebenundzwanzig geschriebene Kapitel in vier Kursen:","Veintisiete capítulos escritos en cuatro cursos:","Vinte e sete capítulos escritos em quatro cursos:","Vingt-sept chapitres rédigés en quatre cours :"],
    "trading psychology": ["Trading-Psychologie","psicología del trading","psicologia do trading","psychologie du trading"],
    "risk and position size": ["Risiko und Positionsgröße","riesgo y tamaño de posición","risco e tamanho de posição","risque et taille de position"],
    "reading an edge": ["einen Edge erkennen","leer un edge","ler um edge","lire un edge"],
    "backtesting without fooling yourself": ["Backtesting, ohne dich selbst zu täuschen","backtesting sin engañarte","backtesting sem se enganar","backtester sans se mentir"],
    "— loss aversion and tilt, sizing backwards from the loss you accept, why a win rate on its own is meaningless, how many trades it takes before any number means anything, and every way a backtest lies. Written and checked by a human, not generated, because a lesson about behaviour under risk gets read as settled fact.": ["– Verlustaversion und Tilt, die Positionsgröße rückwärts aus dem akzeptierten Verlust, warum eine Win-Rate allein nichts bedeutet, wie viele Trades es braucht, bis eine Zahl etwas aussagt, und jede Art, wie ein Backtest lügt. Von einem Menschen geschrieben und geprüft, nicht generiert – denn eine Lektion über Verhalten unter Risiko wird als feststehende Tatsache gelesen.","— aversión a la pérdida y tilt, calcular el tamaño hacia atrás desde la pérdida que aceptas, por qué un win rate solo no significa nada, cuántas operaciones hacen falta para que una cifra signifique algo y todas las formas en que miente un backtest. Escrito y revisado por una persona, no generado, porque una lección sobre conducta bajo riesgo se lee como un hecho.","— aversão à perda e tilt, dimensionar de trás para frente a partir da perda que você aceita, por que um win rate sozinho não significa nada, quantas operações são precisas até um número significar algo, e todas as formas de um backtest mentir. Escrito e revisado por uma pessoa, não gerado, porque uma lição sobre comportamento sob risco é lida como fato.","— aversion à la perte et tilt, dimensionner à rebours depuis la perte acceptée, pourquoi un win rate seul ne veut rien dire, combien de trades il faut avant qu’un chiffre signifie quelque chose, et toutes les façons dont un backtest ment. Écrit et vérifié par un humain, pas généré, car une leçon sur le comportement face au risque se lit comme un fait établi."],
    "How long after a loss you actually re-enter. Whether your position size drifts up after one. How many trades carry no stop. Counted from your journal — nobody guesses, and nothing is generated.": ["Wie lange du nach einem Verlust wirklich wieder einsteigst. Ob deine Positionsgröße danach hochrutscht. Wie viele Trades keinen Stop haben. Gezählt aus deinem Journal – niemand rät, und nichts ist generiert.","Cuánto tardas de verdad en volver a entrar tras una pérdida. Si tu tamaño de posición sube después. Cuántas operaciones no llevan stop. Contado desde tu diario: nadie adivina y nada se genera.","Quanto tempo depois de uma perda você realmente volta a entrar. Se o tamanho da posição sobe depois de uma. Quantas operações não têm stop. Contado do seu diário — ninguém chuta e nada é gerado.","Combien de temps après une perte vous reprenez réellement position. Si votre taille de position grimpe ensuite. Combien de trades n’ont pas de stop. Compté depuis votre journal — personne ne devine, rien n’est généré."],
    "Pick a habit — “after a loss I wait 20 minutes”. Evidence freezes where you stand today and tells you weeks later whether it moved. Before 38 %, since 11 %. That sentence is the whole point.": ["Wähl eine Gewohnheit – „nach einem Verlust warte ich 20 Minuten“. Evidence friert ein, wo du heute stehst, und sagt dir Wochen später, ob sich etwas bewegt hat. Vorher 38 %, seitdem 11 %. Um genau diesen Satz geht es.","Elige un hábito: «tras una pérdida espero 20 minutos». Evidence congela dónde estás hoy y semanas después te dice si se movió. Antes 38 %, desde entonces 11 %. Esa frase es todo el sentido.","Escolha um hábito — “depois de uma perda eu espero 20 minutos”. O Evidence congela onde você está hoje e semanas depois diz se mudou. Antes 38 %, desde então 11 %. Essa frase é o objetivo todo.","Choisissez une habitude — « après une perte, j’attends 20 minutes ». Evidence fige votre point de départ et vous dit des semaines plus tard si ça a bougé. Avant 38 %, depuis 11 %. Toute l’idée tient dans cette phrase."],
    "Describe how you trade and get six chapters back — including what your strategy is": ["Beschreib, wie du tradest, und bekomm sechs Kapitel zurück – inklusive dessen, was deine Strategie","Describe cómo operas y recibe seis capítulos, incluido lo que tu estrategia","Descreva como você opera e receba seis capítulos — incluindo o que sua estratégia","Décrivez votre façon de trader et recevez six chapitres — y compris ce que votre stratégie n’est"],
    "— with your own trades on that setup as the examples. Winners and losers both, because a book of only winners teaches the wrong thing.": ["ist – mit deinen eigenen Trades auf diesem Setup als Beispiele. Gewinner und Verlierer, denn ein Buch nur mit Gewinnern lehrt das Falsche.","es, con tus propias operaciones en ese setup como ejemplos. Ganadoras y perdedoras, porque un libro solo de ganadoras enseña lo equivocado.","é — com suas próprias operações nesse setup como exemplos. Vencedoras e perdedoras, porque um livro só de vencedoras ensina a coisa errada.","— avec vos propres trades sur ce setup comme exemples. Gagnants et perdants, car un livre de seuls gagnants enseigne la mauvaise leçon."],
    "Then practise it on charts you have never seen": ["Dann übe es auf Charts, die du noch nie gesehen hast","Luego practícalo en gráficos que nunca has visto","Depois pratique em gráficos que você nunca viu","Puis entraînez-vous sur des graphiques jamais vus"],
    "The drill trainer puts you at real historical locations from your own rules — the ones that worked, the ones that lost": ["Der Drill-Trainer setzt dich an echte historische Stellen aus deinen eigenen Regeln – an die, die funktioniert haben, an die, die verloren haben","El entrenador de drills te sitúa en puntos históricos reales de tus propias reglas: los que funcionaron, los que perdieron","O treinador de drills coloca você em pontos históricos reais das suas próprias regras — os que funcionaram, os que perderam","L’entraîneur de drills vous place à de vrais endroits historiques issus de vos propres règles — ceux qui ont marché, ceux qui ont perdu"],
    "by the rules": ["nach den Regeln","según las reglas","seguindo as regras","en respectant les règles"],
    ", the near-misses and the empty stretches — with the right-hand side of the chart hidden. Scored on rule adherence, never on money.": [", an die Beinahe-Treffer und die leeren Strecken – mit verdeckter rechter Chartseite. Bewertet wird die Regeltreue, nie das Geld.",", los casi aciertos y los tramos vacíos, con la parte derecha del gráfico oculta. Se puntúa la disciplina con las reglas, nunca el dinero.",", os quase acertos e os trechos vazios — com o lado direito do gráfico escondido. A nota é pela disciplina com as regras, nunca pelo dinheiro.",", les quasi-signaux et les périodes vides — avec la partie droite du graphique masquée. Noté sur le respect des règles, jamais sur l’argent."],
    "Honest limit: it measures whether a habit changed. It cannot promise the change makes you profitable, and it does not claim to.": ["Ehrliche Grenze: Es misst, ob sich eine Gewohnheit verändert hat. Es kann nicht versprechen, dass dich die Veränderung profitabel macht, und behauptet das auch nicht.","Límite honesto: mide si un hábito cambió. No puede prometer que el cambio te haga rentable, y no lo pretende.","Limite honesto: mede se um hábito mudou. Não pode prometer que a mudança torne você lucrativo, e não afirma isso.","Limite honnête : cela mesure si une habitude a changé. Cela ne peut pas promettre que le changement vous rendra rentable, et ne le prétend pas."],
    "A community where the posts carry the": ["Eine Community, in der die Beiträge die","Una comunidad donde los posts llevan las","Uma comunidade em que os posts trazem as","Une communauté où les posts portent les"],
    "trades": ["Trades tragen","operaciones","operações","trades"],
    "If you run a trading group, you already know that screenshots are curated and “what did everyone trade today?” gets answered by the people having a good week. A Space is the same group with the numbers attached. It is shipped and running, not a waitlist.": ["Wenn du eine Trading-Gruppe leitest, weißt du schon: Screenshots sind ausgewählt, und auf „Was habt ihr heute getradet?“ antworten die, die eine gute Woche haben. Ein Space ist dieselbe Gruppe mit den Zahlen dazu. Er ist fertig und läuft, keine Warteliste.","Si llevas un grupo de trading, ya sabes que las capturas se eligen y que a «¿qué operasteis hoy?» responden quienes tienen una buena semana. Un Space es el mismo grupo con las cifras adjuntas. Ya está lanzado y funcionando, no es una lista de espera.","Se você tem um grupo de trading, já sabe que as capturas são escolhidas a dedo e que “o que vocês operaram hoje?” é respondido por quem está numa boa semana. Um Space é o mesmo grupo com os números junto. Já está lançado e funcionando, não é lista de espera.","Si vous animez un groupe de trading, vous savez déjà que les captures sont triées et que « qu’avez-vous tradé aujourd’hui ? » reçoit la réponse de ceux qui passent une bonne semaine. Un Space, c’est le même groupe avec les chiffres en plus. Il est lancé et tourne, ce n’est pas une liste d’attente."],
    "If you already run a Discord, Telegram or Skool group, start here →": ["Du hast schon eine Discord-, Telegram- oder Skool-Gruppe? Fang hier an →","¿Ya tienes un grupo en Discord, Telegram o Skool? Empieza aquí →","Já tem um grupo no Discord, Telegram ou Skool? Comece aqui →","Vous avez déjà un groupe Discord, Telegram ou Skool ? Commencez ici →"],
    "Chat, voice and moderation — then the three things a chat app cannot do": ["Chat, Sprache und Moderation – und dann die drei Dinge, die eine Chat-App nicht kann","Chat, voz y moderación, y luego las tres cosas que una app de chat no puede hacer","Chat, voz e moderação — e depois as três coisas que um app de chat não faz","Chat, vocal et modération — puis les trois choses qu’une appli de chat ne sait pas faire"],
    "Trades, not screenshots of them": ["Trades, keine Screenshots davon","Operaciones, no capturas de ellas","Operações, não capturas delas","Des trades, pas leurs captures"],
    "Share a trade from your journal into a channel or a post: symbol, direction, entry, stop, target, exit and the realised R on a stop-to-target ladder, marked when it came from a broker sync. Press": ["Teile einen Trade aus deinem Journal in einen Kanal oder Beitrag: Symbol, Richtung, Einstieg, Stop, Ziel, Ausstieg und das erzielte R auf einer Leiter von Stop bis Ziel, markiert, wenn er aus einem Broker-Sync stammt. Drück","Comparte una operación de tu diario en un canal o un post: símbolo, dirección, entrada, stop, objetivo, salida y la R obtenida en una escala de stop a objetivo, marcada si vino de un sync con el bróker. Pulsa","Compartilhe uma operação do seu diário num canal ou post: símbolo, direção, entrada, stop, alvo, saída e o R realizado numa escala do stop ao alvo, marcada quando veio de um sync com a corretora. Toque em","Partagez un trade de votre journal dans un canal ou un post : symbole, sens, entrée, stop, objectif, sortie et le R réalisé sur une échelle du stop à l’objectif, marqué s’il vient d’une synchro courtier. Appuyez sur"],
    "on any of them and watch it play back candle by candle from before the entry.": ["bei einem davon, und sieh zu, wie er Kerze für Kerze ab vor dem Einstieg abläuft.","en cualquiera y mira cómo se reproduce vela a vela desde antes de la entrada.","em qualquer uma e veja ela rodar candle a candle desde antes da entrada.","sur n’importe lequel et regardez-le se rejouer bougie par bougie depuis avant l’entrée."],
    "Sorted by Evidence Score, which is 85 % process. A P&L leaderboard rewards whoever risked most — the exact behaviour a journal exists to catch. Money figures are never published to a board at all.": ["Sortiert nach Evidence Score, der zu 85 % aus Prozess besteht. Eine P&L-Rangliste belohnt den, der am meisten riskiert hat – genau das Verhalten, das ein Journal aufdecken soll. Geldbeträge kommen überhaupt nie auf ein Board.","Ordenado por Evidence Score, que es un 85 % proceso. Un ranking por P&L premia a quien más arriesgó, justo la conducta que un diario debe detectar. Las cifras de dinero nunca se publican en un tablero.","Ordenado pelo Evidence Score, que é 85 % processo. Um ranking por P&L premia quem mais arriscou — exatamente o comportamento que um diário existe para pegar. Valores em dinheiro nunca vão para um quadro.","Trié par Evidence Score, à 85 % fait de process. Un classement au P&L récompense celui qui a le plus risqué — exactement le comportement qu’un journal doit repérer. Les montants ne sont jamais publiés sur un tableau."],
    "Sorted by": ["Sortiert nach","Ordenado por","Ordenado pelo","Trié par"],
    ", which is 85 % process. A P&L leaderboard rewards whoever risked most — the exact behaviour a journal exists to catch. Money figures are never published to a board at all.": [", der zu 85 % aus Prozess besteht. Eine P&L-Rangliste belohnt den, der am meisten riskiert hat – genau das Verhalten, das ein Journal aufdecken soll. Geldbeträge kommen überhaupt nie auf ein Board.",", que es un 85 % proceso. Un ranking por P&L premia a quien más arriesgó, justo la conducta que un diario debe detectar. Las cifras de dinero nunca se publican en un tablero.",", que é 85 % processo. Um ranking por P&L premia quem mais arriscou — exatamente o comportamento que um diário existe para pegar. Valores em dinheiro nunca vão para um quadro.",", à 85 % fait de process. Un classement au P&L récompense celui qui a le plus risqué — exactement le comportement qu’un journal doit repérer. Les montants ne sont jamais publiés sur un tableau."],
    "Every figure another member sees was copied out by its owner on purpose. Untick one and it is": ["Jede Zahl, die ein anderes Mitglied sieht, hat ihr Besitzer bewusst herauskopiert. Entfernst du ein Häkchen, wird sie","Cada cifra que ve otro miembro la copió su dueño a propósito. Desmarca una y","Cada número que outro membro vê foi copiado de propósito pelo dono. Desmarque um e ele","Chaque chiffre vu par un autre membre a été copié exprès par son propriétaire. Décochez-en un et il"],
    "not written at all": ["gar nicht erst geschrieben","ni siquiera se escribe","nem chega a ser gravado","n’est pas écrit du tout"],
    ", and a card comes down in one click. The journal itself stays in a document only its owner can read.": [", und eine Karte ist mit einem Klick wieder weg. Das Journal selbst bleibt in einem Dokument, das nur sein Besitzer lesen kann.",", y una tarjeta se retira con un clic. El diario en sí queda en un documento que solo su dueño puede leer.",", e um cartão sai com um clique. O diário em si fica num documento que só o dono pode ler.",", et une carte se retire en un clic. Le journal lui-même reste dans un document que seul son propriétaire peut lire."],
    "A playbook arrives as a copy members can edit. A course appears in their Academy beside the built-in ones — same chapter progress, same spaced repetition on the questions they get wrong.": ["Ein Playbook kommt als Kopie an, die Mitglieder bearbeiten können. Ein Kurs erscheint in ihrer Academy neben den eingebauten – derselbe Kapitelfortschritt, dieselbe verteilte Wiederholung bei falsch beantworteten Fragen.","Un playbook llega como copia que los miembros pueden editar. Un curso aparece en su Academia junto a los incluidos: mismo progreso por capítulos, misma repetición espaciada en las preguntas que fallan.","Um playbook chega como cópia que os membros podem editar. Um curso aparece na Academia deles ao lado dos nativos — mesmo progresso por capítulo, mesma repetição espaçada nas perguntas que erram.","Un playbook arrive comme une copie que les membres peuvent modifier. Un cours apparaît dans leur Académie à côté des cours intégrés — même progression par chapitre, même répétition espacée sur les questions ratées."],
    "As the owner you see who has not journalled in over a week and whose process score is slipping. From the cards members published, and phrased as a prompt to ask — not a verdict.": ["Als Besitzer siehst du, wer seit über einer Woche nichts ins Journal geschrieben hat und wessen Prozess-Score abrutscht. Aus den Karten, die Mitglieder veröffentlicht haben, und formuliert als Anlass nachzufragen – nicht als Urteil.","Como dueño ves quién no ha escrito en su diario en más de una semana y cuyo process score está bajando. A partir de las tarjetas publicadas, y formulado como pregunta, no como veredicto.","Como dono você vê quem não registra no diário há mais de uma semana e cujo process score está caindo. A partir dos cartões publicados, e formulado como um convite a perguntar — não um veredito.","En tant que propriétaire, vous voyez qui n’a rien journalisé depuis plus d’une semaine et dont le score de process glisse. À partir des cartes publiées, et formulé comme une invitation à demander — pas un verdict."],
    "A real chat, voice rooms and moderation": ["Ein echter Chat, Sprachräume und Moderation","Un chat real, salas de voz y moderación","Um chat de verdade, salas de voz e moderação","Un vrai chat, des salons vocaux et de la modération"],
    "Replies, reactions, bias polls and drop-in voice — plus roles, timed mutes, bans with appeals and an audit log. The unglamorous half that decides whether a community can actually live somewhere.": ["Antworten, Reaktionen, Bias-Umfragen und spontane Sprachräume – dazu Rollen, zeitlich begrenztes Stummschalten, Sperren mit Einspruch und ein Protokoll. Die unscheinbare Hälfte, die entscheidet, ob eine Community irgendwo wirklich leben kann.","Respuestas, reacciones, encuestas de sesgo y voz sin cita previa, más roles, silencios temporales, baneos con apelación y registro de auditoría. La mitad poco vistosa que decide si una comunidad puede vivir de verdad en algún sitio.","Respostas, reações, enquetes de viés e voz sem agendamento — mais cargos, silenciamentos temporários, banimentos com recurso e registro de auditoria. A metade sem glamour que decide se uma comunidade consegue de fato viver em algum lugar.","Réponses, réactions, sondages de biais et vocal à la volée — plus rôles, mises en sourdine temporaires, bannissements avec recours et journal d’audit. La moitié peu glamour qui décide si une communauté peut vraiment vivre quelque part."],
    "Honest limit: a board only shows what members chose to publish. If nobody publishes, it is empty — that is the design.": ["Ehrliche Grenze: Ein Board zeigt nur, was Mitglieder veröffentlichen wollten. Veröffentlicht niemand, ist es leer – so ist es gedacht.","Límite honesto: un tablero solo muestra lo que los miembros decidieron publicar. Si nadie publica, está vacío; así está diseñado.","Limite honesto: um quadro só mostra o que os membros escolheram publicar. Se ninguém publica, fica vazio — é de propósito.","Limite honnête : un tableau ne montre que ce que les membres ont choisi de publier. Si personne ne publie, il est vide — c’est voulu."],
    "Evidence AI reads your journal —": ["Evidence AI liest dein Journal –","Evidence AI lee tu diario,","O Evidence AI lê seu diário —","Evidence AI lit votre journal —"],
    "AI reads your journal —": ["AI liest dein Journal –","AI lee tu diario,","AI lê seu diário —","AI lit votre journal —"],
    "Every figure it quotes is counted by the app first. The model reads results and explains them; it is explicitly forbidden to calculate, estimate or invent a number. That sounds like a small distinction until an AI tells you your Tuesday win rate is \"around 60%\" and you size up on it.": ["Jede Zahl, die sie nennt, hat vorher die App gezählt. Das Modell liest Ergebnisse und erklärt sie; Rechnen, Schätzen oder Erfinden einer Zahl ist ihm ausdrücklich verboten. Das klingt nach einem kleinen Unterschied – bis eine KI dir sagt, deine Win-Rate am Dienstag liege „bei etwa 60 %“, und du deshalb die Größe erhöhst.","Cada cifra que cita la cuenta antes la app. El modelo lee resultados y los explica; tiene prohibido calcular, estimar o inventar un número. Parece una diferencia pequeña hasta que una IA te dice que tu win rate de los martes es «alrededor del 60 %» y subes el tamaño por eso.","Cada número que ela cita é contado antes pelo app. O modelo lê resultados e os explica; é proibido de calcular, estimar ou inventar um número. Parece uma diferença pequena até uma IA dizer que seu win rate de terça é “cerca de 60 %” e você aumentar o tamanho por isso.","Chaque chiffre cité est d’abord compté par l’application. Le modèle lit les résultats et les explique ; il lui est explicitement interdit de calculer, d’estimer ou d’inventer un nombre. Cela semble une petite différence jusqu’à ce qu’une IA vous dise que votre win rate du mardi est « autour de 60 % » et que vous augmentiez la taille sur cette base."],
    "Answers questions about your own trading": ["Beantwortet Fragen zu deinem eigenen Trading","Responde preguntas sobre tu propio trading","Responde perguntas sobre o seu próprio trading","Répond aux questions sur votre propre trading"],
    "\"Why do I keep losing on Fridays?\" is answered from your performance by weekday, by entry hour, by session and by setup, plus what happens to the trade after a loss — all computed across your full history, not the last handful of trades.": ["„Warum verliere ich freitags immer?“ wird aus deiner Performance nach Wochentag, Einstiegsstunde, Session und Setup beantwortet, dazu, was mit dem Trade nach einem Verlust passiert – alles über deine ganze Historie berechnet, nicht über die letzten paar Trades.","«¿Por qué sigo perdiendo los viernes?» se responde con tu rendimiento por día, hora de entrada, sesión y setup, más lo que pasa con la operación tras una pérdida, todo calculado sobre tu historial completo, no sobre las últimas operaciones.","“Por que eu sempre perco às sextas?” é respondido a partir do seu desempenho por dia da semana, hora de entrada, sessão e setup, mais o que acontece com a operação depois de uma perda — tudo calculado sobre o histórico inteiro, não as últimas operações.","« Pourquoi je perds toujours le vendredi ? » trouve sa réponse dans votre performance par jour, heure d’entrée, session et setup, plus ce qui arrive au trade après une perte — le tout calculé sur tout votre historique, pas sur les derniers trades."],
    "Opening something that looks like revenge trading, overtrading or a weak session gets you a warning before the entry, not a diagnosis afterwards. Closing it gets an automatic A–F review of the execution.": ["Eröffnest du etwas, das nach Revenge-Trading, Overtrading oder einer schwachen Session aussieht, bekommst du die Warnung vor dem Einstieg, keine Diagnose hinterher. Beim Schließen gibt es eine automatische Bewertung der Ausführung von A bis F.","Si abres algo que parece revenge trading, overtrading o una sesión floja, recibes el aviso antes de la entrada, no un diagnóstico después. Al cerrarlo, una revisión automática de A a F de la ejecución.","Abrir algo que parece revenge trading, overtrading ou uma sessão fraca gera um alerta antes da entrada, não um diagnóstico depois. Ao fechar, você recebe uma revisão automática de A a F da execução.","Ouvrir quelque chose qui ressemble à du revenge trading, de l’overtrading ou une session faible déclenche une alerte avant l’entrée, pas un diagnostic après coup. À la clôture, une évaluation automatique de A à F de l’exécution."],
    "Reviews the session, from arithmetic first": ["Bewertet die Session – zuerst mit Rechnen","Revisa la sesión, primero con aritmética","Revisa a sessão, primeiro com aritmética","Analyse la session, en commençant par le calcul"],
    "Sequence, give-back, size drift after a loss and rule adherence are computed locally. Only then does the model write the paragraph — and a green day full of rule breaks is reported as a warning, not a win.": ["Reihenfolge, zurückgegebener Gewinn, Größenänderung nach einem Verlust und Regeltreue werden lokal berechnet. Erst dann schreibt das Modell den Absatz – und ein grüner Tag voller Regelbrüche wird als Warnung gemeldet, nicht als Erfolg.","Secuencia, ganancia devuelta, deriva del tamaño tras una pérdida y disciplina con las reglas se calculan en local. Solo después el modelo escribe el párrafo, y un día verde lleno de reglas rotas se marca como aviso, no como éxito.","Sequência, devolução de lucro, variação de tamanho depois de uma perda e disciplina com as regras são calculadas localmente. Só então o modelo escreve o parágrafo — e um dia verde cheio de regras quebradas vira alerta, não vitória.","Séquence, gains rendus, dérive de taille après une perte et respect des règles sont calculés localement. Ensuite seulement, le modèle rédige le paragraphe — et une journée verte pleine d’entorses aux règles est signalée comme alerte, pas comme réussite."],
    "Describe your setup in ordinary sentences — including FVG, CHoCH, sweeps, OTE and the rest — and get back rules you can read, correct and then backtest on real bars. The model formalises; it never judges a chart.": ["Beschreib dein Setup in normalen Sätzen – inklusive FVG, CHoCH, Sweeps, OTE und dem Rest – und bekomm Regeln zurück, die du lesen, korrigieren und dann auf echten Kerzen backtesten kannst. Das Modell formalisiert; es beurteilt nie einen Chart.","Describe tu setup con frases normales —incluidos FVG, CHoCH, sweeps, OTE y lo demás— y recibe reglas que puedes leer, corregir y luego hacer backtest sobre velas reales. El modelo formaliza; nunca juzga un gráfico.","Descreva seu setup em frases comuns — incluindo FVG, CHoCH, sweeps, OTE e o resto — e receba regras que você pode ler, corrigir e depois testar em candles reais. O modelo formaliza; nunca julga um gráfico.","Décrivez votre setup en phrases ordinaires — FVG, CHoCH, sweeps, OTE et le reste compris — et recevez des règles à lire, corriger puis backtester sur de vraies bougies. Le modèle formalise ; il ne juge jamais un graphique."],
    "Behavioural tag suggestions on your trades, a written course built from your own strategy description, and a glossary lookup for the terms the 429 curated ones do not cover — which will also tell you plainly when something is not a trading term at all.": ["Vorschläge für Verhaltens-Tags an deinen Trades, ein geschriebener Kurs aus deiner eigenen Strategiebeschreibung und ein Glossar-Nachschlagen für Begriffe, die die 429 gepflegten nicht abdecken – das dir auch klar sagt, wenn etwas gar kein Trading-Begriff ist.","Sugerencias de etiquetas de conducta en tus operaciones, un curso escrito a partir de la descripción de tu estrategia y una consulta de glosario para los términos que no cubren los 429 seleccionados, que también te dirá claramente cuando algo no es un término de trading.","Sugestões de tags de comportamento nas suas operações, um curso escrito a partir da descrição da sua estratégia e uma consulta de glossário para os termos que os 429 selecionados não cobrem — que também avisa com clareza quando algo nem é termo de trading.","Des suggestions de tags comportementaux sur vos trades, un cours rédigé à partir de la description de votre stratégie, et une recherche de glossaire pour les termes que les 429 retenus ne couvrent pas — qui vous dira aussi franchement quand quelque chose n’est pas du tout un terme de trading."],
    "Any slice of your history under six trades is withheld rather than reported. A 39% win rate over three trades is noise, and an AI that reads it out loud teaches you to chase noise.": ["Jeder Ausschnitt deiner Historie mit weniger als sechs Trades wird zurückgehalten statt gemeldet. Eine Win-Rate von 39 % über drei Trades ist Rauschen, und eine KI, die sie laut vorliest, bringt dir bei, Rauschen hinterherzulaufen.","Cualquier parte de tu historial con menos de seis operaciones se retiene en lugar de informarse. Un win rate del 39 % en tres operaciones es ruido, y una IA que lo lee en voz alta te enseña a perseguir ruido.","Qualquer recorte do seu histórico com menos de seis operações é retido em vez de reportado. Um win rate de 39 % em três operações é ruído, e uma IA que lê isso em voz alta ensina você a correr atrás de ruído.","Toute portion de votre historique de moins de six trades est retenue plutôt que rapportée. Un win rate de 39 % sur trois trades, c’est du bruit, et une IA qui le lit à voix haute vous apprend à courir après le bruit."],
    "Also live — Drills:": ["Ebenfalls live – Drills:","También disponible: Drills:","Também no ar — Drills:","Aussi disponible — Drills :"],
    "describe your strategy in plain words, the AI turns it into rules you can read and correct, and a backtest finds real historical spots to practise on — including the ones where the rule fires and still loses. You are scored on following the rule, never on the result.": ["Beschreib deine Strategie in einfachen Worten, die KI macht daraus Regeln, die du lesen und korrigieren kannst, und ein Backtest findet echte historische Stellen zum Üben – auch die, an denen die Regel auslöst und trotzdem verliert. Bewertet wird, ob du der Regel folgst, nie das Ergebnis.","describe tu estrategia con palabras sencillas, la IA la convierte en reglas que puedes leer y corregir, y un backtest encuentra puntos históricos reales para practicar, incluidos aquellos donde la regla se activa y aun así pierde. Se puntúa seguir la regla, nunca el resultado.","descreva sua estratégia em palavras simples, a IA transforma em regras que você pode ler e corrigir, e um backtest encontra pontos históricos reais para praticar — inclusive aqueles em que a regra dispara e mesmo assim perde. A nota é por seguir a regra, nunca pelo resultado.","décrivez votre stratégie avec des mots simples, l’IA la transforme en règles à lire et corriger, et un backtest trouve de vrais points historiques pour s’entraîner — y compris ceux où la règle se déclenche et perd quand même. Vous êtes noté sur le respect de la règle, jamais sur le résultat."],
    "the AI features run on Google's Gemini API, and only when you use one of them. Nothing is sent in the background, and none of it trains anybody's model. The full list of processors is in the": ["Die KI-Funktionen laufen über Googles Gemini-API, und nur, wenn du eine davon benutzt. Nichts wird im Hintergrund gesendet, und nichts davon trainiert irgendjemandes Modell. Die vollständige Liste der Auftragsverarbeiter steht im","las funciones de IA usan la API Gemini de Google, y solo cuando usas una de ellas. No se envía nada en segundo plano y nada entrena el modelo de nadie. La lista completa de encargados está en la","os recursos de IA rodam na API Gemini do Google, e só quando você usa um deles. Nada é enviado em segundo plano, e nada disso treina o modelo de ninguém. A lista completa de operadores está na","les fonctions IA tournent sur l’API Gemini de Google, et seulement quand vous en utilisez une. Rien n’est envoyé en arrière-plan, et rien de tout cela n’entraîne le modèle de qui que ce soit. La liste complète des sous-traitants se trouve dans la"],
    "privacy section": ["Datenschutz-Abschnitt","sección de privacidad","seção de privacidade","section confidentialité"],
    "Your journal belongs to you. You can export everything, at any time.": ["Dein Journal gehört dir. Du kannst jederzeit alles exportieren.","Tu diario es tuyo. Puedes exportarlo todo, en cualquier momento.","Seu diário é seu. Você pode exportar tudo, a qualquer momento.","Votre journal vous appartient. Vous pouvez tout exporter, à tout moment."],
    "— journal, playbooks, goals, psychology log and settings in one file.": ["– Journal, Playbooks, Ziele, Psychologie-Log und Einstellungen in einer Datei.","— diario, playbooks, objetivos, registro psicológico y ajustes en un archivo.","— diário, playbooks, metas, registro psicológico e configurações num arquivo.","— journal, playbooks, objectifs, journal psychologique et réglages dans un seul fichier."],
    "— every trade as a spreadsheet, a printable report, or pages in your own Notion workspace.": ["– jeder Trade als Tabelle, als druckbarer Bericht oder als Seiten in deinem eigenen Notion-Workspace.","— cada operación como hoja de cálculo, informe imprimible o páginas en tu propio Notion.","— cada operação como planilha, relatório para imprimir ou páginas no seu próprio Notion.","— chaque trade en tableur, en rapport imprimable ou en pages dans votre propre espace Notion."],
    "— load your own numbers into your own tools.": ["– lade deine eigenen Zahlen in deine eigenen Werkzeuge.","— carga tus propias cifras en tus propias herramientas.","— leve seus próprios números para suas próprias ferramentas.","— chargez vos propres chiffres dans vos propres outils."],
    "— your account and your synced journal data, in the settings, in one step.": ["– dein Konto und deine synchronisierten Journaldaten, in den Einstellungen, in einem Schritt.","— tu cuenta y los datos sincronizados del diario, en los ajustes, en un paso.","— sua conta e os dados sincronizados do diário, nas configurações, em um passo.","— votre compte et les données synchronisées du journal, dans les réglages, en une étape."],
    "The journal is free for good. Pro adds the automatic broker sync, Market Replay, the AI coach and the full analytics. You can try all of it for 7 days without a card.": ["Das Journal ist dauerhaft kostenlos. Pro bringt den automatischen Broker-Sync, Market Replay, den KI-Coach und die volle Analyse dazu. Du kannst alles 7 Tage ohne Karte testen.","El diario es gratis para siempre. Pro añade la sincronización automática con el bróker, Market Replay, el coach de IA y el análisis completo. Puedes probarlo todo 7 días sin tarjeta.","O diário é grátis para sempre. O Pro adiciona o sync automático com a corretora, Market Replay, o coach de IA e a análise completa. Você pode testar tudo por 7 dias sem cartão.","Le journal est gratuit pour de bon. Pro ajoute la synchro courtier automatique, Market Replay, le coach IA et l’analyse complète. Vous pouvez tout essayer 7 jours sans carte."],
    "Free vs": ["Free vs","Free vs","Free vs","Free vs"],
    "Bring a friend, get a month free": ["Bring einen Freund mit, bekomm einen Monat gratis","Trae a un amigo y consigue un mes gratis","Traga um amigo e ganhe um mês grátis","Parrainez un ami, recevez un mois offert"],
    "Every account gets a personal invite link. Your friend pays": ["Jedes Konto bekommt einen persönlichen Einladungslink. Dein Freund zahlt","Cada cuenta tiene un enlace de invitación personal. Tu amigo paga un","Cada conta recebe um link de convite pessoal. Seu amigo paga","Chaque compte reçoit un lien d’invitation personnel. Votre ami paie"],
    "10 % less": ["10 % weniger","10 % menos","10 % menos","10 % de moins"],
    "for their first month, and once that payment goes through you get": ["im ersten Monat, und sobald diese Zahlung durch ist, bekommst du","el primer mes, y en cuanto ese pago se completa recibes","no primeiro mês, e assim que esse pagamento passa você ganha","le premier mois, et dès que ce paiement passe, vous recevez"],
    "a full month of Pro": ["einen ganzen Monat Pro","un mes completo de Pro","um mês inteiro de Pro","un mois complet de Pro"],
    "— as billing credit if you subscribe, as extra time if you do not. No cap on how many. Applies to the monthly plan, and the reward lands on the first payment, not on sign-up.": ["– als Guthaben, wenn du ein Abo hast, als zusätzliche Zeit, wenn nicht. Keine Obergrenze. Gilt für das Monatsabo, und die Belohnung kommt mit der ersten Zahlung, nicht mit der Anmeldung.","— como crédito si estás suscrito, como tiempo extra si no. Sin límite. Se aplica al plan mensual y la recompensa llega con el primer pago, no con el registro.","— como crédito se você assina, como tempo extra se não. Sem limite. Vale para o plano mensal, e a recompensa chega com o primeiro pagamento, não com o cadastro.","— en crédit si vous êtes abonné, en temps supplémentaire sinon. Sans plafond. Valable pour l’offre mensuelle, et la récompense arrive au premier paiement, pas à l’inscription."],
    "We are a young product, and we would rather hear the hard truth from twenty real traders than guess. If you trade actively and keep a journal, or want to start one, apply for one of the founding places.": ["Wir sind ein junges Produkt und hören lieber die harte Wahrheit von zwanzig echten Tradern, als zu raten. Wenn du aktiv tradest und ein Journal führst oder damit anfangen willst, bewirb dich auf einen der Gründungsplätze.","Somos un producto joven y preferimos oír la dura verdad de veinte traders reales antes que adivinar. Si operas activamente y llevas un diario, o quieres empezar uno, solicita una de las plazas fundadoras.","Somos um produto jovem e preferimos ouvir a verdade dura de vinte traders reais a adivinhar. Se você opera ativamente e mantém um diário, ou quer começar um, candidate-se a uma das vagas fundadoras.","Nous sommes un jeune produit et préférons entendre la dure vérité de vingt vrais traders plutôt que deviner. Si vous tradez activement et tenez un journal, ou voulez en commencer un, postulez à l’une des places fondatrices."],
    "three months of Pro, free — every feature, no card.": ["drei Monate Pro gratis – jede Funktion, keine Karte.","tres meses de Pro gratis: todas las funciones, sin tarjeta.","três meses de Pro grátis — todos os recursos, sem cartão.","trois mois de Pro offerts — toutes les fonctions, sans carte."],
    "four weeks of real trading in it and honest written feedback on what works and what does not.": ["vier Wochen echtes Trading damit und ehrliches schriftliches Feedback, was funktioniert und was nicht.","cuatro semanas de trading real con ella y opinión sincera por escrito sobre lo que funciona y lo que no.","quatro semanas de trading real com ele e feedback escrito honesto sobre o que funciona e o que não.","quatre semaines de vrai trading dessus et un retour écrit honnête sur ce qui marche et ce qui ne marche pas."],
    "If you allow it,": ["Wenn du es erlaubst,","Si lo permites,","Se você permitir,","Si vous l’autorisez,"],
    "we may publish your review — always marked as coming from someone who received Pro for free.": ["dürfen wir deine Bewertung veröffentlichen – immer gekennzeichnet als von jemandem, der Pro gratis bekommen hat.","podremos publicar tu reseña, siempre indicando que viene de alguien que recibió Pro gratis.","podemos publicar sua avaliação — sempre indicando que vem de alguém que recebeu o Pro de graça.","nous pourrons publier votre avis — toujours signalé comme venant d’une personne ayant reçu Pro gratuitement."],
    "Twenty places, chosen by hand. We reply to every application.": ["Zwanzig Plätze, von Hand ausgewählt. Wir antworten auf jede Bewerbung.","Veinte plazas, elegidas a mano. Respondemos a cada solicitud.","Vinte vagas, escolhidas a dedo. Respondemos a cada candidatura.","Vingt places, choisies à la main. Nous répondons à chaque candidature."],
    "Automatically: cTrader through its Open API, which keeps syncing while the app is closed; MetaTrader 5 through its read-only investor password, trades from the MT5 phone app included; and Binance and Bybit through a read-only API key. Live from your platform: MetaTrader 5, TradingView, ATAS and Quantower report fills through a small tracker, and NinjaTrader is in beta. Everything else, Interactive Brokers included, arrives as a statement file. Search your broker by name and the format is detected automatically; an unknown one you map once by hand.": ["Automatisch: cTrader über die Open API, die auch bei geschlossener App weiter synchronisiert; MetaTrader 5 über das nur lesende Investor-Passwort, inklusive Trades aus der MT5-Handy-App; Binance und Bybit über einen nur lesenden API-Schlüssel. Live aus deiner Plattform: MetaTrader 5, TradingView, ATAS und Quantower melden Ausführungen über einen kleinen Tracker, NinjaTrader ist in der Beta. Alles andere, Interactive Brokers eingeschlossen, kommt als Kontoauszug. Such deinen Broker nach Namen, das Format wird automatisch erkannt; ein unbekanntes ordnest du einmal von Hand zu.","Automáticamente: cTrader mediante su Open API, que sigue sincronizando con la app cerrada; MetaTrader 5 mediante la contraseña de inversor de solo lectura, incluidas las operaciones de la app móvil de MT5; y Binance y Bybit con una clave API de solo lectura. En vivo desde tu plataforma: MetaTrader 5, TradingView, ATAS y Quantower envían ejecuciones con un pequeño tracker, y NinjaTrader está en beta. Todo lo demás, incluido Interactive Brokers, llega como extracto. Busca tu bróker por nombre y el formato se detecta solo; uno desconocido lo mapeas una vez a mano.","Automaticamente: cTrader pela Open API, que continua sincronizando com o app fechado; MetaTrader 5 pela senha de investidor somente leitura, incluindo operações do app de celular do MT5; e Binance e Bybit por uma chave de API somente leitura. Ao vivo da sua plataforma: MetaTrader 5, TradingView, ATAS e Quantower enviam execuções por um pequeno tracker, e NinjaTrader está em beta. O resto, Interactive Brokers incluída, chega como extrato. Procure sua corretora pelo nome e o formato é detectado automaticamente; uma desconhecida você mapeia uma vez à mão.","Automatiquement : cTrader via son Open API, qui continue de synchroniser application fermée ; MetaTrader 5 via le mot de passe investisseur en lecture seule, trades de l’application mobile MT5 compris ; Binance et Bybit via une clé API en lecture seule. En direct depuis votre plateforme : MetaTrader 5, TradingView, ATAS et Quantower transmettent les exécutions via un petit tracker, et NinjaTrader est en bêta. Tout le reste, Interactive Brokers compris, arrive sous forme de relevé. Cherchez votre courtier par son nom et le format est détecté automatiquement ; un format inconnu se mappe une fois à la main."],
    "Can Evidence place, change or close trades?": ["Kann Evidence Trades eröffnen, ändern oder schließen?","¿Puede Evidence abrir, cambiar o cerrar operaciones?","O Evidence pode abrir, alterar ou fechar operações?","Evidence peut-il ouvrir, modifier ou clôturer des trades ?"],
    "Can": ["Kann","¿Puede","O","Est-ce que"],
    "place, change or close trades?": ["Trades eröffnen, ändern oder schließen?","abrir, cambiar o cerrar operaciones?","pode abrir, alterar ou fechar operações?","peut ouvrir, modifier ou clôturer des trades ?"],
    "No. Every broker connection is read-only, and the app contains no order logic at all. It can read your history; it cannot touch your account.": ["Nein. Jede Broker-Verbindung ist nur lesend, und die App enthält überhaupt keine Order-Logik. Sie kann deine Historie lesen; dein Konto kann sie nicht anfassen.","No. Toda conexión con el bróker es de solo lectura y la app no contiene ninguna lógica de órdenes. Puede leer tu historial; no puede tocar tu cuenta.","Não. Toda conexão com corretora é somente leitura, e o app não tem nenhuma lógica de ordens. Ele lê seu histórico; não consegue mexer na sua conta.","Non. Chaque connexion courtier est en lecture seule et l’application ne contient aucune logique d’ordre. Elle peut lire votre historique ; elle ne peut pas toucher votre compte."],
    "Yes, and it does not expire: manual journaling, statement import and import from other journals, guardrails and the rules engine, Prop mode for one challenge, the Academy, Spaces, the mindset log, the glossary and up to three books. Pro adds the automatic syncs, Market Replay, Edge Lab and the AI coach.": ["Ja, und er läuft nie ab: manuelles Journal, Import von Kontoauszügen und aus anderen Journalen, Guardrails und die Regel-Engine, Prop-Modus für eine Challenge, die Academy, Spaces, das Mindset-Log, das Glossar und bis zu drei Bücher. Pro bringt die automatischen Syncs, Market Replay, Edge Lab und den KI-Coach dazu.","Sí, y no caduca: diario manual, importación de extractos y de otros diarios, guardrails y el motor de reglas, modo Prop para un challenge, la Academia, Spaces, el registro de mentalidad, el glosario y hasta tres libros. Pro añade las sincronizaciones automáticas, Market Replay, Edge Lab y el coach de IA.","Sim, e não expira: diário manual, importação de extratos e de outros diários, guardrails e o motor de regras, modo Prop para um challenge, a Academia, Spaces, o registro de mindset, o glossário e até três livros. O Pro adiciona os syncs automáticos, Market Replay, Edge Lab e o coach de IA.","Oui, et il n’expire pas : journal manuel, import de relevés et depuis d’autres journaux, garde-fous et moteur de règles, mode Prop pour un challenge, l’Académie, Spaces, le journal d’état d’esprit, le glossaire et jusqu’à trois livres. Pro ajoute les synchros automatiques, Market Replay, Edge Lab et le coach IA."],
    "$29.99 a month, or $279.99 a year, which comes to $23.33 a month. There is also a one-off Founding Lifetime licence for $419.99, limited to 50 seats. Prices are in US dollars and final: no VAT is charged under the German small-business rule (§ 19 UStG).": ["29,99 USD im Monat oder 279,99 USD im Jahr, also 23,33 USD pro Monat. Dazu gibt es eine einmalige Founding-Lifetime-Lizenz für 419,99 USD, begrenzt auf 50 Plätze. Die Preise sind in US-Dollar und Endpreise: Nach der Kleinunternehmerregelung (§ 19 UStG) wird keine Umsatzsteuer berechnet.","29,99 USD al mes o 279,99 USD al año, es decir, 23,33 USD al mes. También hay una licencia única Founding Lifetime por 419,99 USD, limitada a 50 plazas. Los precios están en dólares estadounidenses y son finales: no se cobra IVA según el régimen alemán de pequeñas empresas (§ 19 UStG).","29,99 USD por mês ou 279,99 USD por ano, o que dá 23,33 USD por mês. Há também uma licença única Founding Lifetime por 419,99 USD, limitada a 50 vagas. Os preços são em dólares americanos e finais: não há IVA, pela regra alemã de pequenas empresas (§ 19 UStG).","29,99 USD par mois, ou 279,99 USD par an, soit 23,33 USD par mois. Il existe aussi une licence unique Founding Lifetime à 419,99 USD, limitée à 50 places. Les prix sont en dollars américains et définitifs : pas de TVA, en vertu du régime allemand des petites entreprises (§ 19 UStG)."],
    "After you register, one click in the app starts 7 days of Pro. No payment details are asked for and nothing renews — after the week you are simply back on the free plan.": ["Nach der Registrierung startet ein Klick in der App 7 Tage Pro. Es werden keine Zahlungsdaten abgefragt und nichts verlängert sich – nach der Woche bist du einfach wieder im kostenlosen Plan.", "Tras registrarte, un clic en la app activa 7 días de Pro. No se piden datos de pago y nada se renueva: tras la semana vuelves sin más al plan gratuito.", "Depois do cadastro, um clique no app libera 7 dias de Pro. Nenhum dado de pagamento é pedido e nada se renova — depois da semana você simplesmente volta ao plano grátis.", "Après l’inscription, un clic dans l’application lance 7 jours de Pro. Aucune donnée de paiement n’est demandée et rien ne se renouvelle — après la semaine, vous revenez simplement au plan gratuit."],
    "In the app, or with": ["In der App oder mit","En la app, o con","No app, ou com","Dans l’application, ou avec"],
    "“Verträge hier kündigen” (cancel contracts here)": ["„Verträge hier kündigen“","«Verträge hier kündigen» (cancelar contratos aquí)","“Verträge hier kündigen” (cancelar contratos aqui)","« Verträge hier kündigen » (résilier les contrats ici)"],
    "at the bottom of this page, which works without signing in.": ["unten auf dieser Seite, was auch ohne Anmeldung funktioniert.","al final de esta página, que funciona sin iniciar sesión.","no fim desta página, que funciona sem entrar.","en bas de cette page, qui fonctionne sans connexion."],
    "Yes. There are import presets for exports from TradeZella, TraderSync, Tradervue, TradesViz, Edgewonk and Trademetria, and free column mapping for anything else — free on every plan. Screenshots do not come along, because those exports do not contain them.": ["Ja. Es gibt Import-Vorlagen für Exporte aus TradeZella, TraderSync, Tradervue, TradesViz, Edgewonk und Trademetria und eine freie Spaltenzuordnung für alles andere – kostenlos in jedem Plan. Screenshots kommen nicht mit, weil diese Exporte keine enthalten.","Sí. Hay presets de importación para exportaciones de TradeZella, TraderSync, Tradervue, TradesViz, Edgewonk y Trademetria, y mapeo libre de columnas para lo demás, gratis en todos los planes. Las capturas no vienen, porque esas exportaciones no las incluyen.","Sim. Há presets de importação para exportações do TradeZella, TraderSync, Tradervue, TradesViz, Edgewonk e Trademetria, e mapeamento livre de colunas para o resto — grátis em todos os planos. As capturas não vêm junto, porque essas exportações não as contêm.","Oui. Il existe des préréglages d’import pour les exports de TradeZella, TraderSync, Tradervue, TradesViz, Edgewonk et Trademetria, et un mappage libre des colonnes pour tout le reste — gratuit dans toutes les offres. Les captures ne suivent pas, car ces exports ne les contiennent pas."],
    "Only you, unless you decide otherwise. Notes, screenshots, prices and money are always private. A public profile — symbol, direction, pips, R:R and setup on the leaderboard — is off by default; you can switch it on in the settings under profile visibility. Sharing a book or your journal with a coach is also something you switch on yourself.": ["Nur du, außer du entscheidest anders. Notizen, Screenshots, Preise und Geld sind immer privat. Ein öffentliches Profil – Symbol, Richtung, Pips, R:R und Setup auf der Rangliste – ist standardmäßig aus; du schaltest es in den Einstellungen unter Profil-Sichtbarkeit ein. Auch ein Buch oder dein Journal mit einem Coach zu teilen, schaltest du selbst ein.","Solo tú, salvo que decidas otra cosa. Notas, capturas, precios y dinero son siempre privados. Un perfil público —símbolo, dirección, pips, R:R y setup en el ranking— está desactivado por defecto; puedes activarlo en los ajustes, en visibilidad del perfil. Compartir un libro o tu diario con un coach también lo activas tú.","Só você, a menos que decida o contrário. Notas, capturas, preços e dinheiro são sempre privados. Um perfil público — símbolo, direção, pips, R:R e setup no ranking — vem desligado; você liga nas configurações em visibilidade do perfil. Compartilhar um livro ou seu diário com um coach também é algo que você liga.","Vous seul, sauf décision contraire. Notes, captures, prix et montants sont toujours privés. Un profil public — symbole, sens, pips, R:R et setup au classement — est désactivé par défaut ; vous pouvez l’activer dans les réglages, sous visibilité du profil. Partager un livre ou votre journal avec un coach s’active aussi par vous-même."],
    "Can I work with a coach in": ["Arbeit mit einem Coach in","¿Puedo trabajar con un coach en","Posso trabalhar com um coach no","Puis-je travailler avec un coach dans"],
    "Yes. Being coached is free: you decide which parts of your journal your coach sees, and you can switch the sharing off again at any time. The coach needs Pro to run the cockpit, calls, bookings and student feed.": ["Ja. Gecoacht zu werden ist kostenlos: Du entscheidest, welche Teile deines Journals dein Coach sieht, und kannst das Teilen jederzeit wieder ausschalten. Der Coach braucht Pro für Cockpit, Calls, Buchungen und Schüler-Feed.","Sí. Recibir coaching es gratis: tú decides qué partes de tu diario ve tu coach y puedes desactivar el uso compartido cuando quieras. El coach necesita Pro para el cockpit, las llamadas, las reservas y el feed de alumnos.","Sim. Ser coachado é grátis: você decide quais partes do diário seu coach vê e pode desligar o compartilhamento a qualquer momento. O coach precisa do Pro para o cockpit, chamadas, agendamentos e feed de alunos.","Oui. Être coaché est gratuit : vous décidez quelles parties de votre journal votre coach voit, et vous pouvez couper le partage à tout moment. Le coach a besoin de Pro pour le cockpit, les appels, les réservations et le flux des élèves."],
    "Evidence installs as an app straight from the browser on iPhone and Android, with its own icon and notifications. There is no App Store version yet.": ["Evidence lässt sich direkt aus dem Browser als App auf iPhone und Android installieren, mit eigenem Symbol und Benachrichtigungen. Eine Version im App Store gibt es noch nicht.","Evidence se instala como app directamente desde el navegador en iPhone y Android, con su propio icono y notificaciones. Aún no hay versión en la App Store.","O Evidence se instala como app direto do navegador no iPhone e Android, com ícone e notificações próprios. Ainda não há versão na App Store.","Evidence s’installe comme une application directement depuis le navigateur sur iPhone et Android, avec sa propre icône et ses notifications. Il n’y a pas encore de version App Store."],
    "installs as an app straight from the browser on iPhone and Android, with its own icon and notifications. There is no App Store version yet.": ["lässt sich direkt aus dem Browser als App auf iPhone und Android installieren, mit eigenem Symbol und Benachrichtigungen. Eine Version im App Store gibt es noch nicht.","se instala como app directamente desde el navegador en iPhone y Android, con su propio icono y notificaciones. Aún no hay versión en la App Store.","se instala como app direto do navegador no iPhone e Android, com ícone e notificações próprios. Ainda não há versão na App Store.","s’installe comme une application directement depuis le navigateur sur iPhone et Android, avec sa propre icône et ses notifications. Il n’y a pas encore de version App Store."],
    "The numbers are counted by the app, not by the model. The AI reads the results and explains them, and it is instructed never to calculate, estimate or invent a figure. It runs on Google’s Gemini API, and only when you use an AI feature.": ["Die Zahlen zählt die App, nicht das Modell. Die KI liest die Ergebnisse und erklärt sie, und sie ist angewiesen, nie eine Zahl zu berechnen, zu schätzen oder zu erfinden. Sie läuft über Googles Gemini-API und nur, wenn du eine KI-Funktion benutzt.","Las cifras las cuenta la app, no el modelo. La IA lee los resultados y los explica, y tiene instrucciones de no calcular, estimar ni inventar nunca una cifra. Funciona con la API Gemini de Google, y solo cuando usas una función de IA.","Os números são contados pelo app, não pelo modelo. A IA lê os resultados e os explica, e é instruída a nunca calcular, estimar ou inventar um número. Ela roda na API Gemini do Google, e só quando você usa um recurso de IA.","Les chiffres sont comptés par l’application, pas par le modèle. L’IA lit les résultats et les explique, et elle a pour consigne de ne jamais calculer, estimer ni inventer un chiffre. Elle tourne sur l’API Gemini de Google, et seulement quand vous utilisez une fonction IA."],
    "Market Replay runs on free tick-accurate Dukascopy data for 61 instruments — metals, FX pairs, indices, oil and crypto. The main CME futures (ES, NQ, YM, GC, CL and their micros) can be replayed with exact contract values in whole contracts, on the matching CFD price data rather than CME's own feed, so price levels sit a small basis away from the futures chart. Stocks and options you can journal, import and analyse in full, but not replay.": ["Market Replay läuft auf kostenlosen tickgenauen Dukascopy-Daten für 61 Instrumente – Metalle, FX-Paare, Indizes, Öl und Krypto. Die wichtigsten CME-Futures (ES, NQ, YM, GC, CL und ihre Micros) lassen sich mit exakten Kontraktwerten in ganzen Kontrakten abspielen, auf den passenden CFD-Kursdaten statt auf dem CME-Feed selbst – die Kursniveaus liegen also eine kleine Basis neben dem Futures-Chart. Aktien und Optionen kannst du voll erfassen, importieren und auswerten, aber nicht im Replay handeln.","Market Replay usa datos gratuitos de Dukascopy precisos al tick para 61 instrumentos: metales, pares de FX, índices, petróleo y cripto. Los principales futuros de CME (ES, NQ, YM, GC, CL y sus micros) se reproducen con valores de contrato exactos en contratos enteros, sobre los datos CFD equivalentes en lugar del feed propio de CME, así que los niveles quedan a una pequeña base del gráfico de futuros. Acciones y opciones puedes registrarlas, importarlas y analizarlas por completo, pero no reproducirlas.","O Market Replay usa dados gratuitos da Dukascopy precisos ao tick para 61 instrumentos — metais, pares de FX, índices, petróleo e cripto. Os principais futuros da CME (ES, NQ, YM, GC, CL e seus micros) rodam no replay com valores exatos de contrato em contratos inteiros, sobre os dados CFD correspondentes em vez do feed da própria CME, então os níveis ficam a uma pequena base do gráfico de futuros. Ações e opções você registra, importa e analisa por completo, mas não faz replay.","Market Replay utilise des données Dukascopy gratuites précises au tick pour 61 instruments — métaux, paires FX, indices, pétrole et crypto. Les principaux futures du CME (ES, NQ, YM, GC, CL et leurs micros) se rejouent avec des valeurs de contrat exactes en contrats entiers, sur les données CFD correspondantes plutôt que sur le flux du CME, les niveaux se trouvent donc à une petite base du graphique du future. Actions et options se journalisent, s’importent et s’analysent entièrement, mais ne se rejouent pas."],
    "How is Evidence different from TradeZella or TraderSync?": ["Was unterscheidet Evidence von TradeZella oder TraderSync?","¿En qué se diferencia Evidence de TradeZella o TraderSync?","Em que o Evidence é diferente do TradeZella ou do TraderSync?","En quoi Evidence diffère-t-il de TradeZella ou TraderSync ?"],
    "How is": ["Was unterscheidet","¿En qué se diferencia","Em que o","En quoi"],
    "different from TradeZella or TraderSync?": ["von TradeZella oder TraderSync?","de TradeZella o TraderSync?","é diferente do TradeZella ou do TraderSync?","diffère-t-il de TradeZella ou TraderSync ?"],
    "Market Replay and the AI coach are in the one paid plan instead of a higher tier, the free plan does not expire, and the full backup exports everything. Side-by-side comparisons, with sources and the date we checked them:": ["Market Replay und der KI-Coach stecken im einzigen bezahlten Plan statt in einer höheren Stufe, der kostenlose Plan läuft nicht ab, und das komplette Backup exportiert alles. Direkte Vergleiche, mit Quellen und dem Datum unserer Prüfung:","Market Replay y el coach de IA están en el único plan de pago en lugar de en un nivel superior, el plan gratuito no caduca y la copia completa lo exporta todo. Comparativas lado a lado, con fuentes y la fecha en que las revisamos:","O Market Replay e o coach de IA estão no único plano pago em vez de num nível mais alto, o plano grátis não expira e o backup completo exporta tudo. Comparações lado a lado, com fontes e a data em que conferimos:","Market Replay et le coach IA sont dans l’unique offre payante plutôt que dans un niveau supérieur, l’offre gratuite n’expire pas, et la sauvegarde complète exporte tout. Comparatifs côte à côte, avec sources et date de vérification :"],
    "Trust & Safety": ["Vertrauen & Sicherheit","Confianza y seguridad","Confiança e segurança","Confiance et sécurité"],
    "Security &": ["Sicherheit &","Seguridad y","Segurança e","Sécurité et"],
    "data privacy": ["Datenschutz","privacidad de datos","privacidade de dados","confidentialité des données"],
    "Evidence reads your trades and never touches your account. Here is exactly what each connection can do, where your data lives, and who processes it.": ["Evidence liest deine Trades und rührt dein Konto nie an. Hier steht genau, was jede Verbindung kann, wo deine Daten liegen und wer sie verarbeitet.","Evidence lee tus operaciones y nunca toca tu cuenta. Aquí tienes exactamente qué puede hacer cada conexión, dónde están tus datos y quién los procesa.","O Evidence lê suas operações e nunca mexe na sua conta. Aqui está exatamente o que cada conexão pode fazer, onde ficam seus dados e quem os processa.","Evidence lit vos trades et ne touche jamais à votre compte. Voici exactement ce que chaque connexion peut faire, où se trouvent vos données et qui les traite."],
    "reads your trades and never touches your account. Here is exactly what each connection can do, where your data lives, and who processes it.": ["liest deine Trades und rührt dein Konto nie an. Hier steht genau, was jede Verbindung kann, wo deine Daten liegen und wer sie verarbeitet.","lee tus operaciones y nunca toca tu cuenta. Aquí tienes exactamente qué puede hacer cada conexión, dónde están tus datos y quién los procesa.","lê suas operações e nunca mexe na sua conta. Aqui está exatamente o que cada conexão pode fazer, onde ficam seus dados e quem os processa.","lit vos trades et ne touche jamais à votre compte. Voici exactement ce que chaque connexion peut faire, où se trouvent vos données et qui les traite."],
    "Evidence Trading does not place, modify, or close trades.": ["Evidence Trading eröffnet, ändert oder schließt keine Trades.","Evidence Trading no abre, modifica ni cierra operaciones.","O Evidence Trading não abre, altera nem fecha operações.","Evidence Trading n’ouvre, ne modifie ni ne clôture aucun trade."],
    "does not place, modify, or close trades.": ["eröffnet, ändert oder schließt keine Trades.","no abre, modifica ni cierra operaciones.","não abre, altera nem fecha operações.","n’ouvre, ne modifie ni ne clôture aucun trade."],
    "The application contains no trade execution logic. It is technically incapable of interacting with open orders or positions.": ["Die App enthält keine Logik zur Orderausführung. Sie kann technisch nicht mit offenen Orders oder Positionen interagieren.","La aplicación no contiene lógica de ejecución de operaciones. Técnicamente no puede interactuar con órdenes ni posiciones abiertas.","O aplicativo não contém lógica de execução de ordens. Tecnicamente, não consegue interagir com ordens ou posições abertas.","L’application ne contient aucune logique d’exécution. Elle est techniquement incapable d’interagir avec des ordres ou positions ouverts."],
    "— one Open API permission, used only to read trades, balance and symbol data": ["– eine einzige Open-API-Berechtigung, nur genutzt, um Trades, Kontostand und Symboldaten zu lesen","— un único permiso de la Open API, usado solo para leer operaciones, saldo y datos de símbolos","— uma única permissão da Open API, usada só para ler operações, saldo e dados de símbolos","— une seule autorisation Open API, utilisée uniquement pour lire trades, solde et données de symboles"],
    "— the investor password, which MetaTrader itself limits to reading": ["– das Investor-Passwort, das MetaTrader selbst aufs Lesen beschränkt","— la contraseña de inversor, que el propio MetaTrader limita a lectura","— a senha de investidor, que o próprio MetaTrader limita à leitura","— le mot de passe investisseur, que MetaTrader limite lui-même à la lecture"],
    "— read-only API keys; a key that can trade or withdraw is refused": ["– nur lesende API-Schlüssel; ein Schlüssel, der handeln oder abheben kann, wird abgelehnt","— claves API de solo lectura; una clave que puede operar o retirar se rechaza","— chaves de API somente leitura; uma chave que pode operar ou sacar é recusada","— clés API en lecture seule ; une clé capable de trader ou de retirer est refusée"],
    "Trackers": ["Tracker","Trackers","Trackers","Trackers"],
    "— MT5, ATAS, Quantower and TradingView send fills one way, into your journal": ["– MT5, ATAS, Quantower und TradingView senden Ausführungen nur in eine Richtung: in dein Journal","— MT5, ATAS, Quantower y TradingView envían ejecuciones en un solo sentido, hacia tu diario","— MT5, ATAS, Quantower e TradingView enviam execuções num só sentido, para o seu diário","— MT5, ATAS, Quantower et TradingView envoient les exécutions dans un seul sens, vers votre journal"],
    "Placing, changing or closing an order —": ["Eine Order eröffnen, ändern oder schließen –","Abrir, cambiar o cerrar una orden:","Abrir, alterar ou fechar uma ordem —","Ouvrir, modifier ou clôturer un ordre —"],
    "there is no code for it": ["dafür gibt es keinen Code","no hay código para ello","não existe código para isso","il n’existe aucun code pour cela"],
    "Funds, transfers or payment methods —": ["Guthaben, Überweisungen oder Zahlungsmittel –","Fondos, transferencias o métodos de pago:","Fundos, transferências ou meios de pagamento —","Fonds, virements ou moyens de paiement —"],
    "never accessible": ["nie zugänglich","nunca accesibles","nunca acessíveis","jamais accessibles"],
    "Your journal sits in a document only your account can read": ["Dein Journal liegt in einem Dokument, das nur dein Konto lesen kann","Tu diario está en un documento que solo tu cuenta puede leer","Seu diário fica num documento que só a sua conta pode ler","Votre journal se trouve dans un document que seul votre compte peut lire"],
    "Processed only by the services named below, for the job named there": ["Verarbeitet nur von den unten genannten Diensten, für den dort genannten Zweck","Procesado solo por los servicios indicados abajo, para la tarea indicada allí","Processado só pelos serviços listados abaixo, para a tarefa indicada ali","Traité uniquement par les services nommés ci-dessous, pour la tâche indiquée"],
    "Passwords, keys and tokens stored encrypted, never written to a log": ["Passwörter, Schlüssel und Tokens verschlüsselt gespeichert, nie in ein Log geschrieben","Contraseñas, claves y tokens guardados cifrados, nunca escritos en un log","Senhas, chaves e tokens guardados criptografados, nunca gravados em log","Mots de passe, clés et jetons stockés chiffrés, jamais écrits dans un journal système"],
    "Disconnect cTrader or MT5 and the stored credentials are deleted": ["Trennst du cTrader oder MT5, werden die gespeicherten Zugangsdaten gelöscht","Desconecta cTrader o MT5 y las credenciales guardadas se borran","Desconecte cTrader ou MT5 e as credenciais guardadas são apagadas","Déconnectez cTrader ou MT5 et les identifiants stockés sont supprimés"],
    "Selling data, ad tracking or pooling data across accounts —": ["Daten verkaufen, Werbe-Tracking oder Daten über Konten hinweg zusammenführen –","Vender datos, rastreo publicitario o combinar datos entre cuentas:","Vender dados, rastreamento de anúncios ou juntar dados entre contas —","Vente de données, pistage publicitaire ou regroupement de données entre comptes —"],
    "never": ["niemals","nunca","nunca","jamais"],
    "Where your data lives — and": ["Wo deine Daten liegen – und","Dónde están tus datos, y","Onde ficam seus dados — e","Où se trouvent vos données — et"],
    "how it is encrypted": ["wie sie verschlüsselt sind","cómo se cifran","como são criptografados","comment elles sont chiffrées"],
    "Concrete answers, not \"bank-grade security\". Every claim below is also in our privacy policy.": ["Konkrete Antworten statt „Sicherheit wie bei einer Bank“. Jede Aussage unten steht auch in unserer Datenschutzerklärung.","Respuestas concretas, no «seguridad de nivel bancario». Cada afirmación de abajo también está en nuestra política de privacidad.","Respostas concretas, não “segurança de nível bancário”. Cada afirmação abaixo também está na nossa política de privacidade.","Des réponses concrètes, pas une « sécurité de niveau bancaire ». Chaque affirmation ci-dessous figure aussi dans notre politique de confidentialité."],
    "Journal storage location": ["Speicherort des Journals","Ubicación del diario","Local de armazenamento do diário","Lieu de stockage du journal"],
    "EU multi-region": ["EU, mehrere Regionen","UE multirregión","UE multirregião","UE multirégion"],
    "Google Cloud Firestore, replicated across Belgium and the Netherlands. Your trades, notes and screenshots do not leave the EU.": ["Google Cloud Firestore, gespiegelt in Belgien und den Niederlanden. Deine Trades, Notizen und Screenshots verlassen die EU nicht.","Google Cloud Firestore, replicado entre Bélgica y Países Bajos. Tus operaciones, notas y capturas no salen de la UE.","Google Cloud Firestore, replicado entre Bélgica e Holanda. Suas operações, notas e capturas não saem da UE.","Google Cloud Firestore, répliqué entre la Belgique et les Pays-Bas. Vos trades, notes et captures ne quittent pas l’UE."],
    "Encryption in transit": ["Verschlüsselung bei der Übertragung","Cifrado en tránsito","Criptografia em trânsito","Chiffrement en transit"],
    "TLS 1.2+ (TLS 1.3 preferred)": ["TLS 1.2+ (TLS 1.3 bevorzugt)","TLS 1.2+ (TLS 1.3 preferido)","TLS 1.2+ (TLS 1.3 preferido)","TLS 1.2+ (TLS 1.3 de préférence)"],
    "HTTPS everywhere, HSTS on the domain. The broker bridge talks to the cTrader Open API over TLS as well — no plaintext hop anywhere in the chain.": ["Überall HTTPS, HSTS auf der Domain. Auch die Broker-Brücke spricht per TLS mit der cTrader Open API – nirgends in der Kette ein unverschlüsselter Abschnitt.","HTTPS en todo, HSTS en el dominio. El puente con el bróker también habla con la cTrader Open API por TLS: ningún tramo en texto plano en toda la cadena.","HTTPS em tudo, HSTS no domínio. A ponte com a corretora também fala com a cTrader Open API via TLS — nenhum trecho em texto puro na cadeia.","HTTPS partout, HSTS sur le domaine. La passerelle courtier communique aussi avec la cTrader Open API en TLS — aucun maillon en clair dans la chaîne."],
    "Encryption at rest": ["Verschlüsselung im Ruhezustand","Cifrado en reposo","Criptografia em repouso","Chiffrement au repos"],
    "All stored data is AES-256 encrypted at rest by the platform. Broker refresh tokens get a second layer of": ["Alle gespeicherten Daten sind von der Plattform im Ruhezustand AES-256-verschlüsselt. Refresh-Tokens der Broker bekommen eine zweite Schicht","Todos los datos guardados se cifran en reposo con AES-256 por la plataforma. Los refresh tokens del bróker reciben una segunda capa de","Todos os dados guardados são criptografados em repouso com AES-256 pela plataforma. Os refresh tokens da corretora ganham uma segunda camada de","Toutes les données stockées sont chiffrées au repos en AES-256 par la plateforme. Les jetons de rafraîchissement des courtiers reçoivent une seconde couche de"],
    "application-level encryption, with the key held only in the server environment. MT5 investor passwords are AES-256 encrypted on our own MT5 server in Germany — never in the app database.": ["Verschlüsselung auf Anwendungsebene, der Schlüssel liegt nur in der Serverumgebung. MT5-Investor-Passwörter sind AES-256-verschlüsselt auf unserem eigenen MT5-Server in Deutschland – nie in der App-Datenbank.","cifrado a nivel de aplicación, con la clave guardada solo en el entorno del servidor. Las contraseñas de inversor de MT5 se cifran con AES-256 en nuestro propio servidor MT5 en Alemania, nunca en la base de datos de la app.","criptografia no nível da aplicação, com a chave guardada só no ambiente do servidor. As senhas de investidor do MT5 são criptografadas com AES-256 no nosso próprio servidor MT5 na Alemanha — nunca no banco de dados do app.","chiffrement au niveau applicatif, la clé n’étant détenue que dans l’environnement serveur. Les mots de passe investisseur MT5 sont chiffrés en AES-256 sur notre propre serveur MT5 en Allemagne — jamais dans la base de l’application."],
    "Who can read your journal": ["Wer dein Journal lesen kann","Quién puede leer tu diario","Quem pode ler seu diário","Qui peut lire votre journal"],
    "Only you": ["Nur du","Solo tú","Só você","Vous seul"],
    "Per-user database rules enforced server-side. Nothing is shared unless you publish it yourself — a community post, a report link or a mentor share you can revoke. No cross-account aggregation, no selling, no ad tracking.": ["Datenbankregeln pro Nutzer, serverseitig durchgesetzt. Nichts wird geteilt, außer du veröffentlichst es selbst – ein Community-Beitrag, ein Berichtslink oder eine Mentor-Freigabe, die du widerrufen kannst. Keine kontoübergreifende Auswertung, kein Verkauf, kein Werbe-Tracking.","Reglas de base de datos por usuario aplicadas en el servidor. No se comparte nada salvo que tú lo publiques: un post en la comunidad, un enlace de informe o un acceso de mentor que puedes revocar. Sin agregación entre cuentas, sin venta, sin rastreo publicitario.","Regras de banco de dados por usuário aplicadas no servidor. Nada é compartilhado a menos que você mesmo publique — um post na comunidade, um link de relatório ou um compartilhamento com mentor que você pode revogar. Sem agregação entre contas, sem venda, sem rastreamento de anúncios.","Règles de base de données par utilisateur, appliquées côté serveur. Rien n’est partagé sauf si vous le publiez vous-même — un post communautaire, un lien de rapport ou un partage mentor révocable. Pas d’agrégation entre comptes, pas de vente, pas de pistage publicitaire."],
    "Read-only, revocable": ["Nur lesend, widerrufbar","Solo lectura, revocable","Somente leitura, revogável","Lecture seule, révocable"],
    "Every connection reads; none can trade. There is no order-execution code in the product. Disconnect cTrader or MT5, or switch off background sync, and the stored token or password is deleted.": ["Jede Verbindung liest; keine kann handeln. Im Produkt gibt es keinen Code zur Orderausführung. Trennst du cTrader oder MT5 oder schaltest den Hintergrund-Sync aus, wird das gespeicherte Token oder Passwort gelöscht.","Cada conexión lee; ninguna puede operar. No hay código de ejecución de órdenes en el producto. Desconecta cTrader o MT5, o desactiva la sincronización en segundo plano, y el token o la contraseña guardados se borran.","Toda conexão lê; nenhuma opera. Não há código de execução de ordens no produto. Desconecte cTrader ou MT5, ou desligue o sync em segundo plano, e o token ou a senha guardados são apagados.","Chaque connexion lit ; aucune ne peut trader. Le produit ne contient aucun code d’exécution d’ordres. Déconnectez cTrader ou MT5, ou coupez la synchro en arrière-plan, et le jeton ou mot de passe stocké est supprimé."],
    "Passwords & payments": ["Passwörter & Zahlungen","Contraseñas y pagos","Senhas e pagamentos","Mots de passe et paiements"],
    "We never see them": ["Wir sehen sie nie","Nunca los vemos","Nunca os vemos","Nous ne les voyons jamais"],
    "Authentication is handled by Firebase Auth (passwords stored only as a salted hash on their side). Card data goes straight to Stripe — we receive a customer and subscription id, never a card number.": ["Die Anmeldung läuft über Firebase Auth (Passwörter dort nur als gesalzener Hash gespeichert). Kartendaten gehen direkt an Stripe – wir erhalten eine Kunden- und Abo-ID, nie eine Kartennummer.","La autenticación la gestiona Firebase Auth (las contraseñas se guardan allí solo como hash con sal). Los datos de tarjeta van directos a Stripe: recibimos un id de cliente y de suscripción, nunca un número de tarjeta.","A autenticação é feita pelo Firebase Auth (senhas guardadas lá só como hash com sal). Os dados do cartão vão direto para a Stripe — recebemos um id de cliente e de assinatura, nunca um número de cartão.","L’authentification est gérée par Firebase Auth (mots de passe stockés chez eux uniquement sous forme de hachage salé). Les données de carte vont directement à Stripe — nous recevons un identifiant client et d’abonnement, jamais un numéro de carte."],
    "Sub-processors": ["Auftragsverarbeiter","Subencargados","Suboperadores","Sous-traitants"],
    "Named, not hidden": ["Genannt, nicht versteckt","Nombrados, no ocultos","Nomeados, não escondidos","Nommés, pas cachés"],
    "Google (Firebase; the Gemini API behind every AI feature, only when you use one; page translation), GitHub (website delivery), Cloudflare (workers and the tunnel to our MT5 server in Germany), Render (cTrader bridge), Stripe (payments), Resend (email), Dukascopy & Twelve Data (price data, no personal data sent), jsDelivr & Google Fonts (page assets). Non-EU transfers run on Standard Contractual Clauses.": ["Google (Firebase; die Gemini-API hinter jeder KI-Funktion, nur wenn du eine benutzt; Seitenübersetzung), GitHub (Auslieferung der Website), Cloudflare (Worker und der Tunnel zu unserem MT5-Server in Deutschland), Render (cTrader-Brücke), Stripe (Zahlungen), Resend (E-Mail), Dukascopy & Twelve Data (Kursdaten, keine personenbezogenen Daten), jsDelivr & Google Fonts (Seitenbestandteile). Übermittlungen außerhalb der EU laufen über Standardvertragsklauseln.","Google (Firebase; la API Gemini detrás de cada función de IA, solo cuando usas una; traducción de la página), GitHub (entrega del sitio), Cloudflare (workers y el túnel a nuestro servidor MT5 en Alemania), Render (puente cTrader), Stripe (pagos), Resend (email), Dukascopy y Twelve Data (datos de precios, sin datos personales), jsDelivr y Google Fonts (recursos de la página). Las transferencias fuera de la UE se rigen por Cláusulas Contractuales Tipo.","Google (Firebase; a API Gemini por trás de cada recurso de IA, só quando você usa um; tradução da página), GitHub (entrega do site), Cloudflare (workers e o túnel até nosso servidor MT5 na Alemanha), Render (ponte cTrader), Stripe (pagamentos), Resend (e-mail), Dukascopy e Twelve Data (dados de preço, sem dados pessoais), jsDelivr e Google Fonts (recursos da página). Transferências fora da UE seguem Cláusulas Contratuais Padrão.","Google (Firebase ; l’API Gemini derrière chaque fonction IA, seulement quand vous en utilisez une ; traduction de la page), GitHub (diffusion du site), Cloudflare (workers et tunnel vers notre serveur MT5 en Allemagne), Render (passerelle cTrader), Stripe (paiements), Resend (e-mail), Dukascopy et Twelve Data (données de prix, aucune donnée personnelle), jsDelivr et Google Fonts (ressources de la page). Les transferts hors UE reposent sur les clauses contractuelles types."],
    "Your rights": ["Deine Rechte","Tus derechos","Seus direitos","Vos droits"],
    "Export & delete, any time": ["Exportieren & löschen, jederzeit","Exportar y borrar, cuando quieras","Exportar e apagar, a qualquer momento","Exporter et supprimer, à tout moment"],
    "Full CSV/JSON export from inside the app, one-click account deletion, and GDPR access/erasure requests answered within 30 days. Cancel your subscription in the app — no email required.": ["Vollständiger CSV/JSON-Export in der App, Kontolöschung mit einem Klick und DSGVO-Anfragen auf Auskunft oder Löschung innerhalb von 30 Tagen beantwortet. Kündige dein Abo in der App – ohne E-Mail.","Exportación completa CSV/JSON desde la app, eliminación de la cuenta con un clic y solicitudes RGPD de acceso o supresión respondidas en 30 días. Cancela tu suscripción en la app, sin email.","Exportação completa em CSV/JSON dentro do app, exclusão da conta com um clique e pedidos de acesso ou exclusão pelo RGPD respondidos em 30 dias. Cancele a assinatura no app — sem e-mail.","Export complet CSV/JSON depuis l’application, suppression du compte en un clic, et demandes RGPD d’accès ou d’effacement traitées sous 30 jours. Résiliez votre abonnement dans l’application — sans e-mail."],
    "Something here unclear or missing? Write to us and we will answer it in writing — and put the answer on this page.": ["Ist hier etwas unklar oder fehlt etwas? Schreib uns, wir antworten schriftlich – und stellen die Antwort auf diese Seite.","¿Algo poco claro o que falte? Escríbenos y te responderemos por escrito, y pondremos la respuesta en esta página.","Algo aqui está confuso ou faltando? Escreva para nós e responderemos por escrito — e colocaremos a resposta nesta página.","Quelque chose d’obscur ou de manquant ici ? Écrivez-nous et nous répondrons par écrit — et mettrons la réponse sur cette page."],
    "Read Only ─────→": ["Nur lesend ─────→","Solo lectura ─────→","Somente leitura ─────→","Lecture seule ─────→"],
    "No writes": ["Kein Schreibzugriff","Sin escritura","Sem escrita","Aucune écriture"],
    "Journal &": ["Journal &","Diario y","Diário e","Journal et"],
    "analytics": ["Analyse","análisis","análise","analyse"],
    "Encrypted ─────→": ["Verschlüsselt ─────→","Cifrado ─────→","Criptografado ─────→","Chiffré ─────→"],
    "The journal is free for good, and one click gives you 7 days of Pro without a card. Connect a broker, import a statement or log your first trade by hand.": ["Das Journal ist dauerhaft kostenlos, und ein Klick gibt dir 7 Tage Pro, ohne Karte. Verbinde einen Broker, importiere einen Kontoauszug oder trag deinen ersten Trade von Hand ein.", "El diario es gratis para siempre y un clic te da 7 días de Pro sin tarjeta. Conecta un bróker, importa un extracto o registra tu primera operación a mano.", "O diário é grátis para sempre e um clique dá 7 dias de Pro sem cartão. Conecte uma corretora, importe um extrato ou registre sua primeira operação à mão.", "Le journal est gratuit pour de bon, et un clic vous donne 7 jours de Pro sans carte. Connectez un courtier, importez un relevé ou saisissez votre premier trade à la main."],
    "Follow along": ["Folge uns","Síguenos","Acompanhe","Suivez-nous"],
    "Evidence AI": ["Evidence AI","Evidence AI","Evidence AI","Evidence AI"],
    "cTrader trading journal": ["cTrader-Trading-Journal","Diario de trading para cTrader","Diário de trading para cTrader","Journal de trading cTrader"],
    "Prop firm trading journal": ["Trading-Journal für Prop-Firmen","Diario de trading para prop firms","Diário de trading para prop firms","Journal de trading pour prop firms"],
    "Trading journal with market replay": ["Trading-Journal mit Market Replay","Diario de trading con market replay","Diário de trading com market replay","Journal de trading avec market replay"],
    "Changelog": ["Änderungsprotokoll","Registro de cambios","Registro de mudanças","Journal des modifications"],
    "System status": ["Systemstatus","Estado del sistema","Status do sistema","État du système"],
    "Crypto trading journal": ["Krypto-Trading-Journal","Diario de trading cripto","Diário de trading cripto","Journal de trading crypto"],
    "Trading community platform for mentors": ["Community-Plattform für Trading-Mentoren","Plataforma de comunidad para mentores de trading","Plataforma de comunidade para mentores de trading","Plateforme communautaire pour mentors de trading"],
    "Free trading courses": ["Kostenlose Trading-Kurse","Cursos de trading gratis","Cursos de trading grátis","Cours de trading gratuits"],
    "AI Coach": ["KI-Coach", "Coach de IA", "Coach de IA", "Coach IA"],
    "Mentor": ["Mentor", "Mentor", "Mentor", "Mentor"],
    "Read more": ["Weiterlesen", "Leer más", "Ler mais", "Lire la suite"],
    "Show less": ["Weniger zeigen", "Mostrar menos", "Mostrar menos", "Afficher moins"],
    "Show fewer": ["Weniger zeigen", "Mostrar menos", "Mostrar menos", "Afficher moins"],
    "Register →": ["Registrieren →", "Registrarse →", "Cadastrar →", "S’inscrire →"],
    "Replay · candle by candle · illustration": ["Replay · Kerze für Kerze · Illustration", "Replay · vela a vela · ilustración", "Replay · candle a candle · ilustração", "Replay · bougie par bougie · illustration"],
    "Free forever": ["Für immer kostenlos", "Gratis para siempre", "Grátis para sempre", "Gratuit pour toujours"],
    "7 days of Pro free, no card": ["7 Tage Pro gratis, ohne Karte", "7 días de Pro gratis, sin tarjeta", "7 dias de Pro grátis, sem cartão", "7 jours de Pro offerts, sans carte"],
    "Compare plans →": ["Pläne vergleichen →", "Comparar planes →", "Comparar planos →", "Comparer les offres →"],
    "Show details ↓": ["Mehr dazu ↓", "Ver detalles ↓", "Ver detalhes ↓", "Voir les détails ↓"],
    "Hide details ↑": ["Weniger ↑", "Ocultar detalles ↑", "Ocultar detalhes ↑", "Masquer les détails ↑"],
    "Who builds this": ["Wer das baut", "Quién lo construye", "Quem constrói isto", "Qui construit ceci"],
    "Built by a trader,": ["Gebaut von einem Trader,", "Hecho por un trader,", "Feito por um trader,", "Conçu par un trader,"],
    "not a marketing team": ["nicht von einem Marketing-Team", "no por un equipo de marketing", "não por uma equipe de marketing", "pas par une équipe marketing"],
    "Founder · trades forex, CFDs, futures and prop challenges": ["Gründer · tradet Forex, CFDs, Futures und Prop-Challenges", "Fundador · opera forex, CFD, futuros y prop challenges", "Fundador · opera forex, CFDs, futuros e prop challenges", "Fondateur · trade le forex, les CFD, les futures et des prop challenges"],
    "I trade myself — forex and CFDs, futures, and prop firm challenges. Every journal I tried showed me what happened. None of them could tell me whether I had actually changed.": [
      "Ich trade selbst – Forex und CFDs, Futures und Prop-Firm-Challenges. Jedes Journal, das ich ausprobiert habe, hat mir gezeigt, was passiert ist. Keines konnte mir sagen, ob ich mich wirklich verändert hatte.",
      "Yo mismo opero: forex y CFD, futuros y challenges de prop firms. Cada diario que probé me mostraba lo que había pasado. Ninguno podía decirme si de verdad había cambiado.",
      "Eu mesmo opero — forex e CFDs, futuros e challenges de prop firms. Todo diário que testei me mostrava o que aconteceu. Nenhum conseguia dizer se eu realmente tinha mudado.",
      "Je trade moi-même — forex et CFD, futures et challenges de prop firms. Chaque journal essayé me montrait ce qui s’était passé. Aucun ne pouvait me dire si j’avais réellement changé."],
    "So I built the one I wanted: numbers that say how many trades stand behind them, a replay to practise on, and a course that measures whether a habit really moved. It is built in Germany, and you can reach me directly.": [
      "Also habe ich das gebaut, das ich wollte: Zahlen, die sagen, wie viele Trades hinter ihnen stehen, ein Replay zum Üben und einen Kurs, der misst, ob sich eine Gewohnheit wirklich bewegt hat. Es entsteht in Deutschland, und du erreichst mich direkt.",
      "Así que construí el que quería: cifras que dicen cuántas operaciones hay detrás, un replay para practicar y un curso que mide si un hábito cambió de verdad. Se hace en Alemania y puedes contactarme directamente.",
      "Então construí o que eu queria: números que dizem quantas operações estão por trás deles, um replay para praticar e um curso que mede se um hábito realmente mudou. É feito na Alemanha, e você fala comigo diretamente.",
      "Alors j’ai construit celui que je voulais : des chiffres qui disent combien de trades se cachent derrière, un replay pour s’entraîner et un cours qui mesure si une habitude a vraiment bougé. Il est conçu en Allemagne, et vous pouvez me joindre directement."],
    "Talk to me on Discord →": ["Schreib mir auf Discord →", "Háblame en Discord →", "Fale comigo no Discord →", "Parlez-moi sur Discord →"],
    "Write me an email": ["Schreib mir eine E-Mail", "Escríbeme un email", "Me mande um e-mail", "Écrivez-moi un e-mail"],
    "Free edge check": ["Gratis-Edge-Check", "Análisis de edge gratis", "Análise de edge grátis", "Analyse d’edge gratuite"],
    "Drop a statement.": ["Kontoauszug ablegen.", "Suelta un extracto.", "Solte um extrato.", "Déposez un relevé."],
    "See your edge in seconds.": ["Deinen Edge in Sekunden sehen.", "Ve tu edge en segundos.", "Veja seu edge em segundos.", "Voyez votre edge en quelques secondes."],
    "Export your trade history from MT5, cTrader or your broker as CSV and drop it here. The file is read in your browser and never uploaded. No account needed.": ["Exportiere deine Trade-Historie aus MT5, cTrader oder von deinem Broker als CSV und leg sie hier ab. Die Datei wird in deinem Browser gelesen und nie hochgeladen. Kein Konto nötig.", "Exporta tu historial de operaciones de MT5, cTrader o tu bróker en CSV y suéltalo aquí. El archivo se lee en tu navegador y nunca se sube. Sin cuenta.", "Exporte seu histórico de operações do MT5, cTrader ou da sua corretora em CSV e solte aqui. O arquivo é lido no seu navegador e nunca enviado. Sem conta.", "Exportez votre historique de trades depuis MT5, cTrader ou votre courtier en CSV et déposez-le ici. Le fichier est lu dans votre navigateur et jamais envoyé. Aucun compte requis."],
    "Choose a CSV file": ["CSV-Datei auswählen", "Elegir un archivo CSV", "Escolher um arquivo CSV", "Choisir un fichier CSV"],
    "or drag it here": ["oder hierher ziehen", "o arrástralo aquí", "ou arraste para cá", "ou glissez-le ici"],
    "We could not read trades from this file. Try the CSV export of your platform — after signing up you can also map the columns by hand.": ["Aus dieser Datei konnten wir keine Trades lesen. Versuch den CSV-Export deiner Plattform – nach der Anmeldung kannst du die Spalten auch von Hand zuordnen.", "No pudimos leer operaciones de este archivo. Prueba la exportación CSV de tu plataforma; tras registrarte también puedes mapear las columnas a mano.", "Não conseguimos ler operações deste arquivo. Tente a exportação CSV da sua plataforma — depois do cadastro você também pode mapear as colunas à mão.", "Impossible de lire des trades dans ce fichier. Essayez l’export CSV de votre plateforme — après inscription, vous pouvez aussi mapper les colonnes à la main."],
    "Trades": ["Trades", "Operaciones", "Operações", "Trades"],
    "Win rate": ["Win-Rate", "Win rate", "Win rate", "Win rate"],
    "95% range": ["95-%-Bereich", "Rango del 95 %", "Faixa de 95 %", "Plage à 95 %"],
    "Net result": ["Nettoergebnis", "Resultado neto", "Resultado líquido", "Résultat net"],
    "in your account currency": ["in deiner Kontowährung", "en la divisa de tu cuenta", "na moeda da sua conta", "dans la devise de votre compte"],
    "Profit factor": ["Profit-Faktor", "Profit factor", "Profit factor", "Profit factor"],
    "Best weekday": ["Bester Wochentag", "Mejor día", "Melhor dia da semana", "Meilleur jour"],
    "Weakest session": ["Schwächste Session", "Sesión más floja", "Sessão mais fraca", "Session la plus faible"],
    "trades counted": ["Trades gezählt", "operaciones contadas", "operações contadas", "trades comptés"],
    "needs 5+ trades per day": ["braucht 5+ Trades pro Tag", "necesita 5+ operaciones por día", "precisa de 5+ operações por dia", "il faut 5+ trades par jour"],
    "needs 5+ trades per session": ["braucht 5+ Trades pro Session", "necesita 5+ operaciones por sesión", "precisa de 5+ operações por sessão", "il faut 5+ trades par session"],
    "Sample size:": ["Stichprobe:", "Tamaño de muestra:", "Tamanho da amostra:", "Taille d’échantillon :"],
    "Anecdotal": ["Anekdotisch", "Anecdótico", "Anedótico", "Anecdotique"],
    "Low confidence": ["Geringe Aussagekraft", "Confianza baja", "Confiança baixa", "Confiance faible"],
    "Moderate": ["Mittlere Aussagekraft", "Moderada", "Moderada", "Modérée"],
    "Solid": ["Belastbar", "Sólida", "Sólida", "Solide"],
    "Every number here is counted from your file — nothing is estimated.": ["Jede Zahl hier ist aus deiner Datei gezählt – nichts ist geschätzt.", "Cada cifra se cuenta a partir de tu archivo; nada se estima.", "Cada número aqui é contado do seu arquivo — nada é estimado.", "Chaque chiffre est compté à partir de votre fichier — rien n’est estimé."],
    "Save it and get the full report →": ["Speichern und vollen Bericht holen →", "Guárdalo y obtén el informe completo →", "Salve e receba o relatório completo →", "Enregistrez-le et obtenez le rapport complet →"],
    "Reading your file…": ["Deine Datei wird gelesen …", "Leyendo tu archivo…", "Lendo seu arquivo…", "Lecture de votre fichier…"],
    "Free account. Your trades are carried into your new journal — you check them before anything is saved.": ["Kostenloses Konto. Deine Trades wandern in dein neues Journal – du prüfst sie, bevor etwas gespeichert wird.", "Cuenta gratuita. Tus operaciones pasan a tu nuevo diario; las revisas antes de guardar nada.", "Conta grátis. Suas operações vão para o seu novo diário — você confere antes de qualquer coisa ser salva.", "Compte gratuit. Vos trades sont repris dans votre nouveau journal — vous les vérifiez avant tout enregistrement."],
    "Everything in Free, plus three things:": ["Alles aus Free, dazu drei Dinge:", "Todo lo de Free, más tres cosas:", "Tudo do Free, mais três coisas:", "Tout ce qui est dans Free, plus trois choses :"],
    "Automatic": ["Automatisch", "Automático", "Automático", "Automatique"],
    "Your broker fills the journal — cTrader, crypto exchanges and live trackers, even while the app is closed.": ["Dein Broker füllt das Journal – cTrader, Krypto-Börsen und Live-Tracker, auch wenn die App zu ist.", "Tu bróker llena el diario: cTrader, exchanges cripto y trackers en vivo, incluso con la app cerrada.", "Sua corretora preenche o diário — cTrader, exchanges cripto e trackers ao vivo, mesmo com o app fechado.", "Votre courtier remplit le journal — cTrader, exchanges crypto et trackers en direct, même application fermée."],
    "Honest numbers": ["Ehrliche Zahlen", "Cifras honestas", "Números honestos", "Des chiffres honnêtes"],
    "Edge & Leaks, the Evidence Score and 68 Stat Lab metrics — each one with how many trades stand behind it.": ["Edge & Leaks, der Evidence Score und 68 Kennzahlen im Stat Lab – jede mit der Zahl der Trades, die dahinter stehen.", "Edge & Leaks, el Evidence Score y 68 métricas del Stat Lab, cada una con cuántas operaciones la respaldan.", "Edge & Leaks, o Evidence Score e 68 métricas do Stat Lab — cada uma com quantas operações estão por trás.", "Edge & Leaks, l’Evidence Score et 68 métriques du Stat Lab — chacune avec le nombre de trades derrière elle."],
    "Practice": ["Üben", "Practicar", "Praticar", "S’entraîner"],
    "Market Replay and Strategy Drills on real history, under your prop firm’s actual rules.": ["Market Replay und Strategie-Drills auf echter Historie, unter den echten Regeln deiner Prop-Firma.", "Market Replay y drills de estrategia sobre historia real, con las reglas reales de tu prop firm.", "Market Replay e drills de estratégia em histórico real, sob as regras reais da sua prop firm.", "Market Replay et drills de stratégie sur l’historique réel, sous les vraies règles de votre prop firm."]
  };
  window.APEX_LP_I18N = LP;   // für Tests und Abdeckungsmessung
  /* Neue App-Dialoge (23.09.2026): Schnelleintrag, Wochenkarte, Founding-Bewerbung. */
  var DLG = {
    'Log a trade': ['Trade erfassen', 'Registrar una operación', 'Registrar uma operação', 'Enregistrer un trade'],
    'Symbol': ['Symbol', 'Símbolo', 'Ativo', 'Symbole'],
    'Direction': ['Richtung', 'Dirección', 'Direção', 'Sens'],
    'Result (pips)': ['Ergebnis (Pips)', 'Resultado (pips)', 'Resultado (pips)', 'Résultat (pips)'],
    'R:R (optional)': ['R:R (optional)', 'R:R (opcional)', 'R:R (opcional)', 'R:R (facultatif)'],
    'Setup (optional)': ['Setup (optional)', 'Setup (opcional)', 'Setup (opcional)', 'Setup (facultatif)'],
    'One sentence (optional)': ['Ein Satz (optional)', 'Una frase (opcional)', 'Uma frase (opcional)', 'Une phrase (facultatif)'],
    'Save trade': ['Trade speichern', 'Guardar operación', 'Salvar operação', 'Enregistrer le trade'],
    'Open the full journal instead': ['Lieber das ganze Journal öffnen', 'Abrir el diario completo', 'Abrir o diário completo', 'Ouvrir plutôt le journal complet'],
    'What did you trade?': ['Welches Setup war es?', '¿Qué setup operaste?', 'Qual setup você operou?', 'Quel setup avez-vous tradé ?'],
    'Why did you take it — and how did it feel?': ['Warum hast du ihn genommen – und wie hat es sich angefühlt?', '¿Por qué la tomaste y cómo te sentiste?', 'Por que você entrou — e como se sentiu?', 'Pourquoi l’avoir pris — et qu’avez-vous ressenti ?'],
    'e.g. XAUUSD': ['z. B. XAUUSD', 'p. ej. XAUUSD', 'ex.: XAUUSD', 'ex. XAUUSD'],
    '+12.5 or −8': ['+12.5 oder −8', '+12.5 o −8', '+12.5 ou −8', '+12.5 ou −8'],
    'e.g. 2': ['z. B. 2', 'p. ej. 2', 'ex.: 2', 'ex. 2'],
    'This week': ['Diese Woche', 'Esta semana', 'Esta semana', 'Cette semaine'],
    'Last week': ['Letzte Woche', 'La semana pasada', 'Semana passada', 'La semaine dernière'],
    'Last 30 days': ['Letzte 30 Tage', 'Últimos 30 días', 'Últimos 30 dias', '30 derniers jours'],
    'Save image': ['Bild speichern', 'Guardar imagen', 'Salvar imagem', 'Enregistrer l’image'],
    'Copy': ['Kopieren', 'Copiar', 'Copiar', 'Copier'],
    'Close': ['Schliessen', 'Cerrar', 'Fechar', 'Fermer'],
    'Show my P&L in dollars': ['Mein P&L in Dollar zeigen', 'Mostrar mi P&L en dólares', 'Mostrar meu P&L em dólares', 'Afficher mon P&L en dollars'],
    'Put my invite link on it': ['Meinen Einladungslink draufsetzen', 'Añadir mi enlace de invitación', 'Incluir meu link de convite', 'Ajouter mon lien d’invitation'],
    'Founding traders': ['Gründungs-Trader', 'Traders fundadores', 'Traders fundadores', 'Traders fondateurs'],
    'What do you trade?': ['Was handelst du?', '¿Qué operas?', 'O que você opera?', 'Que tradez-vous ?'],
    'Platform / broker': ['Plattform / Broker', 'Plataforma / bróker', 'Plataforma / corretora', 'Plateforme / courtier'],
    'How long have you been trading?': ['Wie lange tradest du schon?', '¿Cuánto tiempo llevas operando?', 'Há quanto tempo você opera?', 'Depuis combien de temps tradez-vous ?'],
    'How do you journal today?': ['Wie führst du heute Journal?', '¿Cómo llevas tu diario hoy?', 'Como você registra suas operações hoje?', 'Comment tenez-vous votre journal aujourd’hui ?'],
    'Why do you want in?': ['Warum möchtest du dabei sein?', '¿Por qué quieres participar?', 'Por que você quer participar?', 'Pourquoi voulez-vous participer ?'],
    'Send application': ['Bewerbung senden', 'Enviar solicitud', 'Enviar candidatura', 'Envoyer la candidature'],
    'Update application': ['Bewerbung aktualisieren', 'Actualizar solicitud', 'Atualizar candidatura', 'Mettre à jour la candidature'],
    'Cancel': ['Abbrechen', 'Cancelar', 'Cancelar', 'Annuler']
  };
  window.APEX_DLG_I18N = DLG;
  function go() {
    if (!window.ApexI18n || !ApexI18n.addScoped) { setTimeout(go, 300); return; }
    if (go.done) return; go.done = true;
    ApexI18n.addScoped('#landingPage', LP);
    ApexI18n.addScoped('#qtSheet, #weekCardOverlay, #betaModal', DLG);
    var lp = document.getElementById('landingPage');
    try { if (lp && ApexI18n.apply) ApexI18n.apply(lp); } catch (e) { }
    // Erst jetzt darf der Markenschutz die Landing anfassen — siehe protectBrand.
    window.APEX_LP_READY = true;
    try { if (lp && window.apexProtectBrand) apexProtectBrand(lp); } catch (e) { }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
} catch (e) { try { console.error("lp-i18n", e); } catch (_) {} }
