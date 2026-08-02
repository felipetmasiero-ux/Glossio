const DAY_IN_MS = 24 * 60 * 60 * 1000;

function getDayTimestamp(timestamp) {
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}

export function getUpcomingReviews({ flashcards = [], language }) {

    const cards = flashcards.filter(card => card.language === language);

    const today = getDayTimestamp(Date.now());
    const endOfToday = today + DAY_IN_MS;
    const endOfTomorrow = today + 2 * DAY_IN_MS;
    const endOfWeek = today + 7 * DAY_IN_MS;

    let dueToday = 0;
    let dueTomorrow = 0;
    let dueNext7Days = 0;

    cards.forEach(card => {

        const nextReview = card.nextReview ?? 0;

        if (nextReview < endOfToday) dueToday++;
        else if (nextReview < endOfTomorrow) dueTomorrow++;

        if (nextReview < endOfWeek) dueNext7Days++;

    });

    return {
        today: dueToday,
        tomorrow: dueTomorrow,
        next7Days: dueNext7Days
    };

}
