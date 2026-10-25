// Point Cloud Studio service worker: makes the app installable and lets the editor open offline.
// Network-first for the app shell (so updates arrive immediately), with the last good copy as
// fallback. AI model and runtime parts are cached by the app itself (Cache API, hash-verified).
const SHELL = 'pcs-shell-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  if (/\/(models|ort)\//.test(url.pathname) || req.headers.has('range')) return;
  e.respondWith(
    fetch(req)
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
