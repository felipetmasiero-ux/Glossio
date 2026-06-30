export function createStudyRecord({
    cardId,
    quality
}) {
    return {
        id: crypto.randomUUID(),
        cardId,
        quality,
        reviewedAt: Date.now()
    };
}