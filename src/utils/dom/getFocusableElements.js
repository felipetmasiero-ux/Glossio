const FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex=\"-1\"])"
].join(",");

// Queried fresh every time (see useOverlayDismiss's focus trap) rather than
// captured once when a dialog opens - a form's focusable elements can
// change while it's open (a field becoming disabled during submit, an
// error message adding a link, etc.), so a stale snapshot would be wrong.
export function getFocusableElements(container) {

    if (!container) {
        return [];
    }

    return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));

}
