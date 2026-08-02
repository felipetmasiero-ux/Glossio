// Deterministic, rule-based - no AI, no adaptive weighting. Picks a single
// line to show, in a fixed priority order, from the already-computed daily
// and weekly progress shapes (see buildGoalProgress.js).
const DAILY_GOAL_ORDER = ["lessons", "reviews", "videoMinutes"];

const REMAINING_MESSAGE = {
    lessons: remaining => remaining === 1
        ? "Você só precisa de mais 1 lição hoje."
        : `Complete mais ${remaining} lições para bater a meta de hoje.`,
    reviews: remaining => remaining === 1
        ? "Complete mais 1 revisão para bater a meta de hoje."
        : `Complete mais ${remaining} revisões para bater a meta de hoje.`,
    videoMinutes: remaining => remaining === 1
        ? "Assista mais 1 minuto para terminar seu plano de estudo de hoje."
        : `Assista mais ${remaining} minutos para terminar seu plano de estudo de hoje.`
};

function isAheadOfWeeklySchedule(weekly) {

    const today = new Date();
    const dayOfWeek = (today.getDay() + 6) % 7 + 1; // Monday = 1 ... Sunday = 7
    const expectedFraction = dayOfWeek / 7;

    const fractions = [weekly.minutes, weekly.lessons]
        .filter(goal => goal.hasGoal)
        .map(goal => goal.percentage / 100);

    if (fractions.length === 0) return false;

    return fractions.every(fraction => fraction >= expectedFraction) && fractions.some(fraction => fraction > expectedFraction);

}

export function getGoalRecommendation({ daily, weekly }) {

    const dailyConfigured = DAILY_GOAL_ORDER.filter(key => daily[key].hasGoal);
    const weeklyConfigured = [weekly.minutes, weekly.lessons].filter(goal => goal.hasGoal);

    if (dailyConfigured.length === 0 && weeklyConfigured.length === 0) {
        return null;
    }

    const incomplete = dailyConfigured
        .filter(key => !daily[key].completed)
        .sort((a, b) => daily[a].remaining - daily[b].remaining);

    if (incomplete.length > 0) {
        const key = incomplete[0];
        return REMAINING_MESSAGE[key](daily[key].remaining);
    }

    // Every configured daily goal is done from here on.
    if (weeklyConfigured.length > 0) {

        const weeklyAllCompleted = weeklyConfigured.every(goal => goal.completed);

        if (weeklyAllCompleted) {
            return "Meta semanal concluída.";
        }

        if (isAheadOfWeeklySchedule(weekly)) {
            return "Você está adiantado no cronograma.";
        }

    }

    if (dailyConfigured.length > 0) {
        return "Metas de hoje concluídas.";
    }

    return null;

}
