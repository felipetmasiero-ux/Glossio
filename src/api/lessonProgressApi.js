import { request } from "./httpClient";

export function getLessonProgress() {
    return request("/lesson-progress");
}

// `token` can be passed explicitly for a flush right as the user logs out,
// when the stored token may already have been cleared from localStorage.
export function saveLessonProgress(lessonIds, token) {
    return request("/lesson-progress", {
        method: "PUT",
        body: JSON.stringify(lessonIds),
        token
    });
}
