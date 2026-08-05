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
