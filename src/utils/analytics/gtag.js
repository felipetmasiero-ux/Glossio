// The only file in the app allowed to touch window.gtag/window.dataLayer or
// inject a <script> tag - every other module goes through trackEvent.js /
// initAnalytics.js instead of reaching for the global directly.

const SCRIPT_ID = "ga4-gtag-script";

// The official gtag.js snippet's exact bootstrap - see
// https://developers.google.com/tag-platform/gtagjs/install :
//
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());
//   gtag('config', 'G-XXXXXXX');
//
// window.gtag is not something the remote gtag/js script *creates* - it's
// the integration point the *site* is required to create first. The
// remote script's whole job, once it finishes loading (async, so this can
// be anywhere from milliseconds to seconds later), is to find the
// already-existing window.gtag, take over its implementation with the
// real one (the part that actually opens a connection and sends a hit,
// sets the _ga cookie, etc.), and replay whatever was already queued in
// dataLayer while it was still loading. Without window.gtag existing
// first, the remote script has nothing to attach to - it loads, sits
// there inert, and never activates. Pushing raw arrays straight into
// dataLayer (skipping window.gtag entirely) *looks* like it works, because
// the array itself still fills up exactly as expected, but nothing is
// ever listening on the other end - no hit, no cookie, window.gtag stays
// undefined forever. This is the root cause of the "events sit in
// dataLayer but never reach GA4" bug - see docs/ANALYTICS_INCIDENT.md.
//
// Idempotent and safe to call from both loadGtagScript() and
// pushToDataLayer(), in any order - whichever runs first wins, the second
// call is a no-op (`window.gtag || ...`), matching how the official
// snippet's two script tags are independent of each other's load order.
function ensureGtagBootstrap() {

    window.dataLayer = window.dataLayer || [];

    window.gtag = window.gtag || function gtag() {
        window.dataLayer.push(arguments);
    };

}

export function loadGtagScript(measurementId) {

    ensureGtagBootstrap();

    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");

    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

    document.head.appendChild(script);

}

// Every command (consent/js/config/event) goes through window.gtag(...) -
// never a direct dataLayer.push() - so it's indistinguishable from a
// hand-written official snippet calling gtag('event', ...) itself.
export function pushToDataLayer(...args) {

    ensureGtagBootstrap();

    window.gtag(...args);

}
