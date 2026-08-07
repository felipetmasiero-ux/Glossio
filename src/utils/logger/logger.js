// Structured logging: every call produces one inspectable object instead
// of a loose string, so a message is always paired with its context and a
// timestamp - grep-able today in devtools, and a drop-in fit for a real log
// backend later (swap the console.* call for a fetch/beacon call, nothing
// about the call sites in the rest of the app needs to change).
// Deliberately has no dependency on errorTracking/ - captureException.js
// depends on this, never the other way around.
function log(level, consoleMethod, message, context) {

    consoleMethod({
        level,
        message,
        context,
        timestamp: Date.now()
    });

}

export const logger = {

    info(message, context = {}) {
        log("info", console.info, message, context);
    },

    warn(message, context = {}) {
        log("warn", console.warn, message, context);
    },

    error(message, context = {}) {
        log("error", console.error, message, context);
    }

};
