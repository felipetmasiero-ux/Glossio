export function normalizeDeck(deck) {
    return {
        ...deck,

        createdAt: deck.createdAt ?? Date.now(),

        updatedAt: deck.updatedAt ?? Date.now()
    };
}
