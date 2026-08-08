import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";

import { DeckFormOverlay } from "./DeckFormOverlay";

function Harness({ onSubmit = vi.fn(), isDuplicate = () => false }) {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <button type="button" onClick={() => setOpen(true)}>Novo deck</button>

            {open && (
                <DeckFormOverlay
                    title="Novo deck"
                    initialValues={{ language: "english" }}
                    isDuplicate={isDuplicate}
                    onSubmit={values => {
                        onSubmit(values);
                        setOpen(false);
                    }}
                    onClose={() => setOpen(false)}
                    submitLabel="Criar deck"
                />
            )}
        </div>
    );

}

function openViaTrigger() {
    const trigger = screen.getByText("Novo deck");
    trigger.focus();
    fireEvent.click(trigger);
    return trigger;
}

describe("DeckFormOverlay - accessible dialog (U3)", () => {

    it("exposes dialog semantics labelled by its visible title", () => {

        render(<Harness />);
        openViaTrigger();

        const dialog = screen.getByRole("dialog");
        expect(dialog.getAttribute("aria-modal")).toBe("true");

        const labelledBy = dialog.getAttribute("aria-labelledby");
        expect(document.getElementById(labelledBy).textContent).toBe("Novo deck");

    });

    it("moves focus into the dialog's first field on open", () => {

        render(<Harness />);
        openViaTrigger();

        expect(document.activeElement).toBe(screen.getByLabelText("Nome do deck"));

    });

    it("wraps Tab from the last focusable element (Cancelar) back to the first field", () => {

        render(<Harness />);
        openViaTrigger();

        screen.getByText("Cancelar").focus();
        fireEvent.keyDown(document, { key: "Tab" });

        expect(document.activeElement).toBe(screen.getByLabelText("Nome do deck"));

    });

    it("wraps Shift+Tab from the first field back to the last focusable element (Cancelar)", () => {

        render(<Harness />);
        openViaTrigger();

        screen.getByLabelText("Nome do deck").focus();
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

        fireEvent.change(screen.getByLabelText("Nome do deck"), { target: { value: "Verbos irregulares" } });
        fireEvent.click(screen.getByText("Criar deck"));

        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: "Verbos irregulares", language: "english" }));

    });

});
