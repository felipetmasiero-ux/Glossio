import { useState, useCallback } from "react";

export function useStudySession(
  flashcards,
  language,
  answerFlashcard
) {

  function getDueCards(now = Date.now()) {
    return flashcards.filter(card =>
      card.language === language &&
      card.nextReview <= now
    );
  }

  const [stats, setStats] = useState({
    again: 0,
    good: 0,
    easy: 0
  });

  const [revealed, setRevealed] =
    useState(false);

  const [sessionStart] = useState(() => Date.now());

  const [sessionCards, setSessionCards] = useState(() =>
    getDueCards(sessionStart)
  );

  const [initialSessionSize, setInitialSessionSize] = useState(
    () => getDueCards(sessionStart).length
  );

  const [completedCards, setCompletedCards] = useState(0);

  const currentCard = sessionCards[0];

  const [leaving, setLeaving] = useState(false);

  const handleAnswer = useCallback((quality) => {

    if (!currentCard) return;

    setLeaving(true);

    if (quality !== 1) {
      setCompletedCards(prev => prev + 1);
    }

    const key =
      quality === 1
        ? "again"
        : quality === 3
          ? "good"
          : "easy";

    setStats(prev => ({
      ...prev,
      [key]: prev[key] + 1
    }));

    setTimeout(() => {

      answerFlashcard(currentCard.id, quality);

      setSessionCards(previous => {

        const remaining = previous.filter(
          card => card.id !== currentCard.id
        );

        if (quality === 1) {
          return [...remaining, currentCard];
        }

        return remaining;

      });

      setLeaving(false);
      setRevealed(false);

    }, 350);

  }, [answerFlashcard, currentCard]);

  function restartSession() {

    const cards = getDueCards();

    setSessionCards(cards);
    setInitialSessionSize(cards.length);

    setStats({
      again: 0,
      good: 0,
      easy: 0
    });

    setCompletedCards(0);
    setRevealed(false);
  }

  return {

    revealed,
    setRevealed,

    sessionCards,
    completedCards,
    initialSessionSize,
    currentCard,

    stats,
    leaving,

    handleAnswer,
    restartSession
  };

}