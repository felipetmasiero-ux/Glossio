import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import { act } from "react";
import { render, waitFor } from "@testing-library/react";

import { AuthProvider } from "./AuthProvider";
import { useAuth } from "../hooks/useAuth";
import * as authApi from "../services/authApi";

const TOKEN_KEY = "authToken";

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
