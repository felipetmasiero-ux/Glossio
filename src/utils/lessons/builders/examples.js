import { createBlock } from "./createBlock";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";

export function examples(items, id) {
    return createBlock(BLOCK_TYPES.EXAMPLE, { examples: items }, id);
}
