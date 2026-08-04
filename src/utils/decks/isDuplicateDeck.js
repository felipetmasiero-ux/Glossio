export function isDuplicateDeck(decks, { name, language, excludeId = null }) {
    const normalizedName = name?.trim().toLowerCase();

    if (!normalizedName) return false;

    return decks.some(deck =>
        deck.id !== excludeId &&
        deck.name?.trim().toLowerCase() === normalizedName &&
        deck.language === language
    );
}
