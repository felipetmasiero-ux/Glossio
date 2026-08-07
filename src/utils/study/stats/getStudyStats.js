import { isDueNow } from "../../flashcards/dueDate";

export function getStudyStats(flashcards, language) {

    const cards = flashcards.filter(
        card => card.language === language
    );

    const now = Date.now();

    const due = cards.filter(card => isDueNow(card.nextReview, now)).length;

    const learned = cards.filter(card =>
        card.repetitions > 0
    ).length;

    const newCards = cards.filter(card =>
        card.repetitions === 0
    ).length;

    return {
        total: cards.length,
        due,
        learned,
        newCards
    };

}
