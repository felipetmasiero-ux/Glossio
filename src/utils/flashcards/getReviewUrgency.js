const DAY = 24 * 60 * 60 * 1000;

export function getReviewUrgency(nextReview, now = Date.now()) {
    const diff = nextReview - now;

    if (diff <= 0) return "danger";
    if (diff <= DAY) return "warning";

    return "neutral";
}
