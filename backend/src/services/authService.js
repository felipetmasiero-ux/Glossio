import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";
import { signToken } from "../utils/jwt.js";
import { HttpError } from "../utils/HttpError.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SALT_ROUNDS = 10;

export function toPublicUser(user) {
    const { passwordHash, ...publicUser } = user;
    return publicUser;
}

function validateCredentials({ name, email, password }) {
    if (name !== undefined && !name.trim()) {
        throw new HttpError(400, "O nome é obrigatório.");
    }
    if (!email || !EMAIL_REGEX.test(email)) {
        throw new HttpError(400, "Informe um e-mail válido.");
    }
    if (!password || password.length < 8) {
        throw new HttpError(400, "A senha deve ter no mínimo 8 caracteres.");
    }
}

export async function registerUser({ name, email, password, preferredLanguage }) {
    validateCredentials({ name, email, password });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new HttpError(409, "Já existe uma conta com este e-mail.");
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
        data: {
            name: name.trim(),
            email,
            passwordHash,
            preferredLanguage: preferredLanguage || null
        }
    });

    const token = signToken({ sub: user.id });

    return { token, user: toPublicUser(user) };
}

export async function loginUser({ email, password }) {
    validateCredentials({ email, password });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new HttpError(401, "E-mail ou senha inválidos.");
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
        throw new HttpError(401, "E-mail ou senha inválidos.");
    }

    const token = signToken({ sub: user.id });

    return { token, user: toPublicUser(user) };
}

export async function getUserById(id) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
        throw new HttpError(404, "User not found.");
    }
    return toPublicUser(user);
}
