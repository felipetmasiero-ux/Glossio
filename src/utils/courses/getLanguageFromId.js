// Every module/lesson id is prefixed with its language ("english-a1",
// "english-a1-greetings", "french-a1-family", ...) - confirmed across all
// course data files, no exceptions. This lets lesson/module pages resolve
// their own language straight from the URL param instead of depending on
// LanguageContext, which is what makes them safe to open publicly: a
// crawler or a shared link gets the same content regardless of whatever
// (if anything) is in the visitor's local language setting.
export function getLanguageFromId(id) {
    return id?.split("-")[0] ?? null;
}
