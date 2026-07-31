import { getOrMigrateVideoProgress, replaceVideoProgress } from "../services/videoProgressService.js";

export async function getVideoProgress(req, res, next) {
    try {
        const entries = await getOrMigrateVideoProgress(req.userId);
        res.status(200).json(entries);
    } catch (err) {
        next(err);
    }
}

export async function putVideoProgress(req, res, next) {
    try {
        const entries = await replaceVideoProgress(req.userId, req.body);
        res.status(200).json(entries);
    } catch (err) {
        next(err);
    }
}
