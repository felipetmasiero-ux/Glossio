import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";
import { toPublicUser } from "./authService.js";
import { HttpError } from "../utils/HttpError.js";

const SALT_ROUNDS = 10;
const EDITABLE_FIELDS = ["name", "avatarUrl", "bio", "preferredLanguage", "country", "timezone"];

export async function getUserProfile(userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new HttpError(404, "User not found.");
    }
    return toPublicUser(user);
}

export async function updateUserProfile(userId, body = {}) {
    const data = {};

    for (const field of EDITABLE_FIELDS) {
        if (body[field] === undefined) continue;
        data[field] = typeof body[field] === "string" ? body[field].trim() || null : body[field];
    }

    if (data.name !== undefined && !data.name) {
        throw new HttpError(400, "O nome é obrigatório.");
    }

    const user = await prisma.user.update({ where: { id: userId }, data });
    return toPublicUser(user);
}

export async function changePassword(userId, { currentPassword, newPassword }) {
    if (!newPassword || newPassword.length < 8) {
        throw new HttpError(400, "A nova senha deve ter no mínimo 8 caracteres.");
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new HttpError(404, "User not found.");
    }

    const currentMatches = await bcrypt.compare(currentPassword || "", user.passwordHash);
    if (!currentMatches) {
        throw new HttpError(401, "A senha atual está incorreta.");
    }

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await prisma.user.update({ where: { id: userId }, data: { passwordHash } });
}
