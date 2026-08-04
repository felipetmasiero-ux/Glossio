import { NO_DECK_FILTER } from "../../constants/decks";

export function filterFlashcards(cards, { search = "", favoritesOnly = false, deckId = null } = {}) {

    const query = search.trim().toLowerCase();

    return cards.filter(card => {

        const matchesQuery = !query
            || card.word.toLowerCase().includes(query)
            || card.translation.toLowerCase().includes(query);

        const matchesFavorite = !favoritesOnly || card.favorite;

        const matchesDeck = !deckId
            || (deckId === NO_DECK_FILTER ? !card.deckId : card.deckId === deckId);

        return matchesQuery && matchesFavorite && matchesDeck;

    });

}
