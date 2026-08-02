import { ACHIEVEMENT_DEFINITIONS } from "./definitions";
import { getStreak } from "../study/history/stats/getStreak";
import { adaptEventsToHistory } from "../dashboard/adaptEventsToHistory";
import { ACTIVITY_EVENT_TYPES } from "../../constants/dashboard";
import {
    getLessonsCompleted,
    getVideosCompleted,
    getTotalWordsLearned,
    getReviewStatistics,
    getFavoriteWordsCount
} from "../statistics";
import { getGoalAchievementMetrics } from "../goals/getGoalAchievementMetrics";
import { GoalsStorage } from "../goals/goalsStorage";

// Nothing here is persisted - every achievement's progress is recalculated
// from the same data the rest of the app already reads (localStorage-backed
// context, via the caller), fresh on every call.
export function getAchievements({ language, completedLessons = [], flashcards = [], events = [] }) {

    const activityRecords = adaptEventsToHistory(events, ACTIVITY_EVENT_TYPES);
    const wordsCount = getTotalWordsLearned({ flashcards, language });

    const goals = GoalsStorage.getGoals();
    const goalMetrics = getGoalAchievementMetrics({ events, flashcards, language, goals });

    const metrics = {
        lessonsCompleted: getLessonsCompleted({ completedLessons, language }),
        videosCompleted: getVideosCompleted({ language }),
        flashcardsCount: wordsCount,
        vocabularyCount: wordsCount,
        totalReviews: getReviewStatistics({ flashcards, events, language }).totalReviews,
        currentStreak: getStreak(activityRecords).current,
        favoritesCount: getFavoriteWordsCount({ flashcards, language }),
        goalsCompletedCount: goalMetrics.goalsCompletedCount,
        hasPerfectWeek: goalMetrics.hasPerfectWeek,
        hasPerfectMonth: goalMetrics.hasPerfectMonth
    };

    return ACHIEVEMENT_DEFINITIONS.map(definition => {

        const progress = metrics[definition.metric] ?? 0;

        return {
            ...definition,
            progress: Math.min(progress, definition.target),
            completed: progress >= definition.target
        };

    });

}
