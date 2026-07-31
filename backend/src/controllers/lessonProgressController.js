import { getOrMigrateLessonProgress, replaceLessonProgress } from "../services/lessonProgressService.js";

export async function getLessonProgress(req, res, next) {
    try {
        const lessonIds = await getOrMigrateLessonProgress(req.userId);
        res.status(200).json(lessonIds);
    } catch (err) {
        next(err);
    }
}

export async function putLessonProgress(req, res, next) {
    try {
        const lessonIds = await replaceLessonProgress(req.userId, req.body);
        res.status(200).json(lessonIds);
    } catch (err) {
        next(err);
    }
}
