import { createBlock } from "./createBlock";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";  

export function list(items, id) {
    return createBlock(BLOCK_TYPES.LIST, { items }, id);
}