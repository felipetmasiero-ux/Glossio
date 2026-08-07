import { isAnalyticsEnabled, isDebugMode, getMeasurementId } from "./config";
import { loadGtagScript, pushToDataLayer } from "./gtag";

// Guards against a second init in the same page (e.g. a future refactor
// that remounts the tracker) - real double-injection would double-count
// every subsequent event.
let initialized = false;

export function initAnalytics() {

    if (initialized) return;

    if (!isAnalyticsEnabled()) {

        if (isDebugMode()) {
            console.log("[Analytics] disabled (dev build or missing VITE_GA_MEASUREMENT_ID)");
        }

        return;

    }

    const measurementId = getMeasurementId();

    loadGtagScript(measurementId);

    // Without an explicit default, gtag.js's Consent Mode can withhold
    // analytics_storage (region-dependent) - a *properly bootstrapped* tag
    // (see gtag.js's ensureGtagBootstrap) would still run client-side but
    // never send a hit or set the _ga cookie in that case. This is a real,
    // independent safeguard against that - it is NOT what caused the
    // "dataLayer fills up but nothing ever reaches GA4" incident (that was
    // window.gtag never being defined at all - see gtag.js and
    // docs/ANALYTICS_INCIDENT.md). Glossio has no ads/Google Signals and
    // this app never sends PII (see trackEvent.js), so analytics_storage is
    // granted by default instead of gating it behind a consent banner -
    // ad-related storage stays denied since it's not used and there's
    // nothing to grant it for.
    pushToDataLayer("consent", "default", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
    });

    pushToDataLayer("js", new Date());

    // send_page_view: false - page views are sent manually (see
    // trackPageView.js / AnalyticsRouteTracker), including the very first
    // one, so the automatic pageview gtag('config', ...) would otherwise
    // fire isn't double-counted alongside it.
    pushToDataLayer("config", measurementId, { send_page_view: false });

    initialized = true;

}

// Test-only escape hatch - production code never needs to re-init.
export function __resetAnalyticsInitState() {
    initialized = false;
}
