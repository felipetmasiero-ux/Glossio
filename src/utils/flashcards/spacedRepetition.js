const DAY = 24 * 60 * 60 * 1000;
const MIN_EASE = 1.3;

export function updateCard(card, quality) {

  let {
    ease,
    interval,
    repetitions
  } = card;

  if (quality < 3) {

    repetitions = 0;
    interval = 1;

  } else {

    repetitions++;

    if (repetitions === 1)
      interval = 1;

    else if (repetitions === 2)
      interval = 6;

    else
      interval = Math.round(
        interval * ease
      );

  }

  ease +=
    0.1 -
    (5 - quality) *
      (0.08 +
        (5 - quality) * 0.02);

  if (ease < MIN_EASE)
    ease = MIN_EASE;

  return {

    ...card,

    ease,
    interval,
    repetitions,

    nextReview:
      Date.now() + interval * DAY

  };

}