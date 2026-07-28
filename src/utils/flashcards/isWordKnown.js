import { normalizeWord } from "../../repositories/normalizeWord";

export function isWordKnown(flashcards, word, language) {

    const normalized = normalizeWord(word);

    return flashcards.some(card =>
        card.language === language &&
        normalizeWord(card.word) === normalized
    );

}
