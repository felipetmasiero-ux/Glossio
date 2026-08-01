import { verifyToken } from "../utils/jwt.js";
import { HttpError } from "../utils/HttpError.js";

export function auth(req, res, next) {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
        return next(new HttpError(401, "Cabeçalho de autorização ausente ou inválido."));
    }

    try {
        const payload = verifyToken(token);
        req.userId = payload.sub;
        next();
    } catch {
        next(new HttpError(401, "Sessão expirada. Faça login novamente."));
    }
}
