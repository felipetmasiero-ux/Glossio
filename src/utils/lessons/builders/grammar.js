import { createBlock } from "./createBlock"
import { BLOCK_TYPES } from "../../../constants/lessonBlocks"

export function grammar(
    title,
    text,
    id
) {

    return createBlock(
        BLOCK_TYPES.GRAMMAR,
        {
            title,
            text
        },
        id
    );

}