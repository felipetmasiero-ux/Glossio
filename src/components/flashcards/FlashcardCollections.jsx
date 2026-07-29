import { CollectionSection } from "./CollectionSection";
import { EmptyState } from "../common/EmptyState/EmptyState";

export function FlashcardCollections({
  collections,
  forceOpen,
  removeFlashcard
}) {

  if (collections.length === 0) {
    return (
      <EmptyState
        icon="cards"
        title="Nenhum flashcard ainda"
        description="Salve palavras enquanto estuda o conteúdo e elas aparecem aqui."
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
          forceOpen={forceOpen}
          removeFlashcard={removeFlashcard}
        />
      ))}
    </div>
  );
}
