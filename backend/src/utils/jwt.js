import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

// Pinning the algorithm on both sign and verify closes off algorithm-
// confusion attacks (e.g. a forged token that declares "alg: none" or a
// different algorithm than the one the server actually signs with) -
// jsonwebtoken only trusts the algorithm(s) explicitly listed here.
const ALGORITHM = "HS256";

export function signToken(payload) {
    return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn, algorithm: ALGORITHM });
}

export function verifyToken(token) {
    return jwt.verify(token, env.jwtSecret, { algorithms: [ALGORITHM] });
}
