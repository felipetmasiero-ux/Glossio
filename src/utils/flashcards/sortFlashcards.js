export const SORT_OPTIONS = {
    ALPHA: "alpha",
    RECENT: "recent",
    NEXT_REVIEW: "nextReview"
};

export const SORT_LABELS = {
    [SORT_OPTIONS.ALPHA]: "Alfabética (A-Z)",
    [SORT_OPTIONS.RECENT]: "Mais recentes",
    [SORT_OPTIONS.NEXT_REVIEW]: "Próxima revisão"
};

export function sortFlashcards(cards, sortBy = SORT_OPTIONS.ALPHA) {

    const sorted = [...cards];

    switch (sortBy) {

        case SORT_OPTIONS.RECENT:
            return sorted.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));

        case SORT_OPTIONS.NEXT_REVIEW:
            return sorted.sort((a, b) => (a.nextReview ?? 0) - (b.nextReview ?? 0));

        case SORT_OPTIONS.ALPHA:
        default:
            return sorted.sort((a, b) => a.word.localeCompare(b.word));

    }

}
