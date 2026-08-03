import { readFileSync } from "node:fs";
import { env } from "./env.js";

// Read once at startup rather than per-request - the version never changes
// while the process is running.
const packageJsonUrl = new URL("../../package.json", import.meta.url);
const { version } = JSON.parse(readFileSync(packageJsonUrl, "utf-8"));

// The single source the health/ready/metrics endpoints (and anything else
// that needs "what am I, where am I running") read from - built on top of
// env.js, not a second place that reads process.env.
export function getAppInfo() {
    return {
        version,
        environment: env.nodeEnv,
        port: env.port,
        uptime: process.uptime()
    };
}
