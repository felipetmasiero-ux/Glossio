import { FlashcardItem } from "./FlashcardItem";
import { EmptyState } from "../common/EmptyState/EmptyState";

export function FlashcardsList({
  flashcards,
  removeFlashcard,
  toggleFavorite
}) {

  if (flashcards.length === 0) {
    return (
      <EmptyState
        icon="cards"
        title="Nenhum flashcard ainda"
        description="Salve palavras enquanto estuda o conteúdo e elas aparecem aqui."
      />
    );
  }

  return (
    <div className="flashcards-grid">
      {flashcards.map(card => (
        <FlashcardItem
          key={card.id}
          card={card}
          removeFlashcard={removeFlashcard}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );

}