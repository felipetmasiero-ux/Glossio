import { describe, expect, it, beforeEach } from "vitest";
import { recordRequest, getMetrics, resetMetrics } from "./metrics.js";

describe("metrics", () => {

    beforeEach(() => {
        resetMetrics();
    });

    it("starts at zero with no requests recorded", () => {
        const metrics = getMetrics();

        expect(metrics.requests.total).toBe(0);
        expect(metrics.requests["2xx"]).toBe(0);
        expect(metrics.requests.averageResponseTimeMs).toBe(0);
    });

    it("buckets requests by status class", () => {
        recordRequest(200, 10);
        recordRequest(201, 20);
        recordRequest(404, 5);
        recordRequest(500, 15);

        const metrics = getMetrics();

        expect(metrics.requests.total).toBe(4);
        expect(metrics.requests["2xx"]).toBe(2);
        expect(metrics.requests["4xx"]).toBe(1);
        expect(metrics.requests["5xx"]).toBe(1);
    });

    it("computes the average response time across all recorded requests", () => {
        recordRequest(200, 10);
        recordRequest(200, 20);
        recordRequest(200, 30);

        expect(getMetrics().requests.averageResponseTimeMs).toBe(20);
    });

    it("always includes uptime, memory, and cpu", () => {
        const metrics = getMetrics();

        expect(metrics.uptime).toBeTypeOf("number");
        expect(metrics.memory).toHaveProperty("heapUsed");
        expect(metrics.cpu).toHaveProperty("user");
    });

    it("resetMetrics clears every counter back to zero", () => {
        recordRequest(200, 10);
        recordRequest(500, 10);

        resetMetrics();

        const metrics = getMetrics();
        expect(metrics.requests.total).toBe(0);
        expect(metrics.requests["2xx"]).toBe(0);
        expect(metrics.requests["5xx"]).toBe(0);
    });

});
