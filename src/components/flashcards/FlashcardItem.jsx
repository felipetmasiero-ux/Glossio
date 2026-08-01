import { Card } from "../common/Card/Card";
import { Button } from "../common/Button/Button";
import { Badge } from "../common/Badge/Badge";
import { Icon } from "../common/Icon/Icon";
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
  removeFlashcard,
  toggleFavorite
}) {

  let level = "New";
  if (card.repetitions >= 3) level = "Mature";
  else if (card.repetitions > 0) level = "Learning";

  return (
    <Card className="flashcard-item card--notch">
      <button
        type="button"
        className={`flashcard-item-favorite${card.favorite ? " flashcard-item-favorite--active" : ""}`}
        aria-label={card.favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        aria-pressed={Boolean(card.favorite)}
        onClick={() => toggleFavorite(card.id)}
      >
        <Icon name="star" fill={card.favorite ? "currentColor" : "none"} size={18} />
      </button>

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
