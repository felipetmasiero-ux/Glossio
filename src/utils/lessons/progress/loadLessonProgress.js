const STORAGE_KEY = "lessonProgress";

export function loadLessonProgress() {
    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return [];
    }

    try {
        const completedLessons = JSON.parse(saved);

        return Array.isArray(completedLessons) ? completedLessons : [];
    } catch {
        return [];
    }
}
