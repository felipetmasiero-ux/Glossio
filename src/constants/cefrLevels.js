// Single source of truth for valid course/module/lesson levels. Only A1/A2
// are authored today (see src/data/courses), but the full CEFR scale is
// listed upfront so adding a B1 course later doesn't require touching the
// validator - it's already a valid level.
export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
