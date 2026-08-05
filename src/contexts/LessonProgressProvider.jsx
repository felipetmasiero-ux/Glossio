import { useState, useEffect, useCallback, useMemo } from "react";
import { LessonProgressContext } from "./LessonProgressContext";
import { useEvents } from "../hooks/useEvents";
import { EVENT_TYPES } from "../constants/events";
import { trackEvent, ANALYTICS_EVENTS } from "../utils/analytics";
import {
    loadLessonProgress,
    saveLessonProgress
} from "../utils/lessons/progress";

export function LessonProgressProvider({ children }) {

    const [completedLessons, setCompletedLessons] = useState(loadLessonProgress);

    const { logEvent } = useEvents();

    useEffect(() => {
        saveLessonProgress(completedLessons);
    }, [completedLessons]);

    // Functional update - doesn't need to read `completedLessons` directly,
    // so this stays stable across renders. This provider also consumes
    // useEvents(), so without this fix it re-rendered (and handed a fresh
    // value/functions to every one of its own consumers) on every single
    // event logged anywhere in the app - the same proven cascade as
    // FlashcardProvider (see providerRenderStability.test.jsx).
    // `language` is an optional second arg (not a context read) purely for
    // the analytics payload - keeps this provider from picking up a new
    // context dependency (see the render-stability note above; adding
    // useLanguage() here would re-introduce the exact cascade that comment
    // describes, just via a different context).
    const completeLesson = useCallback((lessonId, language) => {

        setCompletedLessons(previous =>
            previous.includes(lessonId)
                ? previous
                : [...previous, lessonId]
        );

        logEvent(EVENT_TYPES.LESSON_COMPLETED, {
            lessonId
        });

        trackEvent(ANALYTICS_EVENTS.LESSON_COMPLETED, { lessonId, language });

    }, [logEvent]);

    // Reads `completedLessons` directly - reference legitimately changes
    // with it.
    const isLessonCompleted = useCallback(lessonId => {
        return completedLessons.includes(lessonId);
    }, [completedLessons]);

    const value = useMemo(() => ({
        completedLessons,
        completeLesson,
        isLessonCompleted
    }), [completedLessons, completeLesson, isLessonCompleted]);

    return (
        <LessonProgressContext.Provider value={value}>
            {children}
        </LessonProgressContext.Provider>
    );
}
