import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { FeaturesSection } from "./FeaturesSection";

describe("FeaturesSection", () => {

    it("renders the four pillars", () => {

        render(<FeaturesSection />);

        expect(screen.getByRole("heading", { name: "Learn" })).not.toBeNull();
        expect(screen.getByRole("heading", { name: "Explore" })).not.toBeNull();
        expect(screen.getByRole("heading", { name: "Collect" })).not.toBeNull();
        expect(screen.getByRole("heading", { name: "Review" })).not.toBeNull();

    });

});
