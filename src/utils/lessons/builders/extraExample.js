import { createFeedbackField } from "./createFeedbackField";

// One field of a quiz block's optional `feedback` object - see feedback.js.
// Shown for both a correct and a wrong answer ("exemplo adicional").
// `audioRef` (built by audio()) is optional - see createFeedbackField's
// comment.
export function extraExample(text, audioRef) {
    return createFeedbackField("extraExample", text, audioRef);
}
