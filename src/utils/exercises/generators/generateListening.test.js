import { describe, expect, it } from "vitest";

import { generateListening, buildListeningExercise } from "./generateListening";

function buildLesson(overrides = {}) {
    return {
        id: "english-a1-greetings",
        blocks: [
            {
                id: "b1",
                type: "example",
                examples: [
                    { text: "She works at a hospital.", translation: "Ela trabalha em um hospital." },
                    { text: "He lives in London.", translation: "Ele mora em Londres." },
                    { text: "They study every day.", translation: "Eles estudam todos os dias." },
                    { text: "We eat breakfast at 8am.", translation: "Nós tomamos café da manhã às 8h." }
                ]
            }
        ],
        ...overrides
    };
}

describe("buildListeningExercise", () => {

    const lesson = buildLesson();
    const candidate = { text: "She works at a hospital.", translation: "Ela trabalha em um hospital." };
    const pool = [
        { text: "He lives in London." },
        { text: "They study every day." },
        { text: "We eat breakfast at 8am." }
    ];

    it("builds a listening exercise with the expected envelope and payload shape", () => {

        const exercise = buildListeningExercise(lesson, candidate, pool, 0);

        expect(exercise.id).toBe("english-a1-greetings-listening-0");
        expect(exercise.type).toBe("listening");
        expect(exercise.lessonId).toBe("english-a1-greetings");
        expect(exercise.prompt).toBe("Ouça o áudio e escolha a frase correta.");
        expect(exercise.feedback).toBeNull();
        expect(exercise.payload.text).toBe("She works at a hospital.");
        expect(exercise.payload.options).toHaveLength(4);
        expect(exercise.payload.options[exercise.payload.answerIndex]).toBe("She works at a hospital.");

    });

    it("carries the candidate's translation through as the explanation", () => {

        const exercise = buildListeningExercise(lesson, candidate, pool, 0);

        expect(exercise.explanation).toBe("Ela trabalha em um hospital.");

    });

    it("defaults explanation to null when the candidate has no translation", () => {

        const exercise = buildListeningExercise(lesson, { text: "She works at a hospital." }, pool, 0);

        expect(exercise.explanation).toBeNull();

    });

    it("defaults to TTS-only audio (the audio() builder's {} shape) when the candidate has no recorded file", () => {

        const exercise = buildListeningExercise(lesson, candidate, pool, 0);

        expect(exercise.payload.audio).toEqual({});

    });

    it("uses the candidate's own recorded audio file when it already has one - the day real files exist, nothing here needs to change", () => {

        const withFile = { ...candidate, audio: { file: "/audio/english/a1/hospital.mp3" } };

        const exercise = buildListeningExercise(lesson, withFile, pool, 0);

        expect(exercise.payload.audio).toEqual({ file: "/audio/english/a1/hospital.mp3" });

    });

    it("returns null when the lesson doesn't have enough distinct distractors", () => {

        const exercise = buildListeningExercise(lesson, candidate, [{ text: "He lives in London." }], 0);

        expect(exercise).toBeNull();

    });

    it("never lets the correct sentence also appear as a distractor (case-insensitive)", () => {

        const poolWithDuplicate = [
            { text: "SHE WORKS AT A HOSPITAL." },
            { text: "He lives in London." },
            { text: "They study every day." },
            { text: "We eat breakfast at 8am." }
        ];

        const exercise = buildListeningExercise(lesson, candidate, poolWithDuplicate, 0);

        const correctCount = exercise.payload.options.filter(
            option => option.toLowerCase() === "she works at a hospital."
        ).length;

        expect(correctCount).toBe(1);

    });

});

describe("generateListening", () => {

    it("returns [] for a missing lesson - compatibility with a brand new/empty state", () => {
        expect(generateListening(null)).toEqual([]);
    });

    it("returns [] when the lesson has no example blocks at all", () => {
        expect(generateListening({ id: "x", blocks: [{ id: "b1", type: "heading", text: "Hi" }] })).toEqual([]);
    });

    it("generates one listening exercise per eligible example sentence, up to the per-lesson cap", () => {

        const lesson = buildLesson();

        const exercises = generateListening(lesson);

        expect(exercises.length).toBeGreaterThan(0);
        expect(exercises.length).toBeLessThanOrEqual(4);
        exercises.forEach(exercise => expect(exercise.type).toBe("listening"));

    });

    it("only sources listening targets from example sentences, never from dialogue lines directly", () => {

        const lesson = buildLesson({
            blocks: [
                {
                    id: "b1", type: "example", examples: [
                        { text: "She works at a hospital.", translation: "Ela trabalha em um hospital." },
                        { text: "He lives in London.", translation: "Ele mora em Londres." },
                        { text: "They study every day.", translation: "Eles estudam todos os dias." }
                    ]
                },
                {
                    id: "b2", type: "dialogue", lines: [
                        { speaker: "Anna", text: "Nice to meet you!" },
                        { speaker: "Ben", text: "Nice to meet you too." }
                    ]
                }
            ]
        });

        const exercises = generateListening(lesson);
        const targetTexts = exercises.map(exercise => exercise.payload.text);

        expect(targetTexts).not.toContain("Nice to meet you!");
        expect(targetTexts).not.toContain("Nice to meet you too.");

    });

    it("still widens the distractor pool with dialogue lines when a lesson has few example sentences", () => {

        // Only 2 examples on their own can't supply 3 distractors for
        // either one - the dialogue lines below make it possible.
        const lesson = buildLesson({
            blocks: [
                {
                    id: "b1", type: "example", examples: [
                        { text: "She works at a hospital.", translation: "Ela trabalha em um hospital." },
                        { text: "He lives in London.", translation: "Ele mora em Londres." }
                    ]
                },
                {
                    id: "b2", type: "dialogue", lines: [
                        { speaker: "Anna", text: "Nice to meet you!" },
                        { speaker: "Ben", text: "How are you today?" },
                        { speaker: "Anna", text: "See you tomorrow." }
                    ]
                }
            ]
        });

        const exercises = generateListening(lesson);

        expect(exercises.length).toBe(2);

    });

    it("skips a candidate sentence without enough distractors instead of throwing", () => {

        const lesson = buildLesson({
            blocks: [
                {
                    id: "b1", type: "example", examples: [
                        { text: "She works at a hospital.", translation: "Ela trabalha em um hospital." },
                        { text: "He lives in London.", translation: "Ele mora em Londres." }
                    ]
                }
            ]
        });

        expect(() => generateListening(lesson)).not.toThrow();
        expect(generateListening(lesson)).toEqual([]);

    });

    it("never generates more than the per-lesson cap even with many eligible examples", () => {

        const lesson = buildLesson({
            blocks: [
                {
                    id: "b1", type: "example", examples: Array.from({ length: 10 }, (_, index) => ({
                        text: `Sentence number ${index}.`,
                        translation: `Frase número ${index}.`
                    }))
                }
            ]
        });

        expect(generateListening(lesson).length).toBe(4);

    });

});
