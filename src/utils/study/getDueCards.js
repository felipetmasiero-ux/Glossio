export function getDueCards(
    flashcards,
    language,
    now = Date.now()
) {

    return flashcards.filter(card =>
        card.language === language &&
        card.nextReview <= now
    );

}