import { registerUser, loginUser, getUserById } from "../services/authService.js";

export async function register(req, res, next) {
    try {
        const { name, email, password, preferredLanguage } = req.body;
        const result = await registerUser({ name, email, password, preferredLanguage });
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const result = await loginUser({ email, password });
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

export async function me(req, res, next) {
    try {
        const user = await getUserById(req.userId);
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
}
