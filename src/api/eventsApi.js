const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const TOKEN_KEY = "authToken";

async function request(path, { token: explicitToken, ...options } = {}) {
    const token = explicitToken || localStorage.getItem(TOKEN_KEY);

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        }
    });

    const data = await response.json().catch(() => ([]));

    if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
    }

    return data;
}

export function getEvents() {
    return request("/events");
}

// Append-only: `events` should be just the new events since the last sync,
// not the whole local log. `token` can be passed explicitly for a flush
// right as the user logs out, when the stored token may already have been
// cleared from localStorage.
export function postEvents(events, token) {
    return request("/events", {
        method: "POST",
        body: JSON.stringify(events),
        token
    });
}
