import { describe, expect, it, afterEach, vi } from "vitest";

import {
    isProduction,
    getSentryDsn,
    hasSentryDsn,
    isDebugMode,
    isErrorTrackingEnabled
} from "./config";

describe("errorTracking config", () => {

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

    describe("getSentryDsn / hasSentryDsn", () => {

        it("returns null and false when the env var is missing", () => {
            vi.stubEnv("VITE_SENTRY_DSN", "");
            expect(getSentryDsn()).toBeNull();
            expect(hasSentryDsn()).toBe(false);
        });

        it("returns the configured DSN when present", () => {
            vi.stubEnv("VITE_SENTRY_DSN", "https://abc123@o1.ingest.sentry.io/1");
            expect(getSentryDsn()).toBe("https://abc123@o1.ingest.sentry.io/1");
            expect(hasSentryDsn()).toBe(true);
        });

    });

    describe("isDebugMode", () => {

        it("is false by default", () => {
            vi.stubEnv("VITE_SENTRY_DEBUG", "");
            expect(isDebugMode()).toBe(false);
        });

        it("is true only for the exact string 'true'", () => {
            vi.stubEnv("VITE_SENTRY_DEBUG", "true");
            expect(isDebugMode()).toBe(true);

            vi.stubEnv("VITE_SENTRY_DEBUG", "yes");
            expect(isDebugMode()).toBe(false);
        });

    });

    describe("isErrorTrackingEnabled", () => {

        it("is false in dev even with a DSN configured", () => {
            vi.stubEnv("PROD", "");
            vi.stubEnv("VITE_SENTRY_DSN", "https://abc123@o1.ingest.sentry.io/1");
            expect(isErrorTrackingEnabled()).toBe(false);
        });

        it("is false in production without a DSN", () => {
            vi.stubEnv("PROD", "true");
            vi.stubEnv("VITE_SENTRY_DSN", "");
            expect(isErrorTrackingEnabled()).toBe(false);
        });

        it("is true only in production with a DSN", () => {
            vi.stubEnv("PROD", "true");
            vi.stubEnv("VITE_SENTRY_DSN", "https://abc123@o1.ingest.sentry.io/1");
            expect(isErrorTrackingEnabled()).toBe(true);
        });

    });

});
