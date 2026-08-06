// Pure predicates for src/sw.js's registerRoute() matchers. Kept separate
// from sw.js (which only wires these into workbox strategies) so the
// *rules* - what counts as an API call, a font, an image - are unit
// testable without a real ServiceWorkerGlobalScope. Each function takes
// whatever workbox's route matchCallback receives (request/url) plus an
// explicit origin, rather than reading self.location itself, so tests don't
// need to fake global worker state to exercise them.

// Every backend endpoint is mounted under /api and returns a private,
// per-user JSON payload (auth tokens, progress, flashcards) - this must
// never be cached, online or offline. See backend/src/app.js's own comment
// on this same boundary.
export function isApiRequest(url) {
    return url.pathname.startsWith("/api");
}

export function isSameOriginStaticAsset(request, url, origin) {
    return url.origin === origin && ["style", "script", "worker"].includes(request.destination);
}

export function isSameOriginImage(request, url, origin) {
    return url.origin === origin && request.destination === "image";
}

// The stylesheet fonts.googleapis.com serves changes as Google tweaks which
// font files/formats it points to - safe to cache, but should still
// revalidate in the background rather than going stale forever.
export function isGoogleFontStylesheet(url) {
    return url.origin === "https://fonts.googleapis.com";
}

// The actual .woff2 files on fonts.gstatic.com are immutable per URL
// (content-addressed by Google), so unlike the stylesheet above these are
// safe to cache aggressively with no revalidation.
export function isGoogleFontFile(url) {
    return url.origin === "https://fonts.gstatic.com";
}
