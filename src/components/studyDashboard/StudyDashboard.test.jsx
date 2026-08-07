import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { StudyDashboard } from "./StudyDashboard";
import { MAX_SESSION_SIZE } from "../../constants/studySession";

function baseDashboard(overrides = {}) {
    return {
        total: 10,
        due: 5,
        streak: { current: 1, longest: 3 },
        dailyGoal: { completed: 1, goal: 10, progress: 10 },
        ...overrides
    };
}

function renderDashboard(dashboard, onStart = vi.fn()) {
    return render(
        <MemoryRouter>
            <StudyDashboard dashboard={dashboard} onStart={onStart} />
        </MemoryRouter>
    );
}

describe("StudyDashboard", () => {

    it("shows the empty state when there are no flashcards at all", () => {

        renderDashboard(baseDashboard({ total: 0, due: 0 }));

        expect(screen.getByText("Nenhum flashcard ainda")).not.toBeNull();
        expect(screen.queryByRole("button", { name: "Começar a estudar" })).toBeNull();

    });

    it("shows the 'all caught up' message, no start button, when nothing is due", () => {

        renderDashboard(baseDashboard({ due: 0 }));

        expect(screen.getByText("Você está em dia! Nenhuma ficha pendente para revisar hoje.")).not.toBeNull();
        expect(screen.queryByRole("button", { name: "Começar a estudar" })).toBeNull();

    });

    it("shows the start button and no session-cap note when due is within the session limit", () => {

        renderDashboard(baseDashboard({ due: MAX_SESSION_SIZE }));

        expect(screen.getByRole("button", { name: "Começar a estudar" })).not.toBeNull();
        expect(screen.queryByText(/continuam pendentes/)).toBeNull();

    });

    it("discloses the session cap and how many will remain when due exceeds the limit", () => {

        renderDashboard(baseDashboard({ due: MAX_SESSION_SIZE + 12 }));

        expect(screen.getByText(
            `Esta sessão cobre ${MAX_SESSION_SIZE} fichas — 12 continuam pendentes para uma próxima sessão.`
        )).not.toBeNull();

    });

});
