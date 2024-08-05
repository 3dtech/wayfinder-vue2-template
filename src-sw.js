importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

/*workbox.setConfig({
    debug: true
});*/

workbox.precaching.precacheAndRoute(self.__precacheManifest, {
    ignoreURLParametersMatching: [/.*/],
});

const networkFirstStrategy = new workbox.strategies.NetworkFirst({
    cacheName: 'wf-api-default'
});
const cacheFirstStrategy = new workbox.strategies.CacheFirst({
    cacheName: 'wf-large-default'
});

// Register JS static requests
workbox.routing.registerRoute(
    new RegExp('(.+)\/\/wayfinder-cdn.com\/js\/(.*)'),
    networkFirstStrategy
);

// Register API static requests
workbox.routing.registerRoute(
    new RegExp('(.+)\/\/wayfinder-cdn.com\/api\/(\/)?public\/(.*)\/(?!a|d)(.*)\/(.*)'),
    networkFirstStrategy
);

workbox.routing.registerRoute(
    new RegExp('(.+)\/\/wayfinder-cdn.com\/api\/(\/)?public\/(.*)\/advertisements\/(.*)'),
    cacheFirstStrategy
);