import { describe, expect, it, vi, afterEach } from "vitest";

vi.mock("web-vitals", () => ({
    onCLS: vi.fn(),
    onFCP: vi.fn(),
    onINP: vi.fn(),
    onLCP: vi.fn(),
    onTTFB: vi.fn()
}));

vi.mock("../analytics", () => ({
    trackEvent: vi.fn(),
    ANALYTICS_EVENTS: { WEB_VITAL_MEASURED: "web_vital_measured" }
}));

import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";
import { trackEvent } from "../analytics";
import { reportWebVitals } from "./reportWebVitals";

describe("reportWebVitals", () => {

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("registers a callback for every core web vital", () => {

        reportWebVitals();

        expect(onCLS).toHaveBeenCalledTimes(1);
        expect(onFCP).toHaveBeenCalledTimes(1);
        expect(onINP).toHaveBeenCalledTimes(1);
        expect(onLCP).toHaveBeenCalledTimes(1);
        expect(onTTFB).toHaveBeenCalledTimes(1);

    });

    it("reports a millisecond metric (LCP) rounded, through trackEvent", () => {

        reportWebVitals();
        const [handleLCP] = onLCP.mock.calls[0];

        handleLCP({ name: "LCP", value: 2412.789, rating: "good", id: "v1-123" });

        expect(trackEvent).toHaveBeenCalledWith("web_vital_measured", {
            metric_name: "LCP",
            value: 2413,
            rating: "good",
            id: "v1-123"
        });

    });

    it("scales CLS's unitless score to an integer instead of truncating it to 0", () => {

        reportWebVitals();
        const [handleCLS] = onCLS.mock.calls[0];

        handleCLS({ name: "CLS", value: 0.03107, rating: "good", id: "v1-456" });

        expect(trackEvent).toHaveBeenCalledWith("web_vital_measured", {
            metric_name: "CLS",
            value: 31,
            rating: "good",
            id: "v1-456"
        });

    });

});
