import { request } from "./httpClient";

export function getVideoProgress() {
    return request("/video-progress");
}

// `token` can be passed explicitly for a flush right as the user logs out,
// when the stored token may already have been cleared from localStorage.
export function saveVideoProgress(entries, token) {
    return request("/video-progress", {
        method: "PUT",
        body: JSON.stringify(entries),
        token
    });
}
