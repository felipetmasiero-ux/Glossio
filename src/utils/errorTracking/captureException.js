import { logger } from "../logger/logger";
import { captureExceptionWithSentry } from "./sentryClient";

// The single function every call site in the app uses to report an error -
// never window.Sentry or logger.error directly (mirrors trackEvent.js's
// role for analytics). Always logs structurally, locally; forwarding to
// Sentry is an enhancement that silently no-ops when it isn't
// loaded/configured (see sentryClient.js) - this function itself never
// throws, so a broken error-reporting path can never mask the original
// error or crash whatever just failed.
export function captureException(error, context = {}) {

    const message = error instanceof Error ? error.message : String(error);

    logger.error(message, { error, ...context });

    try {
        captureExceptionWithSentry(error, context);
    } catch {
        // Reporting the error must never be the thing that throws.
    }

}
