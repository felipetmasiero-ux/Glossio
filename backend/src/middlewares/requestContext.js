import crypto from "node:crypto";
import { logger } from "../utils/logger.js";
import { recordRequest } from "../utils/metrics.js";

// One id per request, exposed back to the client so it can be quoted in a
// bug report / support message, and attached to every log line this
// request produces (including the security-event logs in logger.js).
export function requestId(req, res, next) {
    req.id = crypto.randomUUID();
    res.setHeader("X-Request-ID", req.id);
    next();
}

// Automatic method/route/status/duration logging for every request, plus
// feeding the same measurement into the in-memory metrics counters - one
// measurement point for both, rather than measuring response time twice.
export function requestLogger(req, res, next) {
    const startedAt = process.hrtime.bigint();

    res.on("finish", () => {
        const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
        const roundedDuration = Math.round(durationMs * 100) / 100;
        const route = req.originalUrl?.split("?")[0] ?? req.path;

        recordRequest(res.statusCode, roundedDuration);

        logger.info("http_request", {
            requestId: req.id ?? null,
            method: req.method,
            route,
            status: res.statusCode,
            durationMs: roundedDuration
        });
    });

    next();
}
