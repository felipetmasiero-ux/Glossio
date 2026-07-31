import { useMemo } from "react";

import { useLanguage } from "./useLanguage";
import { useLessonProgress } from "./useLessonProgress";
import { useFlashcards } from "./useFlashcards";
import { useEvents } from "./useEvents";

import { getStatisticsSummary } from "../utils/statistics";

export function useStatistics() {

    const { language } = useLanguage();
    const { completedLessons } = useLessonProgress();
    const { flashcards } = useFlashcards();
    const { events } = useEvents();

    return useMemo(() => getStatisticsSummary({
        language,
        completedLessons,
        flashcards,
        events
    }), [language, completedLessons, flashcards, events]);

}
