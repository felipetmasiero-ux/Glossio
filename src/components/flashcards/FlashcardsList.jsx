import { FlashcardItem } from "./FlashcardItem";

export function FlashcardsList({
  flashcards,
  removeFlashcard
}) {

  return (

    <div>

      {

        flashcards.map(card => (

          <FlashcardItem

            key={card.id}

            card={card}

            removeFlashcard={removeFlashcard}

          />

        ))

      }

    </div>

  );

}