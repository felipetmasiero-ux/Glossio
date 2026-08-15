import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const navigateSpy = vi.fn();

vi.mock("react-router-dom", async importOriginal => {
    const actual = await importOriginal();
    return { ...actual, useNavigate: () => navigateSpy };
});

vi.mock("../../../hooks/useAuth", () => ({ useAuth: vi.fn() }));

import { Navbar } from "./Navbar";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useAuth } from "../../../hooks/useAuth";

function renderNavbar(setLanguage) {
    return render(
        <MemoryRouter initialEntries={["/home"]}>
            <LanguageContext.Provider value={{ language: "French", setLanguage }}>
                <Navbar />
            </LanguageContext.Provider>
        </MemoryRouter>
    );
}

describe("Navbar", () => {

    // Regression test: logout used to leave the previous account's chosen
    // language sitting in shared state/localStorage, which then leaked into
    // whichever account registered or logged in next on the same browser
    // (see Register.jsx - a fresh account being sent straight to "/home"
    // instead of "/choose-language" because of this exact leftover value).
    it("resets the shared language on logout, so it can't leak into the next account", () => {

        const logout = vi.fn();
        const setLanguage = vi.fn();

        useAuth.mockReturnValue({ user: { name: "Ana" }, isAuthenticated: true, logout });

        renderNavbar(setLanguage);

        fireEvent.click(screen.getByRole("button", { name: "Sair" }));

        expect(logout).toHaveBeenCalledTimes(1);
        expect(setLanguage).toHaveBeenCalledWith("");
        expect(navigateSpy).toHaveBeenCalledWith("/login", { replace: true });

    });

});
