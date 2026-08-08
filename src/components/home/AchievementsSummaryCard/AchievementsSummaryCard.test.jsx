import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const navigateSpy = vi.fn();

vi.mock("react-router-dom", async importOriginal => {
    const actual = await importOriginal();
    return { ...actual, useNavigate: () => navigateSpy };
});

import { AchievementsSummaryCard } from "./AchievementsSummaryCard";

function renderCard(summary = { unlocked: 3, total: 10 }) {
    return render(
        <MemoryRouter>
            <AchievementsSummaryCard summary={summary} />
        </MemoryRouter>
    );
}

describe("AchievementsSummaryCard", () => {

    it("shows the same unlocked/total progress as before", () => {

        renderCard({ unlocked: 3, total: 10 });

        expect(screen.getByText("Conquistas desbloqueadas")).not.toBeNull();
        expect(screen.getByText("3 / 10")).not.toBeNull();

    });

    it("navigates to /achievements when 'Ver detalhes' is clicked - same destination as before", () => {

        renderCard();

        fireEvent.click(screen.getByRole("button", { name: /Ver detalhes/ }));

        expect(navigateSpy).toHaveBeenCalledWith("/achievements");

    });

});
