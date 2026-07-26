import { useState, useCallback, useEffect } from "react";

import { generateExercisesForLesson, updateExerciseQueue } from "../../utils/exercises";
import { useEvents } from "../useEvents";
import { useExerciseProgress } from "../useExerciseProgress";
import { useLastActivity } from "../useLastActivity";
import { ModuleRepository } from "../../utils/courses/ModuleRepository";
import { EVENT_TYPES } from "../../constants/events";

export function useExerciseSession(lesson) {

    const { logEvent } = useEvents();

    const { practiceLesson } = useExerciseProgress();

    const { setActivity, clearActivity } = useLastActivity();

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

    }, [finished, lesson?.id, practiceLesson]);

    useEffect(() => {

        if (!lesson) return;

        if (finished) {
            clearActivity();
            return;
        }

        if (initialTotal > 0) {
            setActivity({
                type: "exercise",
                lessonId: lesson.id,
                moduleId: ModuleRepository.getByLesson(lesson.language, lesson.id)?.id ?? null,
                remaining: queue.length,
                total: initialTotal
            });
        }

    }, [lesson?.id, lesson?.language, initialTotal, queue.length, finished, setActivity, clearActivity]);

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
