importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.4.1/workbox-sw.js');
const { precaching, routing, strategies } = workbox;
// 1. Pliki "szkieletu" aplikacji zapisujemy w cache od razu przy instalacji service workera.
// Zmiana numeru "revision" wymusza ponowne pobranie danego pliku.
precaching.precacheAndRoute([
 { url: './', revision: '2' },
 { url: 'index.html', revision: '2' },
 { url: 'index.js', revision: '2' },
 { url: 'manifest.json', revision: '1' },
 { url: 'offline.html', revision: '1' },
]);
// 2. Strony HTML: najpierw sieć, a gdy jej nie ma - wersja z cache.
routing.registerRoute(
 ({ request }) => request.mode === 'navigate',
 new strategies.NetworkFirst({ cacheName: 'strony' })
);
// 3. Obrazy: najpierw cache, sieć tylko gdy obrazka jeszcze nie mamy.
routing.registerRoute(
 ({ request }) => request.destination === 'image',
 new strategies.CacheFirst({ cacheName: 'obrazy' })
);
// 4. Gdy nie ma ani sieci, ani strony w cache - pokazujemy własną stronę offline.
routing.setCatchHandler(async ({ request }) => {
 if (request.mode === 'navigate') {
 return precaching.matchPrecache('offline.html');
 }
 return Response.error();
});