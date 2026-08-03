import { defineConfig, devices } from "@playwright/test";

// Set to a deployed URL (e.g. https://glossio.vercel.app) to run the same
// suite against a real production/preview deployment instead of a local
// build - see docs/PRODUCTION_CHECKLIST.md. This talks to the *real* backend
// and its *real* database: auth.spec.js/security.spec.js create real,
// disposable accounts, and register/login are rate-limited in production
// (see backend/src/middlewares/rateLimiters.js) - fine for a one-time
// post-deploy smoke test, not something to run repeatedly against a live
// environment with real users.
const REMOTE_BASE_URL = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: [["html", { open: "never" }], ["list"]],

    use: {
        baseURL: REMOTE_BASE_URL ?? "http://localhost:5173",
        trace: "on-first-retry",
        screenshot: "only-on-failure"
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] }
        }
    ],

    // The app requires the real backend (Postgres + Express) for auth and
    // cloud sync, and a production build for the service worker (disabled
    // in dev mode) - so local runs always go through `vite preview`. Port
    // 5173 matches the backend's CORS_ORIGIN (see backend/.env) - using any
    // other port would have every API request rejected by CORS. None of
    // this applies when PLAYWRIGHT_BASE_URL points at a real deployment -
    // there's nothing local to spin up in that case.
    webServer: REMOTE_BASE_URL ? undefined : [
        {
            command: "npm run build && npm run preview -- --port 5173 --strictPort",
            url: "http://localhost:5173",
            reuseExistingServer: !process.env.CI,
            timeout: 120_000
        },
        {
            command: "npm --prefix backend run start",
            url: "http://localhost:4000/api/auth/me",
            reuseExistingServer: !process.env.CI,
            timeout: 60_000
        }
    ]
});
