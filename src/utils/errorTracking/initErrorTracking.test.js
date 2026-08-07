import { describe, expect, it, afterEach, beforeEach, vi } from "vitest";

import { initErrorTracking, __resetErrorTrackingState } from "./initErrorTracking";
import { loadSentryScript, initSentrySdk } from "./sentryClient";
import { captureException } from "./captureException";

vi.mock("./sentryClient", () => ({
    loadSentryScript: vi.fn(() => Promise.resolve()),
    initSentrySdk: vi.fn()
}));

vi.mock("./captureException", () => ({
    captureException: vi.fn()
}));

describe("initErrorTracking", () => {

    beforeEach(() => {
        __resetErrorTrackingState();
    });

    afterEach(() => {
        __resetErrorTrackingState();
        vi.unstubAllEnvs();
        vi.clearAllMocks();
    });

    it("does not load Sentry in dev, even with a DSN configured", () => {
        vi.stubEnv("PROD", "");
        vi.stubEnv("VITE_SENTRY_DSN", "https://key@o1.ingest.sentry.io/1");

        initErrorTracking();

        expect(loadSentryScript).not.toHaveBeenCalled();
    });

    it("does not load Sentry in production without a DSN", () => {
        vi.stubEnv("PROD", "true");
        vi.stubEnv("VITE_SENTRY_DSN", "");

        initErrorTracking();

        expect(loadSentryScript).not.toHaveBeenCalled();
    });

    it("loads and initializes Sentry with the DSN in production", async () => {
        vi.stubEnv("PROD", "true");
        vi.stubEnv("VITE_SENTRY_DSN", "https://key@o1.ingest.sentry.io/1");

        initErrorTracking();
        await Promise.resolve();
        await Promise.resolve();

        expect(loadSentryScript).toHaveBeenCalledTimes(1);
        expect(initSentrySdk).toHaveBeenCalledWith("https://key@o1.ingest.sentry.io/1", expect.any(String));
    });

    it("only initializes once even if called multiple times", () => {
        vi.stubEnv("PROD", "true");
        vi.stubEnv("VITE_SENTRY_DSN", "https://key@o1.ingest.sentry.io/1");

        initErrorTracking();
        initErrorTracking();
        initErrorTracking();

        expect(loadSentryScript).toHaveBeenCalledTimes(1);
    });

    it("registers a global window error listener that reports through captureException - even without a DSN", () => {
        vi.stubEnv("PROD", "");
        vi.stubEnv("VITE_SENTRY_DSN", "");

        initErrorTracking();

        const error = new Error("boom");
        window.dispatchEvent(new ErrorEvent("error", { error, message: "boom" }));

        expect(captureException).toHaveBeenCalledWith(error, expect.objectContaining({ source: "window.onerror" }));
    });

    it("registers a global unhandledrejection listener that reports through captureException", () => {
        vi.stubEnv("PROD", "");
        vi.stubEnv("VITE_SENTRY_DSN", "");

        initErrorTracking();

        const reason = new Error("promise blew up");
        const rejectionEvent = Object.assign(new Event("unhandledrejection"), { reason });
        window.dispatchEvent(rejectionEvent);

        expect(captureException).toHaveBeenCalledWith(reason, { source: "unhandledrejection" });
    });

    it("wraps a non-Error rejection reason in an Error before reporting it", () => {
        vi.stubEnv("PROD", "");
        vi.stubEnv("VITE_SENTRY_DSN", "");

        initErrorTracking();

        const rejectionEvent = Object.assign(new Event("unhandledrejection"), { reason: "just a string" });
        window.dispatchEvent(rejectionEvent);

        const [reportedError] = captureException.mock.calls[0];
        expect(reportedError).toBeInstanceOf(Error);
        expect(reportedError.message).toBe("just a string");
    });

});
