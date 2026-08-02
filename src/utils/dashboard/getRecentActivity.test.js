import { describe, expect, it } from "vitest";

import { getRecentActivity } from "./getRecentActivity";
import { EVENT_TYPES } from "../../constants/events";

const DAY = 24 * 60 * 60 * 1000;

describe("getRecentActivity", () => {

    it("returns an empty list when there is no activity", () => {

        expect(getRecentActivity({ language: "English", events: [], flashcards: [] })).toEqual([]);

    });

    it("groups events by day, most recent first, with real titles resolved", () => {

        const now = Date.now();

        const flashcards = [
            { id: "card-1", language: "English" },
            { id: "card-2", language: "English" }
        ];

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: now, payload: { lessonId: "english-a1-family" } },
            { type: EVENT_TYPES.FLASHCARD_REVIEWED, timestamp: now, payload: { cardId: "card-1" } },
            { type: EVENT_TYPES.FLASHCARD_REVIEWED, timestamp: now, payload: { cardId: "card-2" } },
            { type: EVENT_TYPES.VIDEO_COMPLETED, timestamp: now - DAY, payload: { videoId: "en-a1-meeting-family" } },
            { type: EVENT_TYPES.VOCABULARY_ADDED, timestamp: now - DAY, payload: { language: "English" } }
        ];

        const days = getRecentActivity({ language: "English", events, flashcards });

        expect(days).toHaveLength(2);

        expect(days[0].dateLabel).toBe("Hoje");
        expect(days[0].items).toEqual(
            expect.arrayContaining([
                { icon: "book", label: 'Concluiu "Family"' },
                { icon: "cards", label: "Revisou 2 palavras" }
            ])
        );

        expect(days[1].dateLabel).toBe("Ontem");
        expect(days[1].items).toEqual(
            expect.arrayContaining([
                { icon: "play", label: 'Assistiu "Talking About Family"' },
                { icon: "cards", label: "Adicionou 1 flashcard" }
            ])
        );

    });

    it("only counts flashcard reviews and additions for the current language", () => {

        const now = Date.now();

        const flashcards = [{ id: "card-1", language: "French" }];

        const events = [
            { type: EVENT_TYPES.FLASHCARD_REVIEWED, timestamp: now, payload: { cardId: "card-1" } },
            { type: EVENT_TYPES.VOCABULARY_ADDED, timestamp: now, payload: { language: "French" } }
        ];

        const days = getRecentActivity({ language: "English", events, flashcards });

        expect(days).toEqual([]);

    });

    it("caps the total number of items at 15 across days", () => {

        const now = Date.now();

        const events = Array.from({ length: 20 }, (_, index) => ({
            type: EVENT_TYPES.LESSON_COMPLETED,
            timestamp: now - index * DAY,
            payload: { lessonId: "english-a1-family" }
        }));

        const days = getRecentActivity({ language: "English", events, flashcards: [] });

        const totalItems = days.reduce((sum, day) => sum + day.items.length, 0);

        expect(totalItems).toBe(15);

    });

});
