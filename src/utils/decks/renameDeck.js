export function renameDeck(deck, name) {
    return {
        ...deck,
        name,
        updatedAt: Date.now()
    };
}
