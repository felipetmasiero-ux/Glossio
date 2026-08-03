import "dotenv/config";

// PORT deliberately isn't in this list: unlike JWT_SECRET (a secret with no
// safe default) and DATABASE_URL (nothing works without it), PORT already
// has a conventional, harmless default (4000) - requiring it adds no real
// security value and would just be one more way local/dev setup can break.
const required = ["DATABASE_URL", "JWT_SECRET"];

for (const key of required) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

// CORS_ORIGIN accepts a comma-separated list so "localhost + production
// domain" (per the security-hardening sprint) can both be allowed at once,
// e.g. CORS_ORIGIN="http://localhost:5173,https://app.glossio.com".
const corsOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map(origin => origin.trim())
    .filter(Boolean);

const nodeEnv = process.env.NODE_ENV || "development";

export const env = {
    port: Number(process.env.PORT) || 4000,
    nodeEnv,
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    corsOrigins,
    // Quieter by default in production, verbose in dev/test - overridable
    // (e.g. to silence logs entirely in a test run) without touching code.
    logLevel: process.env.LOG_LEVEL || (nodeEnv === "production" ? "info" : "debug")
};
