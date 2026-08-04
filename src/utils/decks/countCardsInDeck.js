export function countCardsInDeck(flashcards, deckId) {
    return flashcards.filter(card => card.deckId === deckId).length;
}
