import { createBlock } from "./createBlock";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";  

export function tip(title, text, id) {
    return createBlock(BLOCK_TYPES.TIP, { title, text }, id);
}