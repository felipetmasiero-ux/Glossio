// Every threshold the recommendation generators use (src/utils/adaptiveLearning)
// lives here - one place to tune "how weak is weak" instead of magic
// numbers scattered across generators.
export const RECOMMENDATION_TYPES = {
    REVIEW_LESSON: "review-lesson",
    REVIEW_TOPIC: "review-topic",
    CONTINUE_MODULE: "continue-module",
    STUDY_FLASHCARDS: "study-flashcards",
    DIFFICULT_FLASHCARDS: "difficult-flashcards"
};

// Don't judge a lesson's accuracy off 1-2 answers - a single unlucky guess
// shouldn't label a whole lesson "weak".
export const MIN_ATTEMPTS_FOR_LESSON_ACCURACY = 3;

export const CRITICAL_ACCURACY_THRESHOLD = 0.5;
export const LOW_ACCURACY_THRESHOLD = 0.7;

// How many of the weakest lessons a single generator surfaces - caps one
// generator from crowding out every other recommendation type.
export const MAX_WEAK_LESSONS = 2;

// A topic needs to show up in at least this many wrong answers before it's
// worth calling out - otherwise almost every topic would qualify eventually.
export const MIN_MISTAKES_FOR_TOPIC = 3;

// A flashcard due today isn't "overdue" yet - only flag cards that have
// been sitting unreviewed for a few days.
export const OVERDUE_REVIEW_DAYS = 3;

export const MIN_REVIEWS_FOR_DIFFICULT_CARD = 2;

// Below the SM-2 default (2.5, see src/constants/scheduling.js) - a card
// this low has been marked "hard to remember" more than once.
export const DIFFICULT_CARD_EASE_FACTOR_THRESHOLD = 2.0;

export const MAX_RECOMMENDATIONS = 6;
