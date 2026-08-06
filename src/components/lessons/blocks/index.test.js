import { describe, expect, it } from "vitest";

import { lessonBlocks } from "./index";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";

// BLOCK_TYPES (the canonical list validateBlock.js checks against) and
// lessonBlocks (the render registry LessonBlock.jsx dispatches through) are
// two hand-maintained enumerations of the same set of block types - nothing
// forces them to stay in sync. This is the guardrail: a block type added to
// one without the other (renderable but "invalid" per the validator, or
// "valid" but rendered as UnknownBlock) fails here immediately.
describe("lessonBlocks registry vs BLOCK_TYPES", () => {

    it("registers exactly the same set of types BLOCK_TYPES declares", () => {

        const registeredTypes = Object.keys(lessonBlocks).sort();

        const declaredTypes = Object.values(BLOCK_TYPES).sort();

        expect(registeredTypes).toEqual(declaredTypes);

    });

    it("gives every registered block type a component and a label", () => {

        Object.entries(lessonBlocks).forEach(([type, config]) => {
            expect(config.component, `${type} is missing a component`).toBeTypeOf("function");
            expect(config.label, `${type} is missing a label`).toBeTruthy();
        });

    });

});
