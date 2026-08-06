import { describe, expect, it } from "vitest";

import { feedback } from "./feedback";
import { hint } from "./hint";
import { commonMistake } from "./commonMistake";
import { funFact } from "./funFact";
import { grammarNote } from "./grammarNote";
import { extraExample } from "./extraExample";

describe("feedback part builders", () => {

    it("each wraps its text under its own key", () => {
        expect(hint("Remember this.")).toEqual({ hint: "Remember this." });
        expect(commonMistake("People often mix these up.")).toEqual({ commonMistake: "People often mix these up." });
        expect(funFact("Did you know...")).toEqual({ funFact: "Did you know..." });
        expect(grammarNote("Use the present simple here.")).toEqual({ grammarNote: "Use the present simple here." });
        expect(extraExample("Another sentence using it.")).toEqual({ extraExample: "Another sentence using it." });
    });

});

describe("feedback", () => {

    it("merges every part passed to it into a single object", () => {

        const result = feedback(
            hint("Hint text"),
            commonMistake("Mistake text"),
            funFact("Fun fact text"),
            grammarNote("Grammar text"),
            extraExample("Example text")
        );

        expect(result).toEqual({
            hint: "Hint text",
            commonMistake: "Mistake text",
            funFact: "Fun fact text",
            grammarNote: "Grammar text",
            extraExample: "Example text"
        });

    });

    it("only includes the parts actually passed in - every field is optional", () => {
        expect(feedback(hint("Only a hint."))).toEqual({ hint: "Only a hint." });
    });

    it("returns an empty object when called with no parts", () => {
        expect(feedback()).toEqual({});
    });

});
