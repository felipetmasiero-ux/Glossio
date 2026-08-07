import { describe, expect, it } from "vitest";

import { selectVoice } from "./selectVoice";

function voice(name, lang) {
    return { name, lang };
}

describe("selectVoice", () => {

    it("returns null when there are no voices available yet (still loading, or unsupported)", () => {
        expect(selectVoice([], "en-US")).toBeNull();
        expect(selectVoice(null, "en-US")).toBeNull();
    });

    it("prefers a known high-quality voice over a generic one for the same language", () => {

        const voices = [
            voice("Microsoft David", "en-US"),
            voice("Samantha", "en-US"),
            voice("Google UK English Female", "en-GB")
        ];

        expect(selectVoice(voices, "en-US")).toBe(voices[1]);

    });

    it("respects the preference order when more than one known-good voice is available", () => {

        const voices = [
            voice("Microsoft Zira", "en-US"),
            voice("Google US English", "en-US")
        ];

        // Google US English is listed before Microsoft Zira in the
        // preference list.
        expect(selectVoice(voices, "en-US")).toBe(voices[1]);

    });

    it("falls back to any voice matching the exact language when no known-good name is installed", () => {

        const voices = [
            voice("Some Obscure Voice", "en-US"),
            voice("Another One", "fr-FR")
        ];

        expect(selectVoice(voices, "en-US")).toBe(voices[0]);

    });

    it("falls back to a language-prefix match when the exact locale isn't installed", () => {

        const voices = [voice("Daniel", "en-GB")];

        expect(selectVoice(voices, "en-US")).toBe(voices[0]);

    });

    it("returns null when nothing matches the language at all", () => {

        const voices = [voice("Amelie", "fr-FR")];

        expect(selectVoice(voices, "pt-BR")).toBeNull();

    });

    it("picks the right known-good voice per supported language", () => {

        const voices = [
            voice("Luciana", "pt-BR"),
            voice("Amelie", "fr-FR"),
            voice("Samantha", "en-US")
        ];

        expect(selectVoice(voices, "pt-BR")).toBe(voices[0]);
        expect(selectVoice(voices, "fr-FR")).toBe(voices[1]);
        expect(selectVoice(voices, "en-US")).toBe(voices[2]);

    });

});
