import { useState } from "react";

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

  function handleAnswer(quality) {

    answerFlashcard(currentCard.id, quality);

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

    setSessionCards(previous =>
      previous.filter(card => card.id !== currentCard.id)
    );

    setRevealed(false);
  }

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

    handleAnswer,
    restartSession
  };

}