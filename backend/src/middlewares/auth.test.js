import { describe, expect, it, vi } from "vitest";
import jwt from "jsonwebtoken";

import { auth } from "./auth.js";
import { env } from "../config/env.js";
import { HttpError } from "../utils/HttpError.js";

function mockReq(headers = {}) {
    return { headers, ip: "127.0.0.1", method: "GET", originalUrl: "/api/user" };
}

describe("auth middleware", () => {

    it("rejects a request with no Authorization header", () => {
        const next = vi.fn();
        auth(mockReq(), {}, next);

        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        expect(next.mock.calls[0][0].status).toBe(401);
    });

    it("rejects a header that isn't the Bearer scheme", () => {
        const next = vi.fn();
        auth(mockReq({ authorization: "Basic dXNlcjpwYXNz" }), {}, next);

        expect(next.mock.calls[0][0].status).toBe(401);
    });

    it("rejects a Bearer header with no token", () => {
        const next = vi.fn();
        auth(mockReq({ authorization: "Bearer" }), {}, next);

        expect(next.mock.calls[0][0].status).toBe(401);
    });

    it("rejects a malformed/invalid JWT", () => {
        const next = vi.fn();
        auth(mockReq({ authorization: "Bearer not-a-real-jwt" }), {}, next);

        expect(next.mock.calls[0][0].status).toBe(401);
        expect(next.mock.calls[0][0].message).toBe("Sessão expirada. Faça login novamente.");
    });

    it("rejects an expired JWT", () => {
        const expiredToken = jwt.sign({ sub: "user-1" }, env.jwtSecret, {
            algorithm: "HS256",
            expiresIn: -10 // already expired
        });

        const next = vi.fn();
        auth(mockReq({ authorization: `Bearer ${expiredToken}` }), {}, next);

        expect(next.mock.calls[0][0].status).toBe(401);
    });

    it("rejects a token signed with the wrong algorithm/secret", () => {
        const forgedToken = jwt.sign({ sub: "user-1" }, "wrong-secret", { algorithm: "HS256" });

        const next = vi.fn();
        auth(mockReq({ authorization: `Bearer ${forgedToken}` }), {}, next);

        expect(next.mock.calls[0][0].status).toBe(401);
    });

    it("accepts a valid token and attaches userId to the request", () => {
        const token = jwt.sign({ sub: "user-42" }, env.jwtSecret, {
            algorithm: "HS256",
            expiresIn: "1h"
        });

        const req = mockReq({ authorization: `Bearer ${token}` });
        const next = vi.fn();

        auth(req, {}, next);

        expect(req.userId).toBe("user-42");
        expect(next).toHaveBeenCalledWith(); // called with no error
    });

});
