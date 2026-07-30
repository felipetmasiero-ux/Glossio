import { verifyToken } from "../utils/jwt.js";
import { HttpError } from "../utils/HttpError.js";

export function auth(req, res, next) {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
        return next(new HttpError(401, "Missing or malformed authorization header."));
    }

    try {
        const payload = verifyToken(token);
        req.userId = payload.sub;
        next();
    } catch {
        next(new HttpError(401, "Invalid or expired token."));
    }
}
