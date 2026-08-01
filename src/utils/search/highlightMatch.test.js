import { describe, expect, it } from "vitest";

import { highlightMatch } from "./highlightMatch";

describe("highlightMatch", () => {

    it("highlights a match in the middle of the text", () => {

        const segments = highlightMatch("Restaurant", "rant");

        expect(segments).toEqual([
            { text: "Restau", highlighted: false },
            { text: "rant", highlighted: true }
        ]);

    });

    it("highlights a match at the start of the text", () => {

        const segments = highlightMatch("Restaurant", "Restau");

        expect(segments).toEqual([
            { text: "Restau", highlighted: true },
            { text: "rant", highlighted: false }
        ]);

    });

    it("highlights the whole text on an exact match", () => {

        const segments = highlightMatch("hello", "hello");

        expect(segments).toEqual([
            { text: "hello", highlighted: true }
        ]);

    });

    it("is case-insensitive but preserves the original casing", () => {

        const segments = highlightMatch("Restaurant", "RANT");

        expect(segments).toEqual([
            { text: "Restau", highlighted: false },
            { text: "rant", highlighted: true }
        ]);

    });

    it("returns the whole text unhighlighted when there is no match", () => {

        expect(highlightMatch("hello", "xyz")).toEqual([{ text: "hello", highlighted: false }]);

    });

    it("returns the whole text unhighlighted when the query is empty", () => {

        expect(highlightMatch("hello", "")).toEqual([{ text: "hello", highlighted: false }]);

    });

    it("handles an empty text gracefully", () => {

        expect(highlightMatch("", "hello")).toEqual([{ text: "", highlighted: false }]);

    });

});
