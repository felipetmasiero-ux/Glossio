import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

import { trackEvent, ANALYTICS_EVENTS } from "../analytics";
import { logger } from "../logger/logger";

// Reuses the existing GA4 pipe (trackEvent) instead of a third reporting
// channel - trackEvent already no-ops safely outside production/without a
// measurement id (see utils/analytics/config.js), so Web Vitals reporting
// automatically inherits that same "safe without credentials" contract.
// value is rounded because CLS is a small unitless score (e.g. 0.03107...)
// and every other metric here is milliseconds - GA4 custom event params
// aren't meant to carry that kind of float precision.
function sendMetric(metric) {

    const payload = {
        metric_name: metric.name,
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        rating: metric.rating,
        id: metric.id
    };

    trackEvent(ANALYTICS_EVENTS.WEB_VITAL_MEASURED, payload);
    logger.info(`[web-vitals] ${metric.name}`, payload);

}

// Call once per page load (see WebVitalsReporter.jsx). Each on*() callback
// fires on its own schedule - LCP/CLS/INP only finalize once the page's
// visibility state changes or the user navigates away, they don't fire
// immediately.
export function reportWebVitals() {

    onCLS(sendMetric);
    onFCP(sendMetric);
    onINP(sendMetric);
    onLCP(sendMetric);
    onTTFB(sendMetric);

}
