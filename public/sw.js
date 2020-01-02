
var cacheName = 'laxz-pwa-cached';
var filesToCache = [
    `/`,
    `/index.html`,
    `/styles/main.css`,
    `/scripts/auth.js`,
    `/scripts/connect.js`,
    `/imgs/firebase-logo.png`,
    `/imgs/icon-iot.svg`,
    `/iotsession/index.html`
  ];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});

