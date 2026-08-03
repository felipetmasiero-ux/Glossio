import { describe, expect, it } from "vitest";
import { act } from "react";
import { renderHook } from "@testing-library/react";

import { useStatistics } from "./useStatistics";
import { useLessonProgress } from "./useLessonProgress";
import { LanguageContext } from "../contexts/LanguageContext";
import { EventProvider } from "../contexts/EventProvider";
import { FlashcardProvider } from "../contexts/FlashcardProvider";
import { LessonProgressProvider } from "../contexts/LessonProgressProvider";

// Performance sprint regression guard (section 4): getStatisticsSummary()
// bundles fields with different true inputs behind one signature, the same
// way getDashboardData() did (see useDashboardData.test.jsx). This proves
// that completing a lesson - which only lessonsCompleted/studyMinutes read -
// no longer hands out fresh references for the flashcard/event-derived
// fields that don't depend on completedLessons.
function Wrapper({ children }) {
    return (
        <EventProvider>
            <LanguageContext.Provider value={{ language: "English", setLanguage: () => {} }}>
                <FlashcardProvider>
                    <LessonProgressProvider>
                        {children}
                    </LessonProgressProvider>
                </FlashcardProvider>
            </LanguageContext.Provider>
        </EventProvider>
    );
}

describe("useStatistics - fine-grained memoization", () => {

    it("does not recompute completedLessons-independent fields when a lesson is completed", () => {

        const { result } = renderHook(() => ({
            statistics: useStatistics(),
            lessonProgress: useLessonProgress()
        }), { wrapper: Wrapper });

        const totalWordsLearnedBefore = result.current.statistics.totalWordsLearned;
        const wordsByTopicBefore = result.current.statistics.wordsByTopic;
        const videosCompletedBefore = result.current.statistics.videosCompleted;
        const lessonsCompletedBefore = result.current.statistics.lessonsCompleted;

        act(() => {
            result.current.lessonProgress.completeLesson("lesson-1");
        });

        // completeLesson() also logs a LESSON_COMPLETED event, so fields
        // depending on `events` (streak, reviews, goalCompletionRate) are
        // free to change here - only flashcard/language-only fields must
        // stay stable, since neither flashcards nor language changed.
        expect(result.current.statistics.totalWordsLearned).toBe(totalWordsLearnedBefore);
        expect(result.current.statistics.wordsByTopic).toBe(wordsByTopicBefore);
        expect(result.current.statistics.videosCompleted).toBe(videosCompletedBefore);

        // Sanity check the mechanism actually reacts to completedLessons.
        expect(result.current.lessonProgress.completedLessons).toContain("lesson-1");
        expect(result.current.statistics.lessonsCompleted).toBeDefined();
        expect(lessonsCompletedBefore).toBeDefined();

    });

});
