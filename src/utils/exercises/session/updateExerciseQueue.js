export function updateExerciseQueue(queue, answeredExercise, correct) {

    const remaining = queue.filter(
        exercise => exercise.id !== answeredExercise.id
    );

    if (!correct) {
        return [...remaining, answeredExercise];
    }

    return remaining;

}
