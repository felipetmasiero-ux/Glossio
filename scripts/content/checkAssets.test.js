import { describe, expect, it } from "vitest";

import { collectAssetRefs, checkAssets } from "./checkAssets.js";

function buildCourse({ cover, lessonAudio } = {}) {
    return {
        id: "english",
        cover,
        modules: [{
            id: "english-a1",
            lessons: [{
                id: "english-a1-greetings",
                blocks: [
                    { type: "paragraph", text: "Hi", audio: lessonAudio ? { file: lessonAudio } : undefined }
                ]
            }]
        }]
    };
}

describe("collectAssetRefs", () => {

    it("collects a course and lesson cover", () => {

        const refs = collectAssetRefs({
            courses: { english: buildCourse({ cover: "/covers/english.webp" }) },
            dictionaries: {}
        });

        expect(refs).toEqual([{ kind: "cover", path: "/covers/english.webp", source: "english" }]);

    });

    it("collects a block-level audio reference", () => {

        const refs = collectAssetRefs({
            courses: { english: buildCourse({ lessonAudio: "/audio/hi.mp3" }) },
            dictionaries: {}
        });

        expect(refs).toEqual([{ kind: "audio", path: "/audio/hi.mp3", source: "english-a1-greetings.blocks[0] (paragraph)" }]);

    });

    it("collects an example item's audio reference", () => {

        const course = {
            id: "english",
            modules: [{
                id: "english-a1",
                lessons: [{
                    id: "english-a1-greetings",
                    blocks: [{
                        type: "example",
                        examples: [{ text: "Hi", audio: { file: "/audio/hi.mp3" } }]
                    }]
                }]
            }]
        };

        const refs = collectAssetRefs({ courses: { english: course }, dictionaries: {} });

        expect(refs.some(r => r.path === "/audio/hi.mp3")).toBe(true);

    });

    it("collects a dialogue line's audio reference", () => {

        const course = {
            id: "english",
            modules: [{
                id: "english-a1",
                lessons: [{
                    id: "english-a1-greetings",
                    blocks: [{
                        type: "dialogue",
                        lines: [{ speaker: "Ana", text: "Hi", audio: { file: "/audio/hi.mp3" } }]
                    }]
                }]
            }]
        };

        const refs = collectAssetRefs({ courses: { english: course }, dictionaries: {} });

        expect(refs.some(r => r.path === "/audio/hi.mp3")).toBe(true);

    });

    it("collects a quiz feedback field's audio reference", () => {

        const course = {
            id: "english",
            modules: [{
                id: "english-a1",
                lessons: [{
                    id: "english-a1-greetings",
                    blocks: [{
                        type: "quiz",
                        question: "Q?",
                        options: ["A", "B"],
                        answer: 0,
                        feedback: { hint: { text: "Hint", audio: { file: "/audio/hint.mp3" } } }
                    }]
                }]
            }]
        };

        const refs = collectAssetRefs({ courses: { english: course }, dictionaries: {} });

        expect(refs.some(r => r.path === "/audio/hint.mp3" && r.source.includes("feedback.hint"))).toBe(true);

    });

    it("does not collect a plain-string quiz feedback field (no audio to check)", () => {

        const course = {
            id: "english",
            modules: [{
                id: "english-a1",
                lessons: [{
                    id: "english-a1-greetings",
                    blocks: [{
                        type: "quiz",
                        question: "Q?",
                        options: ["A", "B"],
                        answer: 0,
                        feedback: { hint: "Just text, no audio." }
                    }]
                }]
            }]
        };

        expect(collectAssetRefs({ courses: { english: course }, dictionaries: {} })).toEqual([]);

    });

    it("collects a dictionary entry's audio reference", () => {

        const refs = collectAssetRefs({
            courses: {},
            dictionaries: { english: [{ id: "hello", word: "hello", audio: { file: "/audio/hello.mp3" } }] }
        });

        expect(refs).toEqual([{ kind: "audio", path: "/audio/hello.mp3", source: "dictionary.english.hello" }]);

    });

    it("does not collect an audio() reference with no file (TTS-only, nothing to check on disk)", () => {

        const refs = collectAssetRefs({
            courses: { english: buildCourse({}) },
            dictionaries: { english: [{ id: "hello", word: "hello", audio: {} }] }
        });

        expect(refs).toEqual([]);

    });

    it("returns nothing for empty input", () => {
        expect(collectAssetRefs({ courses: {}, dictionaries: {} })).toEqual([]);
    });

});

describe("checkAssets", () => {

    it("flags a reference to a file that doesn't exist on disk (real filesystem, no mocks)", () => {

        const issues = checkAssets({
            courses: { english: buildCourse({ cover: "/covers/definitely-does-not-exist-xyz.webp" }) },
            dictionaries: {}
        });

        expect(issues).toHaveLength(1);
        expect(issues[0].severity).toBe("warning");
        expect(issues[0].message).toContain("Capa não encontrada");

    });

    it("reports nothing when there is nothing to check", () => {
        expect(checkAssets({ courses: {}, dictionaries: {} })).toEqual([]);
    });

});
