import { useState, useEffect } from "react";
import { LessonProgressContext } from "./LessonProgressContext";
import { useEvents } from "../hooks/useEvents";
import { EVENT_TYPES } from "../constants/events";
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

    function completeLesson(lessonId) {

        setCompletedLessons(previous =>
            previous.includes(lessonId)
                ? previous
                : [...previous, lessonId]
        );

        logEvent(EVENT_TYPES.LESSON_COMPLETED, {
            lessonId
        });

    }

    function isLessonCompleted(lessonId) {
        return completedLessons.includes(lessonId);
    }

    return (
        <LessonProgressContext.Provider value={{
            completedLessons,
            completeLesson,
            isLessonCompleted
        }}>
            {children}
        </LessonProgressContext.Provider>
    );
}
