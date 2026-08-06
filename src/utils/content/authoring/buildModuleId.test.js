import { describe, expect, it } from "vitest";

import { buildModuleId } from "./buildModuleId";

describe("buildModuleId", () => {

    it("joins courseId and lowercased level with a dash", () => {
        expect(buildModuleId("english", "A1")).toBe("english-a1");
    });

    it("lowercases the level regardless of how it was typed", () => {
        expect(buildModuleId("french", "a2")).toBe("french-a2");
    });

});
