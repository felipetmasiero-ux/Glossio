import { Card } from "../common/Card/Card";
import { Button } from "../common/Button/Button";
import { Badge } from "../common/Badge/Badge";
import { formatNextReview } from "../../utils/flashcards/formatNextReview";
import "./FlashcardItem.css";

const LEVELS = {
  New: "neutral",
  Learning: "warning",
  Mature: "success"
};

const LEVEL_LABELS = {
  New: "Novo",
  Learning: "Aprendendo",
  Mature: "Maduro"
};

export function FlashcardItem({
  card,
  removeFlashcard
}) {

  let level = "New";
  if (card.repetitions >= 3) level = "Mature";
  else if (card.repetitions > 0) level = "Learning";

  return (
    <Card className="flashcard-item card--notch">
      <div>
        <h3>{card.word}</h3>
        <p className="text-secondary">{card.translation}</p>
      </div>

      <div className="flashcard-item-meta">
        <p className="text-small">Próxima revisão: {formatNextReview(card.nextReview)}</p>
        <p className="text-small">Intervalo: {card.interval} dias</p>
        <Badge variant={LEVELS[level]}>{LEVEL_LABELS[level]}</Badge>
      </div>

      <Button variant="danger" className="flashcard-item-remove-btn" onClick={() => removeFlashcard(card.word)}>
        Excluir
      </Button>
    </Card>
  );
}
