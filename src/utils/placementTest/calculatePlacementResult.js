// Fully deterministic: same questions + same answers always produce the same
// result. No randomness, no adaptive difficulty, no AI - just a pass
// threshold per level, climbed from the lowest level upward.
const PASS_THRESHOLD = 0.7;

export function calculatePlacementResult({ questions, answers, availableLevels }) {

    const scoresByLevel = {};

    for (const level of availableLevels) {

        const levelQuestions = questions.filter(question => question.level === level);
        const correct = levelQuestions.filter(question => answers[question.id] === question.correctIndex).length;
        const total = levelQuestions.length;

        scoresByLevel[level] = {
            correct,
            total,
            percentage: total === 0 ? 0 : correct / total
        };

    }

    let recommendedLevel = availableLevels[0] ?? null;
    let passedEveryLevelSoFar = true;

    for (const level of availableLevels) {

        const score = scoresByLevel[level];
        const passed = score.total > 0 && score.percentage >= PASS_THRESHOLD;

        if (passed) {
            recommendedLevel = level;
        } else {
            passedEveryLevelSoFar = false;
            break;
        }

    }

    const isBeyondAvailableLevels = passedEveryLevelSoFar
        && availableLevels.length > 0
        && recommendedLevel === availableLevels[availableLevels.length - 1];

    return { recommendedLevel, scoresByLevel, isBeyondAvailableLevels };

}
