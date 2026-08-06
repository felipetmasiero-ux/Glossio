// GA4 event names for the whole app - snake_case, matching GA4's own
// naming convention. Deliberately separate from constants/events.js
// (EVENT_TYPES): that enum feeds gamification (achievements/streak/
// dashboard) and must stay free to evolve on its own terms, without
// silently renaming a GA4 event and breaking historical reporting.
export const ANALYTICS_EVENTS = {

    APP_OPEN: "app_open",
    PAGE_VIEW: "page_view",

    LANGUAGE_SELECTED: "language_selected",

    LESSON_STARTED: "lesson_started",
    LESSON_COMPLETED: "lesson_completed",

    EXERCISE_STARTED: "exercise_started",
    EXERCISE_COMPLETED: "exercise_completed",

    FLASHCARD_ADDED: "flashcard_added",
    CUSTOM_FLASHCARD_CREATED: "custom_flashcard_created",
    CUSTOM_FLASHCARD_EDITED: "custom_flashcard_edited",
    CUSTOM_FLASHCARD_DELETED: "custom_flashcard_deleted",

    STUDY_SESSION_STARTED: "study_session_started",
    STUDY_SESSION_FINISHED: "study_session_finished",
    REVIEW_COMPLETED: "review_completed",

    DECK_CREATED: "deck_created",
    DECK_DELETED: "deck_deleted",

    SEARCH_PERFORMED: "search_performed",

    FAVORITE_ADDED: "favorite_added",
    FAVORITE_REMOVED: "favorite_removed",

    LANDING_CTA_CLICKED: "landing_cta_clicked",
    LANDING_SCROLL_DEPTH: "landing_scroll_depth",
    LANDING_FAQ_OPENED: "landing_faq_opened"

};
