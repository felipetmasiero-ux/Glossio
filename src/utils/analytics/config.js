// Every getter reads import.meta.env live (never cached at module scope) -
// on purpose, so tests can flip env vars per-case with vi.stubEnv() and so
// a single module instance always reflects the current environment.

// Compared against both the real boolean Vite injects at build time and the
// string "true" (vi.stubEnv() in tests can only assign strings) - "false"
// deliberately isn't treated as production, even though it's a non-empty
// (JS-truthy) string.
export function isProduction() {
    const value = import.meta.env.PROD;
    return value === true || value === "true";
}

export function getMeasurementId() {
    return import.meta.env.VITE_GA_MEASUREMENT_ID || null;
}

export function hasMeasurementId() {
    return Boolean(getMeasurementId());
}

// Independent of isProduction() on purpose: lets a dev preview exactly what
// would be sent (via console) without needing a production build, and lets
// a production/preview deploy opt into GA4 DebugView without also having to
// eyeball raw network requests.
export function isDebugMode() {
    return import.meta.env.VITE_GA_DEBUG === "true";
}

// The only condition under which an event is actually sent to GA4.
export function isAnalyticsEnabled() {
    return isProduction() && hasMeasurementId();
}
