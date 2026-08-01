import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";

vi.mock("../../hooks/useAuth", () => ({ useAuth: vi.fn() }));
vi.mock("../../hooks/useCloudSync", () => ({ useCloudSync: vi.fn() }));

import { useAuth } from "../../hooks/useAuth";
import { useCloudSync } from "../../hooks/useCloudSync";

function LoginProbe() {
    const location = useLocation();
    return <div data-testid="login-state">{JSON.stringify(location.state ?? null)}</div>;
}

function renderApp(initialEntry) {
    return render(
        <MemoryRouter initialEntries={[initialEntry]}>
            <Routes>
                <Route path="/login" element={<LoginProbe />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<div>Home Page</div>} />
                    <Route path="/statistics" element={<div>Statistics Page</div>} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
}

describe("ProtectedRoute", () => {

    beforeEach(() => {
        useCloudSync.mockReturnValue({ isHydrating: false });
    });

    it("remembers the page when a logged-out user deep-links into a protected route", () => {

        useAuth.mockReturnValue({ isAuthenticated: false, isLoading: false });

        renderApp("/statistics");

        const state = JSON.parse(screen.getByTestId("login-state").textContent);
        expect(state.from.pathname).toBe("/statistics");

    });

    // Regression test: logging out from a protected page used to leak that
    // page's path into `location.state.from` on the resulting "/login"
    // redirect, because ProtectedRoute always attached `{ from: location }`
    // regardless of *why* the user became unauthenticated. That stale state
    // could then resurface on a later, unrelated login (or via the browser's
    // back button) and send the user back to a page they'd intentionally left.
    it("does not remember a 'from' page when the user was authenticated here and then logged out", () => {

        useAuth.mockReturnValue({ isAuthenticated: true, isLoading: false });

        const { rerender } = renderApp("/home");

        expect(screen.getByText("Home Page")).not.toBeNull();

        useAuth.mockReturnValue({ isAuthenticated: false, isLoading: false });

        rerender(
            <MemoryRouter initialEntries={["/home"]}>
                <Routes>
                    <Route path="/login" element={<LoginProbe />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/home" element={<div>Home Page</div>} />
                        <Route path="/statistics" element={<div>Statistics Page</div>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByTestId("login-state").textContent).toBe("null");

    });

    it("renders the outlet once authenticated and hydrated", () => {

        useAuth.mockReturnValue({ isAuthenticated: true, isLoading: false });

        renderApp("/home");

        expect(screen.getByText("Home Page")).not.toBeNull();

    });

    it("renders nothing while still loading, without redirecting", () => {

        useAuth.mockReturnValue({ isAuthenticated: false, isLoading: true });

        renderApp("/home");

        expect(screen.queryByText("Home Page")).toBeNull();
        expect(screen.queryByTestId("login-state")).toBeNull();

    });

});
