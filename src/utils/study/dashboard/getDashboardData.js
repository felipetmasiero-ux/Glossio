import { getStudyStats } from "../stats/getStudyStats";

import {
    getStreak,
    getTodayReviews,
    getDailyGoalProgress
} from "../history";

export function getDashboardData({
    flashcards,
    language,
    studyHistory,
    dailyGoal = 10
}) {

    const studyStats = getStudyStats(
        flashcards,
        language
    );

    const streak = getStreak(
        studyHistory
    );

    const todayReviews = getTodayReviews(
        studyHistory
    );

    const goal = getDailyGoalProgress(
        todayReviews,
        dailyGoal
    );

    return {

        ...studyStats,

        streak,

        dailyGoal: goal

    };

}