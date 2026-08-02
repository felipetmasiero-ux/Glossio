import { describe, expect, it, vi } from "vitest";

import { errorHandler, notFound } from "./errorHandler.js";
import { HttpError } from "../utils/HttpError.js";

function mockRes() {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    res.send = vi.fn().mockReturnValue(res);
    return res;
}

function mockReq() {
    return { ip: "127.0.0.1", method: "GET", originalUrl: "/api/whatever", headers: {} };
}

describe("errorHandler", () => {

    it("passes an HttpError's status and message straight through", () => {
        const res = mockRes();
        errorHandler(new HttpError(404, "Usuário não encontrado."), mockReq(), res, vi.fn());

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Usuário não encontrado." });
    });

    it("translates a body-parser 413 (oversized payload) into a friendly message, not a 500", () => {
        const res = mockRes();
        const bodyParserError = Object.assign(new Error("request entity too large"), { status: 413, type: "entity.too.large" });

        errorHandler(bodyParserError, mockReq(), res, vi.fn());

        expect(res.status).toHaveBeenCalledWith(413);
        expect(res.json).toHaveBeenCalledWith({ error: expect.any(String) });
        expect(res.json.mock.calls[0][0].error).not.toMatch(/entity/i);
    });

    it("translates a body-parser 400 (malformed JSON) into a friendly message", () => {
        const res = mockRes();
        const bodyParserError = Object.assign(new Error("Unexpected token in JSON"), { status: 400, type: "entity.parse.failed" });

        errorHandler(bodyParserError, mockReq(), res, vi.fn());

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json.mock.calls[0][0].error).not.toMatch(/json|token/i);
    });

    it("never leaks a stack trace, Prisma error shape, or file path for an unexpected error", () => {
        const res = mockRes();
        const prismaLikeError = new Error(
            "Invalid `prisma.user.findUnique()` invocation in /Users/dev/app/src/services/authService.js:29:10"
        );

        errorHandler(prismaLikeError, mockReq(), res, vi.fn());

        expect(res.status).toHaveBeenCalledWith(500);
        const body = res.json.mock.calls[0][0];
        expect(body).toEqual({ error: "Erro interno do servidor." });
        expect(JSON.stringify(body)).not.toMatch(/prisma/i);
        expect(JSON.stringify(body)).not.toMatch(/\.js:\d+/);
    });

    it("notFound responds with a generic 404, no route/path detail", () => {
        const res = mockRes();
        notFound(mockReq(), res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Não encontrado." });
    });

});
