import { buildLessonId } from "./buildLessonId";

// Typical values across the existing A1/A2 content (src/data/lessons) -
// good starting points for a new lesson, not a hard rule. Override any of
// them per lesson as needed.
const DEFAULT_ESTIMATED_TIME = 8;
const DEFAULT_DIFFICULTY = 1;
const DEFAULT_XP = 25;

// Builds a lesson object with the exact shape normalizeLesson.js/
// validateLesson.js expect, deriving `id` from language+level+topic
// (buildLessonId) instead of making every author hand-type and keep it in
// sync with the module it belongs to. Every existing lesson file (a plain
// object literal passed straight to a builder like `heading()`/`quiz()`)
// keeps working unchanged - this is purely an additive, optional way to
// define the *lesson* wrapper around those same blocks; nothing about how
// blocks/vocabulary are authored changes. See docs/CONTENT_AUTHORING.md for
// a full example.
export function defineLesson({

    language,
    level,
    topic,
    category,
    order,
    title,
    subtitle,
    description,
    cover = null,
    estimatedTime = DEFAULT_ESTIMATED_TIME,
    difficulty = DEFAULT_DIFFICULTY,
    xp = DEFAULT_XP,
    tags = [],
    skills = [],
    objectives,
    vocabulary = [],
    blocks,
    summary

}) {

    return {

        id: buildLessonId(language, level, topic),

        language,

        level,

        category,

        topic,

        order,

        title,

        subtitle,

        description,

        cover,

        estimatedTime,

        difficulty,

        xp,

        tags,

        skills,

        objectives,

        vocabulary,

        blocks,

        summary

    };

}
