// Everything server.js needs to shut down (or crash-recover) in a
// controlled way, factored out so it can be unit-tested with fake
// server/prisma/exit dependencies instead of actually terminating the test
// process or standing up a real HTTP listener + database connection.
export function createLifecycle({ server, prisma, logger, exit = process.exit, forceExitAfterMs = 10_000 }) {

    let shuttingDown = false;

    // SIGINT/SIGTERM: stop accepting new connections but let in-flight
    // requests finish (server.close's own behavior), then disconnect
    // Prisma and exit cleanly. A force-exit timer is the safety net for a
    // connection that never finishes (e.g. a client that never closes a
    // keep-alive socket) so shutdown can't hang forever.
    function shutdown(reason, { exitCode = 0 } = {}) {
        if (shuttingDown) return;
        shuttingDown = true;

        logger.info("shutdown_initiated", { reason });

        const forceTimer = setTimeout(() => {
            logger.error("shutdown_forced", { reason });
            exit(1);
        }, forceExitAfterMs);
        forceTimer.unref?.();

        server.close(closeErr => {
            if (closeErr) {
                logger.error("shutdown_server_close_error", { message: closeErr.message });
            }

            prisma.$disconnect()
                .catch(disconnectErr => {
                    logger.error("shutdown_disconnect_error", { message: disconnectErr.message });
                })
                .finally(() => {
                    clearTimeout(forceTimer);
                    logger.info("shutdown_complete", { reason });
                    exit(closeErr ? 1 : exitCode);
                });
        });
    }

    // uncaughtException/unhandledRejection: the process is in an unknown
    // state at this point, so always exit (code 1) - but still go through
    // the same close-server/disconnect-db sequence rather than a bare
    // process.exit(), so in-flight requests get the same chance to finish.
    function handleFatalError(kind, error) {
        logger.error(kind, {
            message: error?.message ?? String(error),
            stack: error?.stack
        });
        shutdown(kind, { exitCode: 1 });
    }

    return { shutdown, handleFatalError };
}
