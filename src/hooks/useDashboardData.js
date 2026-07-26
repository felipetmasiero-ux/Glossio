import { useMemo } from "react";

import { useLanguage } from "./useLanguage";
import { useLessonProgress } from "./useLessonProgress";
import { useFlashcards } from "./useFlashcards";
import { useEvents } from "./useEvents";
import { useLastActivity } from "./useLastActivity";

import { DashboardRepository } from "../utils/dashboard";

export function useDashboardData() {

    const { language } = useLanguage();

    const { completedLessons } = useLessonProgress();

    const { flashcards } = useFlashcards();

    const { events } = useEvents();

    const { lastActivity } = useLastActivity();

    return useMemo(() => DashboardRepository.getDashboardData({
        language,
        completedLessons,
        flashcards,
        events,
        lastActivity
    }), [language, completedLessons, flashcards, events, lastActivity]);

}
