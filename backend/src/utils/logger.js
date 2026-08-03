import pino from "pino";
import { env } from "../config/env.js";

// pino: near-zero overhead structured JSON logging - not a monitoring
// platform, just a logger (the sprint's "no heavy monitoring libraries"
// restriction is about Prometheus/Grafana/OpenTelemetry-class tooling, not
// this). `redact` is a defense-in-depth belt-and-suspenders on top of the
// existing discipline of never passing these fields into a log call in the
// first place: if a future call site ever did, these paths still can't
// reach stdout.
//
// Exported (not just used inline below) so tests can build their own pino
// instance against an in-memory stream with this exact config, rather than
// trying to intercept the real logger's actual write path (pino writes to
// stdout through sonic-boom, not a plain synchronous process.stdout.write()
// call a spy could reliably catch).
export const pinoOptions = {
    level: env.logLevel,
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
        paths: [
            "password", "newPassword", "currentPassword", "passwordHash", "token", "jwt",
            "*.password", "*.newPassword", "*.currentPassword", "*.passwordHash", "*.token", "*.jwt",
            "req.headers.authorization", "headers.authorization", "authorization"
        ],
        censor: "[REDACTED]"
    }
};

const pinoLogger = pino(pinoOptions);

// Kept as the same (event, meta) call shape the rest of the app already
// uses (see logRequestEvent below) - callers don't need to change; only the
// underlying writer does. pino's own signature is (mergingObject, msg), so
// meta is passed first with `event` as the human-readable message.
function logWith(level, event, meta) {
    pinoLogger[level](meta, event);
}

export const logger = {
    info(event, meta = {}) {
        logWith("info", event, meta);
    },
    warn(event, meta = {}) {
        logWith("warn", event, meta);
    },
    error(event, meta = {}) {
        logWith("error", event, meta);
    }
};

// Convenience wrapper for the request-scoped security/audit events (login,
// registro, troca de senha, 401/403/429/500) and now also carries the
// request's correlation id (see middlewares/requestContext.js) so every log
// line for a given request - security events included - can be traced
// together. Only ever pulls safe, non-sensitive fields off the request.
export function logRequestEvent(level, event, req, extra = {}) {
    logger[level](event, {
        requestId: req.id ?? null,
        ip: req.ip,
        method: req.method,
        path: req.originalUrl?.split("?")[0] ?? req.path,
        userId: req.userId ?? null,
        ...extra
    });
}
