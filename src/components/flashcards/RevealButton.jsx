import "./RevealButton.css"

export function RevealButton({ onReveal }) {
  return (
    <button
      className="reveal-btn"
      onClick={onReveal}
    >
      Reveal
    </button>
  );
}