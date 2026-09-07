import { rateLimit, ipKeyGenerator, MINUTE, HOUR } from "express-rate-limit";
import { logRequestEvent } from "../utils/logger.js";
import { env } from "../config/env.js";

// Which client a request is charged to. Getting this wrong doesn't fail
// loudly - it silently merges unrelated users into one counter, which is
// exactly how "3 registrations per hour" once became a site-wide limit.
//
// Render serves every *.onrender.com host from behind Cloudflare, so a
// request crosses two proxies (Cloudflare edge, then Render's own router)
// before reaching this process, and req.ip alone depends on app.js's
// `trust proxy` hop count matching that chain exactly. CF-Connecting-IP is
// not sensitive to the count: Cloudflare sets it to the connecting client's
// address and overwrites any value the client tried to send, and the origin
// here is only reachable through Cloudflare, so it cannot be forged. req.ip
// stays as the fallback for anything not fronted by Cloudflare (local dev,
// the test suite, or a future move off Render).
//
// ipKeyGenerator is express-rate-limit's own helper: it collapses an IPv6
// address to its /56 block, so one visitor cannot walk through a limit by
// rotating through the addresses their provider hands them.
export function clientKey(req) {
    const cloudflareClientIp = req.headers["cf-connecting-ip"];
    return ipKeyGenerator(cloudflareClientIp || req.ip);
}

// The limits below are the real production numbers from the security-
// hardening spec (5 logins/15min, 3 registers/hour, etc.) - exactly what
// ships to production. Outside production, every limit is scaled up by
// this factor instead of being bypassed outright, so rate limiting is still
// exercised (and its own behavior still testable) in dev/test, without
// locking out an E2E suite that creates a disposable user - via the very
// same /register and /login endpoints - for nearly every single test
// against one shared backend process. Only NODE_ENV=production (a real
// deploy, never a developer's machine or CI running this repo's test
// suite) gets the strict, unscaled numbers.
const DEV_MULTIPLIER = env.nodeEnv === "production" ? 1 : 30;

// Every limiter here uses express-rate-limit's built-in MemoryStore (the
// default when `store` is omitted) - fine for a single-process deployment.
// To move to a multi-instance deployment later, swap in the `rate-limit-redis`
// package's RedisStore and pass it as `store` below; nothing else about
// these limiter definitions needs to change.
function createLimiter({ windowMs, max, message, skipSuccessfulRequests = false }) {
    const scaledMax = max * DEV_MULTIPLIER;

    return rateLimit({
        windowMs,
        max: scaledMax,
        keyGenerator: clientKey,
        standardHeaders: true,
        legacyHeaders: false,
        skipSuccessfulRequests,
        handler(req, res) {
            logRequestEvent("warn", "rate_limit_exceeded", req, { limit: scaledMax, windowMs });
            res.status(429).json({ error: message });
        }
    });
}

const TOO_MANY_LOGIN_ATTEMPTS = "Muitas tentativas de login. Tente novamente mais tarde.";
const TOO_MANY_REGISTRATIONS = "Muitos registros a partir deste endereço. Tente novamente mais tarde.";
const TOO_MANY_PASSWORD_ATTEMPTS = "Muitas tentativas de troca de senha. Tente novamente mais tarde.";
const TOO_MANY_REQUESTS = "Muitas requisições. Tente novamente em instantes.";

// Failed attempts count toward the limit; a successful login/password
// change doesn't consume a slot for the next legitimate attempt.
export const loginLimiter = createLimiter({
    windowMs: 15 * MINUTE,
    max: 5,
    message: TOO_MANY_LOGIN_ATTEMPTS,
    skipSuccessfulRequests: true
});

export const registerLimiter = createLimiter({
    windowMs: 1 * HOUR,
    max: 3,
    message: TOO_MANY_REGISTRATIONS
});

export const passwordChangeLimiter = createLimiter({
    windowMs: 30 * MINUTE,
    max: 5,
    message: TOO_MANY_PASSWORD_ATTEMPTS,
    skipSuccessfulRequests: true
});

// Baseline, method-scoped limits applied to every /api request as a second
// layer under the stricter per-endpoint limiters above (a POST to /login
// is bound by both its own 5/15min limiter and this 40/min general one -
// whichever is hit first wins).
function methodLimiter(method, max) {
    const limiter = createLimiter({ windowMs: 1 * MINUTE, max, message: TOO_MANY_REQUESTS });

    return (req, res, next) => {
        if (req.method !== method) return next();
        return limiter(req, res, next);
    };
}

export const generalGetLimiter = methodLimiter("GET", 100);
export const generalPutLimiter = methodLimiter("PUT", 60);
export const generalPostLimiter = methodLimiter("POST", 40);
