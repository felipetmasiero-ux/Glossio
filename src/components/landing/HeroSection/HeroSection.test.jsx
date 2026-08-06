import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { HeroSection } from "./HeroSection";

function renderHero(onPrimaryCta = vi.fn()) {
    render(
        <MemoryRouter>
            <HeroSection onPrimaryCta={onPrimaryCta} />
        </MemoryRouter>
    );
}

describe("HeroSection", () => {

    it("renders the headline and the three real languages", () => {

        renderHero();

        expect(screen.getByRole("heading", { level: 1 })).not.toBeNull();
        expect(screen.getByText("Inglês")).not.toBeNull();
        expect(screen.getByText("Francês")).not.toBeNull();
        expect(screen.getByText("Português")).not.toBeNull();

    });

    it("calls onPrimaryCta when 'Começar agora' is clicked - it does not navigate itself", () => {

        const onPrimaryCta = vi.fn();
        renderHero(onPrimaryCta);

        fireEvent.click(screen.getByRole("button", { name: "Começar agora" }));

        expect(onPrimaryCta).toHaveBeenCalledTimes(1);

    });

    it("links to the placement test and to the public language preview", () => {

        renderHero();

        expect(screen.getByRole("link", { name: /Faça um teste/ }).getAttribute("href")).toBe("/placement-test");
        expect(screen.getByRole("link", { name: /Ver o conteúdo sem criar conta/ }).getAttribute("href")).toBe("/languages");

    });

});
