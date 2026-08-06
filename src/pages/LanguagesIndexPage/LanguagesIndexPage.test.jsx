import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";

import { LanguagesIndexPage } from "./LanguagesIndexPage";

function LocationProbe() {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
}

function renderPage() {
    return render(
        <MemoryRouter initialEntries={["/languages"]}>
            <Routes>
                <Route path="/languages" element={<LanguagesIndexPage />} />
                <Route path="*" element={<LocationProbe />} />
            </Routes>
        </MemoryRouter>
    );
}

describe("LanguagesIndexPage", () => {

    // This page requires no auth context at all - reachable while logged
    // out (see App.jsx), so rendering it with no AuthContext/LanguageContext
    // provider at all is itself the regression test.

    it("lists every supported language", () => {

        renderPage();

        expect(screen.getByRole("button", { name: /English/ })).not.toBeNull();
        expect(screen.getByText("Français")).not.toBeNull();
        expect(screen.getByText("Português")).not.toBeNull();

    });

    it("navigates to the public module list for the chosen language", () => {

        renderPage();

        fireEvent.click(screen.getByRole("button", { name: /English/ }));

        expect(screen.getByTestId("location").textContent).toBe("/lessons/language/english");

    });

});
