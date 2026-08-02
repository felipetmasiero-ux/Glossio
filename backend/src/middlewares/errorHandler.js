import { HttpError } from "../utils/HttpError.js";
import { logRequestEvent } from "../utils/logger.js";

const SECURITY_EVENT_BY_STATUS = {
    401: "unauthorized",
    403: "forbidden"
};

// body-parser (used internally by express.json()) throws its own plain
// Error objects for a malformed or oversized body - not HttpError instances,
// but they do carry a client-facing `status`/`statusCode` (400 for bad JSON,
// 413 for exceeding the size limit). Their `.message`, though, can describe
// parser internals, so it's never forwarded - only ever this fixed,
// friendly text per status.
const CLIENT_ERROR_MESSAGES = {
    400: "Requisição inválida.",
    413: "Payload excede o tamanho máximo permitido."
};

export function notFound(req, res) {
    res.status(404).json({ error: "Não encontrado." });
}

// Single choke point for every error in the app - controllers only ever
// `next(err)`, never format a response themselves. That guarantees non-
// HttpErrors (a bad Prisma query, a thrown TypeError, anything unexpected)
// can never leak a stack trace, a Prisma/SQL message, a file path, or any
// other Node internal to the client - only ever a fixed, friendly message.
// The real error still goes to the log for debugging.
export function errorHandler(err, req, res, next) {
    if (err instanceof HttpError) {
        const event = SECURITY_EVENT_BY_STATUS[err.status];

        if (event) {
            logRequestEvent("warn", event, req, { message: err.message });
        }

        return res.status(err.status).json({ error: err.message });
    }

    const knownClientStatus = (err.status ?? err.statusCode);

    if (CLIENT_ERROR_MESSAGES[knownClientStatus]) {
        logRequestEvent("warn", "bad_request", req, { status: knownClientStatus });
        return res.status(knownClientStatus).json({ error: CLIENT_ERROR_MESSAGES[knownClientStatus] });
    }

    logRequestEvent("error", "unhandled_error", req, { message: err.message });
    res.status(500).json({ error: "Erro interno do servidor." });
}
