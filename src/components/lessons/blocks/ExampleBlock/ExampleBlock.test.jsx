import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { ExampleBlock } from "./ExampleBlock";

vi.mock("../../../../hooks/useWordPopup", () => ({
    useWordPopup: () => ({ selectedWord: null, openWord: vi.fn(), closeWord: vi.fn() })
}));

// ExampleBlock always renders a (word-less, so null-returning) <WordPopup>
// alongside itself - WordPopup calls useFlashcards()/useLanguage()
// unconditionally before its own early return, so these need mocking too,
// same as WordPopup.test.jsx does for WordPopup directly.
vi.mock("../../../../hooks/useFlashcards", () => ({ useFlashcards: () => ({ addFlashcard: vi.fn() }) }));
vi.mock("../../../../hooks/useLanguage", () => ({ useLanguage: () => ({ language: "english" }) }));
vi.mock("../../../../hooks/useRequireAuth", () => ({ useRequireAuth: () => (action) => action }));

const lesson = { language: "english" };

describe("ExampleBlock", () => {

    it("shows no audio button for an example with no audio() reference - compatibility with every existing lesson", () => {

        const block = { examples: [{ text: "Hello!", translation: "Olá!" }] };

        render(<ExampleBlock block={block} lesson={lesson} />);

        expect(screen.queryByRole("button", { name: "Reproduzir áudio" })).toBeNull();

    });

    it("shows an audio button only for the example authored with an audio() reference", () => {

        const block = {
            examples: [
                { text: "Hello!", translation: "Olá!" },
                { text: "Goodbye!", translation: "Tchau!", audio: { file: "/audio/goodbye.mp3" } }
            ]
        };

        render(<ExampleBlock block={block} lesson={lesson} />);

        expect(screen.getAllByRole("button", { name: "Reproduzir áudio" })).toHaveLength(1);

    });

});
