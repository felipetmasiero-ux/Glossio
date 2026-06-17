import { useState, useCallback } from "react";

export function useStudySession(
  flashcards,
  language,
  answerFlashcard
) {

  const [stats, setStats] = useState({
    again: 0,
    good: 0,
    easy: 0
  });

  const [revealed, setRevealed] =
    useState(false);

  const [sessionStart] =
    useState(() => Date.now());

  const [sessionCards, setSessionCards] =
    useState(() =>
      flashcards.filter(card =>
        card.language === language &&
        card.nextReview <= sessionStart
      )
    );

  const [totalCards] = useState(sessionCards.length);

  const currentCard = sessionCards[0];

  const [leaving, setLeaving] = useState(false);

  const handleAnswer = useCallback((quality) => {

    if (!currentCard) return;

    setLeaving(true);

    if (quality === 1) {
      setStats(prev => ({
        ...prev,
        again: prev.again + 1
      }));
    }

    if (quality === 3) {
      setStats(prev => ({
        ...prev,
        good: prev.good + 1
      }));
    }

    if (quality === 5) {
      setStats(prev => ({
        ...prev,
        easy: prev.easy + 1
      }));
    }

    setTimeout(() => {

      answerFlashcard(currentCard.id, quality);

      setSessionCards(previous =>
        previous.filter(card => card.id !== currentCard.id)
      );

      setLeaving(false);
      setRevealed(false);

    }, 350);

  }, [answerFlashcard, currentCard]);

  function restartSession() {

    const now = Date.now();

    const cards = flashcards.filter(card =>
      card.language === language &&
      card.nextReview <= now
    );

    setSessionCards(cards);

    setStats({
      again: 0,
      good: 0,
      easy: 0
    });

    setRevealed(false);

  }

  const completed =
    stats.again +
    stats.good +
    stats.easy;

  return {
    revealed,
    setRevealed,

    sessionCards,
    totalCards,
    currentCard,

    stats,
    completed,
    leaving,

    handleAnswer,
    restartSession
  };

}