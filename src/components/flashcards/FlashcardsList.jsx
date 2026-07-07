import { FlashcardItem } from "./FlashcardItem";
import "./Flashcard.css";

export function FlashcardsList({ flashcards, removeFlashcard }) {
  return (
    <div className="flashcards-grid">
      {flashcards.map(card => (
        <FlashcardItem key={card.id} card={card} removeFlashcard={removeFlashcard} />
      ))}
    </div>
  );
}