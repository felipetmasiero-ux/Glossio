import { createBlock } from "./createBlock";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";

export function culture(
    title,
    text,
    id
) {

    return createBlock(
        BLOCK_TYPES.CULTURE,
        {
            title,
            text
        },
        id
    );

}