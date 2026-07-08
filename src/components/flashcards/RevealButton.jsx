import { Button } from "../common/Button/Button";
import "./RevealButton.css";

export function RevealButton({ onReveal }) {
  return (
    <Button variant="secondary" className="reveal-btn" onClick={onReveal}>
      Reveal
    </Button>
  );
}