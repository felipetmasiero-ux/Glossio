import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { initAnalytics, trackEvent, trackPageView, ANALYTICS_EVENTS } from "../../../utils/analytics";

// Mounted once near the top of App.jsx, outside any auth-gated tree - App
// Open and Page View should fire for anonymous visitors too (landing,
// login), not just logged-in routes. No UI of its own.
export function AnalyticsRouteTracker() {

    const location = useLocation();
    const hasOpenedRef = useRef(false);

    useEffect(() => {

        if (hasOpenedRef.current) return;
        hasOpenedRef.current = true;

        initAnalytics();
        trackEvent(ANALYTICS_EVENTS.APP_OPEN);

    }, []);

    useEffect(() => {

        trackPageView(`${location.pathname}${location.search}`);

    }, [location.pathname, location.search]);

    return null;

}
