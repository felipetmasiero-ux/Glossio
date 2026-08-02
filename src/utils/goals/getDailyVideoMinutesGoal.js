import { computeDayMetrics, getDayTimestamp } from "./computeDayMetrics";
import { buildGoalProgress } from "./buildGoalProgress";

export function getDailyVideoMinutesGoal({ events = [], flashcards = [], language, goals }) {

    const metrics = computeDayMetrics({ events, flashcards, language, dayTimestamp: getDayTimestamp(Date.now()) });

    return buildGoalProgress(Math.round(metrics.videoMinutes), goals?.dailyVideoMinutes ?? null);

}
