// Service Worker Toolbox
importScripts('assets/js/lib/sw-toolbox/sw-toolbox.js');

// Offline Google Analytics
importScripts('assets/js/lib/sw-offline-google-analytics.js');
goog.offlineGoogleAnalytics.initialize();

// Files to precache
const precacheFiles = [

    'https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
    'https://fonts.googleapis.com/css?family=Karla:400,700|Space+Mono:400,700',

    './assets/img/ireaderinokun.png'
];
toolbox.precache(precacheFiles);

// Install and Activate events
self.addEventListener('install', (event) => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

// Fetch events
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});