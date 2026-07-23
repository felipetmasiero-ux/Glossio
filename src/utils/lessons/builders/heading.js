import { createBlock } from "./createBlock";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";

export function heading(text, id) {

    return createBlock(

        BLOCK_TYPES.HEADING,

        {

            text

        },

        id

    );

}