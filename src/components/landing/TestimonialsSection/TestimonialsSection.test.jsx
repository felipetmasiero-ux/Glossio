import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { TestimonialsSection } from "./TestimonialsSection";

describe("TestimonialsSection", () => {

    it("renders nothing when there are no testimonials yet (compatibility with a fresh product, no data fabricated)", () => {

        const { container } = render(<TestimonialsSection />);

        expect(container.firstChild).toBeNull();

    });

    it("renders a quote, name and context once real testimonials are provided", () => {

        render(
            <TestimonialsSection
                testimonials={[
                    { id: "1", quote: "Finalmente parei de esquecer vocabulário.", name: "Ana", context: "Estudando francês há 3 meses" }
                ]}
            />
        );

        expect(screen.getByText("Finalmente parei de esquecer vocabulário.")).not.toBeNull();
        expect(screen.getByText("Ana")).not.toBeNull();
        expect(screen.getByText("Estudando francês há 3 meses")).not.toBeNull();

    });

});
