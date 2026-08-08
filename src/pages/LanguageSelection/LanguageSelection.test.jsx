import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";

import { LanguageSelection } from "./LanguageSelection";
import { LanguageContext } from "../../contexts/LanguageContext";
import { trackEvent } from "../../utils/analytics";

vi.mock("../../utils/analytics", async importOriginal => {
    const actual = await importOriginal();
    return { ...actual, trackEvent: vi.fn() };
});

function LocationDisplay() {
    const location = useLocation();
    return <div data-testid="location-display">{location.pathname}{location.search}</div>;
}

// R5 (onboarding): a language already present *before* the pick means an
// existing user switching study language (e.g. Profile's "trocar idioma")
// - the exact same signal Register.jsx/Login.jsx already use to decide
// whether /choose-language is even reachable. `null` means the picker's
// setLanguage callback should never be invoked before this test provides
// its own real setState-backed one via renderPicker.
function renderPicker(currentLanguage) {

    const setLanguage = vi.fn();

    render(
        <LanguageContext.Provider value={{ language: currentLanguage, setLanguage }}>
            <MemoryRouter initialEntries={["/choose-language"]}>
                <LocationDisplay />
                <Routes>
                    <Route path="/choose-language" element={<LanguageSelection />} />
                    <Route path="*" element={<div>other page</div>} />
                </Routes>
            </MemoryRouter>
        </LanguageContext.Provider>
    );

    return { setLanguage };

}

describe("LanguageSelection - onboarding routing (R5)", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("sends a first-ever language pick to /onboarding", () => {

        const { setLanguage } = renderPicker("");

        fireEvent.click(screen.getByRole("button", { name: /English/ }));

        expect(setLanguage).toHaveBeenCalledWith("English");
        expect(trackEvent).toHaveBeenCalledWith("language_selected", { language: "English" });
        expect(screen.getByTestId("location-display").textContent).toBe("/onboarding");

    });

    it("sends a language switch (a language already existed) straight to /home, unaffected by onboarding", () => {

        const { setLanguage } = renderPicker("English");

        fireEvent.click(screen.getByRole("button", { name: /Français/ }));

        expect(setLanguage).toHaveBeenCalledWith("French");
        expect(trackEvent).toHaveBeenCalledWith("language_selected", { language: "French" });
        expect(screen.getByTestId("location-display").textContent).toBe("/home");

    });

});
