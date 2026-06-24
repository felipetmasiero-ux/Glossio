import { normalizeFlashcards } from "./normalizeFlashcards";

const STORAGE_KEY = "flashcards";

export function loadFlashcards() {
    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return [];
    }

    try {
        const flashcards = JSON.parse(saved);

        return normalizeFlashcards(flashcards);
    } catch {
        return [];
    }
}