// How many due cards can enter a single study session at once. Without
// this, a user who lets reviews pile up (or bulk-adds a lesson's whole
// vocabulary via useLessonVocabularyFlashcards, which creates every card
// already "due now") could open /flashcards to a session of dozens of
// cards in one sitting.
//
// Chosen as roughly 3x the app's existing daily review goal
// (DAILY_GOAL_TARGET, src/constants/dashboard.js = 10) - generous enough
// to clear a real backlog in one sitting, still small enough to finish in
// one focused session. Cards beyond this limit are never lost, rescheduled,
// or hidden from due counts - they simply don't enter *this* session (see
// useStudySession.js); starting another session (the existing "Estudar de
// novo" flow) picks up where this one left off.
export const MAX_SESSION_SIZE = 30;
