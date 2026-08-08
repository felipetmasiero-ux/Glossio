import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";

import { Onboarding } from "./Onboarding";
import { LanguageContext } from "../../contexts/LanguageContext";

function LocationDisplay() {
    const location = useLocation();
    return <div data-testid="location-display">{location.pathname}{location.search}</div>;
}

function renderOnboarding(language) {

    render(
        <LanguageContext.Provider value={{ language, setLanguage: () => {} }}>
            <MemoryRouter initialEntries={["/onboarding"]}>
                <LocationDisplay />
                <Routes>
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="*" element={<div>other page</div>} />
                </Routes>
            </MemoryRouter>
        </LanguageContext.Provider>
    );

}

describe("Onboarding (R5)", () => {

    it("asks about the language being learned, translated to a Portuguese demonym", () => {

        renderOnboarding("English");
        expect(screen.getByText("Você já sabe inglês?")).not.toBeNull();

    });

    it("falls back to the raw language key for an unmapped value, without crashing", () => {

        renderOnboarding("Klingon");
        expect(screen.getByText("Você já sabe Klingon?")).not.toBeNull();

    });

    it("\"Sou iniciante\" goes straight to /home - no parallel level-selection logic here", () => {

        renderOnboarding("French");

        fireEvent.click(screen.getByText("Sou iniciante"));

        expect(screen.getByTestId("location-display").textContent).toBe("/home");

    });

    it("\"Já sei um pouco\" goes to the placement test, deep-linked to the language already chosen", () => {

        renderOnboarding("Portuguese");

        fireEvent.click(screen.getByText("Já sei um pouco"));

        expect(screen.getByTestId("location-display").textContent).toBe("/placement-test?language=Portuguese");

    });

});
