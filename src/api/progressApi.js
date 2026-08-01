import { request } from "./httpClient";

export function getProgress() {
    return request("/progress");
}

// `token` can be passed explicitly for a flush right as the user logs out,
// when the stored token may already have been cleared from localStorage.
export function saveProgress(progress, token) {
    return request("/progress", {
        method: "PUT",
        body: JSON.stringify(progress),
        token
    });
}
