import { isDueNow } from "../../flashcards/dueDate";

// Distinct from the dashboard/stats "how many are due" counters (see
// dueDate.js's module comment) - this selects the actual cards for a study
// session queue, not a count. Shares the same "due now" definition
// (isDueNow) rather than reimplementing it, so a card that's due here is
// due everywhere else "due now" is asked about too.
export function getDueCards(
    flashcards,
    language,
    now = Date.now()
) {

    return flashcards.filter(card =>
        card.language === language &&
        isDueNow(card.nextReview, now)
    );

}