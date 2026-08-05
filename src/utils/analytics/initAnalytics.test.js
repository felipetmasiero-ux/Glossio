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

    // Regression test: without this, gtag.js's Consent Mode silently
    // withholds analytics_storage by default in some regions - the tag
    // still runs (dataLayer fills up, Enhanced Measurement fires) but never
    // actually sends a hit or sets the _ga cookie, so GA4 shows zero data
    // even though nothing looks broken client-side.
    it("grants analytics_storage by default (Consent Mode) before configuring gtag", () => {
        vi.stubEnv("PROD", "true");
        vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-ABC123");

        initAnalytics();

        expect(pushToDataLayer).toHaveBeenCalledWith("consent", "default", {
            analytics_storage: "granted",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied"
        });

        const consentCallIndex = pushToDataLayer.mock.calls.findIndex(call => call[0] === "consent");
        const configCallIndex = pushToDataLayer.mock.calls.findIndex(call => call[0] === "config");

        expect(consentCallIndex).toBeGreaterThanOrEqual(0);
        expect(consentCallIndex).toBeLessThan(configCallIndex);
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
