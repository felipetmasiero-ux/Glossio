import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { InteractiveTranscript } from "./InteractiveTranscript";

// jsdom doesn't implement scrollIntoView; the component calls it whenever
// there's an active segment to auto-scroll to, unrelated to what this
// file is testing.
Element.prototype.scrollIntoView = vi.fn();

// English A2/A1 videos had their `transcript` cleared to `[]` (unverified
// YouTube license - see docs/explore-french-data-request.md for the full
// reasoning). This locks in the one behavior that decision depends on:
// an empty transcript is a supported, non-broken state, not an edge case
// that happens to work today - never renders clickable-word UI, and the
// non-empty path (still used by any video that does have a transcript)
// keeps working exactly as before.
describe("InteractiveTranscript", () => {

    it("shows the 'no transcript' empty state, with no segments and no clickable words, when transcript is []", () => {

        render(
            <InteractiveTranscript
                segments={[]}
                currentTime={0}
                onSeek={vi.fn()}
                language="english"
            />
        );

        expect(screen.getByText("Transcrição indisponível")).not.toBeNull();
        expect(screen.getByText(/ainda não tem uma transcrição/i)).not.toBeNull();

        expect(screen.queryByRole("button")).toBeNull();

    });

    it("still renders segments and clickable words when a real transcript is present", async () => {

        const user = userEvent.setup();
        const onWordClick = vi.fn();

        // "hello" is a real English dictionary entry - matches this
        // session's preference for exercising real content/dictionary
        // lookups instead of mocking DictionaryRepository.
        render(
            <InteractiveTranscript
                segments={[
                    { startTime: 0, endTime: 3, text: "Hello there!" }
                ]}
                currentTime={1}
                onSeek={vi.fn()}
                language="english"
                onWordClick={onWordClick}
            />
        );

        expect(screen.queryByText("Transcrição indisponível")).toBeNull();

        const word = screen.getByRole("button", { name: "Hello" });

        await user.click(word);

        expect(onWordClick).toHaveBeenCalledWith(
            expect.objectContaining({ word: "Hello", language: "english" })
        );

    });

});
