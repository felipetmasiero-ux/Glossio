import { useId, useRef } from "react";

import { DeckForm } from "./DeckForm";
import { useOverlayDismiss } from "../../hooks/useOverlayDismiss";
import "./FlashcardFormOverlay.css";

export function DeckFormOverlay({
  title,
  initialValues,
  isDuplicate,
  onSubmit,
  onClose,
  submitLabel
}) {

  const dialogRef = useRef(null);
  const titleId = useId();

  useOverlayDismiss({ active: true, onDismiss: onClose, trapFocus: true, dialogRef });

  return (
    <div className="flashcard-form-overlay" onClick={onClose}>
      <div
        className="flashcard-form-overlay__panel"
        onClick={event => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >

        <h2 className="flashcard-form-overlay__title" id={titleId}>{title}</h2>

        <DeckForm
          initialValues={initialValues}
          isDuplicate={isDuplicate}
          onSubmit={onSubmit}
          onCancel={onClose}
          submitLabel={submitLabel}
        />

      </div>
    </div>
  );
}
