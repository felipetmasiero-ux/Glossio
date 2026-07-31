import { useMemo } from "react";

import { useLanguage } from "./useLanguage";
import { useLessonProgress } from "./useLessonProgress";
import { useFlashcards } from "./useFlashcards";
import { useEvents } from "./useEvents";

import { getAchievements } from "../utils/achievements";

export function useAchievements() {

    const { language } = useLanguage();
    const { completedLessons } = useLessonProgress();
    const { flashcards } = useFlashcards();
    const { events } = useEvents();

    return useMemo(() => getAchievements({
        language,
        completedLessons,
        flashcards,
        events
    }), [language, completedLessons, flashcards, events]);

}
