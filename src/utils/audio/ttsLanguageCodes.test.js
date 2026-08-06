import { describe, expect, it } from "vitest";

import { getTtsLanguageCode } from "./ttsLanguageCodes";

describe("getTtsLanguageCode", () => {

    it("maps every supported language to a BCP-47 code", () => {
        expect(getTtsLanguageCode("english")).toBe("en-US");
        expect(getTtsLanguageCode("french")).toBe("fr-FR");
        expect(getTtsLanguageCode("portuguese")).toBe("pt-BR");
    });

    it("is case-insensitive", () => {
        expect(getTtsLanguageCode("English")).toBe("en-US");
    });

    it("falls back to en-US for an unknown or missing language", () => {
        expect(getTtsLanguageCode("klingon")).toBe("en-US");
        expect(getTtsLanguageCode(undefined)).toBe("en-US");
    });

});
