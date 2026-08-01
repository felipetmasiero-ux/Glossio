import { request } from "./httpClient";

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
