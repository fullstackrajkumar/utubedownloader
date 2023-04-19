const CACHE_NAME = 'utube-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/asset-manifest.json',
  '/robots.txt',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/assets/*',
  '/static/*'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request);
      })
  );
});
