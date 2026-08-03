import { useState, useEffect, useCallback, useMemo } from "react";
import { ExerciseProgressContext } from "./ExerciseProgressContext";
import {
    loadExerciseProgress,
    saveExerciseProgress
} from "../utils/exercises/progress";

export function ExerciseProgressProvider({ children }) {

    const [practicedLessons, setPracticedLessons] = useState(loadExerciseProgress);

    useEffect(() => {
        saveExerciseProgress(practicedLessons);
    }, [practicedLessons]);

    const practiceLesson = useCallback(lessonId => {

        setPracticedLessons(previous =>
            previous.includes(lessonId)
                ? previous
                : [...previous, lessonId]
        );

    }, []);

    const isLessonPracticed = useCallback(lessonId => {
        return practicedLessons.includes(lessonId);
    }, [practicedLessons]);

    const value = useMemo(() => ({
        practicedLessons,
        practiceLesson,
        isLessonPracticed
    }), [practicedLessons, practiceLesson, isLessonPracticed]);

    return (
        <ExerciseProgressContext.Provider value={value}>
            {children}
        </ExerciseProgressContext.Provider>
    );
}
