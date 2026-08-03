import { app } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/prisma.js";
import { logger } from "./utils/logger.js";
import { createLifecycle } from "./lifecycle.js";

const server = app.listen(env.port, () => {
    logger.info("server_started", { port: env.port, environment: env.nodeEnv });
});

const { shutdown, handleFatalError } = createLifecycle({ server, prisma, logger });

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("uncaughtException", error => handleFatalError("uncaught_exception", error));
process.on("unhandledRejection", reason => {
    handleFatalError("unhandled_rejection", reason instanceof Error ? reason : new Error(String(reason)));
});
