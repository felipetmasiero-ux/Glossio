import { describe, expect, it } from "vitest";

import { searchLessons } from "./searchLessons";
import { MATCH_RANK } from "./matchRank";

function lesson(title, overrides = {}) {
    return { id: title, title, language: "english", level: "A1", topic: null, moduleTitle: "English A1", ...overrides };
}

describe("searchLessons", () => {

    it("matches by title", () => {

        const lessons = [lesson("Daily Routine"), lesson("Greetings")];

        const results = searchLessons(lessons, "daily");

        expect(results.map(r => r.label)).toEqual(["Daily Routine"]);

    });

    it("matches by topic", () => {

        const lessons = [lesson("Daily Routine", { topic: "daily-routine" })];

        const results = searchLessons(lessons, "daily-routine");

        expect(results[0].rank).toBe(MATCH_RANK.ALIAS);

    });

    it("matches by module title", () => {

        const lessons = [lesson("Greetings", { moduleTitle: "English A1" })];

        const results = searchLessons(lessons, "English A1");

        expect(results.map(r => r.label)).toEqual(["Greetings"]);

    });

    it("matches by subtitle/description as a last resort", () => {

        const lessons = [lesson("Greetings", { subtitle: "Learn how to greet people" })];

        const results = searchLessons(lessons, "greet people");

        expect(results[0].rank).toBe(MATCH_RANK.TRANSLATION);

    });

    it("ranks an exact title match above a module/topic match", () => {

        const lessons = [
            lesson("Food", { moduleTitle: "English A1" }),
            lesson("Restaurant", { moduleTitle: "Food Basics" })
        ];

        const results = searchLessons(lessons, "food");

        expect(results.map(r => r.label)).toEqual(["Food", "Restaurant"]);

    });

    it("excludes lessons that don't match any field", () => {

        expect(searchLessons([lesson("Greetings")], "xyz")).toEqual([]);

    });

});
