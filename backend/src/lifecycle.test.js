import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { createLifecycle } from "./lifecycle.js";

function fakeLogger() {
    return { info: vi.fn(), warn: vi.fn(), error: vi.fn() };
}

function fakeServer({ closeError = null } = {}) {
    return {
        close: vi.fn(callback => {
            callback(closeError);
        })
    };
}

function fakePrisma({ disconnectError = null } = {}) {
    return {
        $disconnect: vi.fn(() => (disconnectError ? Promise.reject(disconnectError) : Promise.resolve()))
    };
}

describe("createLifecycle - shutdown", () => {

    it("closes the server, disconnects Prisma, and exits 0 on a clean shutdown", async () => {
        const server = fakeServer();
        const prisma = fakePrisma();
        const logger = fakeLogger();
        const exit = vi.fn();

        const { shutdown } = createLifecycle({ server, prisma, logger, exit });

        shutdown("SIGTERM");
        await vi.waitFor(() => expect(exit).toHaveBeenCalled());

        expect(server.close).toHaveBeenCalledTimes(1);
        expect(prisma.$disconnect).toHaveBeenCalledTimes(1);
        expect(exit).toHaveBeenCalledWith(0);
        expect(logger.info).toHaveBeenCalledWith("shutdown_initiated", { reason: "SIGTERM" });
        expect(logger.info).toHaveBeenCalledWith("shutdown_complete", { reason: "SIGTERM" });
    });

    it("is idempotent - a second call while already shutting down is a no-op", async () => {
        const server = fakeServer();
        const prisma = fakePrisma();
        const logger = fakeLogger();
        const exit = vi.fn();

        const { shutdown } = createLifecycle({ server, prisma, logger, exit });

        shutdown("SIGTERM");
        shutdown("SIGTERM");
        shutdown("SIGINT");

        await vi.waitFor(() => expect(exit).toHaveBeenCalled());

        expect(server.close).toHaveBeenCalledTimes(1);
    });

    it("exits 1 if the server fails to close cleanly", async () => {
        const server = fakeServer({ closeError: new Error("close failed") });
        const prisma = fakePrisma();
        const logger = fakeLogger();
        const exit = vi.fn();

        const { shutdown } = createLifecycle({ server, prisma, logger, exit });

        shutdown("SIGTERM");
        await vi.waitFor(() => expect(exit).toHaveBeenCalled());

        expect(exit).toHaveBeenCalledWith(1);
        expect(logger.error).toHaveBeenCalledWith("shutdown_server_close_error", { message: "close failed" });
    });

    it("still exits even if Prisma disconnect rejects", async () => {
        const server = fakeServer();
        const prisma = fakePrisma({ disconnectError: new Error("db gone") });
        const logger = fakeLogger();
        const exit = vi.fn();

        const { shutdown } = createLifecycle({ server, prisma, logger, exit });

        shutdown("SIGTERM");
        await vi.waitFor(() => expect(exit).toHaveBeenCalled());

        expect(logger.error).toHaveBeenCalledWith("shutdown_disconnect_error", { message: "db gone" });
    });

});

describe("createLifecycle - force exit", () => {

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("force-exits if server.close never calls its callback back", () => {
        const server = { close: vi.fn() }; // never invokes the callback
        const prisma = fakePrisma();
        const logger = fakeLogger();
        const exit = vi.fn();

        const { shutdown } = createLifecycle({ server, prisma, logger, exit, forceExitAfterMs: 5000 });

        shutdown("SIGTERM");

        expect(exit).not.toHaveBeenCalled();

        vi.advanceTimersByTime(5001);

        expect(exit).toHaveBeenCalledWith(1);
        expect(logger.error).toHaveBeenCalledWith("shutdown_forced", { reason: "SIGTERM" });
    });

});

describe("createLifecycle - fatal error handling", () => {

    it("logs the error and shuts down with exit code 1 on an uncaught exception", async () => {
        const server = fakeServer();
        const prisma = fakePrisma();
        const logger = fakeLogger();
        const exit = vi.fn();

        const { handleFatalError } = createLifecycle({ server, prisma, logger, exit });

        handleFatalError("uncaught_exception", new Error("boom"));
        await vi.waitFor(() => expect(exit).toHaveBeenCalled());

        expect(logger.error).toHaveBeenCalledWith("uncaught_exception", expect.objectContaining({ message: "boom" }));
        expect(exit).toHaveBeenCalledWith(1);
    });

    it("handles a non-Error rejection reason gracefully", async () => {
        const server = fakeServer();
        const prisma = fakePrisma();
        const logger = fakeLogger();
        const exit = vi.fn();

        const { handleFatalError } = createLifecycle({ server, prisma, logger, exit });

        handleFatalError("unhandled_rejection", "just a string reason");
        await vi.waitFor(() => expect(exit).toHaveBeenCalled());

        expect(logger.error).toHaveBeenCalledWith("unhandled_rejection", expect.objectContaining({ message: "just a string reason" }));
    });

});
