// Shared by hint/commonMistake/funFact/grammarNote/extraExample - not
// exported via index.js, an internal helper only.
//
// Every feedback field is a plain string today (`{ hint: "..." }`) and
// every existing quiz(...) call that uses feedback() only ever passes
// text, so the plain-string shape has to stay the default: only wrap the
// value into `{ text, audio }` when an audio() reference is actually
// given, so ExerciseFeedback (and anything reading feedback.hint etc.
// directly) doesn't have to change for the common case of no audio.
export function createFeedbackField(key, text, audioRef) {
    return { [key]: audioRef ? { text, audio: audioRef } : text };
}
