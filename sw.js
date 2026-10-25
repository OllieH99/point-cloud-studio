// Point Cloud Studio service worker: makes the app installable and lets the editor open offline.
// Network-first for the app shell (so updates arrive immediately), with the last good copy as
// fallback. AI model and runtime parts are cached by the app itself (Cache API, hash-verified).
const SHELL = 'pcs-shell-v2';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  if (/\/(models|ort)\//.test(url.pathname) || req.headers.has('range')) return;
  // pages revalidate with the server every visit (cheap 304s), so updates show up at once
  const fresh = req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('.html') || url.pathname.endsWith('sw.js');
  e.respondWith(
    fetch(fresh ? new Request(req, { cache: 'no-cache' }) : req)
      .then((res) => {
        if (res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(SHELL).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || Response.error())),
  );
});
