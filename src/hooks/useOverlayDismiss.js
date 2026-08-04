import { useEffect, useRef } from "react";

// Shared ESC-to-close + click-outside-to-close behavior for lightweight
// overlays (WordPopup, and the flashcard/deck form overlays). `active`
// gates the whole hook so a closed overlay doesn't keep listeners around.
export function useOverlayDismiss({ active, onDismiss, ignoreSelector }) {

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

}
