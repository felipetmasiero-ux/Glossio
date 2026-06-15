import { useContext } from "react";
import { FlashcardContext } from "../contexts/FlashcardContext";
import { Flashcard } from "../components/Flashcard";

export function FlashcardsList() {
  const { flashcards, removeFlashcard } = useContext(FlashcardContext);

  return (
    <div className="page-container">
      <h1>My Flashcards</h1>

      {flashcards.length === 0 ? (
        <p>No flashcards saved yet.</p>
      ) : (
        <div className="flashcards-grid">
          {flashcards.map(card => (
            <Flashcard
              key={card.word}
              card={card}
              removeFlashcard={removeFlashcard}
            />
          ))}
        </div>
      )}
    </div>
  );
}