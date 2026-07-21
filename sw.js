/* ════════════════════════════════════════════════════════════════
   APEX — Service Worker
   • Makes the app installable (PWA) and available offline.
   • Network-first for the HTML shell so updates always flow; falls
     back to the cached copy when offline.
   • Cache-first for static same-origin assets (icon, manifest).
   • Handles Web Push ('push') + notification clicks so alerts can
     arrive even when the app is closed (needs a server to send them).
   Bump CACHE when you change the cached shell so old copies get purged.
   ════════════════════════════════════════════════════════════════ */
const CACHE = 'apex-v1';
const SHELL = ['/', '/indexneu.html', '/manifest.webmanifest', '/apex-icon.svg'];

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
  const isNav = req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');
  if (isNav) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('/indexneu.html', copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match('/indexneu.html').then((r) => r || caches.match('/')))
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
  const title = data.title || 'APEX';
  const opts = {
    body: data.body || '',
    icon: '/apex-icon.svg',
    badge: '/apex-icon.svg',
    tag: data.tag || 'apex',
    renotify: !!data.tag,
    data: { url: data.url || '/' }
  };
  e.waitUntil(self.registration.showNotification(title, opts));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
      for (const c of cs) {
        if ('focus' in c) { c.navigate && c.navigate(target); return c.focus(); }
      }
      return self.clients.openWindow(target);
    })
  );
});
