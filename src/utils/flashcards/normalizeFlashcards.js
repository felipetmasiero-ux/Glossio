import { normalizeFlashcard } from "./normalizeFlashcard";

export function normalizeFlashcards(cards) {
    return cards.map(normalizeFlashcard);
}