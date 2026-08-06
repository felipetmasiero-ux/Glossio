import { describe, expect, it } from "vitest";

import { recommendWeakTopics } from "./recommendWeakTopics";

function wrongAnswer(lessonId) {
    return { type: "QUIZ_COMPLETED", payload: { lessonId, correct: false } };
}

function rightAnswer(lessonId) {
    return { type: "EXERCISE_COMPLETED", payload: { lessonId, correct: true } };
}

describe("recommendWeakTopics", () => {

    it("recommends a topic that shows up often across wrong answers", () => {

        const result = recommendWeakTopics({
            events: [
                wrongAnswer("english-a1-greetings"),
                wrongAnswer("english-a1-greetings"),
                wrongAnswer("english-a1-greetings")
            ],
            language: "english"
        });

        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            type: "review-topic",
            href: "/my-flashcards",
            reason: "Esse tópico aparece com frequência nos seus erros (3 vezes)."
        });

    });

    it("does not recommend a topic with too few mistakes", () => {

        const result = recommendWeakTopics({
            events: [wrongAnswer("english-a1-greetings"), wrongAnswer("english-a1-greetings")],
            language: "english"
        });

        expect(result).toEqual([]);

    });

    it("ignores correct answers entirely", () => {

        const result = recommendWeakTopics({
            events: [rightAnswer("english-a1-greetings"), rightAnswer("english-a1-greetings"), rightAnswer("english-a1-greetings")],
            language: "english"
        });

        expect(result).toEqual([]);

    });

    it("picks the topic with the most mistakes when several qualify", () => {

        const result = recommendWeakTopics({
            events: [
                wrongAnswer("english-a1-greetings"),
                wrongAnswer("english-a1-greetings"),
                wrongAnswer("english-a1-greetings"),
                wrongAnswer("english-a1-family"),
                wrongAnswer("english-a1-family"),
                wrongAnswer("english-a1-family"),
                wrongAnswer("english-a1-family")
            ],
            language: "english"
        });

        expect(result[0].href).toBe("/my-flashcards");
        expect(result[0].reason).toContain("4 vezes");

    });

    it("returns nothing for a brand new user with no events", () => {
        expect(recommendWeakTopics({ events: [], language: "english" })).toEqual([]);
    });

});
