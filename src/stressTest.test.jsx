import { describe, expect, it } from "vitest";
import { act } from "react";
import { renderHook } from "@testing-library/react";

import { EVENT_TYPES } from "./constants/events";
import { getStatisticsSummary } from "./utils/statistics/getStatisticsSummary";
import { getAchievements } from "./utils/achievements/getAchievements";
import { getGoalHistory } from "./utils/goals/getGoalHistory";
import { DEFAULT_GOALS } from "./utils/goals/goalsStorage";
import { DashboardRepository } from "./utils/dashboard";
import { groupFlashcardsByTopic } from "./utils/flashcards/groupFlashcardsByTopic";
import { searchFlashcards } from "./utils/search/searchFlashcards";

import { useDashboardData } from "./hooks/useDashboardData";
import { useStatistics } from "./hooks/useStatistics";
import { LanguageContext } from "./contexts/LanguageContext";
import { EventProvider } from "./contexts/EventProvider";
import { FlashcardProvider } from "./contexts/FlashcardProvider";
import { LessonProgressProvider } from "./contexts/LessonProgressProvider";
import { LastActivityProvider } from "./contexts/LastActivityProvider";
import { StudyHistoryProvider } from "./contexts/StudyHistoryProvider";

// Section 13 of the performance sprint: simulate a long-time user (1000
// flashcards, 5000 study events including 2000 reviews, 100 completed
// lessons) and prove the app doesn't freeze or over-recompute at that scale.
// Flashcard/event/lesson-progress volume is the thing that grows unbounded
// with real usage - lesson/video *content* is fixed-size and bounded by what
// the app actually ships, so it isn't inflated here the same way.

const DAY_MS = 24 * 60 * 60 * 1000;

function buildFlashcards(count) {
    const words = ["casa", "livro", "carro", "porta", "janela", "amigo", "cidade", "tempo", "trabalho", "familia"];
    const cards = [];

    for (let i = 0; i < count; i++) {
        const now = Date.now() - i * 60_000;
        cards.push({
            id: `stress-card-${i}`,
            word: words[i % words.length] + i,
            translation: `translation-${i}`,
            language: "English",
            favorite: i % 7 === 0,
            lessonId: null,
            easeFactor: 2.5,
            interval: (i % 30) + 1,
            repetitions: i % 10,
            createdAt: now,
            updatedAt: now,
            nextReview: now + ((i % 14) - 7) * DAY_MS
        });
    }

    return cards;
}

function buildEvents({ total, reviewCount, spanDays }) {
    const events = [];
    const cardCount = reviewCount;

    for (let i = 0; i < total; i++) {
        const daysAgo = i % spanDays;
        const timestamp = Date.now() - daysAgo * DAY_MS - (i % 1000);

        let type;
        let payload;

        if (i < reviewCount) {
            type = EVENT_TYPES.FLASHCARD_REVIEWED;
            payload = { cardId: `stress-card-${i % cardCount}` };
        } else if (i % 3 === 0) {
            type = EVENT_TYPES.LESSON_COMPLETED;
            payload = { lessonId: "english-a1-family" };
        } else {
            type = EVENT_TYPES.VIDEO_COMPLETED;
            payload = { videoId: "en-a1-meeting-family" };
        }

        events.push({ id: `stress-event-${i}`, type, timestamp, payload });
    }

    return events;
}

function buildCompletedLessons(count) {
    // Bounded by real content - repeats are harmless for a volume/perf test,
    // the point is exercising a completedLessons array of a realistic size.
    return Array.from({ length: count }, (_, i) => `english-a1-family-${i}`);
}

const FLASHCARD_COUNT = 1000;
const EVENT_COUNT = 5000;
const REVIEW_COUNT = 2000;
const COMPLETED_LESSON_COUNT = 100;

const flashcards = buildFlashcards(FLASHCARD_COUNT);
const events = buildEvents({ total: EVENT_COUNT, reviewCount: REVIEW_COUNT, spanDays: 400 });
const completedLessons = buildCompletedLessons(COMPLETED_LESSON_COUNT);

describe("stress test - 1000 flashcards / 5000 events (2000 reviews) / 100 completed lessons", () => {

    it("computes the full statistics summary without freezing", () => {
        const start = performance.now();
        const summary = getStatisticsSummary({ language: "English", completedLessons, flashcards, events });
        const elapsed = performance.now() - start;

        expect(summary.totalWordsLearned).toBeGreaterThan(0);
        expect(summary.reviews.totalReviews).toBe(REVIEW_COUNT);
        expect(elapsed).toBeLessThan(500);
    });

    it("computes achievements without freezing", () => {
        const start = performance.now();
        const achievements = getAchievements({ language: "English", completedLessons, flashcards, events });
        const elapsed = performance.now() - start;

        expect(achievements.length).toBeGreaterThan(0);
        expect(elapsed).toBeLessThan(500);
    });

    // This is the section 4 fix's direct payoff: the 365-day achievements
    // window used to re-scan the *entire* events array once per day
    // (O(days * events) = 365 * 5000 ~= 1.8M iterations) plus rebuild 3
    // lookup maps per day. It's now a single bucketing pass.
    it("computes the 365-day goal history (the achievements window) well under a freeze-worthy budget", () => {
        const start = performance.now();
        const history = getGoalHistory({ events, flashcards, language: "English", goals: DEFAULT_GOALS, days: 365 });
        const elapsed = performance.now() - start;

        expect(history).toHaveLength(365);
        expect(elapsed).toBeLessThan(200);
    });

    it("computes every dashboard field without freezing", () => {
        const start = performance.now();

        const heatmap = DashboardRepository.getHeatmap({ events });
        const streak = DashboardRepository.getStreakSummary({ events });
        const weekly = DashboardRepository.getWeeklyActivity({ events, flashcards, language: "English" });
        const recent = DashboardRepository.getRecentActivity({ language: "English", events, flashcards });
        const vocab = DashboardRepository.getVocabularyDistribution({ flashcards, language: "English" });

        const elapsed = performance.now() - start;

        expect(heatmap).toBeDefined();
        expect(streak).toBeDefined();
        expect(weekly).toBeDefined();
        expect(recent).toBeDefined();
        expect(vocab).toBeDefined();
        expect(elapsed).toBeLessThan(500);
    });

    it("groups and searches flashcards without freezing", () => {
        const start = performance.now();

        const groups = groupFlashcardsByTopic(flashcards);
        const results = searchFlashcards(flashcards, "casa");

        const elapsed = performance.now() - start;

        expect(groups.length).toBeGreaterThan(0);
        expect(results.length).toBeGreaterThan(0);
        expect(elapsed).toBeLessThan(500);
    });

    function Wrapper({ language, children }) {
        return (
            <EventProvider>
                <LanguageContext.Provider value={{ language, setLanguage: () => {} }}>
                    <FlashcardProvider>
                        <LessonProgressProvider>
                            <LastActivityProvider>
                                <StudyHistoryProvider>
                                    {children}
                                </StudyHistoryProvider>
                            </LastActivityProvider>
                        </LessonProgressProvider>
                    </FlashcardProvider>
                </LanguageContext.Provider>
            </EventProvider>
        );
    }

    // Re-proves the fine-grained memoization from useDashboardData.test.jsx
    // and useStatistics.test.jsx, but at this stress test's actual data
    // volume rather than a trivial fixture - the reference-stability
    // mechanism must hold regardless of array size, and this confirms it
    // does not silently degrade (e.g. via an accidental array copy) at scale.
    it("does not recompute language-independent dashboard/statistics fields at this data volume when only language changes", async () => {

        localStorage.setItem("flashcards", JSON.stringify(flashcards));
        localStorage.setItem("events", JSON.stringify(events));

        try {

            let language = "English";

            const { result, rerender } = renderHook(() => ({
                dashboard: useDashboardData(),
                statistics: useStatistics()
            }), {
                wrapper: ({ children }) => <Wrapper language={language}>{children}</Wrapper>
            });

            const heatmapBefore = result.current.dashboard.heatmap;
            const streakBefore = result.current.dashboard.streakSummary;
            // statistics.streak depends only on events (getStreak takes no
            // language param) - totalWordsLearned/videosCompleted etc. all
            // filter by language, so they're *expected* to change below.
            const statsStreakBefore = result.current.statistics.streak;

            language = "French";

            const start = performance.now();
            await act(async () => { rerender(); });
            const elapsed = performance.now() - start;

            expect(result.current.dashboard.heatmap).toBe(heatmapBefore);
            expect(result.current.dashboard.streakSummary).toBe(streakBefore);
            expect(result.current.statistics.streak).toBe(statsStreakBefore);
            expect(elapsed).toBeLessThan(500);

        } finally {
            localStorage.removeItem("flashcards");
            localStorage.removeItem("events");
        }

    });

});
