import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const navigateSpy = vi.fn();

vi.mock("react-router-dom", async importOriginal => {
    const actual = await importOriginal();
    return { ...actual, useNavigate: () => navigateSpy };
});

vi.mock("../../hooks/useAuth", () => ({ useAuth: vi.fn() }));

import { Register } from "./Register";
import { useAuth } from "../../hooks/useAuth";

function renderRegister() {
    return render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );
}

function fillAndSubmit() {
    fireEvent.change(screen.getByPlaceholderText("Nome"), { target: { value: "Ana" } });
    fireEvent.change(screen.getByPlaceholderText("E-mail"), { target: { value: "ana@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Senha (mínimo 8 caracteres)"), { target: { value: "senha1234" } });
    fireEvent.click(screen.getByRole("button", { name: /criar conta/i }));
}

describe("Register", () => {

    beforeEach(() => {
        navigateSpy.mockClear();
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    // Regression test: a brand-new account was being sent straight to
    // "/home" whenever localStorage["language"] was already set from an
    // earlier, unrelated session on the same browser (a previous account's
    // language pick that logout never cleared) - skipping language
    // selection entirely and leaving the new account without a language.
    // Registration must always require language selection, regardless of
    // whatever is sitting in localStorage from a prior session.
    it("always sends a newly registered user to /choose-language, even with a stale language in localStorage", async () => {

        localStorage.setItem("language", "French");

        useAuth.mockReturnValue({ register: vi.fn().mockResolvedValue({ user: { id: "1" } }) });

        renderRegister();
        fillAndSubmit();

        await waitFor(() => expect(navigateSpy).toHaveBeenCalledWith("/choose-language", { replace: true }));

    });

    it("sends a newly registered user to /choose-language when localStorage has no language at all", async () => {

        useAuth.mockReturnValue({ register: vi.fn().mockResolvedValue({ user: { id: "1" } }) });

        renderRegister();
        fillAndSubmit();

        await waitFor(() => expect(navigateSpy).toHaveBeenCalledWith("/choose-language", { replace: true }));

    });

    it("shows the error and does not navigate when registration fails", async () => {

        useAuth.mockReturnValue({ register: vi.fn().mockRejectedValue(new Error("E-mail já cadastrado.")) });

        renderRegister();
        fillAndSubmit();

        expect(await screen.findByRole("alert")).not.toBeNull();
        expect(navigateSpy).not.toHaveBeenCalled();

    });

});
