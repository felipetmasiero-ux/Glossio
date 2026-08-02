import { computeRangeMetrics } from "./computeDayMetrics";
import { getStartOfWeek } from "./getStartOfWeek";
import { buildGoalProgress } from "./buildGoalProgress";

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export function getWeeklyLessonGoal({ events = [], flashcards = [], language, goals }) {

    const startOfWeek = getStartOfWeek(Date.now());

    const metrics = computeRangeMetrics({
        events,
        flashcards,
        language,
        startTimestamp: startOfWeek,
        endTimestamp: startOfWeek + WEEK_IN_MS
    });

    return buildGoalProgress(metrics.lessons, goals?.weeklyLessons ?? null);

}
