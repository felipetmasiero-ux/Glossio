import { describe, expect, it } from "vitest";

import { paragraph } from "./paragraph";
import { quote } from "./quote";
import { tip } from "./tip";
import { grammar } from "./grammar";
import { culture } from "./culture";
import { audio } from "./audio";

// paragraph/quote/tip/grammar/culture all gained the same optional `audio`
// argument (see docs/CONTENT_AUTHORING.md's Audio section) - one shared
// test file since the behavior being verified is identical across all 5.
describe("block builders with optional audio", () => {

    it("paragraph/quote still work with just their original arguments (every existing lesson)", () => {
        expect(paragraph("Text.").audio).toBeUndefined();
        expect(quote("Text.").audio).toBeUndefined();
    });

    it("tip/grammar/culture still work with just their original arguments (every existing lesson)", () => {
        expect(tip("Title", "Text.").audio).toBeUndefined();
        expect(grammar("Title", "Text.").audio).toBeUndefined();
        expect(culture("Title", "Text.").audio).toBeUndefined();
    });

    it("accepts an audio() reference as the next argument, without disturbing text/title", () => {

        const ref = audio("/audio/english/a1/clip.mp3");

        expect(paragraph("Text.", ref)).toMatchObject({ type: "paragraph", text: "Text.", audio: ref });
        expect(quote("Text.", ref)).toMatchObject({ type: "quote", text: "Text.", audio: ref });
        expect(tip("Title", "Text.", ref)).toMatchObject({ type: "tip", title: "Title", text: "Text.", audio: ref });
        expect(grammar("Title", "Text.", ref)).toMatchObject({ type: "grammar", title: "Title", text: "Text.", audio: ref });
        expect(culture("Title", "Text.", ref)).toMatchObject({ type: "culture", title: "Title", text: "Text.", audio: ref });

    });

    it("still accepts an explicit id as the argument after audio", () => {
        expect(paragraph("Text.", audio(), "custom-id").id).toBe("custom-id");
        expect(tip("Title", "Text.", audio(), "custom-id").id).toBe("custom-id");
    });

});
