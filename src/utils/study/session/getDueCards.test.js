import { describe, expect, it } from "vitest";

import { getDueCards } from "./getDueCards";

const DAY = 24 * 60 * 60 * 1000;

function card(overrides = {}) {
    return { id: "1", language: "English", nextReview: Date.now(), ...overrides };
}

describe("getDueCards", () => {

    it("returns an empty queue when nothing is due", () => {
        const cards = [card({ nextReview: Date.now() + DAY })];
        expect(getDueCards(cards, "English")).toEqual([]);
    });

    it("selects overdue and exactly-due cards for the given language", () => {

        const due = card({ id: "1", nextReview: Date.now() - DAY });
        const notDue = card({ id: "2", nextReview: Date.now() + DAY });
        const otherLanguage = card({ id: "3", language: "French", nextReview: Date.now() - DAY });

        const result = getDueCards([due, notDue, otherLanguage], "English");

        expect(result).toEqual([due]);

    });

    it("accepts an injectable `now`, for deterministic tests elsewhere", () => {

        const fixedNow = new Date(2026, 0, 1).getTime();
        const cards = [card({ nextReview: fixedNow - 1000 }), card({ id: "2", nextReview: fixedNow + 1000 })];

        expect(getDueCards(cards, "English", fixedNow)).toHaveLength(1);

    });

    it("shares the same due-now definition getStudyStats/calculateStats use - a card with no nextReview is due", () => {

        const cards = [card({ nextReview: undefined })];

        expect(getDueCards(cards, "English")).toHaveLength(1);

    });

});
