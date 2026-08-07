import { useEffect } from "react";

import { reportWebVitals } from "../../../utils/webVitals/reportWebVitals";

// Mounted once near the top of App.jsx, alongside AnalyticsRouteTracker -
// same "invisible tracker component" shape, own concern (Core Web Vitals
// instead of page views/product events). No UI of its own.
export function WebVitalsReporter() {

    useEffect(() => {
        reportWebVitals();
    }, []);

    return null;

}
