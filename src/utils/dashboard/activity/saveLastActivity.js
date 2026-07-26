const STORAGE_KEY = "lastActivity";

export function saveLastActivity(activity) {
    if (!activity) {
        localStorage.removeItem(STORAGE_KEY);
        return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(activity));
}
