import { createFeedbackField } from "./createFeedbackField";

// One field of a quiz block's optional `feedback` object - see feedback.js.
// Shown only when the answer was wrong ("erro comum"). `audioRef` (built
// by audio()) is optional - see createFeedbackField's comment.
export function commonMistake(text, audioRef) {
    return createFeedbackField("commonMistake", text, audioRef);
}
