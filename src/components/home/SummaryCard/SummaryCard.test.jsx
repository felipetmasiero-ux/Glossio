import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("../../common/Icon/Icon", () => ({
    Icon: ({ name, fill }) => <span data-testid="icon" data-name={name} data-fill={fill ?? ""} />
}));

import { SummaryCard } from "./SummaryCard";

describe("SummaryCard", () => {

    it("renders the title", () => {
        render(<SummaryCard title="Favoritas" />);
        expect(screen.getByText("Favoritas")).not.toBeNull();
    });

    it("renders the value", () => {
        render(<SummaryCard title="Conquistas" value="3 / 10" />);
        expect(screen.getByText("3 / 10")).not.toBeNull();
    });

    it("renders the description", () => {
        render(<SummaryCard title="Continuar exercícios" description="3 restantes" />);
        expect(screen.getByText("3 restantes")).not.toBeNull();
    });

    it("does not render a description paragraph when none is given", () => {
        const { container } = render(<SummaryCard title="Favoritas" value="2 palavras" />);
        expect(container.querySelector(".home-summary-card__description")).toBeNull();
    });

    it("renders the icon with the given name", () => {
        render(<SummaryCard icon="star" title="Favoritas" />);
        expect(screen.getByTestId("icon").dataset.name).toBe("star");
    });

    it("renders no icon when none is given", () => {
        render(<SummaryCard title="Conquistas" value="3 / 10" />);
        expect(screen.queryByTestId("icon")).toBeNull();
    });

    it("passes iconFill through to the icon (e.g. a filled star)", () => {
        render(<SummaryCard icon="star" iconFill="currentColor" title="Favoritas" />);
        expect(screen.getByTestId("icon").dataset.fill).toBe("currentColor");
    });

    it("renders auxiliary content via children", () => {
        render(
            <SummaryCard ctaLabel="Ver detalhes" onCtaClick={vi.fn()}>
                <div data-testid="aux">custom stats row</div>
            </SummaryCard>
        );
        expect(screen.getByTestId("aux")).not.toBeNull();
    });

    it("renders the CTA label and calls onCtaClick when clicked", () => {

        const onCtaClick = vi.fn();

        render(<SummaryCard title="Favoritas" ctaLabel="Ver coleção" onCtaClick={onCtaClick} />);

        fireEvent.click(screen.getByRole("button", { name: /Ver coleção/ }));

        expect(onCtaClick).toHaveBeenCalledTimes(1);

    });

    it("renders no CTA button when ctaLabel is omitted", () => {
        render(<SummaryCard title="Favoritas" value="2 palavras" />);
        expect(screen.queryByRole("button")).toBeNull();
    });

    it("shows the trailing chevron icon on the CTA by default", () => {
        render(<SummaryCard title="Favoritas" ctaLabel="Ver coleção" onCtaClick={vi.fn()} />);
        expect(screen.getByTestId("icon").dataset.name).toBe("chevron-right");
    });

    it("omits the CTA icon when ctaIcon is explicitly null", () => {
        render(<SummaryCard title="Continuar exercícios" ctaLabel="Continuar" ctaIcon={null} onCtaClick={vi.fn()} />);
        expect(screen.queryByTestId("icon")).toBeNull();
    });

    it("applies the numeric value modifier by default", () => {
        const { container } = render(<SummaryCard title="Favoritas" value="2 palavras" />);
        expect(container.querySelector(".home-summary-card__value--numeric")).not.toBeNull();
    });

    it("omits the numeric value modifier when numericValue is false - non-numeric text like Placement Test's result", () => {
        const { container } = render(<SummaryCard title="Teste de nivelamento" value="Descubra seu nível" numericValue={false} />);
        expect(container.querySelector(".home-summary-card__value--numeric")).toBeNull();
    });

    it("renders the title prominently when it's the only content (no value, no children)", () => {
        const { container } = render(<SummaryCard title="Continuar exercícios" description="3 restantes" ctaLabel="Continuar" onCtaClick={vi.fn()} />);
        expect(container.querySelector(".home-summary-card__title--prominent")).not.toBeNull();
    });

    it("does not render the title prominently when a value is also present", () => {
        const { container } = render(<SummaryCard title="Favoritas" value="2 palavras" />);
        expect(container.querySelector(".home-summary-card__title--prominent")).toBeNull();
    });

    it("applies the inline layout modifier", () => {
        const { container } = render(<SummaryCard layout="inline" title="Conquistas" value="3 / 10" />);
        expect(container.querySelector(".home-summary-card--inline")).not.toBeNull();
    });

    it("applies the stacked layout by default", () => {
        const { container } = render(<SummaryCard title="Favoritas" value="2 palavras" />);
        expect(container.querySelector(".home-summary-card--stacked")).not.toBeNull();
    });

    it("renders the badge icon variant with its own modifier class", () => {
        const { container } = render(<SummaryCard layout="inline" icon="pencil" iconVariant="badge" title="Continuar exercícios" />);
        expect(container.querySelector(".home-summary-card__icon--badge")).not.toBeNull();
    });

    it("renders the CTA as a real <button> - not a non-semantic clickable element", () => {
        render(<SummaryCard title="Favoritas" ctaLabel="Ver coleção" onCtaClick={vi.fn()} />);
        const button = screen.getByRole("button", { name: /Ver coleção/ });
        expect(button.tagName).toBe("BUTTON");
    });

});
