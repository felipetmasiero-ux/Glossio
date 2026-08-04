const STORAGE_KEY = "decks";

export function saveDecks(decks) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(decks)
    );
}
