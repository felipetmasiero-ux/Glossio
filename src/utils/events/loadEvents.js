const STORAGE_KEY = "events";

export function loadEvents() {
    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return [];
    }

    try {
        const events = JSON.parse(saved);

        return Array.isArray(events) ? events : [];
    } catch {
        return [];
    }
}
