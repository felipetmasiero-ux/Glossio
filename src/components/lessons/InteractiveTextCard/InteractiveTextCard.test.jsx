import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { InteractiveTextCard } from "./InteractiveTextCard";

// InteractiveTextCard is shared by ParagraphBlock, GrammarBlock,
// CultureBlock and QuoteBlock - testing it directly covers all 4 content
// block types' audio wiring at once. It always renders a (word-less, so
// null-returning) <WordPopup> alongside itself, which pulls in the same
// hook chain WordPopup.test.jsx/ExampleBlock.test.jsx already mock.
vi.mock("../../../hooks/useWordPopup", () => ({
    useWordPopup: () => ({ selectedWord: null, openWord: vi.fn(), closeWord: vi.fn() })
}));
vi.mock("../../../hooks/useFlashcards", () => ({ useFlashcards: () => ({ addFlashcard: vi.fn() }) }));
vi.mock("../../../hooks/useLanguage", () => ({ useLanguage: () => ({ language: "english" }) }));
vi.mock("../../../hooks/useRequireAuth", () => ({ useRequireAuth: () => (action) => action }));

const lesson = { language: "english" };

describe("InteractiveTextCard", () => {

    it("shows no audio button with no audio() reference - compatibility with every existing lesson", () => {

        render(<InteractiveTextCard lesson={lesson} title="Explicação" text="Some text." />);

        expect(screen.queryByRole("button", { name: "Reproduzir áudio" })).toBeNull();

    });

    it("shows an audio button when authored with an audio() reference (card variant)", () => {

        render(
            <InteractiveTextCard lesson={lesson} title="Explicação" text="Some text." audio={{ file: "/audio/x.mp3" }} />
        );

        expect(screen.getByRole("button", { name: "Reproduzir áudio" })).not.toBeNull();

    });

    it("shows an audio button when authored with an audio() reference (quote variant)", () => {

        render(
            <InteractiveTextCard lesson={lesson} variant="quote" text="A quote." audio={{ file: "/audio/x.mp3" }} />
        );

        expect(screen.getByRole("button", { name: "Reproduzir áudio" })).not.toBeNull();

    });

});
