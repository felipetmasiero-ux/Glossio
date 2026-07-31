import { getStudyStats } from "../study/stats/getStudyStats";
import { EVENT_TYPES } from "../../constants/events";

export function getReviewStatistics({ flashcards = [], events = [], language }) {

    const { total, due, learned, newCards } = getStudyStats(flashcards, language);

    const totalReviews = events.filter(
        event => event.type === EVENT_TYPES.FLASHCARD_REVIEWED
    ).length;

    return {
        total,
        due,
        learned,
        newCards,
        totalReviews
    };

}
