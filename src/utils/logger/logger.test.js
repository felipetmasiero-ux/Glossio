import { describe, expect, it, vi, afterEach } from "vitest";

import { logger } from "./logger";

describe("logger", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("logs an info message as a structured object via console.info", () => {

        const spy = vi.spyOn(console, "info").mockImplementation(() => {});

        logger.info("lesson loaded", { lessonId: "english-a1-greetings" });

        expect(spy).toHaveBeenCalledTimes(1);
        const payload = spy.mock.calls[0][0];
        expect(payload.level).toBe("info");
        expect(payload.message).toBe("lesson loaded");
        expect(payload.context).toEqual({ lessonId: "english-a1-greetings" });
        expect(typeof payload.timestamp).toBe("number");

    });

    it("logs a warning as a structured object via console.warn", () => {

        const spy = vi.spyOn(console, "warn").mockImplementation(() => {});

        logger.warn("slow request", { durationMs: 4200 });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy.mock.calls[0][0].level).toBe("warn");

    });

    it("logs an error as a structured object via console.error", () => {

        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        const error = new Error("boom");

        logger.error("unhandled failure", { error });

        expect(spy).toHaveBeenCalledTimes(1);
        const payload = spy.mock.calls[0][0];
        expect(payload.level).toBe("error");
        expect(payload.context.error).toBe(error);

    });

    it("defaults context to an empty object when none is given", () => {

        const spy = vi.spyOn(console, "info").mockImplementation(() => {});

        logger.info("no context here");

        expect(spy.mock.calls[0][0].context).toEqual({});

    });

});
