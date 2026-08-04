import { useState } from "react";
import { CollectionHeader } from "./CollectionHeader";
import { FlashcardsList } from "./FlashcardsList";
import "./CollectionSection.css";

export function CollectionSection({
  topic,
  cards,
  decks,
  forceOpen,
  removeFlashcard,
  toggleFavorite,
  updateFlashcard,
  checkDuplicateWord
}) {

  const [open, setOpen] = useState(false);
  const isOpen = forceOpen || open;

  function handleToggle(event) {
    if (forceOpen) return;
    setOpen(event.target.open);
  }

  return (
    <details className="collection-section" open={isOpen} onToggle={handleToggle}>
      <summary className="collection-section__summary">
        <CollectionHeader topic={topic} count={cards.length} />
      </summary>

      <div className="collection-section__body">
        <FlashcardsList
          flashcards={cards}
          decks={decks}
          removeFlashcard={removeFlashcard}
          toggleFavorite={toggleFavorite}
          updateFlashcard={updateFlashcard}
          checkDuplicateWord={checkDuplicateWord}
        />
      </div>
    </details>
  );
}
