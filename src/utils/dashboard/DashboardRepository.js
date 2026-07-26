import { getStudyStats } from "../study/stats/getStudyStats";
import { getStreak, getTodayReviews, getDailyGoalProgress } from "../study/history";

import { DAILY_GOAL_TARGET, ACTIVITY_EVENT_TYPES } from "../../constants/dashboard";

import { adaptEventsToHistory } from "./adaptEventsToHistory";
import { getGreeting } from "./getGreeting";
import { getContinueLearning } from "./getContinueLearning";
import { getWordsLearnedCount } from "./getWordsLearnedCount";
import { getStudyMinutes } from "./getStudyMinutes";
import { getRecentAchievement } from "./getRecentAchievement";
import { getCoursesOverview } from "./getCoursesOverview";
import { ModuleRepository } from "../courses/ModuleRepository";

function getDailyGoal({ events = [] }) {

    const activityRecords = adaptEventsToHistory(events, ACTIVITY_EVENT_TYPES);

    const completedToday = getTodayReviews(activityRecords);

    return getDailyGoalProgress(completedToday, DAILY_GOAL_TARGET);

}

function getReviewSummary({ flashcards = [], language }) {

    const { due, total } = getStudyStats(flashcards, language);

    return {
        due,
        total,
        hasReviews: due > 0
    };

}

function getQuickStats({ language, completedLessons = [], events = [] }) {

    const languageLessonIds = new Set(
        ModuleRepository.getAllLessonsInOrder(language).map(lesson => lesson.id)
    );

    const completedLessonsInLanguage = completedLessons.filter(
        lessonId => languageLessonIds.has(lessonId)
    ).length;

    const activityRecords = adaptEventsToHistory(events, ACTIVITY_EVENT_TYPES);

    const streak = getStreak(activityRecords);

    return {
        wordsLearned: getWordsLearnedCount({ language, events }),
        completedLessons: completedLessonsInLanguage,
        currentStreak: streak.current,
        studyMinutes: getStudyMinutes({ language, completedLessons })
    };

}

function getContinueLastActivity({ lastActivity }) {

    if (!lastActivity) return null;

    if (lastActivity.type === "exercise") {
        return {
            type: "exercise",
            label: "Continuar exercícios",
            remaining: lastActivity.remaining,
            href: `/exercises/${lastActivity.lessonId}`
        };
    }

    if (lastActivity.type === "flashcards") {
        return {
            type: "flashcards",
            label: "Continuar revisão de flashcards",
            remaining: lastActivity.remaining,
            href: "/flashcards"
        };
    }

    return null;

}

export const DashboardRepository = {

    getGreeting,

    getContinueLearning,

    getDailyGoal,

    getReviewSummary,

    getQuickStats,

    getCoursesOverview,

    getRecentAchievement,

    getContinueLastActivity,

    getDashboardData({ language, completedLessons = [], flashcards = [], events = [], lastActivity = null }) {

        return {
            greeting: getGreeting(),
            userName: null,
            language,

            continueLearning: getContinueLearning({ language, completedLessons }),

            dailyGoal: getDailyGoal({ events }),

            reviews: getReviewSummary({ flashcards, language }),

            courses: getCoursesOverview({ completedLessons }),

            quickStats: getQuickStats({ language, completedLessons, events }),

            recentAchievement: getRecentAchievement({ language, events }),

            lastActivity: getContinueLastActivity({ lastActivity })
        };

    }

};
