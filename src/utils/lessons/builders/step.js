import { createBlock } from "./createBlock";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";

export function step(title, id) {

    return createBlock(

        BLOCK_TYPES.STEP,

        {

            title

        },

        id

    );

}