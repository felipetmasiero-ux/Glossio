import { useState, useEffect } from "react";
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

    function practiceLesson(lessonId) {

        setPracticedLessons(previous =>
            previous.includes(lessonId)
                ? previous
                : [...previous, lessonId]
        );

    }

    function isLessonPracticed(lessonId) {
        return practicedLessons.includes(lessonId);
    }

    return (
        <ExerciseProgressContext.Provider value={{
            practicedLessons,
            practiceLesson,
            isLessonPracticed
        }}>
            {children}
        </ExerciseProgressContext.Provider>
    );
}
