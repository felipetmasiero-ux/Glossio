import { describe, expect, it, afterEach, vi } from "vitest";

import {
    isProduction,
    getMeasurementId,
    hasMeasurementId,
    isDebugMode,
    isAnalyticsEnabled
} from "./config";

describe("analytics config", () => {

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    describe("isProduction", () => {

        it("is false in a dev build (the default test environment)", () => {
            vi.stubEnv("PROD", "");
            expect(isProduction()).toBe(false);
        });

        it("is true when Vite's PROD flag is set", () => {
            vi.stubEnv("PROD", "true");
            expect(isProduction()).toBe(true);
        });

    });

    describe("getMeasurementId / hasMeasurementId", () => {

        it("returns null and false when the env var is missing", () => {
            vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");
            expect(getMeasurementId()).toBeNull();
            expect(hasMeasurementId()).toBe(false);
        });

        it("returns the configured id when present", () => {
            vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-ABC123");
            expect(getMeasurementId()).toBe("G-ABC123");
            expect(hasMeasurementId()).toBe(true);
        });

    });

    describe("isDebugMode", () => {

        it("is false by default", () => {
            vi.stubEnv("VITE_GA_DEBUG", "");
            expect(isDebugMode()).toBe(false);
        });

        it("is true only for the exact string 'true'", () => {
            vi.stubEnv("VITE_GA_DEBUG", "true");
            expect(isDebugMode()).toBe(true);

            vi.stubEnv("VITE_GA_DEBUG", "yes");
            expect(isDebugMode()).toBe(false);
        });

    });

    describe("isAnalyticsEnabled", () => {

        it("is false in dev even with a measurement id configured", () => {
            vi.stubEnv("PROD", "");
            vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-ABC123");
            expect(isAnalyticsEnabled()).toBe(false);
        });

        it("is false in production without a measurement id", () => {
            vi.stubEnv("PROD", "true");
            vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");
            expect(isAnalyticsEnabled()).toBe(false);
        });

        it("is true only in production with a measurement id", () => {
            vi.stubEnv("PROD", "true");
            vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-ABC123");
            expect(isAnalyticsEnabled()).toBe(true);
        });

    });

});
