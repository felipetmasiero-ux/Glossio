import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { DialogueLine } from "./DialogueLine";

describe("DialogueLine", () => {

    it("shows no audio button for a line with no audio() reference - compatibility with every existing lesson", () => {

        render(<DialogueLine line={{ speaker: "Ana", text: "Hi!" }} language="english" onWordClick={vi.fn()} />);

        expect(screen.queryByRole("button", { name: "Reproduzir áudio" })).toBeNull();

    });

    it("shows an audio button for a line authored with an audio() reference", () => {

        render(
            <DialogueLine
                line={{ speaker: "Ana", text: "Hi!", audio: { file: "/audio/hi.mp3" } }}
                language="english"
                onWordClick={vi.fn()}
            />
        );

        expect(screen.getByRole("button", { name: "Reproduzir áudio" })).not.toBeNull();

    });

});
