import { describe, expect, it, afterEach, vi } from "vitest";

import { trackEvent } from "./trackEvent";
import { pushToDataLayer } from "./gtag";

vi.mock("./gtag", () => ({
    pushToDataLayer: vi.fn()
}));

describe("trackEvent", () => {

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.clearAllMocks();
        vi.restoreAllMocks();
    });

    it("never sends anything in dev, even with a measurement id configured", () => {
        vi.stubEnv("PROD", "");
        vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-ABC123");

        trackEvent("lesson_started", { lessonId: "a1" });

        expect(pushToDataLayer).not.toHaveBeenCalled();
    });

    it("never sends anything in production without a measurement id", () => {
        vi.stubEnv("PROD", "true");
        vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");

        trackEvent("lesson_started", { lessonId: "a1" });

        expect(pushToDataLayer).not.toHaveBeenCalled();
    });

    it("does not throw when analytics is disabled - a missing env var never breaks the app", () => {
        vi.stubEnv("PROD", "");
        vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");

        expect(() => trackEvent("lesson_started", { lessonId: "a1" })).not.toThrow();
    });

    it("sends the event via pushToDataLayer in production with a measurement id", () => {
        vi.stubEnv("PROD", "true");
        vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-ABC123");
        vi.stubEnv("VITE_GA_DEBUG", "");

        trackEvent("lesson_started", { lessonId: "a1" });

        expect(pushToDataLayer).toHaveBeenCalledWith("event", "lesson_started", { lessonId: "a1" });
    });

    it("logs to the console when debug mode is on, regardless of environment", () => {
        vi.stubEnv("PROD", "");
        vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");
        vi.stubEnv("VITE_GA_DEBUG", "true");
        const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

        trackEvent("lesson_started", { lessonId: "a1" });

        expect(logSpy).toHaveBeenCalledWith("[Analytics] lesson_started", { lessonId: "a1" });
        expect(pushToDataLayer).not.toHaveBeenCalled();
    });

    it("tags the hit with debug_mode when sending in production with debug mode on", () => {
        vi.stubEnv("PROD", "true");
        vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-ABC123");
        vi.stubEnv("VITE_GA_DEBUG", "true");
        vi.spyOn(console, "log").mockImplementation(() => {});

        trackEvent("lesson_started", { lessonId: "a1" });

        expect(pushToDataLayer).toHaveBeenCalledWith("event", "lesson_started", { lessonId: "a1", debug_mode: true });
    });

});
