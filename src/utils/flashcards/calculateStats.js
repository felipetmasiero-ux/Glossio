export function calculateStats(flashcards) {

  const total = flashcards.length;

  const due = flashcards.filter(
    card => card.nextReview <= Date.now()
  ).length;

  const learning = flashcards.filter(
    card =>
      card.repetitions > 0 &&
      card.repetitions < 3
  ).length;

  const mature = flashcards.filter(
    card => card.repetitions >= 3
  ).length;

  return {
    total,
    due,
    learning,
    mature
  };

}