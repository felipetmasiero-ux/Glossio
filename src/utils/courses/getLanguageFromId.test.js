import { describe, expect, it } from "vitest";

import { getLanguageFromId } from "./getLanguageFromId";

describe("getLanguageFromId", () => {

    it("extracts the language prefix from a lesson id", () => {
        expect(getLanguageFromId("english-a1-greetings")).toBe("english");
        expect(getLanguageFromId("french-a1-family")).toBe("french");
        expect(getLanguageFromId("portuguese-a2-hobbies")).toBe("portuguese");
    });

    it("extracts the language prefix from a module id", () => {
        expect(getLanguageFromId("english-a1")).toBe("english");
    });

    it("returns null for a nullish id", () => {
        expect(getLanguageFromId(null)).toBeNull();
        expect(getLanguageFromId(undefined)).toBeNull();
    });

});
