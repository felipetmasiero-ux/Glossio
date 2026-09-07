import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { routes } from "./routes/index.js";
import { healthRoutes } from "./routes/healthRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import { generalGetLimiter, generalPutLimiter, generalPostLimiter } from "./middlewares/rateLimiters.js";
import { requestId, requestLogger } from "./middlewares/requestContext.js";
import { HttpError } from "./utils/HttpError.js";

export const app = express();

// Render (like every managed host) terminates TLS at its own load balancer
// and proxies to this process, so the socket's peer address is ALWAYS that
// balancer - identical for every visitor on Earth. Express defaults
// `trust proxy` to false, which means req.ip returns that shared balancer
// address, and express-rate-limit's default key generator (req.ip) then
// buckets the entire planet into a single counter: 3 registrations per hour
// and 5 failed logins per 15 minutes for ALL users combined, not per user.
// A brand-new visitor gets "Muitos registros a partir deste endereço" on
// their very first attempt because three strangers already spent the global
// budget that hour. This also made every ip in the request logs useless.
//
// The value is deliberately 1 - "trust exactly one hop" - and NOT `true`.
// With `true`, Express trusts the whole X-Forwarded-For chain and takes its
// leftmost entry, which is fully attacker-controlled: a brute-forcer sends
// a different X-Forwarded-For per request and every limiter in
// rateLimiters.js becomes a no-op. With 1, req.ip is the rightmost entry -
// the address Render's balancer itself observed - so spoofed values
// prepended by a client are ignored. Raise this only if a second trusted
// proxy is ever put in front of Render (e.g. Cloudflare), since the number
// must match the real hop count exactly.
app.set("trust proxy", 1);

// Ahead of everything else: every request gets a correlation id and an
// automatic method/route/status/duration log line, health/ready/metrics
// included. Health/ready/metrics themselves are mounted here too, before
// helmet/CORS/rate limiting/body parsing - an orchestrator's liveness probe
// has nothing to do with browser-facing headers or CORS, shouldn't compete
// with API traffic for rate-limit budget, and /health specifically must
// never touch the database or wait on any of this.
app.use(requestId);
app.use(requestLogger);
app.use(healthRoutes);

// helmet() alone already covers most of the OWASP-recommended header set
// (X-Content-Type-Options: nosniff, X-Frame-Options, X-DNS-Prefetch-Control,
// Referrer-Policy: no-referrer, Strict-Transport-Security, Cross-Origin-*
// policies, and hides X-Powered-By). Two things are worth a deliberate
// override for an API that only ever returns JSON, never HTML:
//
// - Content-Security-Policy: `default-src 'none'` is the correct policy
//   here (there is no page, script, or style this server ever serves for a
//   browser to execute) rather than helmet's browser-app-oriented default.
// - Cross-Origin-Resource-Policy: this API is deliberately called from a
//   different origin (the frontend), so it opts into "cross-origin" rather
//   than helmet's stricter default.
//
// X-XSS-Protection is intentionally NOT set: modern guidance (and helmet
// itself, as of v8) omits it - old browser XSS auditors that honored this
// header had their own exploitable bugs, and CSP is the actual modern
// replacement for this class of protection.
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: false,
        directives: {
            defaultSrc: ["'none'"],
            frameAncestors: ["'none'"]
        }
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    hsts: { maxAge: 31_536_000, includeSubDomains: true }
}));

// Permissions-Policy has no first-class helmet middleware (removed for lack
// of a stable default set across versions) - set explicitly instead,
// disabling browser features this API never needs.
app.use((req, res, next) => {
    res.setHeader(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=(), interest-cohort=()"
    );
    next();
});

// Reject any browser origin not explicitly allowlisted (localhost in dev,
// the real production domain via CORS_ORIGIN) - never falls back to `*`.
// Requests with no Origin header (server-to-server calls, curl, Playwright's
// `request` fixture) are allowed through, since the Origin check only ever
// protects browsers honoring CORS in the first place.
app.use(cors({
    origin(origin, callback) {
        if (!origin || env.corsOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new HttpError(403, "Origem não permitida."));
    }
}));

app.use(express.json({ limit: "1mb" }));

// Every /api response is a private, per-user JSON payload (auth tokens,
// profile, flashcards, progress...) with nothing cacheable about it - none
// of it should ever be written to a shared proxy cache or a browser's disk
// cache, where it could resurface for the next person on a shared/public
// computer (or via the back button) after logout. Nothing here relied on
// HTTP caching to begin with, so this changes no observable behavior.
app.use("/api", (req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
});

app.use("/api", generalGetLimiter, generalPutLimiter, generalPostLimiter, routes);

app.use(notFound);
app.use(errorHandler);
