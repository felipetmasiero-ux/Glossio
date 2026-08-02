import { getStudyStats } from "../study/stats/getStudyStats";
import { getStreak, getTodayReviews, getDailyGoalProgress } from "../study/history";

import { DAILY_GOAL_TARGET, ACTIVITY_EVENT_TYPES } from "../../constants/dashboard";
import { EVENT_TYPES } from "../../constants/events";

import { adaptEventsToHistory } from "./adaptEventsToHistory";
import { getGreeting } from "./getGreeting";
import { getContinueLearning } from "./getContinueLearning";
import { getWordsLearnedCount } from "./getWordsLearnedCount";
import { getStudyMinutes } from "./getStudyMinutes";
import { getRecentAchievement } from "./getRecentAchievement";
import { getCoursesOverview } from "./getCoursesOverview";
import { getNextStep } from "./getNextStep";
import { ModuleRepository } from "../courses/ModuleRepository";
import { getNextLevel } from "../courses/getNextLevel";
import { LessonRepository } from "../lessons/LessonRepository";
import { VideoRepository } from "../../repositories/VideoRepository";
import { VideoProgressRepository } from "../../repositories/VideoProgressRepository";
import { getRelatedContent } from "../recommendations";
import { getHeatmap } from "./getHeatmap";
import { getStreakSummary } from "./getStreakSummary";
import { getUpcomingReviews } from "./getUpcomingReviews";
import { getRecentActivity } from "./getRecentActivity";
import { getVocabularyDistribution } from "./getVocabularyDistribution";
import { getWeeklyActivity } from "./getWeeklyActivity";

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

function getRelatedContentForDashboard({ language, events = [] }) {

    const lessonCompletedEvents = events
        .filter(event => event.type === EVENT_TYPES.LESSON_COMPLETED)
        .slice()
        .sort((a, b) => b.timestamp - a.timestamp);

    for (const event of lessonCompletedEvents) {

        const lesson = LessonRepository.getById(language, event.payload.lessonId);

        if (!lesson) continue;

        const watchedVideoIds = Object.values(
            VideoProgressRepository.getProgress(lesson.language)
        )
            .filter(entry => entry.completed)
            .map(entry => entry.videoId);

        const related = getRelatedContent({
            source: lesson,
            candidates: VideoRepository.getAll(lesson.language),
            language: lesson.language,
            completedIds: watchedVideoIds
        });

        if (related.length > 0) {
            return related;
        }

    }

    return [];

}

function getNextLevelInfo({ language }) {

    const modules = ModuleRepository.getAll(language);

    const lastModule = modules.at(-1);

    if (!lastModule) return null;

    const nextLevelValue = getNextLevel(lastModule.level);

    if (!nextLevelValue) return null;

    return {
        level: nextLevelValue,
        available: modules.some(module => module.level === nextLevelValue)
    };

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

    getNextStep,

    getHeatmap,

    getStreakSummary,

    getUpcomingReviews,

    getRecentActivity,

    getVocabularyDistribution,

    getWeeklyActivity,

    getDashboardData({ language, completedLessons = [], flashcards = [], events = [], lastActivity = null }) {

        const continueLearning = getContinueLearning({ language, completedLessons });

        const reviews = getReviewSummary({ flashcards, language });

        const resolvedLastActivity = getContinueLastActivity({ lastActivity });

        const relatedContent = getRelatedContentForDashboard({ language, events });

        const nextLevel = getNextLevelInfo({ language });

        return {
            greeting: getGreeting(),
            userName: null,
            language,

            continueLearning,

            dailyGoal: getDailyGoal({ events }),

            reviews,

            courses: getCoursesOverview({ completedLessons }),

            quickStats: getQuickStats({ language, completedLessons, events }),

            recentAchievement: getRecentAchievement({ language, events }),

            lastActivity: resolvedLastActivity,

            heatmap: getHeatmap({ events }),

            streakSummary: getStreakSummary({ events }),

            upcomingReviews: getUpcomingReviews({ flashcards, language }),

            recentActivity: getRecentActivity({ language, events, flashcards }),

            vocabularyDistribution: getVocabularyDistribution({ flashcards, language }),

            weeklyActivity: getWeeklyActivity({ events, flashcards, language }),

            nextStep: getNextStep({
                reviews,
                lastActivity: resolvedLastActivity,
                continueLearning,
                relatedContent,
                nextLevel
            })
        };

    }

};
