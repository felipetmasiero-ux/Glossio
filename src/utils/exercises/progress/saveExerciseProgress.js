const STORAGE_KEY = "exerciseProgress";

export function saveExerciseProgress(practicedLessons) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(practicedLessons)
    );
}
