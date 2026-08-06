import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AuthGateBanner } from "./AuthGateBanner";
import { AuthGateContext } from "../../../contexts/AuthGateContext";

function renderBanner({ message, dismiss = vi.fn() }) {
    return render(
        <MemoryRouter>
            <AuthGateContext.Provider value={{ message, dismiss }}>
                <AuthGateBanner />
            </AuthGateContext.Provider>
        </MemoryRouter>
    );
}

describe("AuthGateBanner", () => {

    it("renders nothing when there is no message", () => {
        const { container } = renderBanner({ message: null });
        expect(container.firstChild).toBeNull();
    });

    it("shows the message and a create-account CTA when one is set", () => {
        renderBanner({ message: "Crie uma conta grátis para salvar seu progresso." });

        expect(screen.getByText("Crie uma conta grátis para salvar seu progresso.")).not.toBeNull();
        expect(screen.getByText("Criar conta grátis")).not.toBeNull();
    });

    it("dismisses without navigating when the close button is clicked", () => {
        const dismiss = vi.fn();
        renderBanner({ message: "Teste", dismiss });

        fireEvent.click(screen.getByLabelText("Fechar"));

        expect(dismiss).toHaveBeenCalled();
    });

});
