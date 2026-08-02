import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { routes } from "./routes/index.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import { generalGetLimiter, generalPutLimiter, generalPostLimiter } from "./middlewares/rateLimiters.js";
import { HttpError } from "./utils/HttpError.js";

export const app = express();

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

app.use("/api", generalGetLimiter, generalPutLimiter, generalPostLimiter, routes);

app.use(notFound);
app.use(errorHandler);
