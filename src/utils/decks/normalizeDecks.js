import { normalizeDeck } from "./normalizeDeck";

export function normalizeDecks(decks) {
    return decks
        .map(normalizeDeck)
        .filter(deck => deck.name?.trim());
}
