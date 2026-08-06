import { createBlock } from "./createBlock";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";

// `audio` (built by audio()) is optional - see docs/CONTENT_AUTHORING.md's
// Audio section. No real lesson passes an explicit `id`, so adding this
// before it doesn't break anything.
export function paragraph(text, audio, id) {
    return createBlock(BLOCK_TYPES.PARAGRAPH, { text, audio }, id);
}
