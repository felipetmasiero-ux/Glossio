import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { HowItWorksSection } from "./HowItWorksSection";

describe("HowItWorksSection", () => {

    it("renders the four steps in order, numbered 01-04", () => {

        render(<HowItWorksSection />);

        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(4);
        expect(items[0].textContent).toContain("01");
        expect(items[0].textContent).toContain("Escolha um idioma");
        expect(items[3].textContent).toContain("04");
        expect(items[3].textContent).toContain("Revise no momento certo");

    });

});
