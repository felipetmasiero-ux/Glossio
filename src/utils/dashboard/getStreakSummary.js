import { getStreak } from "../study/history/stats/getStreak";
import { adaptEventsToHistory } from "./adaptEventsToHistory";
import { ACTIVITY_EVENT_TYPES } from "../../constants/dashboard";

function getDayTimestamp(timestamp) {
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}

function getDaysStudiedThisMonth(activityRecords) {

    const now = new Date();

    const days = new Set(
        activityRecords
            .filter(record => {
                const date = new Date(record.reviewedAt);
                return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
            })
            .map(record => getDayTimestamp(record.reviewedAt))
    );

    return days.size;

}

export function getStreakSummary({ events = [] } = {}) {

    const activityRecords = adaptEventsToHistory(events, ACTIVITY_EVENT_TYPES);

    const streak = getStreak(activityRecords);

    return {
        current: streak.current,
        longest: streak.longest,
        daysThisMonth: getDaysStudiedThisMonth(activityRecords)
    };

}
