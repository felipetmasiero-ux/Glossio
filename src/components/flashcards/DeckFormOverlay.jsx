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

  useOverlayDismiss({ active: true, onDismiss: onClose });

  return (
    <div className="flashcard-form-overlay" onClick={onClose}>
      <div className="flashcard-form-overlay__panel" onClick={event => event.stopPropagation()}>

        <h2 className="flashcard-form-overlay__title">{title}</h2>

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
