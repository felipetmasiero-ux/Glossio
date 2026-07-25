const STORAGE_KEY = "events";

export function saveEvents(events) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(events)
    );
}
