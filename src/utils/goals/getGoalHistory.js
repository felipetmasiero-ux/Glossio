import { computeDayMetrics, getDayTimestamp, buildRangeLookups } from "./computeDayMetrics";
import { isDayGoalMet } from "./isDayGoalMet";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" });

function formatLabel(dayTimestamp, today) {

    if (dayTimestamp === today) return "Hoje";
    if (dayTimestamp === today - DAY_IN_MS) return "Ontem";

    return dateFormatter.format(new Date(dayTimestamp));

}

// Oldest first, so callers can render or reduce left-to-right. `days = 7`
// covers the "last 7 days" history strip; a larger window (30, 365) is
// reused as-is for the Statistics completion-rate and Achievements metrics
// below, so the day-by-day definition of "met" only lives here.
export function getGoalHistory({ events = [], flashcards = [], language, goals, days = 7 } = {}) {

    const today = getDayTimestamp(Date.now());

    // The lookups only depend on flashcards/language, never on the day
    // itself - build them once instead of once per day in the loop below.
    // Same for bucketing events by day: without this, computeDayMetrics
    // used to re-scan the *entire* events array for every single day in
    // the window (O(days * events) - at the 365-day achievements window and
    // thousands of events, that's the single most expensive calculation in
    // the goals/achievements code path).
    const lookups = buildRangeLookups({ flashcards, language });

    const eventsByDay = new Map();
    events.forEach(event => {
        const day = getDayTimestamp(event.timestamp);
        if (!eventsByDay.has(day)) eventsByDay.set(day, []);
        eventsByDay.get(day).push(event);
    });

    const history = [];

    for (let i = days - 1; i >= 0; i--) {

        const dayTimestamp = today - i * DAY_IN_MS;
        const dayEvents = eventsByDay.get(dayTimestamp) ?? [];

        const metrics = computeDayMetrics({ events: dayEvents, flashcards, language, dayTimestamp, lookups });

        history.push({
            date: new Date(dayTimestamp).toISOString().slice(0, 10),
            timestamp: dayTimestamp,
            label: formatLabel(dayTimestamp, today),
            metrics,
            completed: isDayGoalMet(metrics, goals)
        });

    }

    return history;

}
