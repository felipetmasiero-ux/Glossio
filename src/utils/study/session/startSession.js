import { getDueCards } from "./getDueCards";
export function startSession(
    flashcards,
    language
) {

    const cards =
        getDueCards(flashcards, language);

    return {
        cards,
        total: cards.length
    };

}