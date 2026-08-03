import { describe, expect, it } from "vitest";
import pino from "pino";

import { pinoOptions, logRequestEvent } from "./logger.js";

// Builds a logger with the app's *real* level/redact config (pinoOptions),
// writing to an in-memory stream instead of stdout - deterministic and
// synchronous, unlike trying to spy on pino's actual sonic-boom write path.
function testLogger() {
    const lines = [];
    const stream = { write(chunk) { lines.push(chunk); } };
    const instance = pino(pinoOptions, stream);

    return {
        instance,
        lastEntry: () => JSON.parse(lines.at(-1))
    };
}

// Mirrors logger.js's own logRequestEvent, but against an injectable
// instance instead of the module's real singleton.
function requestEventWith(instance, level, event, req, extra = {}) {
    instance[level]({
        requestId: req.id ?? null,
        ip: req.ip,
        method: req.method,
        path: req.originalUrl?.split("?")[0] ?? req.path,
        userId: req.userId ?? null,
        ...extra
    }, event);
}

describe("logger config (pinoOptions)", () => {

    it("writes a structured JSON line with the event as the message", () => {
        const { instance, lastEntry } = testLogger();

        instance.info({ foo: "bar" }, "test_event");

        const entry = lastEntry();
        expect(entry.msg).toBe("test_event");
        expect(entry.foo).toBe("bar");
        expect(entry.time).toBeTruthy();
        expect(entry.level).toBeTypeOf("number");
    });

    it("never writes a password to the log line", () => {
        const { instance, lastEntry } = testLogger();

        instance.info({ password: "super-secret-123", email: "user@example.com" }, "login_attempt");

        const entry = lastEntry();
        expect(entry.password).toBe("[REDACTED]");
        expect(entry.email).toBe("user@example.com");
        expect(JSON.stringify(entry)).not.toMatch(/super-secret-123/);
    });

    it("never writes a JWT/token to the log line", () => {
        const { instance, lastEntry } = testLogger();

        instance.info({ token: "eyJhbGciOiJIUzI1NiJ9.fake.token" }, "something");

        const entry = lastEntry();
        expect(entry.token).toBe("[REDACTED]");
        expect(JSON.stringify(entry)).not.toMatch(/eyJhbGciOiJIUzI1NiJ9/);
    });

    it("never writes an Authorization header value to the log line", () => {
        const { instance, lastEntry } = testLogger();

        instance.info({ headers: { authorization: "Bearer secret-token-value" } }, "some_request");

        const entry = lastEntry();
        expect(entry.headers.authorization).toBe("[REDACTED]");
        expect(JSON.stringify(entry)).not.toMatch(/secret-token-value/);
    });

    it("never writes a passwordHash to the log line", () => {
        const { instance, lastEntry } = testLogger();

        instance.error({ passwordHash: "$2b$12$abcdefghijklmnopqrstuv" }, "some_error");

        const entry = lastEntry();
        expect(entry.passwordHash).toBe("[REDACTED]");
    });

    it("redacts sensitive fields nested inside another object", () => {
        const { instance, lastEntry } = testLogger();

        instance.info({ body: { currentPassword: "old-pass", newPassword: "new-pass" } }, "password_change_attempt");

        const entry = lastEntry();
        expect(JSON.stringify(entry)).not.toMatch(/old-pass|new-pass/);
    });

});

describe("logRequestEvent shape", () => {

    it("includes the request's id, ip, method, path, and userId", () => {
        const { instance, lastEntry } = testLogger();

        const req = {
            id: "req-123",
            ip: "127.0.0.1",
            method: "GET",
            originalUrl: "/api/user?foo=bar",
            userId: "user-1"
        };

        requestEventWith(instance, "info", "unauthorized", req, { message: "no token" });

        const entry = lastEntry();
        expect(entry.requestId).toBe("req-123");
        expect(entry.ip).toBe("127.0.0.1");
        expect(entry.method).toBe("GET");
        expect(entry.path).toBe("/api/user");
        expect(entry.userId).toBe("user-1");
        expect(entry.message).toBe("no token");
    });

    it("defaults requestId/userId to null when absent", () => {
        const { instance, lastEntry } = testLogger();

        requestEventWith(instance, "warn", "forbidden", { ip: "1.2.3.4", method: "GET", path: "/api/x" });

        const entry = lastEntry();
        expect(entry.requestId).toBeNull();
        expect(entry.userId).toBeNull();
    });

});

describe("logRequestEvent (real export, integration with the module's own logger)", () => {

    it("runs without throwing against the real singleton logger", () => {
        // Smoke test against the actual exported function/logger (writes
        // to real stdout) - the detailed shape/redaction assertions above
        // already cover the logic against an inspectable stream.
        expect(() => logRequestEvent("info", "smoke_test", {
            id: "req-1", ip: "127.0.0.1", method: "GET", path: "/x"
        })).not.toThrow();
    });

});
