const CACHE_STATIC_NAME = 'static';
const URLS_TO_PRECACHE = [
    '/',
    'index.html',
    'src/js/app.js',
    'src/js/feed.js',
    'src/css/app.css',
    'src/css/feed.css',
    'src/images/main-image.jpg'
];

self.addEventListener('install', event => {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(cache => {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll(URLS_TO_PRECACHE);
            })
            .then(() => {
                console.log('[ServiceWorker] Skip waiting on install');
                return self.skipWaiting();
            }).catch(error => {
                console.log(error);
            })
    );
});

// self.addEventListener('activate', event => {
//     console.log('[Service Worker] Activating Service Worker ...', event);
//     return self.clients.claim();
// });
self.addEventListener('fetch', event => {
    console.log('[Service Worker] Fetching something ....', event);

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log(response);
                    return response;
                }

                return fetch(event.request);
            })
    );
});
