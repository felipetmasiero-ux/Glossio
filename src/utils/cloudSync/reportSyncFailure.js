import { captureException } from "../errorTracking";
import { trackEvent } from "../analytics";
import { ANALYTICS_EVENTS } from "../analytics/analyticsEvents";

// Called once per resource, only after withRetry's last attempt has
// already failed - never per individual retry. Reuses the app's existing
// error-tracking/analytics entry points (captureException/trackEvent)
// instead of a parallel observability system; trackEvent already no-ops
// outside production/without consent, so nothing extra is needed here to
// respect that.
//
// `error.status` is only ever set by httpClient.js for a real HTTP
// response (see R1) - its absence is what identifies a network/timeout
// failure that never reached the server, as opposed to the server
// answering with an error status.
//
// Context is deliberately limited to *which* sync failed and *why* -
// resource name, operation, HTTP status/network-ness, attempt count -
// never the payload itself (flashcard content, progress data, etc.),
// which must never be forwarded to a third party like Sentry.
export function reportSyncFailure(resource, operation, error) {

    const isNetworkError = typeof error?.status !== "number";
    const status = isNetworkError ? null : error.status;

    captureException(error, {
        resource,
        operation,
        attempts: error?.syncAttempts ?? null,
        isNetworkError,
        status
    });

    trackEvent(ANALYTICS_EVENTS.CLOUD_SYNC_FAILED, {
        resource,
        operation,
        isNetworkError,
        status
    });

}
