const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

export function formatNextReview(nextReview) {

  const diff = nextReview - Date.now();

  if (diff <= 0) {
    return "Now";
  }

  const days = Math.floor(diff / DAY);

  if (days >= 1) {

    if (days === 1)
      return "Tomorrow";

    return `In ${days} days`;

  }

  const hours = Math.ceil(diff / HOUR);

  return `In ${hours}h`;

}