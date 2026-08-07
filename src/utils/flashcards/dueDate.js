// The single definition of "due" every flashcard-counting function in the
// app shares. Before this file existed, calculateStats.js, getStudyStats.js
// and getUpcomingReviews.js each reimplemented their own version of "is
// this due" - two agreed (`nextReview <= now`), one didn't
// (`nextReview < endOfDay`, which also counts anything already overdue) -
// so two dashboard cards fed by different ones of these could legitimately
// show different numbers for what looked like the same question. See
// docs/ (or the sprint report) for the full incident writeup.
//
// Two genuinely different, both real, questions:
//   - "due now"   -> should this be reviewed at this exact instant?
//                    (drives the study session queue - getDueCards.js)
//   - "due today" -> does this belong to today's review count?
//                    (drives dashboard/stats displays) - and this one is
//                    deliberately NOT a strict start-of-day..end-of-day
//                    window: a card overdue since yesterday hasn't been
//                    reviewed, so it still belongs in "what do I have to
//                    review today", not just cards newly due since
//                    midnight. That's why isDueToday is `<= endOfDay`, not
//                    `startOfDay <= nextReview <= endOfDay`.
const DAY_IN_MS = 24 * 60 * 60 * 1000;

// Midnight, local time, of the day containing `timestamp`. Local time is
// deliberate and unchanged from every place this logic already lived
// (Date#setHours operates in the browser's own local timezone) - a user's
// "today" is their own calendar day, not UTC's.
export function getStartOfDay(timestamp = Date.now()) {

    const date = new Date(timestamp);

    date.setHours(0, 0, 0, 0);

    return date.getTime();

}

// The instant `daysAhead` full days from now end - daysAhead=0 is "end of
// today", 1 is "end of tomorrow", 6 is "end of the 7th day" (today plus
// the next 6), matching how getUpcomingReviews' "next 7 days" bucket
// already counted before this file existed.
export function getEndOfDay(timestamp = Date.now(), daysAhead = 0) {
    return getStartOfDay(timestamp) + (daysAhead + 1) * DAY_IN_MS;
}

// "Should this be reviewed right now?" - already overdue, or due at this
// exact instant. A missing/falsy nextReview is treated as due (defensive:
// createFlashcard.js always sets a real nextReview, so this only matters
// for malformed data) - the same fallback getStudyStats.js already had,
// now shared by every caller instead of being one function's quirk.
export function isDueNow(nextReview, now = Date.now()) {
    return !nextReview || nextReview <= now;
}

// "Does this belong to today's reviews?" - see the module comment above
// for why this includes anything already overdue, not just cards newly
// due since midnight.
export function isDueToday(nextReview, now = Date.now()) {
    return isDueWithinDays(nextReview, 0, now);
}

// Generalizes isDueToday to any rolling day window - daysAhead=0 is today,
// 1 is today+tomorrow, 6 is the next 7 days. Doesn't itself apply isDueNow's
// missing-nextReview fallback - callers that need it (see
// getUpcomingReviews.js) already default a missing nextReview to 0 before
// calling in, which is always <= any real end-of-day boundary anyway.
export function isDueWithinDays(nextReview, daysAhead, now = Date.now()) {
    return nextReview <= getEndOfDay(now, daysAhead);
}
