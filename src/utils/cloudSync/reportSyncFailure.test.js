import { describe, expect, it, vi, afterEach } from "vitest";

import { reportSyncFailure } from "./reportSyncFailure";
import { captureException } from "../errorTracking";
import { trackEvent } from "../analytics";

// ANALYTICS_EVENTS.CLOUD_SYNC_FAILED is read from ../analytics/analyticsEvents
// directly (real module, not mocked) so this also guards that the event
// name reportSyncFailure fires actually matches what's registered there.
vi.mock("../errorTracking", () => ({ captureException: vi.fn() }));
vi.mock("../analytics", () => ({ trackEvent: vi.fn() }));

function networkError() {
    return new Error("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
}

function httpError(status) {
    const error = new Error("nope");
    error.status = status;
    return error;
}

afterEach(() => {
    vi.clearAllMocks();
});

describe("reportSyncFailure", () => {

    it("reports a network error (no status) with isNetworkError true and a null status", () => {

        const error = networkError();
        error.syncAttempts = 2;

        reportSyncFailure("progress", "push", error);

        expect(captureException).toHaveBeenCalledWith(error, {
            resource: "progress",
            operation: "push",
            attempts: 2,
            isNetworkError: true,
            status: null
        });

        expect(trackEvent).toHaveBeenCalledWith("cloud_sync_failed", {
            resource: "progress",
            operation: "push",
            isNetworkError: true,
            status: null
        });

    });

    it("reports a real HTTP error with isNetworkError false and the actual status", () => {

        const error = httpError(500);
        error.syncAttempts = 2;

        reportSyncFailure("flashcards", "push", error);

        expect(captureException).toHaveBeenCalledWith(error, {
            resource: "flashcards",
            operation: "push",
            attempts: 2,
            isNetworkError: false,
            status: 500
        });

        expect(trackEvent).toHaveBeenCalledWith("cloud_sync_failed", {
            resource: "flashcards",
            operation: "push",
            isNetworkError: false,
            status: 500
        });

    });

    it("falls back to null attempts when the error was not tagged by withRetry", () => {

        reportSyncFailure("events", "push", networkError());

        expect(captureException).toHaveBeenCalledWith(expect.any(Error), expect.objectContaining({ attempts: null }));

    });

    it("never includes the raw error message text, token, or payload content in the tracked event params", () => {

        const error = httpError(401);
        error.syncAttempts = 2;

        reportSyncFailure("lessonProgress", "push", error);

        const [, params] = trackEvent.mock.calls[0];

        expect(Object.keys(params).sort()).toEqual(["isNetworkError", "operation", "resource", "status"]);

    });

    it("calls captureException and trackEvent exactly once per call", () => {

        reportSyncFailure("videoProgress", "push", httpError(503));

        expect(captureException).toHaveBeenCalledTimes(1);
        expect(trackEvent).toHaveBeenCalledTimes(1);

    });

});
