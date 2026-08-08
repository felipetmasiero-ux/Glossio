import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import { AuthProvider } from "../../contexts/AuthProvider";
import * as authApi from "../../services/authApi";

// Unlike ProtectedRoute.test.jsx (which mocks useAuth directly to unit-test
// ProtectedRoute's own redirect logic in isolation), this file wires up the
// *real* AuthProvider so it can prove the two actually cooperate correctly
// for R1's real-world case: a returning user opening the app with no
// network. useCloudSync is mocked only because it isn't what's under test
// here and would otherwise make its own real API calls.
vi.mock("../../hooks/useCloudSync", () => ({ useCloudSync: () => ({ isHydrating: false }) }));

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

function renderProtectedApp() {
    return render(
        <AuthProvider>
            <MemoryRouter initialEntries={["/home"]}>
                <Routes>
                    <Route path="/login" element={<div>Login Page</div>} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/home" element={<div>Home Page</div>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        </AuthProvider>
    );
}

describe("ProtectedRoute + real AuthProvider - offline session (R1)", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        localStorage.clear();
    });

    it("does not redirect to /login when a returning user's session check fails due to a network error", async () => {

        vi.spyOn(authApi, "meRequest").mockRejectedValue(
            new Error("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.")
        );

        localStorage.setItem(TOKEN_KEY, "token-abc");
        localStorage.setItem(USER_KEY, JSON.stringify({ id: "u1", name: "Ana" }));

        renderProtectedApp();

        await waitFor(() => expect(screen.getByText("Home Page")).not.toBeNull());

        expect(screen.queryByText("Login Page")).toBeNull();

    });

    it("still redirects to /login when the session check comes back as a real 401", async () => {

        const error = new Error("Sessão expirada. Faça login novamente.");
        error.status = 401;
        vi.spyOn(authApi, "meRequest").mockRejectedValue(error);

        localStorage.setItem(TOKEN_KEY, "token-abc");
        localStorage.setItem(USER_KEY, JSON.stringify({ id: "u1", name: "Ana" }));

        renderProtectedApp();

        await waitFor(() => expect(screen.getByText("Login Page")).not.toBeNull());

        expect(screen.queryByText("Home Page")).toBeNull();

    });

});
