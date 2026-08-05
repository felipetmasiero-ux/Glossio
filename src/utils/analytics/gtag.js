// The only file in the app allowed to touch window.gtag/window.dataLayer or
// inject a <script> tag - every other module goes through trackEvent.js /
// initAnalytics.js instead of reaching for the global directly.

const SCRIPT_ID = "ga4-gtag-script";

export function loadGtagScript(measurementId) {

    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");

    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

    document.head.appendChild(script);

}

// Standard gtag.js bootstrapping: dataLayer.push is how gtag() itself is
// implemented, so this *is* window.gtag - defined here instead of relying
// on the snippet gtag.js exposes, since that script loads async and code
// right after loadGtagScript() can't wait for it.
export function pushToDataLayer(...args) {

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(args);

}
