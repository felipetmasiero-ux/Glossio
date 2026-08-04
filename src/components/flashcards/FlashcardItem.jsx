import { memo, useState } from "react";

import { Card } from "../common/Card/Card";
import { Button } from "../common/Button/Button";
import { Badge } from "../common/Badge/Badge";
import { Icon } from "../common/Icon/Icon";
import { ConfirmInline } from "../common/ConfirmInline/ConfirmInline";
import { FlashcardFormOverlay } from "./FlashcardFormOverlay";
import { formatNextReview } from "../../utils/flashcards/formatNextReview";
import { getReviewUrgency } from "../../utils/flashcards/getReviewUrgency";
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

// FlashcardProvider now hands out stable removeFlashcard/toggleFavorite
// references and only changes a given `card` object when *that* card is the
// one that changed (see contexts/FlashcardProvider.jsx) - so in a list of
// hundreds of cards, toggling one favorite no longer has to re-render every
// other card too.
export const FlashcardItem = memo(function FlashcardItem({
  card,
  decks,
  removeFlashcard,
  toggleFavorite,
  updateFlashcard,
  checkDuplicateWord
}) {

  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  let level = "New";
  if (card.repetitions >= 3) level = "Mature";
  else if (card.repetitions > 0) level = "Learning";

  const deckName = decks.find(deck => deck.id === card.deckId)?.name;

  function handleEditSubmit(values) {
    updateFlashcard(card.id, values);
    setEditing(false);
  }

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

        {card.example && (
          <p className="flashcard-item-example">"{card.example}"</p>
        )}

        {card.notes && (
          <p className="flashcard-item-notes">
            <Icon name="lightbulb" size={14} />
            <span>{card.notes}</span>
          </p>
        )}
      </div>

      <div className="flashcard-item-meta">
        <p className="text-small">Intervalo: {card.interval} dias</p>
        <div className="flashcard-item-badges">
          <Badge variant={getReviewUrgency(card.nextReview)}>{formatNextReview(card.nextReview)}</Badge>
          <Badge variant={LEVELS[level]}>{LEVEL_LABELS[level]}</Badge>
          {deckName && <Badge variant="primary">{deckName}</Badge>}
        </div>
      </div>

      <div className="flashcard-item-actions">
        <Button variant="secondary" onClick={() => setEditing(true)}>
          <Icon name="pencil" size={14} /> Editar
        </Button>

        {confirmingDelete ? (
          <ConfirmInline
            onConfirm={() => removeFlashcard(card.id)}
            onCancel={() => setConfirmingDelete(false)}
          />
        ) : (
          <Button variant="danger" className="flashcard-item-remove-btn" onClick={() => setConfirmingDelete(true)}>
            Excluir
          </Button>
        )}
      </div>

      {editing && (
        <FlashcardFormOverlay
          title="Editar flashcard"
          initialValues={card}
          decks={decks}
          isDuplicate={(word, language) => checkDuplicateWord(word, language, card.id)}
          submitLabel="Salvar"
          onSubmit={handleEditSubmit}
          onClose={() => setEditing(false)}
        />
      )}
    </Card>
  );
});
