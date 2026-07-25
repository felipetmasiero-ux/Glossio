import { Card } from "../common/Card/Card";
import "./StudyCard.css";

export function StudyCard({ card, revealed, leaving }) {
  return (
    <div className={`study-card ${revealed ? "revealed" : ""} ${leaving ? "leaving" : ""}`}>
      <div className="study-card-inner">
        <Card hoverable={false} className="study-face study-front card--notch">
          <h2>{card.word}</h2>
        </Card>
        <Card hoverable={false} className="study-face study-back card--notch">
          <h2>{card.translation}</h2>
        </Card>
      </div>
    </div>
  );
}
