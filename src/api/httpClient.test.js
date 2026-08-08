import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import { request } from "./httpClient";

function jsonResponse(status, body) {
    return {
        ok: status >= 200 && status < 300,
        status,
        json: () => Promise.resolve(body)
    };
}

describe("httpClient request", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("returns the parsed body on success", async () => {

        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(200, { ok: true })));

        const data = await request("/anything");

        expect(data).toEqual({ ok: true });

    });

    it("surfaces a consistent Portuguese message when fetch itself throws (offline/DNS/CORS)", async () => {

        vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));

        await expect(request("/anything")).rejects.toThrow(
            "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente."
        );

    });

    it("surfaces a timeout-specific message when the request is aborted", async () => {

        vi.stubGlobal("fetch", vi.fn(() => {
            const error = new Error("The operation was aborted.");
            error.name = "AbortError";
            return Promise.reject(error);
        }));

        await expect(request("/anything")).rejects.toThrow("Tempo de conexão esgotado. Tente novamente.");

    });

    it("prefers the backend's own error message for a non-ok response", async () => {

        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
            jsonResponse(401, { error: "Sessão expirada. Faça login novamente." })
        ));

        await expect(request("/anything")).rejects.toThrow("Sessão expirada. Faça login novamente.");

    });

    // R1: this `status` is what lets a caller (AuthProvider, for /auth/me)
    // tell "the server actually answered, and said no" apart from a
    // network/timeout failure, which never carries one - see the next test.
    it("attaches the real HTTP status to the thrown error for a non-ok response", async () => {

        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(401, { error: "nope" })));

        await expect(request("/anything")).rejects.toMatchObject({ status: 401 });

    });

    it("does not attach a status to a network-error/timeout failure", async () => {

        vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));

        try {
            await request("/anything");
            expect.unreachable("request() should have thrown");
        } catch (error) {
            expect(error.status).toBeUndefined();
        }

    });

    it("falls back to a generic server-error message for a 500 with no error body", async () => {

        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(500, {})));

        await expect(request("/anything")).rejects.toThrow("Erro no servidor. Tente novamente em instantes.");

    });

    it("sends the stored authToken as a Bearer header when no explicit token is given", async () => {

        localStorage.setItem("authToken", "stored-token");
        const fetchMock = vi.fn().mockResolvedValue(jsonResponse(200, {}));
        vi.stubGlobal("fetch", fetchMock);

        await request("/anything");

        expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe("Bearer stored-token");

    });

    it("prefers an explicitly passed token over the stored one", async () => {

        localStorage.setItem("authToken", "stored-token");
        const fetchMock = vi.fn().mockResolvedValue(jsonResponse(200, {}));
        vi.stubGlobal("fetch", fetchMock);

        await request("/anything", { token: "explicit-token" });

        expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe("Bearer explicit-token");

    });

});
