import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";
import { toPublicUser } from "./authService.js";
import { HttpError } from "../utils/HttpError.js";
import { requireString, optionalString, optionalUrl, optionalTimezone, requirePassword } from "../utils/validators.js";

const SALT_ROUNDS = 12;

// One entry per editable field: how to validate/sanitize it. Keeping this
// as a table (instead of one big if-chain) is what let profile updates be
// fully validated without the previous "any string of any length" gap.
const EDITABLE_FIELDS = {
    name: value => requireString(value, "Nome", { min: 1, max: 100 }),
    avatarUrl: value => optionalUrl(value, "URL do avatar", { max: 500 }),
    bio: value => optionalString(value, "Bio", { max: 500 }),
    preferredLanguage: value => optionalString(value, "Idioma preferido", { max: 50 }),
    country: value => optionalString(value, "País", { max: 100 }),
    timezone: optionalTimezone
};

export async function getUserProfile(userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new HttpError(404, "Usuário não encontrado.");
    }
    return toPublicUser(user);
}

export async function updateUserProfile(userId, body = {}) {
    const data = {};

    for (const field of Object.keys(EDITABLE_FIELDS)) {
        if (body[field] === undefined) continue;
        data[field] = EDITABLE_FIELDS[field](body[field]);
    }

    const user = await prisma.user.update({ where: { id: userId }, data });
    return toPublicUser(user);
}

export async function changePassword(userId, { currentPassword, newPassword }) {
    requirePassword(newPassword, "nova senha");

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new HttpError(404, "Usuário não encontrado.");
    }

    const currentMatches = await bcrypt.compare(currentPassword || "", user.passwordHash);
    if (!currentMatches) {
        throw new HttpError(401, "A senha atual está incorreta.");
    }

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await prisma.user.update({ where: { id: userId }, data: { passwordHash } });
}
