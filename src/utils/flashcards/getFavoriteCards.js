export function getFavoriteCards(cards) {
    return cards.filter(card => card.favorite);
}