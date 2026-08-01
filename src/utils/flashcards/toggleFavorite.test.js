import { describe, expect, it } from "vitest";

import { toggleFavorite } from "./toggleFavorite";

describe("toggleFavorite", () => {

    it("flips favorite from false to true", () => {

        const card = { id: "1", word: "hello", favorite: false, updatedAt: 100 };

        const result = toggleFavorite(card);

        expect(result.favorite).toBe(true);

    });

    it("flips favorite from true to false", () => {

        const card = { id: "1", word: "hello", favorite: true, updatedAt: 100 };

        const result = toggleFavorite(card);

        expect(result.favorite).toBe(false);

    });

    it("treats a missing favorite field as false, toggling to true", () => {

        const card = { id: "1", word: "hello", updatedAt: 100 };

        const result = toggleFavorite(card);

        expect(result.favorite).toBe(true);

    });

    it("bumps updatedAt", () => {

        const card = { id: "1", word: "hello", favorite: false, updatedAt: 100 };

        const result = toggleFavorite(card);

        expect(result.updatedAt).toBeGreaterThanOrEqual(100);

    });

    it("does not mutate the original card", () => {

        const card = { id: "1", word: "hello", favorite: false, updatedAt: 100 };

        toggleFavorite(card);

        expect(card.favorite).toBe(false);

    });

    it("preserves every other field", () => {

        const card = { id: "1", word: "hello", translation: "olá", language: "English", favorite: false, updatedAt: 100 };

        const result = toggleFavorite(card);

        expect(result.word).toBe("hello");
        expect(result.translation).toBe("olá");
        expect(result.language).toBe("English");

    });

});
