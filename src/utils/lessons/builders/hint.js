import { createFeedbackField } from "./createFeedbackField";

// One field of a quiz block's optional `feedback` object - see feedback.js.
// Shown only when the answer was wrong ("dica para memorizar"). `audioRef`
// (built by audio()) is optional - see createFeedbackField's comment.
export function hint(text, audioRef) {
    return createFeedbackField("hint", text, audioRef);
}
