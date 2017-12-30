importScripts('/js/lib/sw-toolbox/sw-toolbox.js');
importScripts('/js/lib/sw-offline-google-analytics.js');

goog.offlineGoogleAnalytics.initialize();

const precacheFiles = [
    'https://fonts.googleapis.com/css?family=Karla:400,700|Space+Mono:400,700',

    './img/work/iphone.png',
    './img/work/macbook.png',
    './img/ireaderinokun.png',
    './img/Fronteers_BW.png'

];
toolbox.precache(precacheFiles);

self.addEventListener('install', (event) => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if ( response ) {
                return response;
            } else {
                return fetch(event.request);
            }
        })
    );
});