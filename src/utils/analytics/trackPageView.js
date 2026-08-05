import { ANALYTICS_EVENTS } from "./analyticsEvents";
import { trackEvent } from "./trackEvent";

export function trackPageView(path) {

    trackEvent(ANALYTICS_EVENTS.PAGE_VIEW, {
        page_path: path,
        page_title: document.title
    });

}
