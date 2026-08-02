import { computeDayMetrics, getDayTimestamp } from "./computeDayMetrics";
import { buildGoalProgress } from "./buildGoalProgress";

export function getDailyLessonGoal({ events = [], flashcards = [], language, goals }) {

    const metrics = computeDayMetrics({ events, flashcards, language, dayTimestamp: getDayTimestamp(Date.now()) });

    return buildGoalProgress(metrics.lessons, goals?.dailyLessons ?? null);

}
