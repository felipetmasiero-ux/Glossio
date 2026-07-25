import { createBlock } from "./createBlock";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";  

export function quiz(
    question,
    options,
    answer,
    explanation,
    id
) {

    return createBlock(
        BLOCK_TYPES.QUIZ,
        {
            question,
            options,
            answer,
            explanation
        },
        id
    );

}