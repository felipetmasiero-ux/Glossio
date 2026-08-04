import { normalizeDecks } from "./normalizeDecks";

const STORAGE_KEY = "decks";

export function loadDecks() {
    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return [];
    }

    try {
        const decks = JSON.parse(saved);

        return normalizeDecks(decks);
    } catch {
        return [];
    }
}
