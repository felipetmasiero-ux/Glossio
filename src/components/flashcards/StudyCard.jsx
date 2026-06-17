export function StudyCard({ card, revealed, leaving }) {
  return (
    <div
      className={`
        study-card
        ${revealed ? "revealed" : ""}
        ${leaving ? "leaving" : ""}
    `}
    >
      <div className="study-card-inner">

        <div className="study-face study-front">
          <h2>{card.word}</h2>
        </div>

        <div className="study-face study-back">
          <h2>{card.translation}</h2>
        </div>

      </div>
    </div>
  );
}