import { useEffect, useRef } from "react";

import { getFocusableElements } from "../utils/dom/getFocusableElements";

// Shared ESC-to-close + click-outside-to-close behavior for lightweight
// overlays (WordPopup, and the flashcard/deck form overlays). `active`
// gates the whole hook so a closed overlay doesn't keep listeners around.
//
// `trapFocus` is opt-in and off by default - not every consumer of this
// hook is a modal dialog. WordPopup's "explore" variant, for one, is a
// transient anchored tooltip that deliberately lets the user click other
// words on the page while it's open (see its ignoreSelector); trapping
// focus or seizing it on mount would break that. Only a real dialog
// (FlashcardFormOverlay, DeckFormOverlay, WordPopup's default "lesson"
// variant) passes trapFocus: true along with a `dialogRef` pointing at its
// own panel element.
export function useOverlayDismiss({
    active,
    onDismiss,
    ignoreSelector,
    trapFocus = false,
    dialogRef,
    initialFocusRef
}) {

    const onDismissRef = useRef(onDismiss);

    useEffect(() => {
        onDismissRef.current = onDismiss;
    });

    useEffect(() => {

        if (!active) return;

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                onDismissRef.current();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        if (!ignoreSelector) {
            return () => document.removeEventListener("keydown", handleKeyDown);
        }

        function handlePointerDown(event) {
            if (event.target.closest(ignoreSelector)) {
                return;
            }

            onDismissRef.current();
        }

        document.addEventListener("mousedown", handlePointerDown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };

    }, [active, ignoreSelector]);

    // Runs independently of the dismiss listeners above - Escape,
    // click-outside, and every consumer's own Salvar/Cancelar all close the
    // dialog the same way: the parent stops rendering it. That unmount is
    // exactly this effect's cleanup, so focus restoration happens for all
    // of them for free, without each closing path needing to call anything
    // itself.
    useEffect(() => {

        if (!active || !trapFocus) {
            return;
        }

        const container = dialogRef?.current;

        if (!container) {
            return;
        }

        const previouslyFocused = document.activeElement;

        const initialTarget = initialFocusRef?.current ?? getFocusableElements(container)[0] ?? container;

        // The container itself is only a fallback for the (unusual) case
        // of a dialog with nothing focusable inside - it isn't focusable by
        // default, so this makes that fallback actually work instead of
        // silently doing nothing, without every consumer needing to
        // remember to add tabIndex=-1 to their panel just in case.
        if (initialTarget === container && !container.hasAttribute("tabindex")) {
            container.setAttribute("tabindex", "-1");
        }

        initialTarget.focus();

        function handleKeyDown(event) {

            if (event.key !== "Tab") {
                return;
            }

            // Queried fresh on every Tab press (see getFocusableElements) -
            // a form's focusable elements can change while the dialog is
            // open (e.g. a field disabled mid-submit).
            const focusable = getFocusableElements(container);

            if (focusable.length === 0) {
                event.preventDefault();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const isOutside = !container.contains(document.activeElement);

            if (event.shiftKey) {

                if (isOutside || document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                }

            } else if (isOutside || document.activeElement === last) {

                event.preventDefault();
                first.focus();

            }

        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {

            document.removeEventListener("keydown", handleKeyDown);

            // Degrades gracefully when the trigger was unmounted while the
            // dialog was open (isConnected is false for a detached node).
            if (previouslyFocused?.isConnected) {
                previouslyFocused.focus();
            }

        };

    }, [active, trapFocus, dialogRef, initialFocusRef]);

}
