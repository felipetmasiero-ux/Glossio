import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const navigateSpy = vi.fn();

vi.mock("react-router-dom", async importOriginal => {
    const actual = await importOriginal();
    return { ...actual, useNavigate: () => navigateSpy };
});

import { PlacementTestCard } from "./PlacementTestCard";

function renderCard(latestResult) {
    return render(
        <MemoryRouter>
            <PlacementTestCard latestResult={latestResult} />
        </MemoryRouter>
    );
}

describe("PlacementTestCard", () => {

    it("invites the user to take the test when there is no result yet", () => {

        renderCard(null);

        expect(screen.getByText("Descubra seu nível")).not.toBeNull();
        expect(screen.getByRole("button", { name: /Fazer teste/ })).not.toBeNull();

    });

    it("shows the latest result and offers to retake it - same behavior as before", () => {

        renderCard({ language: "English", recommendedLevel: "A2" });

        expect(screen.getByText("English · A2")).not.toBeNull();
        expect(screen.getByRole("button", { name: /Refazer teste/ })).not.toBeNull();

    });

    it("navigates to /placement-test when the CTA is clicked - same destination as before", () => {

        renderCard(null);

        fireEvent.click(screen.getByRole("button", { name: /Fazer teste/ }));

        expect(navigateSpy).toHaveBeenCalledWith("/placement-test");

    });

});
