import { Button } from "../common/Button/Button";
import "./RevealButton.css";

export function RevealButton({ onReveal }) {
  return (
    <Button className="reveal-btn" onClick={onReveal}>
      Reveal
    </Button>
  );
}