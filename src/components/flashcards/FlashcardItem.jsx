import { formatNextReview } from "../../utils/flashcards/formatNextReview";

export function FlashcardItem({
  card,
  removeFlashcard
}) {

  let level = "New";

  if (card.repetitions >= 3)
    level = "Mature";

  else if (card.repetitions > 0)
    level = "Learning";

  return (

    <div className="flashcard-item">

      <div>

        <h3>{card.word}</h3>

        <p>{card.translation}</p>

      </div>

      <div>

        <p>
          Next review:
          {" "}
          {formatNextReview(card.nextReview)}
        </p>

        <p>
          Interval:
          {" "}
          {card.interval} days
        </p>

        <p>{level}</p>

      </div>

      <button
        onClick={() => removeFlashcard(card.word)}
      >
        Delete
      </button>

    </div>

  );

}