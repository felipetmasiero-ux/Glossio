import { isAnalyticsEnabled, isDebugMode } from "./config";
import { pushToDataLayer } from "./gtag";

// The single function every call site in the app uses to report an event -
// never gtag()/dataLayer directly. Two independent axes:
//   - isDebugMode(): always logs to console when true, dev or prod.
//   - isAnalyticsEnabled(): only sends to GA4 in a production build with
//     VITE_GA_MEASUREMENT_ID set. Missing the env var, or running `vite
//     dev`, never throws - it's just a quieter no-op.
export function trackEvent(eventName, params = {}) {

    const debug = isDebugMode();

    if (debug) {
        console.log(`[Analytics] ${eventName}`, params);
    }

    if (!isAnalyticsEnabled()) return;

    // debug_mode marks the hit for GA4's real-time DebugView instead of
    // the standard reports - only set when debug mode is explicitly on, so
    // normal production traffic is never accidentally excluded from reports.
    pushToDataLayer("event", eventName, debug ? { ...params, debug_mode: true } : params);

}
