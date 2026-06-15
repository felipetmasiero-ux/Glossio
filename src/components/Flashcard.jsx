import "./FlashCard.css"

export function Flashcard({ card,removeFlashcard }) {

  return (
    <div className="flashcard-card">

      <h3 className="flashcard-word">
        {card.word}
      </h3>

      <p className="flashcard-translation">
        {card.translation}
      </p>

      <button
        className="flashcard-remove-btn"
        onClick={() =>
          removeFlashcard(card.word)
        }
      >
        Remove
      </button>

    </div>
  );
}