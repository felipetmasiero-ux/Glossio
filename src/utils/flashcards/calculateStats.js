import { isDueNow } from "./dueDate";

export function calculateStats(flashcards) {

  const total = flashcards.length;

  const now = Date.now();

  const due = flashcards.filter(
    card => isDueNow(card.nextReview, now)
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
