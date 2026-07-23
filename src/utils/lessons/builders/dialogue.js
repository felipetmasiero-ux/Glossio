import { createBlock } from "./createBlock";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";  

export function dialogue(
    lines,
    id
) {

    return createBlock(
        BLOCK_TYPES.DIALOGUE,
        {
            lines
        },
        id
    );

}