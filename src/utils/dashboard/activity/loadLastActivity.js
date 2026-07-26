const STORAGE_KEY = "lastActivity";

export function loadLastActivity() {
    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return null;
    }

    try {
        return JSON.parse(saved);
    } catch {
        return null;
    }
}
