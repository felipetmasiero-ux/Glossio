import { Card } from "../common/Card/Card";
import { Button } from "../common/Button/Button";
import "./Flashcard.css";

export function Flashcard({ card, removeFlashcard }) {

  return (
    <Card className="flashcard-card">

      <h3 className="flashcard-word">
        {card.word}
      </h3>

      <p className="flashcard-translation">
        {card.translation}
      </p>

      <p>
        Interval: {card.interval} days
      </p>

      <p>
        Next review: {new Date(card.nextReview).toLocaleString()}
      </p>

      <Button
        variant="danger"
        className="flashcard-remove-btn"
        onClick={() => removeFlashcard(card.word)}
      >
        Remove
      </Button>

    </Card>
  );
}