import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";

import { LandingSection } from "./LandingSection";

describe("LandingSection", () => {

    it("renders eyebrow, title, subtitle and children", () => {

        render(
            <LandingSection eyebrow="Benefícios" title="Por que Glossio" subtitle="Uma explicação">
                <p>Conteúdo</p>
            </LandingSection>
        );

        expect(screen.getByText("Benefícios")).not.toBeNull();
        expect(screen.getByRole("heading", { name: "Por que Glossio" })).not.toBeNull();
        expect(screen.getByText("Uma explicação")).not.toBeNull();
        expect(screen.getByText("Conteúdo")).not.toBeNull();

    });

    it("omits the header entirely when no eyebrow/title/subtitle is given", () => {

        const { container } = render(
            <LandingSection>
                <p>Só conteúdo</p>
            </LandingSection>
        );

        expect(container.querySelector(".landing-section__header")).toBeNull();

    });

    it("applies the requested tone class", () => {

        const { container } = render(<LandingSection tone="background">x</LandingSection>);

        expect(container.querySelector(".landing-section--background")).not.toBeNull();

    });

    it("attaches sectionRef to the outer <section>, for scroll-depth sentinels", () => {

        const ref = createRef();

        render(<LandingSection sectionRef={ref}>x</LandingSection>);

        expect(ref.current).not.toBeNull();
        expect(ref.current.tagName).toBe("SECTION");

    });

});
