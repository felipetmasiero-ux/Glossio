import { describe, expect, it, vi, afterEach } from "vitest";

import { captureException } from "./captureException";
import { logger } from "../logger/logger";

afterEach(() => {
    delete window.Sentry;
    vi.restoreAllMocks();
});

describe("captureException", () => {

    it("always logs the error structurally, even without Sentry loaded", () => {

        const spy = vi.spyOn(logger, "error").mockImplementation(() => {});
        const error = new Error("boom");

        captureException(error, { lessonId: "a1" });

        expect(spy).toHaveBeenCalledWith("boom", { error, lessonId: "a1" });

    });

    it("also forwards to Sentry when it is loaded", () => {

        vi.spyOn(logger, "error").mockImplementation(() => {});
        window.Sentry = { captureException: vi.fn() };
        const error = new Error("boom");

        captureException(error, { lessonId: "a1" });

        expect(window.Sentry.captureException).toHaveBeenCalledWith(error, { extra: { lessonId: "a1" } });

    });

    it("handles a non-Error value without throwing", () => {

        vi.spyOn(logger, "error").mockImplementation(() => {});

        expect(() => captureException("just a string")).not.toThrow();

    });

    it("never throws, even if Sentry itself is broken", () => {

        vi.spyOn(logger, "error").mockImplementation(() => {});
        window.Sentry = {
            captureException: () => {
                throw new Error("Sentry is down");
            }
        };

        expect(() => captureException(new Error("boom"))).not.toThrow();

    });

});
