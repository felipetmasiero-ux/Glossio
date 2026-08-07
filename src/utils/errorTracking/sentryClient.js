// The only file in the app allowed to touch window.Sentry or inject the
// Sentry <script> tag - every other module goes through captureException.js
// instead of reaching for the global directly. Mirrors gtag.js's role for
// GA4.

const SCRIPT_ID = "sentry-sdk-script";

// Pinned, not "latest" - a version bump here is a deliberate, reviewed
// change, not something that silently changes behavior in production
// overnight.
const SENTRY_SDK_VERSION = "7.120.3";

// Resolves once window.Sentry is available. If the script tag is already
// on the page (e.g. a second call), resolves immediately - initErrorTracking.js
// already guards against calling this more than once per page load.
export function loadSentryScript() {

    return new Promise((resolve, reject) => {

        if (document.getElementById(SCRIPT_ID)) {
            resolve();
            return;
        }

        const script = document.createElement("script");

        script.id = SCRIPT_ID;
        script.src = `https://browser.sentry-cdn.com/${SENTRY_SDK_VERSION}/bundle.min.js`;
        script.crossOrigin = "anonymous";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load the Sentry SDK script"));

        document.head.appendChild(script);

    });

}

export function isSentryLoaded() {
    return typeof window.Sentry !== "undefined";
}

export function initSentrySdk(dsn, environment) {

    if (!isSentryLoaded()) return;

    window.Sentry.init({ dsn, environment });

}

export function captureExceptionWithSentry(error, context) {

    if (!isSentryLoaded()) return;

    window.Sentry.captureException(error, { extra: context });

}
