import { precacheAndRoute, cleanupOutdatedCaches, matchPrecache } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { NetworkFirst, NetworkOnly, CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

import {
    isApiRequest,
    isSameOriginStaticAsset,
    isSameOriginImage,
    isGoogleFontStylesheet,
    isGoogleFontFile
} from "./utils/pwa/cacheRoutes";

const OFFLINE_URL = "/offline.html";

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

// Static build output (JS/CSS/HTML/fonts/images) - this is what makes
// lessons and dictionaries (bundled into the JS, not fetched separately)
// available offline. Every module/lesson ships in this one upfront
// precache, not just "recently visited" ones.
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// API: never cache, ever - login, cloud sync, profile, progress are all
// private per-user payloads. See backend/src/app.js's matching comment on
// this same boundary; isApiRequest() matches by pathname alone, so this
// holds regardless of whether the API is same-origin (dev) or the
// cross-origin Render backend (production - see vercel.json's connect-src).
registerRoute(
    ({ url }) => isApiRequest(url),
    new NetworkOnly()
);

// HTML documents: try the network for freshness, fall back to a cached
// shell when offline.
const htmlHandler = new NetworkFirst({
    cacheName: "html-cache",
    networkTimeoutSeconds: 3,
    plugins: [
        {
            // The host rewrites every path to the same index.html (see
            // vercel.json), so on a hard navigation with no network *and*
            // no cache entry yet for this exact URL - e.g. a first-time
            // deep link into a specific lesson, opened while offline - the
            // right fallback is that same precached app shell every other
            // load uses, not a dead end. That lets React Router take over
            // and render straight from the already-precached course data,
            // exactly like a normal in-app navigation would. OFFLINE_URL is
            // now only the last-resort fallback, for the - practically
            // unreachable, since index.html is always part of the build's
            // precache manifest - case where even the shell isn't cached.
            handlerDidError: async () =>
                (await matchPrecache("index.html")) ?? (await matchPrecache(OFFLINE_URL))
        }
    ]
});

registerRoute(new NavigationRoute(htmlHandler, {
    denylist: [/^\/api/]
}));

// Same-origin scripts/styles/workers: serve from cache first, only hitting
// the network for something not seen before. Most of this is already in
// the precache above (built with a content hash) - this mainly covers
// route chunks fetched at runtime after the initial precache install.
registerRoute(
    ({ request, url }) => isSameOriginStaticAsset(request, url, self.location.origin),
    new CacheFirst({
        cacheName: "static-assets",
        plugins: [
            new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 })
        ]
    })
);

// Images get their own cache, separate from scripts/styles: there can be
// many more of them, they're typically larger, and evicting one shouldn't
// evict the other.
registerRoute(
    ({ request, url }) => isSameOriginImage(request, url, self.location.origin),
    new CacheFirst({
        cacheName: "images-cache",
        plugins: [
            new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 })
        ]
    })
);

// Google Fonts stylesheet (fonts.googleapis.com): revalidated in the
// background - the cached copy is served immediately, and a fresh one is
// fetched to update the cache for next time, since which files/formats it
// points to can change.
registerRoute(
    ({ url }) => isGoogleFontStylesheet(url),
    new StaleWhileRevalidate({ cacheName: "google-fonts-stylesheets" })
);

// The actual .woff2 files (fonts.gstatic.com) are immutable per URL, so
// unlike the stylesheet above these are safe to cache for a long time with
// no revalidation.
registerRoute(
    ({ url }) => isGoogleFontFile(url),
    new CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
            new CacheableResponsePlugin({ statuses: [0, 200] }),
            new ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 })
        ]
    })
);
