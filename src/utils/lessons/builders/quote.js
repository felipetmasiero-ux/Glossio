import { createBlock } from "./createBlock";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";  

export function quote(
    text,
    id
) {

    return createBlock(
        BLOCK_TYPES.QUOTE,
        {
            text
        },
        id
    );

}