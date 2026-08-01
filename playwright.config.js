import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: [["html", { open: "never" }], ["list"]],

    use: {
        baseURL: "http://localhost:5173",
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
    // in dev mode) - so tests always run against `vite preview`. Port 5173
    // matches the backend's CORS_ORIGIN (see backend/.env) - using any other
    // port would have every API request rejected by CORS.
    webServer: [
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
