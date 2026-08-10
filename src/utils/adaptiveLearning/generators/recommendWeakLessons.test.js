import { describe, expect, it } from "vitest";

import { recommendWeakLessons } from "./recommendWeakLessons";

function events(lessonId, correctPattern) {
    return correctPattern.map(correct => ({
        type: "QUIZ_COMPLETED",
        payload: { lessonId, correct }
    }));
}

describe("recommendWeakLessons", () => {

    it("recommends a real lesson the user is doing poorly in", () => {

        const result = recommendWeakLessons({
            events: events("english-a1-greetings", [false, false, true]),
            language: "english"
        });

        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            type: "review-lesson",
            href: "/lessons/english-a1-greetings",
            reason: "Você acertou apenas 33% nesta lição."
        });
        expect(result[0].title).toContain("Cumprimentos");

    });

    it("does not recommend a lesson with too few attempts to judge", () => {

        const result = recommendWeakLessons({
            events: events("english-a1-greetings", [false, false]),
            language: "english"
        });

        expect(result).toEqual([]);

    });

    it("does not recommend a lesson the user is doing well in", () => {

        const result = recommendWeakLessons({
            events: events("english-a1-greetings", [true, true, true, false]),
            language: "english"
        });

        expect(result).toEqual([]);

    });

    it("gives a critically low accuracy lesson a higher priority (lower number) than a moderately low one", () => {

        const result = recommendWeakLessons({
            events: [
                ...events("english-a1-greetings", [false, false, false, true]), // 25%
                ...events("english-a1-family", [true, true, false, false, false]) // 40%... let's use 60%
            ],
            language: "english"
        });

        const critical = result.find(r => r.href === "/lessons/english-a1-greetings");
        expect(critical.priority).toBe(1);

    });

    it("caps the number of weak lessons recommended, worst first", () => {

        const allEvents = [
            ...events("english-a1-greetings", [false, false, false]),
            ...events("english-a1-family", [false, false, true]),
            ...events("english-a1-jobs", [false, true, true])
        ];

        const result = recommendWeakLessons({ events: allEvents, language: "english" });

        expect(result.length).toBeLessThanOrEqual(2);
        expect(result[0].href).toBe("/lessons/english-a1-greetings");

    });

    it("returns nothing for a brand new user with no events", () => {
        expect(recommendWeakLessons({ events: [], language: "english" })).toEqual([]);
    });

    it("ignores events from a different language", () => {

        const result = recommendWeakLessons({
            events: events("french-a1-greetings", [false, false, false]),
            language: "english"
        });

        expect(result).toEqual([]);

    });

});
