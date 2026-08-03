import { HttpError } from "./HttpError.js";

// Strips ASCII control characters (except \t and \n, which are legitimate
// in multi-line fields like bio) and collapses runs of horizontal
// whitespace, without touching real newlines. Applied to every incoming
// string before length-checking it, per the sprint's sanitization mandate.
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;
const REPEATED_SPACES = /[ \t]+/g;

export function sanitizeString(value) {
    if (typeof value !== "string") return value;
    return value
        .replace(CONTROL_CHARS, "")
        .replace(REPEATED_SPACES, " ")
        .trim();
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function requireString(value, field, { min = 0, max = Infinity } = {}) {
    if (typeof value !== "string") {
        throw new HttpError(400, `${field} inválido.`);
    }

    const clean = sanitizeString(value);

    if (clean.length < min || clean.length > max) {
        throw new HttpError(400, `${field} deve ter entre ${min} e ${max} caracteres.`);
    }

    return clean;
}

// For optional profile-style fields: empty/undefined/null all normalize to
// null (matches the existing "clear this field" behavior), otherwise the
// same bounds + sanitization as requireString.
export function optionalString(value, field, { max = Infinity } = {}) {
    if (value === undefined || value === null) return null;

    if (typeof value !== "string") {
        throw new HttpError(400, `${field} inválido.`);
    }

    const clean = sanitizeString(value);

    if (!clean) return null;

    if (clean.length > max) {
        throw new HttpError(400, `${field} deve ter no máximo ${max} caracteres.`);
    }

    return clean;
}

export function requireEmail(value) {
    const email = requireString(value, "E-mail", { min: 3, max: 254 });

    if (!EMAIL_REGEX.test(email)) {
        throw new HttpError(400, "Informe um e-mail válido.");
    }

    return email;
}

export function requirePassword(value, field = "senha") {
    if (typeof value !== "string") {
        throw new HttpError(400, `A ${field} é obrigatória.`);
    }

    if (value.length < 8) {
        throw new HttpError(400, `A ${field} deve ter no mínimo 8 caracteres.`);
    }

    if (value.length > 100) {
        throw new HttpError(400, `A ${field} deve ter no máximo 100 caracteres.`);
    }

    return value;
}

export function optionalUrl(value, field, { max = 2048 } = {}) {
    if (value === undefined || value === null) return null;

    const clean = optionalString(value, field, { max });

    if (!clean) return null;

    let parsed;
    try {
        parsed = new URL(clean);
    } catch {
        throw new HttpError(400, `${field} inválida.`);
    }

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        throw new HttpError(400, `${field} deve usar http ou https.`);
    }

    return clean;
}

const SUPPORTED_TIME_ZONES = typeof Intl.supportedValuesOf === "function"
    ? new Set(Intl.supportedValuesOf("timeZone"))
    : null;

export function optionalTimezone(value) {
    const clean = optionalString(value, "Timezone", { max: 100 });

    if (!clean) return null;

    if (SUPPORTED_TIME_ZONES && !SUPPORTED_TIME_ZONES.has(clean)) {
        throw new HttpError(400, "Timezone inválida.");
    }

    return clean;
}

export function requireNumber(value, field, { min = -Infinity, max = Infinity } = {}) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
        throw new HttpError(400, `${field} inválido.`);
    }

    if (value < min || value > max) {
        throw new HttpError(400, `${field} fora do intervalo permitido.`);
    }

    return value;
}

// Goals, easeFactor, interval, repetitions etc. - a number that, when
// provided, must be a finite, non-negative value within a sane ceiling.
// Missing/null means "not configured" and passes through as null.
export function optionalPositiveNumber(value, field, { max = 1_000_000 } = {}) {
    if (value === undefined || value === null) return null;
    return requireNumber(value, field, { min: 0, max });
}

export function requireTimestamp(value, field) {
    return requireNumber(value, field, { min: 0, max: 8_640_000_000_000_000 });
}

export function requireArray(value, field, { maxLength = Infinity } = {}) {
    if (!Array.isArray(value)) {
        throw new HttpError(400, `${field} deve ser uma lista.`);
    }

    if (value.length > maxLength) {
        throw new HttpError(400, `${field} excede o tamanho máximo permitido (${maxLength}).`);
    }

    return value;
}

// For arrays whose elements are meant to be short strings (word lists,
// lesson ids) - requireArray on its own only checks the *container*, not
// what's inside it, which left every element free to be arbitrarily large
// or any type at all.
export function requireStringArray(value, field, { maxLength = Infinity, maxItemLength = 200 } = {}) {
    return requireArray(value, field, { maxLength })
        .map((item, index) => requireString(item, `${field}[${index}]`, { min: 0, max: maxItemLength }));
}

// For free-form JSON fields (an event's payload, a client-supplied
// "current activity" snapshot) that are only ever meant to be a small, flat
// object - never an array/string/number, and never large. `maxBytes` is
// checked against the serialized form, since a small key count doesn't
// stop any individual value from being huge.
export function requirePlainObject(value, field, { maxKeys = 20, maxBytes = 2_000 } = {}) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
        throw new HttpError(400, `${field} inválido.`);
    }

    if (Object.keys(value).length > maxKeys) {
        throw new HttpError(400, `${field} excede o número máximo de campos permitido.`);
    }

    if (JSON.stringify(value).length > maxBytes) {
        throw new HttpError(400, `${field} excede o tamanho máximo permitido.`);
    }

    return value;
}
