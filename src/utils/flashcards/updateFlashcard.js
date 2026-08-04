export function updateFlashcard(card, updates) {
    return {
        ...card,
        ...updates,
        updatedAt: Date.now()
    };
}
