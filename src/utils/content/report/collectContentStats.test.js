import { describe, expect, it } from "vitest";

import { collectContentStats } from "./collectContentStats";

function buildCourse() {
    return {
        id: "english",
        language: "english",
        title: "English",
        modules: [{
            id: "english-a1",
            courseId: "english",
            language: "english",
            level: "A1",
            title: "English A1",
            lessons: [
                {
                    id: "english-a1-greetings",
                    language: "english",
                    blocks: [
                        { id: "b1", type: "heading", text: "Hi" },
                        { id: "b2", type: "paragraph", text: "Text" },
                        { id: "b3", type: "quiz", question: "Q?", options: ["A", "B"], answer: 0, explanation: "Because." }
                    ],
                    objectives: ["Obj 1", "Obj 2"],
                    vocabulary: ["hello", "hi"]
                },
                {
                    id: "english-a1-family",
                    language: "english",
                    blocks: [
                        { id: "b1", type: "heading", text: "Family" }
                    ],
                    objectives: ["Obj 1"],
                    vocabulary: []
                }
            ]
        }]
    };
}

describe("collectContentStats", () => {

    it("counts courses, modules, lessons, blocks, objectives and vocabulary words", () => {

        const stats = collectContentStats({
            courses: { english: buildCourse() },
            dictionaries: { english: [{ word: "hello" }, { word: "hi" }, { word: "bye" }] }
        });

        expect(stats.courseCount).toBe(1);
        expect(stats.moduleCount).toBe(1);
        expect(stats.lessonCount).toBe(2);
        expect(stats.blockCount).toBe(4);
        expect(stats.objectiveCount).toBe(3);
        expect(stats.vocabularyWordCount).toBe(2);
        expect(stats.dictionaryWordCount).toBe(3);

    });

    it("counts exercises actually generated from the quiz block", () => {

        const stats = collectContentStats({
            courses: { english: buildCourse() },
            dictionaries: {}
        });

        // One quiz block -> at least one multiple-choice exercise (see
        // generateMultipleChoice.js) - exact totals across all 5 generators
        // are covered by generateExercisesForLesson's own tests.
        expect(stats.exerciseCount).toBeGreaterThan(0);

    });

    it("treats a lesson whose exercise generation throws as zero exercises, without crashing", () => {

        const stats = collectContentStats({
            courses: {
                broken: {
                    id: "broken",
                    language: "broken",
                    title: "Broken",
                    modules: [{
                        id: "broken-a1",
                        courseId: "broken",
                        language: "broken",
                        level: "A1",
                        title: "Broken A1",
                        lessons: [{ id: "broken-a1-lesson", language: "broken" /* no blocks */ }]
                    }]
                }
            },
            dictionaries: {}
        });

        expect(stats.exerciseCount).toBe(0);
        expect(stats.lessonCount).toBe(1);

    });

    it("handles empty input without crashing", () => {

        const stats = collectContentStats({ courses: {}, dictionaries: {} });

        expect(stats).toEqual({
            courseCount: 0,
            moduleCount: 0,
            lessonCount: 0,
            blockCount: 0,
            objectiveCount: 0,
            vocabularyWordCount: 0,
            dictionaryWordCount: 0,
            exerciseCount: 0
        });

    });

});
