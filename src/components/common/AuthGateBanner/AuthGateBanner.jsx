import { useNavigate } from "react-router-dom";

import { useAuthGate } from "../../../hooks/useAuthGate";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";

import "./AuthGateBanner.css";

// The single global CTA shown whenever a visitor attempts a restricted
// action (see useRequireAuth.js) - mounted once in App.jsx, outside any
// route, same pattern as Toast/PwaUpdatePrompt. Never navigates on its
// own - only a click on "Criar conta grátis" does, so a visitor is never
// silently bounced to /login.
export function AuthGateBanner() {

  const { message, dismiss } = useAuthGate();
  const navigate = useNavigate();

  if (!message) return null;

  function handleCreateAccount() {
    dismiss();
    navigate("/register");
  }

  return (
    <div className="auth-gate-banner animate-slide-up" role="status" aria-live="polite">
      <Icon name="lock" size={16} />

      <span className="auth-gate-banner__message">{message}</span>

      <Button className="auth-gate-banner__action" onClick={handleCreateAccount}>
        Criar conta grátis
      </Button>

      <button
        type="button"
        className="auth-gate-banner__close"
        aria-label="Fechar"
        onClick={dismiss}
      >
        <Icon name="x" size={14} />
      </button>
    </div>
  );

}
