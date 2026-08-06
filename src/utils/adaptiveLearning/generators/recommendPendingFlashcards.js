import { RECOMMENDATION_TYPES } from "../../../constants/adaptiveLearning";

// Cards added but never actually reviewed once (createFlashcard.js sets
// lastReviewedAt: null until the first answerFlashcard() call) - distinct
// from recommendOverdueFlashcards, which only looks at cards that *have*
// been reviewed before and fell behind schedule.
export function recommendPendingFlashcards({ flashcards, language }) {

    const pending = flashcards.filter(
        card => card.language === language && card.lastReviewedAt === null
    );

    if (pending.length === 0) {
        return [];
    }

    return [{
        id: `pending-flashcards-${language}`,
        type: RECOMMENDATION_TYPES.STUDY_FLASHCARDS,
        priority: 4,
        title: pending.length === 1
            ? "Estudar 1 flashcard novo"
            : `Estudar ${pending.length} flashcards novos`,
        reason: pending.length === 1
            ? "Você adicionou essa palavra mas ainda não começou a revisar."
            : "Você adicionou essas palavras mas ainda não começou a revisar.",
        href: "/flashcards",
        icon: "cards"
    }];

}
