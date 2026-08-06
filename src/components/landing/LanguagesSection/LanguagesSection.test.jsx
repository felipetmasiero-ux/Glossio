import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { LanguagesSection } from "./LanguagesSection";

function renderSection() {
    return render(
        <MemoryRouter initialEntries={["/"]}>
            <Routes>
                <Route path="/" element={<LanguagesSection />} />
                <Route path="/lessons/language/:language" element={<div>Módulos</div>} />
            </Routes>
        </MemoryRouter>
    );
}

describe("LanguagesSection", () => {

    it("renders the three supported languages", () => {

        renderSection();

        expect(screen.getAllByText("English").length).toBeGreaterThan(0);
        expect(screen.getByText("Français")).not.toBeNull();
        expect(screen.getByText("Português")).not.toBeNull();

    });

    it("navigates to the public course browser for the chosen language", () => {

        renderSection();

        fireEvent.click(screen.getByRole("button", { name: /English/ }));

        expect(screen.getByText("Módulos")).not.toBeNull();

    });

});
