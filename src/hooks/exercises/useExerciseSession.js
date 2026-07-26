import { useState, useCallback, useEffect } from "react";

import { generateExercisesForLesson, updateExerciseQueue } from "../../utils/exercises";
import { useEvents } from "../useEvents";
import { useExerciseProgress } from "../useExerciseProgress";
import { EVENT_TYPES } from "../../constants/events";

export function useExerciseSession(lesson) {

    const { logEvent } = useEvents();

    const { practiceLesson } = useExerciseProgress();

    const [queue, setQueue] = useState(() => generateExercisesForLesson(lesson));

    const [initialTotal, setInitialTotal] = useState(() => queue.length);

    const [results, setResults] = useState([]);

    const [sessionLessonId, setSessionLessonId] = useState(lesson?.id ?? null);

    if ((lesson?.id ?? null) !== sessionLessonId) {

        const generated = generateExercisesForLesson(lesson);

        setSessionLessonId(lesson?.id ?? null);

        setQueue(generated);

        setInitialTotal(generated.length);

        setResults([]);

    }

    const current = queue[0] ?? null;

    const completedCount = initialTotal - queue.length;

    const finished = initialTotal > 0 && queue.length === 0;

    const correctCount = results.filter(result => result.correct).length;

    const handleAnswered = useCallback((correct) => {

        if (!current || !lesson) return;

        logEvent(EVENT_TYPES.EXERCISE_COMPLETED, {
            lessonId: lesson.id,
            exerciseId: current.id,
            exerciseType: current.type,
            correct
        });

        setResults(previous => [...previous, {
            exerciseId: current.id,
            type: current.type,
            correct
        }]);

        setQueue(previous => updateExerciseQueue(previous, current, correct));

    }, [current, lesson, logEvent]);

    const restart = useCallback(() => {

        const generated = generateExercisesForLesson(lesson);

        setQueue(generated);

        setInitialTotal(generated.length);

        setResults([]);

    }, [lesson]);

    useEffect(() => {

        if (finished && lesson) {
            practiceLesson(lesson.id);
        }

    }, [finished, lesson, practiceLesson]);

    return {
        current,
        initialTotal,
        completedCount,
        correctCount,
        totalAnswers: results.length,
        finished,
        handleAnswered,
        restart
    };

}
