import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { FinalCtaSection } from "./FinalCtaSection";

describe("FinalCtaSection", () => {

    it("calls onCta when 'Criar conta grátis' is clicked - it does not navigate itself", () => {

        const onCta = vi.fn();
        render(<FinalCtaSection onCta={onCta} />);

        fireEvent.click(screen.getByRole("button", { name: "Criar conta grátis" }));

        expect(onCta).toHaveBeenCalledTimes(1);

    });

});
