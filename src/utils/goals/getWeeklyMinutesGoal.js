import { computeRangeMetrics } from "./computeDayMetrics";
import { getStartOfWeek } from "./getStartOfWeek";
import { buildGoalProgress } from "./buildGoalProgress";

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export function getWeeklyMinutesGoal({ events = [], flashcards = [], language, goals }) {

    const startOfWeek = getStartOfWeek(Date.now());

    const metrics = computeRangeMetrics({
        events,
        flashcards,
        language,
        startTimestamp: startOfWeek,
        endTimestamp: startOfWeek + WEEK_IN_MS
    });

    const totalMinutes = Math.round(metrics.lessonMinutes + metrics.videoMinutes);

    return buildGoalProgress(totalMinutes, goals?.weeklyMinutes ?? null);

}
