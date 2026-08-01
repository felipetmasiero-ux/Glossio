import { precacheAndRoute, cleanupOutdatedCaches, matchPrecache } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { NetworkFirst, NetworkOnly, CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

const OFFLINE_URL = "/offline.html";

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

// Static build output (JS/CSS/HTML/fonts/images) - this is what makes
// lessons and dictionaries (bundled into the JS) available offline.
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// API: never cache - login, cloud sync, profile always hit the network.
registerRoute(
    ({ url }) => url.pathname.startsWith("/api"),
    new NetworkOnly()
);

// HTML documents: try the network for freshness, fall back to the cached
// shell when offline. Only when BOTH the network and the cache have nothing
// for this exact navigation does it fall through to the static offline page.
const htmlHandler = new NetworkFirst({
    cacheName: "html-cache",
    networkTimeoutSeconds: 3,
    plugins: [
        {
            handlerDidError: () => matchPrecache(OFFLINE_URL)
        }
    ]
});

registerRoute(new NavigationRoute(htmlHandler, {
    denylist: [/^\/api/]
}));

// Same-origin static assets: serve from cache first, only hitting the
// network for something not seen before.
registerRoute(
    ({ request, url }) =>
        url.origin === self.location.origin &&
        ["style", "script", "worker", "font", "image"].includes(request.destination),
    new CacheFirst({
        cacheName: "static-assets",
        plugins: [
            new ExpirationPlugin({ maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 30 })
        ]
    })
);
