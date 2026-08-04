import { FlashcardForm } from "./FlashcardForm";
import { useOverlayDismiss } from "../../hooks/useOverlayDismiss";
import "./FlashcardFormOverlay.css";

export function FlashcardFormOverlay({
  title,
  initialValues,
  decks,
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

        <FlashcardForm
          initialValues={initialValues}
          decks={decks}
          isDuplicate={isDuplicate}
          onSubmit={onSubmit}
          onCancel={onClose}
          submitLabel={submitLabel}
        />

      </div>
    </div>
  );
}
