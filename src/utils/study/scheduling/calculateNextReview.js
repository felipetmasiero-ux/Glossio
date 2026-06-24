export function calculateNextReview(interval) {
    const now = Date.now();

    const ms = interval * 24 * 60 * 60 * 1000;

    return now + ms;
}