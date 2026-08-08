import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../common/Icon/Icon", () => ({
    Icon: ({ name }) => <span data-testid="icon" data-name={name} />
}));

import { ResumeActivityCard } from "./ResumeActivityCard";

function renderCard(activity) {
    return render(
        <MemoryRouter>
            <ResumeActivityCard activity={activity} />
        </MemoryRouter>
    );
}

describe("ResumeActivityCard", () => {

    it("renders nothing when there is no activity", () => {
        const { container } = renderCard(null);
        expect(container.firstChild).toBeNull();
    });

    it("shows the exercise icon and label - regression", () => {
        renderCard({ type: "exercise", label: "Continuar exercícios", remaining: 3, href: "/exercises/lesson-1" });
        expect(screen.getByTestId("icon").dataset.name).toBe("pencil");
        expect(screen.getByText("Continuar exercícios")).not.toBeNull();
        expect(screen.getByText("3 restantes")).not.toBeNull();
    });

    it("shows the flashcards icon and label - regression", () => {
        renderCard({ type: "flashcards", label: "Continuar revisão de flashcards", remaining: 1, href: "/flashcards" });
        expect(screen.getByTestId("icon").dataset.name).toBe("cards");
        expect(screen.getByText("1 restante")).not.toBeNull();
    });

    it("shows the lesson icon and label (L4)", () => {
        renderCard({ type: "lesson", label: "Continuar lição", remaining: 2, href: "/lessons/greetings" });
        expect(screen.getByTestId("icon").dataset.name).toBe("book");
        expect(screen.getByText("Continuar lição")).not.toBeNull();
        expect(screen.getByText("2 restantes")).not.toBeNull();
    });

    it("shows the video icon and label without a remaining subtitle (L4)", () => {
        renderCard({ type: "video", label: "Continuar vídeo", href: "/explore/some-video" });
        expect(screen.getByTestId("icon").dataset.name).toBe("play");
        expect(screen.getByText("Continuar vídeo")).not.toBeNull();
        expect(screen.queryByText(/restante/)).toBeNull();
    });

    it("falls back to the cards icon for an unrecognized type - compatibility with old/partial data", () => {
        renderCard({ type: "something-old-and-unknown", label: "?", href: "/" });
        expect(screen.getByTestId("icon").dataset.name).toBe("cards");
    });

    it("navigates to the activity's href when Continuar is clicked", () => {
        renderCard({ type: "lesson", label: "Continuar lição", href: "/lessons/greetings" });
        expect(() => fireEvent.click(screen.getByText("Continuar"))).not.toThrow();
    });

});
