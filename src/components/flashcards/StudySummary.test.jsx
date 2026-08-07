import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { StudySummary } from "./StudySummary";

const stats = { again: 1, good: 2, easy: 3 };

function renderSummary(props = {}) {
    return render(
        <MemoryRouter>
            <StudySummary stats={stats} totalCards={6} onRestart={vi.fn()} {...props} />
        </MemoryRouter>
    );
}

describe("StudySummary", () => {

    it("shows no remaining-due message when nothing is pending beyond this session", () => {

        renderSummary({ remainingDue: 0 });

        expect(screen.queryByText(/fichas? pendentes?/)).toBeNull();

    });

    it("shows how many cards remain pending when the session didn't cover everything", () => {

        renderSummary({ remainingDue: 15 });

        expect(screen.getByText("Você ainda tem 15 fichas pendentes para revisar.")).not.toBeNull();

    });

    it("uses singular phrasing for exactly one remaining card", () => {

        renderSummary({ remainingDue: 1 });

        expect(screen.getByText("Você ainda tem 1 ficha pendente para revisar.")).not.toBeNull();

    });

    it("defaults to no remaining-due message when the prop is omitted - compatibility with existing callers", () => {

        render(
            <MemoryRouter>
                <StudySummary stats={stats} totalCards={6} onRestart={vi.fn()} />
            </MemoryRouter>
        );

        expect(screen.queryByText(/fichas? pendentes?/)).toBeNull();

    });

    it("still calls onRestart via the existing 'Estudar de novo' button - the same flow picks up remaining cards", () => {

        const onRestart = vi.fn();
        renderSummary({ remainingDue: 15, onRestart });

        screen.getByRole("button", { name: "Estudar de novo" }).click();

        expect(onRestart).toHaveBeenCalledTimes(1);

    });

});
