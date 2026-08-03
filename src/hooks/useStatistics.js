import { useMemo } from "react";

import { useLanguage } from "./useLanguage";
import { useLessonProgress } from "./useLessonProgress";
import { useFlashcards } from "./useFlashcards";
import { useEvents } from "./useEvents";

import { getTotalWordsLearned } from "../utils/statistics/getTotalWordsLearned";
import { getWordsByTopic } from "../utils/statistics/getWordsByTopic";
import { getLessonsCompleted } from "../utils/statistics/getLessonsCompleted";
import { getVideosCompleted } from "../utils/statistics/getVideosCompleted";
import { getStudyTimeEstimate } from "../utils/statistics/getStudyTimeEstimate";
import { getReviewStatistics } from "../utils/statistics/getReviewStatistics";
import { getKnownWordsByLevel } from "../utils/statistics/getKnownWordsByLevel";
import { getFavoriteWordsCount } from "../utils/statistics/getFavoriteWordsCount";
import { getGoalCompletionRate } from "../utils/goals/getGoalCompletionRate";
import { GoalsStorage } from "../utils/goals/goalsStorage";
import { getStreak } from "../utils/study/history/stats/getStreak";
import { adaptEventsToHistory } from "../utils/dashboard/adaptEventsToHistory";
import { ACTIVITY_EVENT_TYPES } from "../constants/dashboard";

// Same fix as useDashboardData: getStatisticsSummary() bundles many fields
// with different true inputs behind one signature. A single useMemo over the
// whole thing recomputed every field (including ones that only depend on
// completedLessons/language) whenever flashcards or events changed - which,
// at the stress-test scale of thousands of flashcards/events, happens on
// nearly every study action. Split per field so each only recomputes when
// its own actual inputs change. getStatisticsSummary() itself is untouched
// and still used/tested directly.
export function useStatistics() {

    const { language } = useLanguage();
    const { completedLessons } = useLessonProgress();
    const { flashcards } = useFlashcards();
    const { events } = useEvents();

    const totalWordsLearned = useMemo(() => getTotalWordsLearned({ flashcards, language }), [flashcards, language]);
    const wordsByTopic = useMemo(() => getWordsByTopic({ flashcards, language }), [flashcards, language]);
    const knownWordsByLevel = useMemo(() => getKnownWordsByLevel({ flashcards, language }), [flashcards, language]);
    const favoriteWords = useMemo(() => getFavoriteWordsCount({ flashcards, language }), [flashcards, language]);
    const lessonsCompleted = useMemo(() => getLessonsCompleted({ completedLessons, language }), [completedLessons, language]);
    const videosCompleted = useMemo(() => getVideosCompleted({ language }), [language]);
    const studyMinutes = useMemo(() => getStudyTimeEstimate({ completedLessons, language }), [completedLessons, language]);
    const reviews = useMemo(() => getReviewStatistics({ flashcards, events, language }), [flashcards, events, language]);
    const streak = useMemo(() => getStreak(adaptEventsToHistory(events, ACTIVITY_EVENT_TYPES)), [events]);
    const goalCompletionRate = useMemo(
        () => getGoalCompletionRate({ events, flashcards, language, goals: GoalsStorage.getGoals() }),
        [events, flashcards, language]
    );

    return useMemo(() => ({
        totalWordsLearned, wordsByTopic, knownWordsByLevel, favoriteWords,
        lessonsCompleted, videosCompleted, studyMinutes, reviews, streak, goalCompletionRate
    }), [totalWordsLearned, wordsByTopic, knownWordsByLevel, favoriteWords, lessonsCompleted, videosCompleted, studyMinutes, reviews, streak, goalCompletionRate]);

}
