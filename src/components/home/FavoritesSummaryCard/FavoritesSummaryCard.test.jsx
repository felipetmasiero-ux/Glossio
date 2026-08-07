import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const navigateSpy = vi.fn();

vi.mock("react-router-dom", async importOriginal => {
    const actual = await importOriginal();
    return { ...actual, useNavigate: () => navigateSpy };
});

import { FavoritesSummaryCard } from "./FavoritesSummaryCard";

describe("FavoritesSummaryCard", () => {

    it("navigates to /my-flashcards with favoritesOnly:true when 'Ver coleção' is clicked", () => {

        render(
            <MemoryRouter>
                <FavoritesSummaryCard favoriteCount={3} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: /Ver coleção/ }));

        expect(navigateSpy).toHaveBeenCalledWith("/my-flashcards", { state: { favoritesOnly: true } });

    });

    it("shows the favorite count", () => {

        render(
            <MemoryRouter>
                <FavoritesSummaryCard favoriteCount={5} />
            </MemoryRouter>
        );

        expect(screen.getByText("5 palavras")).not.toBeNull();

    });

});
