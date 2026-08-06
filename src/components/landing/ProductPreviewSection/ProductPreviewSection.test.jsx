import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ProductPreviewSection } from "./ProductPreviewSection";

describe("ProductPreviewSection", () => {

    it("renders the three device mockup captions", () => {

        render(<ProductPreviewSection />);

        expect(screen.getByText("Lição estruturada")).not.toBeNull();
        expect(screen.getByText("Revisão espaçada")).not.toBeNull();
        expect(screen.getByText("Recomendado para você")).not.toBeNull();

    });

    it("marks the decorative screens as aria-hidden so only captions are announced", () => {

        const { container } = render(<ProductPreviewSection />);

        const hiddenFrames = container.querySelectorAll("[aria-hidden='true']");
        expect(hiddenFrames.length).toBeGreaterThan(0);

    });

});
