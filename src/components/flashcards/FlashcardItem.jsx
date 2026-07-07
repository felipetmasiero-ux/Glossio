import { Card } from "./common/Card/Card";
import { Button } from "./common/Button/Button";
import { Badge } from "./common/Badge/Badge";
import { formatNextReview } from "../utils/flashcards/formatNextReview";
import "./FlashcardItem.css";

const LEVELS = {
  New: "neutral",
  Learning: "warning",
  Mature: "success"
};

export function FlashcardItem({
  card,
  removeFlashcard
}) {

  let level = "New";
  if (card.repetitions >= 3) level = "Mature";
  else if (card.repetitions > 0) level = "Learning";

  return (
    <Card className="flashcard-item">
      <div>
        <h3>{card.word}</h3>
        <p className="text-secondary">{card.translation}</p>
      </div>

      <div className="flashcard-item-meta">
        <p className="text-small">Next review: {formatNextReview(card.nextReview)}</p>
        <p className="text-small">Interval: {card.interval} days</p>
        <Badge variant={LEVELS[level]}>{level}</Badge>
      </div>

      <Button variant="danger" className="flashcard-item-remove-btn" onClick={() => removeFlashcard(card.word)}>
        Delete
      </Button>
    </Card>
  );
}