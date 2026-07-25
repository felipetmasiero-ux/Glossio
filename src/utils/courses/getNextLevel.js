const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

export function getNextLevel(level) {

    const index = CEFR_LEVELS.indexOf(level);

    if (index === -1 || index === CEFR_LEVELS.length - 1) {
        return null;
    }

    return CEFR_LEVELS[index + 1];

}
