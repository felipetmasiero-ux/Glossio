import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

vi.mock("../../utils/analytics", () => ({
    trackEvent: vi.fn(),
    ANALYTICS_EVENTS: {
        LANDING_CTA_CLICKED: "landing_cta_clicked",
        LANDING_SCROLL_DEPTH: "landing_scroll_depth",
        LANDING_FAQ_OPENED: "landing_faq_opened"
    }
}));

import { trackEvent } from "../../utils/analytics";
import { Landing } from "./Landing";

// jsdom doesn't implement IntersectionObserver - useScrollDepthTracking
// just needs a constructible stub here, its own behavior is covered by
// useScrollDepthTracking.test.js.
class NoopIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

function renderLanding() {
    return render(
        <MemoryRouter initialEntries={["/"]}>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/choose-language" element={<div>Escolha um idioma</div>} />
                <Route path="/register" element={<div>Página de registro</div>} />
            </Routes>
        </MemoryRouter>
    );
}

describe("Landing", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        vi.stubGlobal("IntersectionObserver", NoopIntersectionObserver);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("renders the hero headline", () => {

        renderLanding();

        expect(screen.getByRole("heading", { level: 1 })).not.toBeNull();

    });

    it("tracks and navigates when the hero CTA ('Começar agora') is clicked", () => {

        renderLanding();

        fireEvent.click(screen.getByRole("button", { name: "Começar agora" }));

        expect(trackEvent).toHaveBeenCalledWith("landing_cta_clicked", { cta: "comecar_agora", location: "hero" });
        expect(screen.getByText("Escolha um idioma")).not.toBeNull();

    });

    it("tracks and navigates when the final CTA ('Criar conta grátis') is clicked", () => {

        renderLanding();

        fireEvent.click(screen.getByRole("button", { name: "Criar conta grátis" }));

        expect(trackEvent).toHaveBeenCalledWith("landing_cta_clicked", { cta: "criar_conta", location: "final_cta" });
        expect(screen.getByText("Página de registro")).not.toBeNull();

    });

    it("tracks a FAQ opening with its question", () => {

        renderLanding();

        const details = screen.getByText("O Glossio é gratuito?").closest("details");
        details.open = true;
        fireEvent(details, new Event("toggle", { bubbles: false }));

        expect(trackEvent).toHaveBeenCalledWith("landing_faq_opened", { question: "O Glossio é gratuito?" });

    });

    it("does not render a testimonials section while there is no real testimonial data", () => {

        renderLanding();

        expect(screen.queryByText("Quem estuda com o Glossio")).toBeNull();

    });

    it("renders the FAQ JSON-LD as a script tag on the page", () => {

        renderLanding();

        const script = document.querySelector("script[type='application/ld+json']");
        expect(script).not.toBeNull();
        expect(script.textContent).toContain("FAQPage");

    });

});
