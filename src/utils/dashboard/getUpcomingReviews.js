import { isDueToday, isDueWithinDays } from "../flashcards/dueDate";

export function getUpcomingReviews({ flashcards = [], language }) {

    const cards = flashcards.filter(card => card.language === language);

    const now = Date.now();

    let dueToday = 0;
    let dueTomorrow = 0;
    let dueNext7Days = 0;

    cards.forEach(card => {

        const nextReview = card.nextReview ?? 0;

        if (isDueToday(nextReview, now)) dueToday++;
        else if (isDueWithinDays(nextReview, 1, now)) dueTomorrow++;

        if (isDueWithinDays(nextReview, 6, now)) dueNext7Days++;

    });

    return {
        today: dueToday,
        tomorrow: dueTomorrow,
        next7Days: dueNext7Days
    };

}
