import { createBlock } from "./createBlock";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";

// `feedback` is the optional, structured extra built by the feedback()
// builder (hint/commonMistake/funFact/grammarNote/extraExample - see
// builders/feedback.js). It's a new 5th argument, not folded into
// `explanation`, so every existing 4-argument quiz(...) call across all
// real lessons keeps working unchanged. `id` moves to 6th - no lesson
// passes it explicitly today (every block relies on the default
// crypto.randomUUID() in createBlock), so nothing breaks.
export function quiz(
    question,
    options,
    answer,
    explanation,
    feedback,
    id
) {

    return createBlock(
        BLOCK_TYPES.QUIZ,
        {
            question,
            options,
            answer,
            explanation,
            feedback
        },
        id
    );

}