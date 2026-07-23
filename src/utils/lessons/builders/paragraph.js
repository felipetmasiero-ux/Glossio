import { createBlock } from "./createBlock";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";  

export function paragraph(text, id) {
    return createBlock(BLOCK_TYPES.PARAGRAPH, { text }, id);
}