import { createFeedbackField } from "./createFeedbackField";

// One field of a quiz block's optional `feedback` object - see feedback.js.
// Shown for both a correct and a wrong answer ("regra gramatical") - a
// grammar rule is useful context either way. `audioRef` (built by audio())
// is optional - see createFeedbackField's comment.
export function grammarNote(text, audioRef) {
    return createFeedbackField("grammarNote", text, audioRef);
}
