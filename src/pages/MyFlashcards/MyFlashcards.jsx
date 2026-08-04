import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FlashcardContext } from "../../contexts/FlashcardContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useDecks } from "../../hooks/useDecks";

import { FlashcardsSearch } from "../../components/flashcards/FlashcardsSearch";
import { FlashcardsFilterBar } from "../../components/flashcards/FlashcardsFilterBar";
import { FlashcardCollections } from "../../components/flashcards/FlashcardCollections";
import { FlashcardStats } from "../../components/flashcards/FlashcardStats";
import { FlashcardFormOverlay } from "../../components/flashcards/FlashcardFormOverlay";
import { DecksBar } from "../../components/flashcards/DecksBar";
import { Section } from "../../components/common/Section/Section";
import { SectionHeader } from "../../components/common/SectionHeader/SectionHeader";
import { Button } from "../../components/common/Button/Button";
import { Toast } from "../../components/common/Toast/Toast";

import { groupFlashcardsByTopic } from "../../utils/flashcards/groupFlashcardsByTopic";
import { sortFlashcards, SORT_OPTIONS } from "../../utils/flashcards/sortFlashcards";
import { filterFlashcards } from "../../utils/flashcards/filterFlashcards";
import { calculateStats } from "../../utils/flashcards/calculateStats";
import { isDuplicateFlashcard } from "../../utils/flashcards/isDuplicateFlashcard";

import "./MyFlashcards.css";

export function MyFlashcards() {
  const { flashcards, removeFlashcard, toggleFavorite, addFlashcard, updateFlashcard } = useContext(FlashcardContext);
  const { language } = useContext(LanguageContext);
  const { decks, addDeck, updateDeck, removeDeck } = useDecks();
  const navigate = useNavigate();

  // Universal Search links here as "open the card normally" - prefilling
  // (not permanently binding) the search box from a one-time ?search= param
  // is the closest equivalent to a deep link, since there's no standalone
  // single-flashcard route.
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("search") ?? "");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [deckFilter, setDeckFilter] = useState(null);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.ALPHA);
  const [creatingFlashcard, setCreatingFlashcard] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(toastTimeoutRef.current), []);

  function showToast(message) {
    setToastMessage(message);
    clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(""), 2500);
  }

  const languageCards = useMemo(
    () => flashcards.filter((card) => card.language === language),
    [flashcards, language]
  );

  const decksForLanguage = useMemo(
    () => decks.filter((deck) => deck.language === language),
    [decks, language]
  );

  const filteredCards = useMemo(
    () => filterFlashcards(languageCards, { search, favoritesOnly, deckId: deckFilter }),
    [languageCards, search, favoritesOnly, deckFilter]
  );

  const stats = useMemo(() => calculateStats(languageCards), [languageCards]);

  // Reacts to the active filters (search + favorites-only + deck) - the
  // whole point is to describe what's currently shown below, not the whole
  // collection.
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

  const isFiltering = search.trim().length > 0 || favoritesOnly || Boolean(deckFilter);

  function clearFilters() {
    setSearch("");
    setFavoritesOnly(false);
    setDeckFilter(null);
  }

  function checkDuplicateWord(word, wordLanguage, excludeId = null) {
    return isDuplicateFlashcard(flashcards, { word, language: wordLanguage, excludeId });
  }

  function handleCreateFlashcard(values) {
    addFlashcard(values, values.language);
    setCreatingFlashcard(false);
    showToast(`Flashcard "${values.word}" criado.`);
  }

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

        {stats.due > 0 && (
          <div className="flashcards-dashboard__due-banner">
            <p>{stats.due} {stats.due === 1 ? "card" : "cards"} para revisar hoje.</p>
            <Button onClick={() => navigate("/flashcards")}>Estudar agora</Button>
          </div>
        )}
      </Section>

      <Section>
        <div className="flashcards-dashboard__toolbar">
          <FlashcardsSearch
            search={search}
            setSearch={setSearch}
          />

          <Button onClick={() => setCreatingFlashcard(true)}>
            + Novo flashcard
          </Button>
        </div>

        <DecksBar
          decks={decksForLanguage}
          languageCards={languageCards}
          language={language}
          activeDeckId={deckFilter}
          onSelectDeck={setDeckFilter}
          addDeck={addDeck}
          updateDeck={updateDeck}
          removeDeck={removeDeck}
          onNotify={showToast}
        />

        <FlashcardsFilterBar
          favoritesOnly={favoritesOnly}
          setFavoritesOnly={setFavoritesOnly}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <FlashcardCollections
          collections={collections}
          decks={decksForLanguage}
          forceOpen={isFiltering}
          hasAnyCards={languageCards.length > 0}
          removeFlashcard={(cardId) => {
            removeFlashcard(cardId);
            showToast("Flashcard excluído.");
          }}
          toggleFavorite={toggleFavorite}
          updateFlashcard={(cardId, updates) => {
            updateFlashcard(cardId, updates);
            showToast("Flashcard atualizado.");
          }}
          checkDuplicateWord={checkDuplicateWord}
          onCreateFlashcard={() => setCreatingFlashcard(true)}
          onClearFilters={clearFilters}
        />
      </Section>

      {creatingFlashcard && (
        <FlashcardFormOverlay
          title="Novo flashcard"
          initialValues={{ language }}
          decks={decksForLanguage}
          isDuplicate={(word, wordLanguage) => checkDuplicateWord(word, wordLanguage)}
          submitLabel="Criar flashcard"
          onSubmit={handleCreateFlashcard}
          onClose={() => setCreatingFlashcard(false)}
        />
      )}

      <Toast message={toastMessage} />
    </div>
  );
}
