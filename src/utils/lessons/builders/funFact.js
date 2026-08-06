import { createFeedbackField } from "./createFeedbackField";

// One field of a quiz block's optional `feedback` object - see feedback.js.
// Shown only when the answer was correct ("curiosidade"). `audioRef` (built
// by audio()) is optional - see createFeedbackField's comment.
export function funFact(text, audioRef) {
    return createFeedbackField("funFact", text, audioRef);
}
