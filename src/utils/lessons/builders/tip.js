import { createBlock } from "./createBlock";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";

// `audio` (built by audio()) is optional - see docs/CONTENT_AUTHORING.md's
// Audio section.
export function tip(title, text, audio, id) {
    return createBlock(BLOCK_TYPES.TIP, { title, text, audio }, id);
}
