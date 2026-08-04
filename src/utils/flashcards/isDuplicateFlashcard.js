export function isDuplicateFlashcard(flashcards, { word, language, excludeId = null }) {
    const normalizedWord = word?.trim().toLowerCase();

    if (!normalizedWord) return false;

    return flashcards.some(card =>
        card.id !== excludeId &&
        card.word?.toLowerCase() === normalizedWord &&
        card.language === language
    );
}
