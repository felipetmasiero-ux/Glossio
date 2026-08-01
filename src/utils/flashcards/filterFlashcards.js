export function filterFlashcards(cards, { search = "", favoritesOnly = false } = {}) {

    const query = search.trim().toLowerCase();

    return cards.filter(card => {

        const matchesQuery = !query
            || card.word.toLowerCase().includes(query)
            || card.translation.toLowerCase().includes(query);

        const matchesFavorite = !favoritesOnly || card.favorite;

        return matchesQuery && matchesFavorite;

    });

}
