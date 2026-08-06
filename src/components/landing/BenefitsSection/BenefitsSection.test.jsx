import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { BenefitsSection } from "./BenefitsSection";

describe("BenefitsSection", () => {

    it("renders every benefit's title and description", () => {

        render(<BenefitsSection />);

        expect(screen.getByText("Você não esquece o que aprende")).not.toBeNull();
        expect(screen.getByText("Estuda o que importa, no seu ritmo")).not.toBeNull();
        expect(screen.getByText("Progresso que dá pra ver")).not.toBeNull();
        expect(screen.getByText("Conteúdo de verdade, não frases soltas")).not.toBeNull();

    });

});
