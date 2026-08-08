import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const navigateSpy = vi.fn();

vi.mock("react-router-dom", async importOriginal => {
    const actual = await importOriginal();
    return { ...actual, useNavigate: () => navigateSpy };
});

import { StatisticsSummaryCard } from "./StatisticsSummaryCard";

const statistics = {
    totalWordsLearned: 42,
    videosCompleted: 5,
    reviews: { total: 120 }
};

function renderCard() {
    return render(
        <MemoryRouter>
            <StatisticsSummaryCard statistics={statistics} />
        </MemoryRouter>
    );
}

describe("StatisticsSummaryCard", () => {

    it("shows the same three stats as before - words, videos, flashcards", () => {

        renderCard();

        expect(screen.getByText("42")).not.toBeNull();
        expect(screen.getByText("Palavras")).not.toBeNull();
        expect(screen.getByText("5")).not.toBeNull();
        expect(screen.getByText("Vídeos")).not.toBeNull();
        expect(screen.getByText("120")).not.toBeNull();
        expect(screen.getByText("Flashcards")).not.toBeNull();

    });

    it("navigates to /statistics when 'Ver detalhes' is clicked - same destination as before", () => {

        renderCard();

        fireEvent.click(screen.getByRole("button", { name: /Ver detalhes/ }));

        expect(navigateSpy).toHaveBeenCalledWith("/statistics");

    });

});
