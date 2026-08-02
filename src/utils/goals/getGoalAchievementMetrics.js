import { getGoalHistory } from "./getGoalHistory";

const HISTORY_WINDOW_DAYS = 365;

function hasConsecutiveRun(history, runLength) {

    let streak = 0;

    for (const day of history) {
        streak = day.completed ? streak + 1 : 0;
        if (streak >= runLength) return true;
    }

    return false;

}

// Feeds the "goalsCompletedCount"/"hasPerfectWeek"/"hasPerfectMonth"
// achievement metrics - recomputed fresh from events, same as every other
// achievement in the app (nothing about goal completion is persisted
// separately).
export function getGoalAchievementMetrics({ events = [], flashcards = [], language, goals }) {

    const history = getGoalHistory({ events, flashcards, language, goals, days: HISTORY_WINDOW_DAYS });

    return {
        goalsCompletedCount: history.filter(day => day.completed).length,
        hasPerfectWeek: hasConsecutiveRun(history, 7) ? 1 : 0,
        hasPerfectMonth: hasConsecutiveRun(history, 30) ? 1 : 0
    };

}
