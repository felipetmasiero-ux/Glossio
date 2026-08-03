// All in-memory, on purpose - no Prometheus/StatsD/external collector this
// sprint. State resets on restart, which is fine: these are "how's this
// process doing right now" numbers, not a durable time series.
const state = {
    total: 0,
    byStatusClass: { "1xx": 0, "2xx": 0, "3xx": 0, "4xx": 0, "5xx": 0 },
    totalDurationMs: 0
};

export function recordRequest(status, durationMs) {
    state.total += 1;
    state.totalDurationMs += durationMs;

    const statusClass = `${Math.floor(status / 100)}xx`;

    if (state.byStatusClass[statusClass] === undefined) {
        state.byStatusClass[statusClass] = 0;
    }

    state.byStatusClass[statusClass] += 1;
}

export function getMetrics() {
    return {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        requests: {
            total: state.total,
            ...state.byStatusClass,
            averageResponseTimeMs: state.total > 0
                ? Math.round((state.totalDurationMs / state.total) * 100) / 100
                : 0
        }
    };
}

// Test-only: metrics are process-lifetime in-memory state, so tests that
// want to assert on exact counts need a clean slate between runs.
export function resetMetrics() {
    state.total = 0;
    state.totalDurationMs = 0;
    for (const key of Object.keys(state.byStatusClass)) {
        state.byStatusClass[key] = 0;
    }
}
