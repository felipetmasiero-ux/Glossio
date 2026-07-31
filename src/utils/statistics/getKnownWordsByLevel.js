import { ModuleRepository } from "../courses/ModuleRepository";

const UNKNOWN_LEVEL = "unknown";

export function getKnownWordsByLevel({ flashcards = [], language }) {

    const cards = flashcards.filter(card => card.language === language);

    const countsByLevel = new Map();

    cards.forEach(card => {

        const module = card.lessonId
            ? ModuleRepository.getByLesson(language, card.lessonId)
            : null;

        const level = module?.level ?? UNKNOWN_LEVEL;

        countsByLevel.set(level, (countsByLevel.get(level) ?? 0) + 1);

    });

    const levels = [...countsByLevel.keys()]
        .filter(level => level !== UNKNOWN_LEVEL)
        .sort((a, b) => a.localeCompare(b));

    if (countsByLevel.has(UNKNOWN_LEVEL)) {
        levels.push(UNKNOWN_LEVEL);
    }

    return levels.map(level => ({ level, count: countsByLevel.get(level) }));

}
