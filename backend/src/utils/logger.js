// Minimal structured logger - one JSON line per event, no external
// dependency. Deliberately narrow surface: callers pass an event name plus
// a small metadata object built from request *metadata* (ip, path, userId)
// never from req.body or the Authorization header, so passwords, JWTs, and
// hashes structurally can never end up in a log line.

function write(level, event, meta) {
    const entry = {
        timestamp: new Date().toISOString(),
        level,
        event,
        ...meta
    };

    const line = JSON.stringify(entry);

    if (level === "error") console.error(line);
    else if (level === "warn") console.warn(line);
    else console.log(line);
}

export const logger = {
    info(event, meta = {}) {
        write("info", event, meta);
    },
    warn(event, meta = {}) {
        write("warn", event, meta);
    },
    error(event, meta = {}) {
        write("error", event, meta);
    }
};

// Convenience wrapper for the request-scoped security/audit events the
// sprint asks for (login, registro, troca de senha, 401/403/429/500) - only
// ever pulls safe, non-sensitive fields off the request.
export function logRequestEvent(level, event, req, extra = {}) {
    logger[level](event, {
        ip: req.ip,
        method: req.method,
        path: req.originalUrl?.split("?")[0] ?? req.path,
        userId: req.userId ?? null,
        ...extra
    });
}
