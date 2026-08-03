import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";
import { signToken } from "../utils/jwt.js";
import { HttpError } from "../utils/HttpError.js";
import { requireString, requireEmail, requirePassword, optionalString } from "../utils/validators.js";

const SALT_ROUNDS = 12;

// Precomputed once at startup (never matches any real password) so a login
// attempt for an email that doesn't exist still pays bcrypt's comparison
// cost below. Without this, the *response time* - not the error message,
// which is already identical either way - would leak whether an email is
// registered: fast-fail here vs. a real bcrypt.compare's ~100ms+ for a
// wrong password on an account that does exist.
const DUMMY_HASH_FOR_TIMING_SAFETY = bcrypt.hashSync("no-such-account-timing-safety", SALT_ROUNDS);

export function toPublicUser(user) {
    const { passwordHash, ...publicUser } = user;
    return publicUser;
}

export async function registerUser({ name, email, password, preferredLanguage }) {
    const cleanName = requireString(name, "Nome", { min: 1, max: 100 });
    const cleanEmail = requireEmail(email);
    requirePassword(password);
    const cleanPreferredLanguage = optionalString(preferredLanguage, "Idioma preferido", { max: 50 });

    const existingUser = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existingUser) {
        throw new HttpError(409, "Já existe uma conta com este e-mail.");
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
        data: {
            name: cleanName,
            email: cleanEmail,
            passwordHash,
            preferredLanguage: cleanPreferredLanguage
        }
    });

    const token = signToken({ sub: user.id });

    return { token, user: toPublicUser(user) };
}

export async function loginUser({ email, password }) {
    const cleanEmail = requireEmail(email);
    requirePassword(password);

    const user = await prisma.user.findUnique({ where: { email: cleanEmail } });

    const passwordMatches = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH_FOR_TIMING_SAFETY);

    if (!user || !passwordMatches) {
        throw new HttpError(401, "E-mail ou senha inválidos.");
    }

    const token = signToken({ sub: user.id });

    return { token, user: toPublicUser(user) };
}

export async function getUserById(id) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
        throw new HttpError(404, "Usuário não encontrado.");
    }
    return toPublicUser(user);
}
