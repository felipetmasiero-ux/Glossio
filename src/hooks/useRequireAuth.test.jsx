import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";

import { useRequireAuth, DEFAULT_AUTH_GATE_MESSAGE } from "./useRequireAuth";
import { AuthContext } from "../contexts/AuthContext";
import { AuthGateContext } from "../contexts/AuthGateContext";

function wrapper({ isAuthenticated, requestAuth }) {
    return function Wrapper({ children }) {
        return (
            <AuthContext.Provider value={{ isAuthenticated }}>
                <AuthGateContext.Provider value={{ requestAuth }}>
                    {children}
                </AuthGateContext.Provider>
            </AuthContext.Provider>
        );
    };
}

describe("useRequireAuth", () => {

    it("runs the action directly when authenticated, without touching the gate", () => {

        const requestAuth = vi.fn();
        const action = vi.fn();

        const { result } = renderHook(() => useRequireAuth(), {
            wrapper: wrapper({ isAuthenticated: true, requestAuth })
        });

        result.current(action)("arg1", "arg2");

        expect(action).toHaveBeenCalledWith("arg1", "arg2");
        expect(requestAuth).not.toHaveBeenCalled();

    });

    it("requests the auth gate instead of running the action when not authenticated", () => {

        const requestAuth = vi.fn();
        const action = vi.fn();

        const { result } = renderHook(() => useRequireAuth(), {
            wrapper: wrapper({ isAuthenticated: false, requestAuth })
        });

        result.current(action)();

        expect(action).not.toHaveBeenCalled();
        expect(requestAuth).toHaveBeenCalledWith(DEFAULT_AUTH_GATE_MESSAGE);

    });

    it("passes a custom message through to the gate", () => {

        const requestAuth = vi.fn();

        const { result } = renderHook(() => useRequireAuth(), {
            wrapper: wrapper({ isAuthenticated: false, requestAuth })
        });

        result.current(() => {}, "Mensagem customizada")();

        expect(requestAuth).toHaveBeenCalledWith("Mensagem customizada");

    });

});
