import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../src/app.js";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

describe("GET /health", () => {

    it("responds 200 with the expected shape, no auth required", async () => {
        const response = await request(app).get("/health");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: "ok",
            uptime: expect.any(Number),
            timestamp: expect.any(String),
            version: expect.any(String)
        });
    });

    it("responds in a handful of milliseconds (no DB round trip)", async () => {
        const start = Date.now();
        await request(app).get("/health");
        const elapsed = Date.now() - start;

        expect(elapsed).toBeLessThan(200); // generous for CI/test overhead; a real DB round trip would be slower
    });

    it("carries a valid X-Request-ID response header", async () => {
        const response = await request(app).get("/health");

        expect(response.headers["x-request-id"]).toMatch(UUID_PATTERN);
    });

});

describe("GET /ready", () => {

    it("responds 200 { status: ready } when the database is reachable", async () => {
        const response = await request(app).get("/ready");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ready" });
    });

});

describe("GET /metrics", () => {

    it("responds 200 with uptime, memory, cpu, and requests", async () => {
        const response = await request(app).get("/metrics");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            uptime: expect.any(Number),
            memory: expect.objectContaining({ heapUsed: expect.any(Number) }),
            cpu: expect.objectContaining({ user: expect.any(Number) }),
            requests: expect.objectContaining({
                total: expect.any(Number),
                averageResponseTimeMs: expect.any(Number)
            })
        });
    });

    it("reflects requests made against the app (count increases)", async () => {
        const before = await request(app).get("/metrics");
        const totalBefore = before.body.requests.total;

        await request(app).get("/health");
        await request(app).get("/health");

        const after = await request(app).get("/metrics");

        // before's own request, both /health calls, and this /metrics call
        // itself all count - just assert it strictly increased, not an
        // exact number, so this isn't coupled to every other test's calls.
        expect(after.body.requests.total).toBeGreaterThan(totalBefore);
    });

});

describe("X-Request-ID", () => {

    it("is present and unique across different requests", async () => {
        const first = await request(app).get("/health");
        const second = await request(app).get("/health");

        expect(first.headers["x-request-id"]).toMatch(UUID_PATTERN);
        expect(second.headers["x-request-id"]).toMatch(UUID_PATTERN);
        expect(first.headers["x-request-id"]).not.toBe(second.headers["x-request-id"]);
    });

    it("is present even on an error response (401)", async () => {
        const response = await request(app).get("/api/user");

        expect(response.status).toBe(401);
        expect(response.headers["x-request-id"]).toMatch(UUID_PATTERN);
    });

    it("is present even on a 404", async () => {
        const response = await request(app).get("/api/this-route-does-not-exist");

        expect(response.status).toBe(404);
        expect(response.headers["x-request-id"]).toMatch(UUID_PATTERN);
    });

});
