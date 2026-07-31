import { getOrCreateProgress, replaceProgress } from "../services/progressService.js";

export async function getProgress(req, res, next) {
    try {
        const progress = await getOrCreateProgress(req.userId);
        res.status(200).json(progress);
    } catch (err) {
        next(err);
    }
}

export async function putProgress(req, res, next) {
    try {
        const progress = await replaceProgress(req.userId, req.body);
        res.status(200).json(progress);
    } catch (err) {
        next(err);
    }
}
