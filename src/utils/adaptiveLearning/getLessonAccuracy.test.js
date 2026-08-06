import { describe, expect, it } from "vitest";

import { getLessonAccuracy } from "./getLessonAccuracy";

function quizEvent(lessonId, correct) {
    return { type: "QUIZ_COMPLETED", payload: { lessonId, correct } };
}

function exerciseEvent(lessonId, correct) {
    return { type: "EXERCISE_COMPLETED", payload: { lessonId, correct } };
}

describe("getLessonAccuracy", () => {

    it("returns an empty array for no events", () => {
        expect(getLessonAccuracy([], "english")).toEqual([]);
    });

    it("combines QUIZ_COMPLETED and EXERCISE_COMPLETED events into one accuracy per lesson", () => {

        const events = [
            quizEvent("english-a1-greetings", true),
            quizEvent("english-a1-greetings", false),
            exerciseEvent("english-a1-greetings", true),
            exerciseEvent("english-a1-greetings", true)
        ];

        const [stats] = getLessonAccuracy(events, "english");

        expect(stats).toEqual({
            lessonId: "english-a1-greetings",
            correct: 3,
            total: 4,
            accuracy: 0.75
        });

    });

    it("keeps separate stats per lesson", () => {

        const events = [
            quizEvent("english-a1-greetings", true),
            quizEvent("english-a1-family", false)
        ];

        const stats = getLessonAccuracy(events, "english");

        expect(stats).toHaveLength(2);
        expect(stats.find(s => s.lessonId === "english-a1-greetings").accuracy).toBe(1);
        expect(stats.find(s => s.lessonId === "english-a1-family").accuracy).toBe(0);

    });

    it("only counts lessons for the requested language, derived from the lesson id prefix", () => {

        const events = [
            quizEvent("english-a1-greetings", true),
            quizEvent("french-a1-greetings", false)
        ];

        const stats = getLessonAccuracy(events, "english");

        expect(stats).toHaveLength(1);
        expect(stats[0].lessonId).toBe("english-a1-greetings");

    });

    it("ignores events of other types and events with no lessonId", () => {

        const events = [
            { type: "WORD_VIEWED", payload: { lessonId: "english-a1-greetings" } },
            { type: "QUIZ_COMPLETED", payload: { correct: true } }
        ];

        expect(getLessonAccuracy(events, "english")).toEqual([]);

    });

});
