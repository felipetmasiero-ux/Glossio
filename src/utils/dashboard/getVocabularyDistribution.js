import { DictionaryRepository } from "../../repositories/DictionaryRepository";

export function getVocabularyDistribution({ flashcards = [], language }) {

    const dictionary = DictionaryRepository.getAll(language);

    const totalsByLevel = new Map();

    dictionary.forEach(entry => {
        totalsByLevel.set(entry.level, (totalsByLevel.get(entry.level) ?? 0) + 1);
    });

    const cards = flashcards.filter(card => card.language === language);

    const knownByLevel = new Map();

    cards.forEach(card => {

        const entry = DictionaryRepository.getEntry(language, card.word);

        if (!entry) return;

        knownByLevel.set(entry.level, (knownByLevel.get(entry.level) ?? 0) + 1);

    });

    return [...totalsByLevel.keys()]
        .sort((a, b) => a.localeCompare(b))
        .map(level => {

            const total = totalsByLevel.get(level);
            const known = Math.min(knownByLevel.get(level) ?? 0, total);

            return {
                level,
                known,
                total,
                percentage: total > 0 ? Math.round((known / total) * 100) : 0
            };

        });

}
