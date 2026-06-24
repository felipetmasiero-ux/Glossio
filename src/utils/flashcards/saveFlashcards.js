const STORAGE_KEY = "flashcards";

export function saveFlashcards(flashcards) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(flashcards)
    );
}