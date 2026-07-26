const STORAGE_KEY = "exerciseProgress";

export function loadExerciseProgress() {
    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return [];
    }

    try {
        const practicedLessons = JSON.parse(saved);

        return Array.isArray(practicedLessons) ? practicedLessons : [];
    } catch {
        return [];
    }
}
