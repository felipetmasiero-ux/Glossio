import { describe, expect, it, afterEach, beforeEach, vi } from "vitest";

import { initAnalytics, __resetAnalyticsInitState } from "./initAnalytics";
import { loadGtagScript, pushToDataLayer } from "./gtag";

vi.mock("./gtag", () => ({
    loadGtagScript: vi.fn(),
    pushToDataLayer: vi.fn()
}));

describe("initAnalytics", () => {

    beforeEach(() => {
        __resetAnalyticsInitState();
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.clearAllMocks();
    });

    it("does not load the script in dev, even with a measurement id configured", () => {
        vi.stubEnv("PROD", "");
        vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-ABC123");

        initAnalytics();

        expect(loadGtagScript).not.toHaveBeenCalled();
        expect(pushToDataLayer).not.toHaveBeenCalled();
    });

    it("does not load the script in production without a measurement id", () => {
        vi.stubEnv("PROD", "true");
        vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");

        initAnalytics();

        expect(loadGtagScript).not.toHaveBeenCalled();
    });

    it("loads the script and configures gtag with send_page_view disabled in production", () => {
        vi.stubEnv("PROD", "true");
        vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-ABC123");

        initAnalytics();

        expect(loadGtagScript).toHaveBeenCalledWith("G-ABC123");
        expect(pushToDataLayer).toHaveBeenCalledWith("config", "G-ABC123", { send_page_view: false });
    });

    it("only initializes once even if called multiple times", () => {
        vi.stubEnv("PROD", "true");
        vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-ABC123");

        initAnalytics();
        initAnalytics();
        initAnalytics();

        expect(loadGtagScript).toHaveBeenCalledTimes(1);
    });

});
