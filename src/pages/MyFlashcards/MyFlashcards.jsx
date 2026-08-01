import { useContext, useMemo, useState } from "react";
import { FlashcardContext } from "../../contexts/FlashcardContext";
import { LanguageContext } from "../../contexts/LanguageContext";

import { FlashcardsSearch } from "../../components/flashcards/FlashcardsSearch";
import { FlashcardsFilterBar } from "../../components/flashcards/FlashcardsFilterBar";
import { FlashcardCollections } from "../../components/flashcards/FlashcardCollections";
import { FlashcardStats } from "../../components/flashcards/FlashcardStats";
import { Section } from "../../components/common/Section/Section";
import { SectionHeader } from "../../components/common/SectionHeader/SectionHeader";

import { groupFlashcardsByTopic } from "../../utils/flashcards/groupFlashcardsByTopic";
import { sortFlashcards, SORT_OPTIONS } from "../../utils/flashcards/sortFlashcards";
import { filterFlashcards } from "../../utils/flashcards/filterFlashcards";

import "./MyFlashcards.css";

export function MyFlashcards() {
  const { flashcards, removeFlashcard, toggleFavorite } = useContext(FlashcardContext);
  const { language } = useContext(LanguageContext);

  const [search, setSearch] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.ALPHA);
  const [now] = useState(() => Date.now());

  const languageCards = useMemo(
    () => flashcards.filter((card) => card.language === language),
    [flashcards, language]
  );

  const filteredCards = useMemo(
    () => filterFlashcards(languageCards, { search, favoritesOnly }),
    [languageCards, search, favoritesOnly]
  );

  const stats = useMemo(
    () => ({
      total: languageCards.length,
      due: languageCards.filter(
        (card) => new Date(card.nextReview).getTime() <= now
      ).length,
      learning: languageCards.filter(
        (card) => card.repetitions > 0 && card.repetitions < 3
      ).length,
      mature: languageCards.filter(
        (card) => card.repetitions >= 3
      ).length,
    }),
    [languageCards, now]
  );

  // Reacts to the active filters (search + favorites-only) - the whole point
  // is to describe what's currently shown below, not the whole collection.
  const favoriteCount = useMemo(
    () => filteredCards.filter((card) => card.favorite).length,
    [filteredCards]
  );

  const collections = useMemo(() => {

    const groups = groupFlashcardsByTopic(filteredCards);

    return groups.map((group) => ({
      topic: group.topic,
      cards: sortFlashcards(group.cards, sortBy)
    }));

  }, [filteredCards, sortBy]);

  const isFiltering = search.trim().length > 0 || favoritesOnly;

  return (
    <div className="flashcards-dashboard">
      <Section>
        <SectionHeader
          title="Meus Flashcards"
          subtitle={`${filteredCards.length} palavras · ${favoriteCount} favoritas · ${collections.length} tópicos`}
        />

        <FlashcardStats
          total={stats.total}
          due={stats.due}
          learning={stats.learning}
          mature={stats.mature}
        />
      </Section>

      <Section>
        <FlashcardsSearch
          search={search}
          setSearch={setSearch}
        />

        <FlashcardsFilterBar
          favoritesOnly={favoritesOnly}
          setFavoritesOnly={setFavoritesOnly}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <FlashcardCollections
          collections={collections}
          forceOpen={isFiltering}
          removeFlashcard={removeFlashcard}
          toggleFavorite={toggleFavorite}
        />
      </Section>
    </div>
  );
}
