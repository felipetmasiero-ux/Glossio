// Every validate*() function in this folder returns an array of these -
// one shared shape so scripts/validateContent.js and scripts/contentReport.js
// can print, group and count them without caring which validator produced
// which issue.
//
// severity "error": the content is broken - a typo'd block type, an out of
// range quiz answer, a duplicate id. These should be treated as build
// blockers.
// severity "warning": the content works but is degraded or incomplete - a
// missing quiz explanation, a topic with no display label, a lesson whose
// declared `order` doesn't match its real position. Worth fixing, not worth
// failing a build over.
export function createIssue(severity, category, path, message) {
    return { severity, category, path, message };
}

export function error(category, path, message) {
    return createIssue("error", category, path, message);
}

export function warning(category, path, message) {
    return createIssue("warning", category, path, message);
}
