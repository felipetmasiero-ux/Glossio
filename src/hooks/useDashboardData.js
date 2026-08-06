import { useMemo } from "react";

import { useLanguage } from "./useLanguage";
import { useLessonProgress } from "./useLessonProgress";
import { useFlashcards } from "./useFlashcards";
import { useEvents } from "./useEvents";
import { useLastActivity } from "./useLastActivity";
import { useStudyHistory } from "./useStudyHistory";

import { DashboardRepository } from "../utils/dashboard";
import { RecommendationEngine } from "../utils/adaptiveLearning";
import { PlacementTestStorage } from "../utils/placementTest/placementTestStorage";

// Previously a single useMemo wrapped the entire getDashboardData() call,
// keyed on every input at once - so e.g. switching the study language (which
// getHeatmap/getStreakSummary don't even read) recomputed *and* produced a
// brand-new array/object reference for the heatmap, weekly evolution,
// streak, etc., even though the events they're actually built from hadn't
// changed. That defeats React.memo on the cards that receive those fields
// as props (see components/home/*), which is exactly what section 6 of the
// performance sprint asks to fix. Each field below is memoized against only
// the inputs it actually reads, matching DashboardRepository.getDashboardData's
// own composition (see utils/dashboard/DashboardRepository.js) field for
// field - this doesn't change what's computed, only when a fresh reference
// gets handed out.
export function useDashboardData() {

    const { language } = useLanguage();

    const { completedLessons } = useLessonProgress();

    const { flashcards } = useFlashcards();

    const { events } = useEvents();

    const { lastActivity } = useLastActivity();

    const { studyHistory } = useStudyHistory();

    const greeting = useMemo(() => DashboardRepository.getGreeting(), []);

    const continueLearning = useMemo(
        () => DashboardRepository.getContinueLearning({ language, completedLessons }),
        [language, completedLessons]
    );

    const dailyGoal = useMemo(
        () => DashboardRepository.getDailyGoal({ events }),
        [events]
    );

    const reviews = useMemo(
        () => DashboardRepository.getReviewSummary({ flashcards, language }),
        [flashcards, language]
    );

    const courses = useMemo(
        () => DashboardRepository.getCoursesOverview({ completedLessons }),
        [completedLessons]
    );

    const quickStats = useMemo(
        () => DashboardRepository.getQuickStats({ language, completedLessons, events }),
        [language, completedLessons, events]
    );

    const recentAchievement = useMemo(
        () => DashboardRepository.getRecentAchievement({ language, events }),
        [language, events]
    );

    const resolvedLastActivity = useMemo(
        () => DashboardRepository.getContinueLastActivity({ lastActivity }),
        [lastActivity]
    );

    const heatmap = useMemo(
        () => DashboardRepository.getHeatmap({ events }),
        [events]
    );

    const streakSummary = useMemo(
        () => DashboardRepository.getStreakSummary({ events }),
        [events]
    );

    const upcomingReviews = useMemo(
        () => DashboardRepository.getUpcomingReviews({ flashcards, language }),
        [flashcards, language]
    );

    const recentActivity = useMemo(
        () => DashboardRepository.getRecentActivity({ language, events, flashcards }),
        [language, events, flashcards]
    );

    const vocabularyDistribution = useMemo(
        () => DashboardRepository.getVocabularyDistribution({ flashcards, language }),
        [flashcards, language]
    );

    const weeklyActivity = useMemo(
        () => DashboardRepository.getWeeklyActivity({ events, flashcards, language }),
        [events, flashcards, language]
    );

    const relatedContent = useMemo(
        () => DashboardRepository.getRelatedContentForDashboard({ language, events }),
        [language, events]
    );

    const nextLevel = useMemo(
        () => DashboardRepository.getNextLevelInfo({ language }),
        [language]
    );

    const nextStep = useMemo(
        () => DashboardRepository.getNextStep({
            reviews,
            lastActivity: resolvedLastActivity,
            continueLearning,
            relatedContent,
            nextLevel
        }),
        [reviews, resolvedLastActivity, continueLearning, relatedContent, nextLevel]
    );

    // "Recommended for you" - distinct from nextStep above (the single
    // biggest CTA on the dashboard): a short, prioritized, *explained* list
    // ("why" this lesson/flashcard, not just "what"). See
    // docs/ADAPTIVE_LEARNING.md for the full architecture; every input here
    // is data the dashboard already loads for other cards, nothing new is
    // stored to compute this.
    const recommendations = useMemo(
        () => RecommendationEngine.generate({
            language,
            completedLessons,
            flashcards,
            studyHistory,
            events,
            hasTakenPlacementTest: Boolean(PlacementTestStorage.getResult(language))
        }),
        [language, completedLessons, flashcards, studyHistory, events]
    );

    return useMemo(() => ({
        greeting,
        userName: null,
        language,
        continueLearning,
        dailyGoal,
        reviews,
        courses,
        quickStats,
        recentAchievement,
        lastActivity: resolvedLastActivity,
        heatmap,
        streakSummary,
        upcomingReviews,
        recentActivity,
        vocabularyDistribution,
        weeklyActivity,
        nextStep,
        recommendations
    }), [
        greeting, language, continueLearning, dailyGoal, reviews, courses,
        quickStats, recentAchievement, resolvedLastActivity, heatmap,
        streakSummary, upcomingReviews, recentActivity, vocabularyDistribution,
        weeklyActivity, nextStep, recommendations
    ]);

}
