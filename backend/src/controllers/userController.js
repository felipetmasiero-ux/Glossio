import { getUserProfile, updateUserProfile, changePassword as changePasswordService } from "../services/userService.js";
import { logRequestEvent } from "../utils/logger.js";

export async function getUser(req, res, next) {
    try {
        const user = await getUserProfile(req.userId);
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
}

export async function updateUser(req, res, next) {
    try {
        const user = await updateUserProfile(req.userId, req.body);
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
}

export async function changePassword(req, res, next) {
    try {
        await changePasswordService(req.userId, req.body);
        logRequestEvent("info", "password_changed", req);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}
