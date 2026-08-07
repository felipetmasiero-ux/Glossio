import { describe, expect, it, afterEach, vi } from "vitest";

import {
    loadSentryScript,
    isSentryLoaded,
    initSentrySdk,
    captureExceptionWithSentry
} from "./sentryClient";

afterEach(() => {
    document.getElementById("sentry-sdk-script")?.remove();
    delete window.Sentry;
});

describe("loadSentryScript", () => {

    it("injects a script tag pointed at the pinned Sentry CDN bundle", () => {

        loadSentryScript();

        const script = document.getElementById("sentry-sdk-script");
        expect(script).not.toBeNull();
        expect(script.src).toContain("https://browser.sentry-cdn.com/");
        expect(script.src).toContain("bundle.min.js");

    });

    it("resolves once the script fires its load event", async () => {

        const promise = loadSentryScript();
        const script = document.getElementById("sentry-sdk-script");

        script.onload();

        await expect(promise).resolves.toBeUndefined();

    });

    it("rejects if the script fails to load", async () => {

        const promise = loadSentryScript();
        const script = document.getElementById("sentry-sdk-script");

        script.onerror();

        await expect(promise).rejects.toThrow();

    });

    it("does not inject a second script tag on a repeated call", () => {

        loadSentryScript();
        loadSentryScript();

        expect(document.querySelectorAll("#sentry-sdk-script").length).toBe(1);

    });

});

describe("isSentryLoaded", () => {

    it("is false before window.Sentry exists", () => {
        expect(isSentryLoaded()).toBe(false);
    });

    it("is true once window.Sentry exists", () => {
        window.Sentry = { init: vi.fn(), captureException: vi.fn() };
        expect(isSentryLoaded()).toBe(true);
    });

});

describe("initSentrySdk", () => {

    it("does nothing when Sentry has not loaded", () => {
        expect(() => initSentrySdk("dsn", "production")).not.toThrow();
    });

    it("calls window.Sentry.init with the dsn and environment", () => {

        window.Sentry = { init: vi.fn(), captureException: vi.fn() };

        initSentrySdk("https://key@o1.ingest.sentry.io/1", "production");

        expect(window.Sentry.init).toHaveBeenCalledWith({
            dsn: "https://key@o1.ingest.sentry.io/1",
            environment: "production"
        });

    });

});

describe("captureExceptionWithSentry", () => {

    it("does nothing when Sentry has not loaded", () => {
        expect(() => captureExceptionWithSentry(new Error("boom"), {})).not.toThrow();
    });

    it("forwards the error and context to window.Sentry.captureException", () => {

        window.Sentry = { init: vi.fn(), captureException: vi.fn() };
        const error = new Error("boom");

        captureExceptionWithSentry(error, { lessonId: "a1" });

        expect(window.Sentry.captureException).toHaveBeenCalledWith(error, { extra: { lessonId: "a1" } });

    });

});
