export function updateCard(card, quality) {
  let { ease, interval, repetitions } = card;

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;

    if (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 6;
    else interval = Math.round(interval * ease);
  }

  ease = ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  if (ease < 1.3) ease = 1.3;

  return {
    ...card,
    ease,
    interval,
    repetitions,
    nextReview: Date.now() + interval * 86400000
  };
}