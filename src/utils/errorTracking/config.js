// Same shape as utils/analytics/config.js - every getter reads
// import.meta.env live (never cached at module scope) so tests can flip
// env vars per-case with vi.stubEnv() and a single module instance always
// reflects the current environment.

export function isProduction() {
    const value = import.meta.env.PROD;
    return value === true || value === "true";
}

export function getSentryDsn() {
    return import.meta.env.VITE_SENTRY_DSN || null;
}

export function hasSentryDsn() {
    return Boolean(getSentryDsn());
}

// Independent of isProduction(): lets a dev preview exactly what would be
// sent (via console) without a production build.
export function isDebugMode() {
    return import.meta.env.VITE_SENTRY_DEBUG === "true";
}

// The only condition under which the Sentry SDK actually gets loaded and
// initialized. Automatic exception/rejection capture (initErrorTracking.js)
// is NOT gated by this - it always logs structurally; this only controls
// whether captured errors also get forwarded to Sentry.
export function isErrorTrackingEnabled() {
    return isProduction() && hasSentryDsn();
}
