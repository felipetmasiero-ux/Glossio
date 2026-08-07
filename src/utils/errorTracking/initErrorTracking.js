import { isErrorTrackingEnabled, getSentryDsn, isDebugMode } from "./config";
import { loadSentryScript, initSentrySdk } from "./sentryClient";
import { captureException } from "./captureException";
import { logger } from "../logger/logger";

// Guards against a second init in the same page (double-registering the
// global listeners below would double-report every subsequent error).
let initialized = false;

function handleWindowError(event) {

    const error = event.error instanceof Error ? event.error : new Error(event.message);

    captureException(error, {
        source: "window.onerror",
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });

}

function handleUnhandledRejection(event) {

    const reason = event.reason;
    const error = reason instanceof Error ? reason : new Error(String(reason));

    captureException(error, { source: "unhandledrejection" });

}

// Call once, as early as possible (main.jsx, before the first React
// render) - not from inside a component effect like initAnalytics(),
// since an error can happen before React ever gets to render anything.
//
// Two independent things happen here:
//  1. The global `error`/`unhandledrejection` listeners are always
//     registered, regardless of Sentry being configured - automatic
//     exception/promise-rejection capture works today, logging
//     structurally via captureException -> logger, with or without a DSN.
//  2. The Sentry SDK itself is only loaded/initialized when
//     isErrorTrackingEnabled() (production + VITE_SENTRY_DSN set) - see
//     config.js. Missing the env var, or running in dev, is a safe no-op,
//     same contract as initAnalytics.js/GA4.
export function initErrorTracking() {

    if (initialized) return;
    initialized = true;

    window.addEventListener("error", handleWindowError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    if (!isErrorTrackingEnabled()) {

        if (isDebugMode()) {
            logger.info("[errorTracking] Sentry disabled (dev build or missing VITE_SENTRY_DSN)");
        }

        return;

    }

    loadSentryScript()
        .then(() => initSentrySdk(getSentryDsn(), import.meta.env.MODE))
        .catch(error => logger.warn("Failed to load the Sentry SDK", { error }));

}

// Test-only escape hatch - production code never needs to re-init.
export function __resetErrorTrackingState() {
    initialized = false;
    window.removeEventListener("error", handleWindowError);
    window.removeEventListener("unhandledrejection", handleUnhandledRejection);
}
