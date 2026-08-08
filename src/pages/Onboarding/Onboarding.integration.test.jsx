import { describe, expect, it } from "vitest";
import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";

import { LanguageSelection } from "../LanguageSelection/LanguageSelection";
import { Onboarding } from "./Onboarding";
import { PlacementTest } from "../PlacementTest/PlacementTest";
import { LanguageContext } from "../../contexts/LanguageContext";

// R5: real end-to-end coverage of the new "where do I start" flow - unlike
// the two unit test files (which render LanguageSelection/Onboarding in
// isolation), this wires up the actual LanguageSelection -> Onboarding ->
// PlacementTest/Home chain with real routing and a real, stateful
// LanguageContext, so a click genuinely propagates through the same path a
// user would take. PlacementTest itself is the real component (not a
// stand-in) - proving its existing deep-link support (?language=...) still
// works when reached from this new entry point, without re-testing its
// internal quiz/scoring logic.
function LocationDisplay() {
    const location = useLocation();
    return <div data-testid="location-display">{location.pathname}{location.search}</div>;
}

function AppLanguageProvider({ initialLanguage = "", children }) {
    const [language, setLanguage] = useState(initialLanguage);
    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

function renderRealFlow({ initialLanguage = "", initialEntries = ["/choose-language"] } = {}) {

    render(
        <AppLanguageProvider initialLanguage={initialLanguage}>
            <MemoryRouter initialEntries={initialEntries}>
                <LocationDisplay />
                <Routes>
                    <Route path="/choose-language" element={<LanguageSelection />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/home" element={<div>Home Page</div>} />
                    <Route path="/placement-test" element={<PlacementTest />} />
                </Routes>
            </MemoryRouter>
        </AppLanguageProvider>
    );

}

describe("Onboarding - real routing end to end (R5)", () => {

    it("Fluxo A - new user + iniciante: reaches onboarding, then lands on Home with no placement test involved", () => {

        renderRealFlow();

        fireEvent.click(screen.getByRole("button", { name: /English/ }));

        expect(screen.getByText("Você já sabe inglês?")).not.toBeNull();

        fireEvent.click(screen.getByText("Sou iniciante"));

        expect(screen.getByText("Home Page")).not.toBeNull();
        expect(screen.queryByText(/Teste de nivelamento/)).toBeNull();

    });

    it("Fluxo B - new user + já sei: reaches the real PlacementTest, deep-linked straight past its own language picker", () => {

        renderRealFlow();

        fireEvent.click(screen.getByRole("button", { name: /Français/ }));
        fireEvent.click(screen.getByText("Já sei um pouco"));

        // PlacementTest's own STEPS.LANGUAGE screen ("Qual idioma você quer
        // testar?") is skipped entirely - proof the existing ?language=
        // deep-link (unmodified) is what's doing the work here, not new
        // logic duplicating it.
        expect(screen.queryByText("Qual idioma você quer testar?")).toBeNull();
        expect(screen.getByText("Pronto para começar?")).not.toBeNull();
        expect(screen.getByText(/Teste de nivelamento • French/)).not.toBeNull();

    });

    it("Fluxo C - existing user (a language was already set) never sees onboarding, even if /choose-language is revisited", () => {

        renderRealFlow({ initialLanguage: "English" });

        fireEvent.click(screen.getByRole("button", { name: /Français/ }));

        expect(screen.getByText("Home Page")).not.toBeNull();
        expect(screen.queryByText(/Você já sabe/)).toBeNull();

    });

});
