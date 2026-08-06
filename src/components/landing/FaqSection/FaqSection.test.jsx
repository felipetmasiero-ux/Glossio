import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { FaqSection } from "./FaqSection";
import { FAQS } from "../../../constants/landingFaqs";

describe("FaqSection", () => {

    it("renders every FAQ question and its answer", () => {

        render(<FaqSection />);

        FAQS.forEach(faq => {
            expect(screen.getByText(faq.question)).not.toBeNull();
            expect(screen.getByText(faq.answer)).not.toBeNull();
        });

    });

    it("calls onFaqOpen with the question when a FAQ is opened", () => {

        const onFaqOpen = vi.fn();
        render(<FaqSection onFaqOpen={onFaqOpen} />);

        const firstQuestion = FAQS[0].question;
        const details = screen.getByText(firstQuestion).closest("details");

        details.open = true;
        fireEvent(details, new Event("toggle", { bubbles: false }));

        expect(onFaqOpen).toHaveBeenCalledWith(firstQuestion);

    });

    it("does not call onFaqOpen when a FAQ is closed", () => {

        const onFaqOpen = vi.fn();
        render(<FaqSection onFaqOpen={onFaqOpen} />);

        const firstQuestion = FAQS[0].question;
        const details = screen.getByText(firstQuestion).closest("details");

        details.open = false;
        fireEvent(details, new Event("toggle", { bubbles: false }));

        expect(onFaqOpen).not.toHaveBeenCalled();

    });

    it("does not throw when no onFaqOpen prop is given", () => {

        render(<FaqSection />);

        const details = screen.getByText(FAQS[0].question).closest("details");
        details.open = true;

        expect(() => fireEvent(details, new Event("toggle", { bubbles: false }))).not.toThrow();

    });

});
