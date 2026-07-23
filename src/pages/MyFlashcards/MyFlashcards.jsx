import { useContext, useMemo, useState } from "react";
import { FlashcardContext } from "../../contexts/FlashcardContext";
import { LanguageContext } from "../../contexts/LanguageContext";

import { FlashcardsSearch } from "../../components/flashcards/FlashcardsSearch";
import { FlashcardsList } from "../../components/flashcards/FlashcardsList";
import { FlashcardStats } from "../../components/flashcards/FlashcardStats";
import { Section } from "../../components/common/Section/Section";

import "./MyFlashcards.css";

export function MyFlashcards() {
  const { flashcards, removeFlashcard } = useContext(FlashcardContext);
  const { language } = useContext(LanguageContext);

  const [search, setSearch] = useState("");
  const [now] = useState(() => Date.now());

  const languageCards = useMemo(
    () => flashcards.filter((card) => card.language === language),
    [flashcards, language]
  );

  const filteredCards = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return languageCards;
    }

    return languageCards.filter(
      (card) =>
        card.word.toLowerCase().includes(query) ||
        card.translation.toLowerCase().includes(query)
    );
  }, [languageCards, search]);

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

  return (
    <div className="flashcards-dashboard">
      <Section title="My Flashcards">
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

        <FlashcardsList
          flashcards={filteredCards}
          removeFlashcard={removeFlashcard}
        />
      </Section>
    </div>
  );
}