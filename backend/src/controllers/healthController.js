import { prisma } from "../config/prisma.js";
import { getAppInfo } from "../config/appInfo.js";
import { getMetrics } from "../utils/metrics.js";

// No DB, no dependency of any kind - if the process can respond at all,
// this responds. Orchestrators (Docker/Kubernetes) use this as the
// liveness check: "is the process alive", not "is it fully working".
export function health(req, res) {
    const info = getAppInfo();

    res.status(200).json({
        status: "ok",
        uptime: info.uptime,
        timestamp: new Date().toISOString(),
        version: info.version
    });
}

// The readiness check: can this instance actually serve traffic right now.
// A real (cheap) round trip to Postgres via Prisma - if that fails, this
// instance shouldn't be receiving requests yet (or anymore).
export async function ready(req, res) {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({ status: "ready" });
    } catch {
        res.status(503).json({ status: "not_ready" });
    }
}

export function metrics(req, res) {
    res.status(200).json(getMetrics());
}
