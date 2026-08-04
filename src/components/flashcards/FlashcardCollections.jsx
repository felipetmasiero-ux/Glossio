import { useNavigate } from "react-router-dom";

import { CollectionSection } from "./CollectionSection";
import { EmptyState } from "../common/EmptyState/EmptyState";

export function FlashcardCollections({
  collections,
  decks,
  forceOpen,
  hasAnyCards,
  removeFlashcard,
  toggleFavorite,
  updateFlashcard,
  checkDuplicateWord,
  onCreateFlashcard,
  onClearFilters
}) {

  const navigate = useNavigate();

  if (collections.length === 0) {

    if (hasAnyCards) {
      return (
        <EmptyState
          icon="search"
          title="Nenhum resultado para esses filtros"
          description="Tente ajustar a busca, o deck ou o filtro de favoritos."
          actionLabel="Limpar filtros"
          onAction={onClearFilters}
        />
      );
    }

    return (
      <EmptyState
        icon="cards"
        title="Nenhum flashcard ainda"
        description="Crie seu primeiro flashcard ou salve palavras enquanto estuda o conteúdo."
        actionLabel="Criar flashcard"
        onAction={onCreateFlashcard}
        secondaryLabel="Ir para as lições"
        onSecondaryAction={() => navigate("/lessons")}
      />
    );
  }

  return (
    <div className="flashcard-collections">
      {collections.map(collection => (
        <CollectionSection
          key={collection.topic}
          topic={collection.topic}
          cards={collection.cards}
          decks={decks}
          forceOpen={forceOpen}
          removeFlashcard={removeFlashcard}
          toggleFavorite={toggleFavorite}
          updateFlashcard={updateFlashcard}
          checkDuplicateWord={checkDuplicateWord}
        />
      ))}
    </div>
  );
}
