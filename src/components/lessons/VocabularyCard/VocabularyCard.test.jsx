import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { VocabularyCard } from "./VocabularyCard";

describe("VocabularyCard", () => {

    it("shows no audio button for a word with no audio() reference - compatibility with every existing dictionary entry", () => {

        render(<VocabularyCard word={{ word: "hello", translation: "olá", language: "english" }} onOpen={vi.fn()} />);

        expect(screen.queryByRole("button")).toBeNull();

    });

    it("shows an audio button for a word authored with an audio() reference", () => {

        render(
            <VocabularyCard
                word={{ word: "hello", translation: "olá", audio: { file: "/audio/hello.mp3" }, language: "english" }}
                onOpen={vi.fn()}
            />
        );

        expect(screen.getByRole("button", { name: "Reproduzir áudio" })).not.toBeNull();

    });

    it("clicking the audio button does not flip the card", () => {

        render(
            <VocabularyCard
                word={{ word: "hello", translation: "olá", audio: { file: "/audio/hello.mp3" }, language: "english" }}
                onOpen={vi.fn()}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: "Reproduzir áudio" }));

        // Flipping the card would swap "Vocabulário" for "Tradução" -
        // still showing the front label means the click didn't bubble.
        expect(screen.getByText("Vocabulário")).not.toBeNull();

    });

    it("still flips to the translation on click when it has audio", () => {

        render(
            <VocabularyCard
                word={{ word: "hello", translation: "olá", audio: { file: "/audio/hello.mp3" }, language: "english" }}
                onOpen={vi.fn()}
            />
        );

        fireEvent.click(screen.getByText("hello"));

        expect(screen.getByText("Tradução")).not.toBeNull();

    });

});
