import { getGoalHistory } from "./getGoalHistory";

function summarizeWindow(history) {

    const daysMet = history.filter(day => day.completed).length;
    const totalDays = history.length;

    return {
        daysMet,
        totalDays,
        rate: totalDays > 0 ? Math.round((daysMet / totalDays) * 100) : 0
    };

}

// "This week" is the volatile, recent number; "last 30 days" is the longer
// baseline - "average" is that same baseline's rate, surfaced as its own
// headline figure per the sprint's three-bullet Statistics requirement.
export function getGoalCompletionRate({ events = [], flashcards = [], language, goals }) {

    const thisWeek = summarizeWindow(getGoalHistory({ events, flashcards, language, goals, days: 7 }));
    const last30Days = summarizeWindow(getGoalHistory({ events, flashcards, language, goals, days: 30 }));

    return {
        thisWeek,
        last30Days,
        average: last30Days.rate
    };

}
