function getDayTimestamp(timestamp) {
    const date = new Date(timestamp);

    date.setHours(0, 0, 0, 0);

    return date.getTime();
}

export function getTodayReviews(history) {

    if (!Array.isArray(history)) {
        return {
            current: 0,
            longest: 0
        };
    }


    const today = getDayTimestamp(Date.now());

    return history.filter(record =>
        getDayTimestamp(record.reviewedAt) === today
    ).length;

}