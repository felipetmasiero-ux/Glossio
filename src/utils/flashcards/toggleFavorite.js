export function toggleFavorite(card) {
    return {
        ...card,
        favorite: !card.favorite,
        updatedAt: Date.now()
    };
}