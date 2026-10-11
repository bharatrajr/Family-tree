/* Offline support. When you change index.html, raise the version number below. */
const VERSION = "vamsam-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.concat(["./data.json"]))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Family data: try the network first so updates appear, fall back to the saved copy offline.
  if (url.pathname.endsWith("/data.json")) {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put("./data.json", copy)); return r; })
      .catch(() => caches.match("./data.json")));
    return;
  }
  // Everything else (app, fonts): saved copy first, refresh in the background.
  e.respondWith(caches.match(req, { ignoreSearch: url.origin === location.origin }).then(hit => {
    const net = fetch(req).then(r => { if (r && (r.ok || r.type === "opaque")) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
