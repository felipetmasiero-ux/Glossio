// The one place that encodes the "{language}-{level}-{topic}" id
// convention every lesson in src/data/lessons already follows (confirmed
// across all 60 lessons, zero exceptions) - getLanguageFromId relies on
// this to resolve a lesson's language straight from its id, with no
// LanguageContext dependency (see its own comment for why that matters for
// public/anonymous lesson pages). Building the id this way instead of
// typing it out by hand rules out the one typo that would silently break
// that: a level not lowercased, or a stray extra dash.
export function buildLessonId(language, level, topic) {
    return `${language}-${level.toLowerCase()}-${topic}`;
}
