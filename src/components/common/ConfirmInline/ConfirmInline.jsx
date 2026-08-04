import { Button } from "../Button/Button";
import "./ConfirmInline.css";

// Extracted from the "Tem certeza?" pattern in Profile.jsx (danger-zone
// reset) - the app's one established inline-confirmation UX, now shared by
// flashcard and deck deletion instead of a new modal/dialog component.
export function ConfirmInline({
  label = "Tem certeza?",
  confirmLabel = "Sim, excluir",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel
}) {
  return (
    <div className="confirm-inline">
      <span className="confirm-inline__label">{label}</span>
      <Button variant="danger" onClick={onConfirm}>
        {confirmLabel}
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        {cancelLabel}
      </Button>
    </div>
  );
}
