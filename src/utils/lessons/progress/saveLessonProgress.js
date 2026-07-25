const STORAGE_KEY = "lessonProgress";

export function saveLessonProgress(completedLessons) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(completedLessons)
    );
}
