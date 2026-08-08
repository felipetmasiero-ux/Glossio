import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";

import { FlashcardFormOverlay } from "./FlashcardFormOverlay";

function Harness({ onSubmit = vi.fn(), isDuplicate = () => false }) {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <button type="button" onClick={() => setOpen(true)}>Novo flashcard</button>

            {open && (
                <FlashcardFormOverlay
                    title="Novo flashcard"
                    initialValues={{}}
                    decks={[]}
                    isDuplicate={isDuplicate}
                    onSubmit={values => {
                        onSubmit(values);
                        setOpen(false);
                    }}
                    onClose={() => setOpen(false)}
                    submitLabel="Criar flashcard"
                />
            )}
        </div>
    );

}

function openViaTrigger() {
    const trigger = screen.getByText("Novo flashcard");
    trigger.focus();
    fireEvent.click(trigger);
    return trigger;
}

describe("FlashcardFormOverlay - accessible dialog (U3)", () => {

    it("exposes dialog semantics labelled by its visible title", () => {

        render(<Harness />);
        openViaTrigger();

        const dialog = screen.getByRole("dialog");
        expect(dialog.getAttribute("aria-modal")).toBe("true");

        const labelledBy = dialog.getAttribute("aria-labelledby");
        expect(document.getElementById(labelledBy).textContent).toBe("Novo flashcard");

    });

    it("moves focus into the dialog's first field on open", () => {

        render(<Harness />);
        openViaTrigger();

        expect(document.activeElement).toBe(screen.getByLabelText("Palavra"));

    });

    it("wraps Tab from the last focusable element (Cancelar) back to the first field", () => {

        render(<Harness />);
        openViaTrigger();

        screen.getByText("Cancelar").focus();
        fireEvent.keyDown(document, { key: "Tab" });

        expect(document.activeElement).toBe(screen.getByLabelText("Palavra"));

    });

    it("wraps Shift+Tab from the first field back to the last focusable element (Cancelar)", () => {

        render(<Harness />);
        openViaTrigger();

        screen.getByLabelText("Palavra").focus();
        fireEvent.keyDown(document, { key: "Tab", shiftKey: true });

        expect(document.activeElement).toBe(screen.getByText("Cancelar"));

    });

    it("closes on Escape and restores focus to the trigger that opened it", () => {

        render(<Harness />);
        const trigger = openViaTrigger();

        fireEvent.keyDown(document, { key: "Escape" });

        expect(screen.queryByRole("dialog")).toBeNull();
        expect(document.activeElement).toBe(trigger);

    });

    it("closes on a click outside the panel (backdrop) - existing behavior preserved", () => {

        render(<Harness />);
        const trigger = openViaTrigger();

        fireEvent.click(screen.getByRole("dialog").parentElement);

        expect(screen.queryByRole("dialog")).toBeNull();
        expect(document.activeElement).toBe(trigger);

    });

    it("does not close when clicking inside the panel", () => {

        render(<Harness />);
        openViaTrigger();

        fireEvent.click(screen.getByRole("heading", { name: "Novo flashcard" }));

        expect(screen.getByRole("dialog")).not.toBeNull();

    });

    it("still closes via the Cancelar button, restoring focus to the trigger - regression", () => {

        render(<Harness />);
        const trigger = openViaTrigger();

        fireEvent.click(screen.getByText("Cancelar"));

        expect(screen.queryByRole("dialog")).toBeNull();
        expect(document.activeElement).toBe(trigger);

    });

    it("still submits the form with the entered values - regression", () => {

        const onSubmit = vi.fn();
        render(<Harness onSubmit={onSubmit} />);
        openViaTrigger();

        fireEvent.change(screen.getByLabelText("Palavra"), { target: { value: "casa" } });
        fireEvent.change(screen.getByLabelText("Tradução"), { target: { value: "house" } });
        fireEvent.click(screen.getByText("Criar flashcard"));

        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ word: "casa", translation: "house" }));

    });

});
