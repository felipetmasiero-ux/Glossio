import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { SpacedRepetitionSection } from "./SpacedRepetitionSection";
import { FIRST_INTERVAL, SECOND_INTERVAL } from "../../../constants/scheduling";

describe("SpacedRepetitionSection", () => {

    it("renders a timeline derived from the real SM-2 constants, not made-up numbers", () => {

        render(<SpacedRepetitionSection />);

        expect(screen.getByText(`+${FIRST_INTERVAL}d`)).not.toBeNull();
        expect(screen.getByText(`+${SECOND_INTERVAL}d`)).not.toBeNull();

    });

    it("explains the forgetting curve in plain language", () => {

        render(<SpacedRepetitionSection />);

        expect(screen.getByText(/curva do esquecimento/)).not.toBeNull();

    });

});
