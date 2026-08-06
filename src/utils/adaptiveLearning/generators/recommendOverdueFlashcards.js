import { RECOMMENDATION_TYPES, OVERDUE_REVIEW_DAYS } from "../../../constants/adaptiveLearning";

const DAY_MS = 24 * 60 * 60 * 1000;

// Distinct from ReviewsCard/UpcomingReviewsCard on the dashboard (which
// just count how many cards are due) - this looks for cards that have been
// sitting unreviewed for a while, to name the single most overdue one as
// the reason, not just a count.
export function recommendOverdueFlashcards({ flashcards, language }) {

    const now = Date.now();

    const overdue = flashcards
        .filter(card => card.language === language && card.lastReviewedAt !== null)
        .map(card => ({ card, overdueDays: Math.floor((now - card.nextReview) / DAY_MS) }))
        .filter(({ overdueDays }) => overdueDays >= OVERDUE_REVIEW_DAYS)
        .sort((a, b) => b.overdueDays - a.overdueDays);

    if (overdue.length === 0) {
        return [];
    }

    const [mostOverdue] = overdue;

    return [{
        id: `overdue-flashcards-${language}`,
        type: RECOMMENDATION_TYPES.STUDY_FLASHCARDS,
        priority: mostOverdue.overdueDays >= 7 ? 1 : 2,
        title: overdue.length === 1
            ? "Revisar 1 flashcard atrasado"
            : `Revisar ${overdue.length} flashcards atrasados`,
        reason: `Você não revisa "${mostOverdue.card.word}" há ${mostOverdue.overdueDays} dias.`,
        href: "/flashcards",
        icon: "clock"
    }];

}
