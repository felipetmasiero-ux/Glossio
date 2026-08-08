import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRef, useState } from "react";

import { useOverlayDismiss } from "./useOverlayDismiss";

function TestDialog({ onDismiss, trapFocus = true, initialFocusRef = null, hasFocusable = true }) {

    const dialogRef = useRef(null);

    useOverlayDismiss({ active: true, onDismiss, trapFocus, dialogRef, initialFocusRef });

    return (
        <div>
            <button type="button">outside before</button>
            <div ref={dialogRef} data-testid="dialog">
                {
                    hasFocusable
                        ? (
                            <>
                                <button type="button">first</button>
                                <input aria-label="middle" />
                                <button type="button">last</button>
                            </>
                        )
                        : <p>nothing focusable in here</p>
                }
            </div>
            <button type="button">outside after</button>
        </div>
    );

}

function renderWithTrigger(props = {}) {

    function Wrapper() {
        return (
            <div>
                <button type="button">trigger</button>
                <TestDialog {...props} />
            </div>
        );
    }

    return render(<Wrapper />);

}

describe("useOverlayDismiss - trapFocus (opt-in, U3)", () => {

    it("does not touch focus at all when trapFocus is left at its default (false) - WordPopup 'explore' compatibility", () => {

        const trigger = document.createElement("button");
        document.body.appendChild(trigger);
        trigger.focus();

        render(<TestDialog onDismiss={vi.fn()} trapFocus={false} />);

        expect(document.activeElement).toBe(trigger);

        document.body.removeChild(trigger);

    });

    it("moves focus to the first focusable element inside the dialog on mount", () => {

        renderWithTrigger({ onDismiss: vi.fn() });

        expect(document.activeElement).toBe(screen.getByText("first"));

    });

    it("falls back to the container itself when there is nothing focusable inside", () => {

        renderWithTrigger({ onDismiss: vi.fn(), hasFocusable: false });

        expect(document.activeElement).toBe(screen.getByTestId("dialog"));

    });

    it("honors an explicit initialFocusRef over the first-focusable default", () => {

        function WrapperWithExplicitTarget() {
            const targetRef = useRef(null);
            const dialogRef = useRef(null);

            useOverlayDismiss({ active: true, onDismiss: vi.fn(), trapFocus: true, dialogRef, initialFocusRef: targetRef });

            return (
                <div ref={dialogRef}>
                    <button type="button">first</button>
                    <button type="button" ref={targetRef}>explicit target</button>
                </div>
            );
        }

        render(<WrapperWithExplicitTarget />);

        expect(document.activeElement).toBe(screen.getByText("explicit target"));

    });

    it("wraps Tab from the last focusable element back to the first", () => {

        renderWithTrigger({ onDismiss: vi.fn() });

        screen.getByText("last").focus();

        fireEvent.keyDown(document, { key: "Tab" });

        expect(document.activeElement).toBe(screen.getByText("first"));

    });

    it("wraps Shift+Tab from the first focusable element back to the last", () => {

        renderWithTrigger({ onDismiss: vi.fn() });

        screen.getByText("first").focus();

        fireEvent.keyDown(document, { key: "Tab", shiftKey: true });

        expect(document.activeElement).toBe(screen.getByText("last"));

    });

    it("does not let Tab move focus past the last element to something outside the dialog", () => {

        renderWithTrigger({ onDismiss: vi.fn() });

        screen.getByText("last").focus();

        fireEvent.keyDown(document, { key: "Tab" });

        expect(document.activeElement).not.toBe(screen.getByText("outside after"));

    });

    it("restores focus to the trigger once the dialog closes, while the trigger stays mounted around it", () => {

        function ToggleableDialog() {

            const [open, setOpen] = useState(false);

            return (
                <div>
                    <button type="button" onClick={() => setOpen(true)}>trigger</button>
                    {open && <TestDialog onDismiss={() => setOpen(false)} />}
                </div>
            );

        }

        render(<ToggleableDialog />);

        const trigger = screen.getByText("trigger");
        trigger.focus();
        fireEvent.click(trigger);

        // The dialog took focus on mount, per the earlier test.
        expect(document.activeElement).toBe(screen.getByText("first"));

        // Escape -> onDismiss -> setOpen(false) -> TestDialog unmounts.
        fireEvent.keyDown(document, { key: "Escape" });

        expect(screen.queryByTestId("dialog")).toBeNull();
        expect(document.activeElement).toBe(trigger);

    });

    it("does not try to focus a trigger that was removed from the document while the dialog was still open", () => {

        function ToggleableDialog() {

            const [triggerMounted, setTriggerMounted] = useState(true);
            const [open, setOpen] = useState(false);

            return (
                <div>
                    {triggerMounted && <button type="button" onClick={() => setOpen(true)}>trigger</button>}
                    <button type="button" onClick={() => setTriggerMounted(false)}>remove trigger</button>
                    {open && <TestDialog onDismiss={() => setOpen(false)} />}
                </div>
            );

        }

        render(<ToggleableDialog />);

        const trigger = screen.getByText("trigger");
        trigger.focus();
        fireEvent.click(trigger);

        expect(screen.getByText("first")).not.toBeNull();

        // The trigger disappears while the dialog is still open - a
        // separate update from the one that opened it.
        fireEvent.click(screen.getByText("remove trigger"));
        expect(screen.queryByText("trigger")).toBeNull();

        expect(() => fireEvent.keyDown(document, { key: "Escape" })).not.toThrow();
        expect(screen.queryByTestId("dialog")).toBeNull();

    });

});
