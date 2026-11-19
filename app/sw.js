/* Service worker de la version web : l'application s'ouvre même sans réseau.
   Page et configuration : réseau d'abord (mises à jour immédiates), copie en cache si hors connexion.
   Polices et icônes : cache d'abord. Les données (Supabase) ne passent jamais par ce cache. */
const CACHE = "frb-app-1.15.2";
const COQUILLE = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "logo-club.png",
  "fonts/barlow-latin-400-normal.woff2", "fonts/barlow-latin-500-normal.woff2", "fonts/barlow-latin-600-normal.woff2",
  "fonts/barlow-condensed-latin-500-normal.woff2", "fonts/barlow-condensed-latin-600-normal.woff2", "fonts/barlow-condensed-latin-700-normal.woff2"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(COQUILLE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;            // Supabase, logos : réseau direct
  const statique = /\.(woff2|png|webmanifest)$/.test(url.pathname);
  if (statique){
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const copie = res.clone(); caches.open(CACHE).then(c => c.put(req, copie)); return res; })));
    return;
  }
  e.respondWith(fetch(req).then(res => {                                           // page, config.json : réseau d'abord
    if (res.ok){ const copie = res.clone(); caches.open(CACHE).then(c => c.put(req, copie)); }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch:true }).then(r => r || caches.match("index.html"))));
});
