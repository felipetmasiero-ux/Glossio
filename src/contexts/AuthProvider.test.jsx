import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import { act } from "react";
import { render, waitFor } from "@testing-library/react";

import { AuthProvider } from "./AuthProvider";
import { useAuth } from "../hooks/useAuth";
import * as authApi from "../services/authApi";

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

function Consumer({ onValue }) {
    const auth = useAuth();
    onValue(auth);
    return null;
}

// Security sprint regression guard: logging out (or in) in one browser tab
// used to leave every *other* open tab of the same app showing the old
// session (isAuthenticated/user) until it happened to be reloaded, since
// `token` is per-tab React state, not re-read from localStorage. Fixed via a
// `storage` event listener - the standard cross-tab signal for a
// localStorage change made by another tab.
describe("AuthProvider - cross-tab session sync", () => {

    beforeEach(() => {
        localStorage.clear();
        vi.spyOn(authApi, "meRequest").mockResolvedValue({ user: { id: "u1", name: "Ana" } });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        localStorage.clear();
    });

    it("logs this tab out when another tab removes the token", async () => {

        localStorage.setItem(TOKEN_KEY, "token-abc");

        let latest = null;
        render(
            <AuthProvider>
                <Consumer onValue={value => { latest = value; }} />
            </AuthProvider>
        );

        await waitFor(() => expect(latest.isAuthenticated).toBe(true));

        await act(async () => {
            localStorage.removeItem(TOKEN_KEY);
            window.dispatchEvent(new StorageEvent("storage", { key: TOKEN_KEY, newValue: null }));
        });

        expect(latest.isAuthenticated).toBe(false);
        expect(latest.user).toBeNull();
        expect(latest.token).toBeNull();

    });

    it("adopts a new token when another tab logs in", async () => {

        let latest = null;
        render(
            <AuthProvider>
                <Consumer onValue={value => { latest = value; }} />
            </AuthProvider>
        );

        expect(latest.isAuthenticated).toBe(false);

        await act(async () => {
            localStorage.setItem(TOKEN_KEY, "token-xyz");
            window.dispatchEvent(new StorageEvent("storage", { key: TOKEN_KEY, newValue: "token-xyz" }));
        });

        await waitFor(() => expect(latest.isAuthenticated).toBe(true));
        expect(latest.token).toBe("token-xyz");

    });

    it("ignores storage events for unrelated keys", async () => {

        localStorage.setItem(TOKEN_KEY, "token-abc");

        let latest = null;
        render(
            <AuthProvider>
                <Consumer onValue={value => { latest = value; }} />
            </AuthProvider>
        );

        await waitFor(() => expect(latest.isAuthenticated).toBe(true));

        await act(async () => {
            window.dispatchEvent(new StorageEvent("storage", { key: "some-other-key", newValue: "whatever" }));
        });

        expect(latest.isAuthenticated).toBe(true);
        expect(latest.token).toBe("token-abc");

    });

});

// R1 (post-sprint audit): network failure ≠ invalid session. Errors are
// built the same way httpClient.js actually produces them - a `status`
// property only ever exists on an error that came from a real HTTP
// response; a network/timeout failure never reaches that far and has none.
function httpError(status, message = "error") {
    const error = new Error(message);
    error.status = status;
    return error;
}

function networkError(message = "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.") {
    return new Error(message);
}

describe("AuthProvider - network failure vs invalid session (R1)", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        localStorage.clear();
    });

    it("Cenário A - authenticated, backend reachable, token valid: stays authenticated as before", async () => {

        vi.spyOn(authApi, "meRequest").mockResolvedValue({ user: { id: "u1", name: "Ana" } });
        localStorage.setItem(TOKEN_KEY, "token-abc");

        let latest = null;
        render(
            <AuthProvider>
                <Consumer onValue={value => { latest = value; }} />
            </AuthProvider>
        );

        await waitFor(() => expect(latest.isAuthenticated).toBe(true));

        expect(latest.user).toEqual({ id: "u1", name: "Ana" });
        expect(latest.isLoading).toBe(false);
        expect(localStorage.getItem(TOKEN_KEY)).toBe("token-abc");

    });

    it("Cenário B - backend responds 401 (invalid/expired token): logs out, as before", async () => {

        vi.spyOn(authApi, "meRequest").mockRejectedValue(httpError(401, "Sessão expirada. Faça login novamente."));
        localStorage.setItem(TOKEN_KEY, "token-abc");

        let latest = null;
        render(
            <AuthProvider>
                <Consumer onValue={value => { latest = value; }} />
            </AuthProvider>
        );

        await waitFor(() => expect(latest.isLoading).toBe(false));

        expect(latest.isAuthenticated).toBe(false);
        expect(latest.user).toBeNull();
        expect(latest.token).toBeNull();
        expect(localStorage.getItem(TOKEN_KEY)).toBeNull();

    });

    it("backend responds 404 (token's user no longer exists): treated the same as an invalid session", async () => {

        vi.spyOn(authApi, "meRequest").mockRejectedValue(httpError(404, "Usuário não encontrado."));
        localStorage.setItem(TOKEN_KEY, "token-abc");

        let latest = null;
        render(
            <AuthProvider>
                <Consumer onValue={value => { latest = value; }} />
            </AuthProvider>
        );

        await waitFor(() => expect(latest.isLoading).toBe(false));

        expect(latest.isAuthenticated).toBe(false);
        expect(localStorage.getItem(TOKEN_KEY)).toBeNull();

    });

    it("Cenário C - authenticated, offline (fetch itself fails): does NOT log out", async () => {

        vi.spyOn(authApi, "meRequest").mockRejectedValue(networkError());
        localStorage.setItem(TOKEN_KEY, "token-abc");
        localStorage.setItem(USER_KEY, JSON.stringify({ id: "u1", name: "Ana" }));

        let latest = null;
        render(
            <AuthProvider>
                <Consumer onValue={value => { latest = value; }} />
            </AuthProvider>
        );

        await waitFor(() => expect(latest.isLoading).toBe(false));

        expect(latest.isAuthenticated).toBe(true);
        expect(latest.user).toEqual({ id: "u1", name: "Ana" });
        expect(latest.token).toBe("token-abc");

    });

    it("Cenário D - authenticated, backend times out / temporarily unavailable: does NOT log out", async () => {

        vi.spyOn(authApi, "meRequest").mockRejectedValue(networkError("Tempo de conexão esgotado. Tente novamente."));
        localStorage.setItem(TOKEN_KEY, "token-abc");
        localStorage.setItem(USER_KEY, JSON.stringify({ id: "u1", name: "Ana" }));

        let latest = null;
        render(
            <AuthProvider>
                <Consumer onValue={value => { latest = value; }} />
            </AuthProvider>
        );

        await waitFor(() => expect(latest.isLoading).toBe(false));

        expect(latest.isAuthenticated).toBe(true);
        expect(latest.token).toBe("token-abc");

    });

    it("a 5xx from the backend itself is also treated as inconclusive, not an invalid session", async () => {

        vi.spyOn(authApi, "meRequest").mockRejectedValue(httpError(503, "Erro no servidor. Tente novamente em instantes."));
        localStorage.setItem(TOKEN_KEY, "token-abc");
        localStorage.setItem(USER_KEY, JSON.stringify({ id: "u1", name: "Ana" }));

        let latest = null;
        render(
            <AuthProvider>
                <Consumer onValue={value => { latest = value; }} />
            </AuthProvider>
        );

        await waitFor(() => expect(latest.isLoading).toBe(false));

        expect(latest.isAuthenticated).toBe(true);
        expect(localStorage.getItem(TOKEN_KEY)).toBe("token-abc");

    });

    it("the token stays in localStorage (not just in memory) after a network error", async () => {

        vi.spyOn(authApi, "meRequest").mockRejectedValue(networkError());
        localStorage.setItem(TOKEN_KEY, "token-abc");
        localStorage.setItem(USER_KEY, JSON.stringify({ id: "u1", name: "Ana" }));

        let latest = null;
        render(
            <AuthProvider>
                <Consumer onValue={value => { latest = value; }} />
            </AuthProvider>
        );

        await waitFor(() => expect(latest.isLoading).toBe(false));

        expect(localStorage.getItem(TOKEN_KEY)).toBe("token-abc");
        expect(localStorage.getItem(USER_KEY)).toBe(JSON.stringify({ id: "u1", name: "Ana" }));

    });

    it("Cenário E - unauthenticated (no token at all): unaffected, never calls meRequest, no crash", async () => {

        const meRequestSpy = vi.spyOn(authApi, "meRequest");

        let latest = null;
        render(
            <AuthProvider>
                <Consumer onValue={value => { latest = value; }} />
            </AuthProvider>
        );

        expect(latest.isAuthenticated).toBe(false);
        expect(latest.isLoading).toBe(false);
        expect(latest.user).toBeNull();
        expect(latest.token).toBeNull();
        expect(meRequestSpy).not.toHaveBeenCalled();

    });

    it("regression: a normal login still authenticates and caches the user for future offline use", async () => {

        vi.spyOn(authApi, "loginRequest").mockResolvedValue({ token: "fresh-token", user: { id: "u2", name: "Beto" } });

        let latest = null;
        render(
            <AuthProvider>
                <Consumer onValue={value => { latest = value; }} />
            </AuthProvider>
        );

        expect(latest.isAuthenticated).toBe(false);

        await act(async () => {
            await latest.login("beto@example.com", "hunter2");
        });

        expect(latest.isAuthenticated).toBe(true);
        expect(latest.user).toEqual({ id: "u2", name: "Beto" });
        expect(localStorage.getItem(TOKEN_KEY)).toBe("fresh-token");
        expect(localStorage.getItem(USER_KEY)).toBe(JSON.stringify({ id: "u2", name: "Beto" }));

    });

    it("regression: logout still clears the token and the cached user", async () => {

        vi.spyOn(authApi, "meRequest").mockResolvedValue({ user: { id: "u1", name: "Ana" } });
        localStorage.setItem(TOKEN_KEY, "token-abc");

        let latest = null;
        render(
            <AuthProvider>
                <Consumer onValue={value => { latest = value; }} />
            </AuthProvider>
        );

        await waitFor(() => expect(latest.isAuthenticated).toBe(true));

        act(() => {
            latest.logout();
        });

        expect(latest.isAuthenticated).toBe(false);
        expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
        expect(localStorage.getItem(USER_KEY)).toBeNull();

    });

});
