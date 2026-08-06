import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { RecommendedForYouCard } from "./RecommendedForYouCard";

function renderCard(recommendations) {
    return render(
        <MemoryRouter>
            <RecommendedForYouCard recommendations={recommendations} />
        </MemoryRouter>
    );
}

const recommendation = {
    id: "weak-lesson-english-a1-greetings",
    type: "review-lesson",
    priority: 1,
    title: "Revisar: Greetings",
    reason: "Você acertou apenas 33% nesta lição.",
    href: "/lessons/english-a1-greetings",
    icon: "book"
};

describe("RecommendedForYouCard", () => {

    it("renders nothing when there are no recommendations", () => {
        const { container } = renderCard([]);
        expect(container.firstChild).toBeNull();
    });

    it("renders each recommendation's title and reason", () => {

        renderCard([recommendation]);

        expect(screen.getByText("Revisar: Greetings")).not.toBeNull();
        expect(screen.getByText("Você acertou apenas 33% nesta lição.")).not.toBeNull();

    });

    it("links each recommendation to its href", () => {

        renderCard([recommendation]);

        const link = screen.getByRole("link", { name: /Revisar: Greetings/ });

        expect(link.getAttribute("href")).toBe("/lessons/english-a1-greetings");

    });

    it("renders more than one recommendation", () => {

        renderCard([
            recommendation,
            { ...recommendation, id: "other", title: "Estudar flashcards novos", href: "/flashcards" }
        ]);

        expect(screen.getByText("Revisar: Greetings")).not.toBeNull();
        expect(screen.getByText("Estudar flashcards novos")).not.toBeNull();

    });

});
