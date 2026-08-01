import { request } from "./httpClient";

export function getFlashcards() {
    return request("/flashcards");
}

// `token` can be passed explicitly for a flush right as the user logs out,
// when the stored token may already have been cleared from localStorage.
export function saveFlashcards(flashcards, token) {
    return request("/flashcards", {
        method: "PUT",
        body: JSON.stringify(flashcards),
        token
    });
}
