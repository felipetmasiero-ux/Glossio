import { describe, expect, it } from "vitest";

import { GrammarRepository } from "./GrammarRepository";

describe("GrammarRepository", () => {

    describe("loading", () => {

        it("returns the levels available for a language", () => {

            const levels = GrammarRepository.getLevels("english");

            expect(Object.keys(levels)).toEqual(expect.arrayContaining(["a1", "a2"]));
            expect(levels.a1.length).toBeGreaterThan(0);

        });

        it("is case-insensitive for the language argument, like the other repositories", () => {

            const lower = GrammarRepository.getAll("english");
            const capitalized = GrammarRepository.getAll("English");

            expect(capitalized.length).toBe(lower.length);
            expect(capitalized).toEqual(lower);

        });

        it("returns every topic across all levels for getAll", () => {

            const a1 = GrammarRepository.getByLevel("english", "A1");
            const a2 = GrammarRepository.getByLevel("english", "A2");
            const all = GrammarRepository.getAll("english");

            expect(all.length).toBe(a1.length + a2.length);

        });

        it("returns an empty object/array for a language with no data", () => {

            expect(GrammarRepository.getLevels("klingon")).toEqual({});
            expect(GrammarRepository.getAll("klingon")).toEqual([]);

        });

        it("covers every required language and level (English A1/A2, French A1/A2, Portuguese A1)", () => {

            expect(GrammarRepository.getByLevel("english", "A1").length).toBeGreaterThan(0);
            expect(GrammarRepository.getByLevel("english", "A2").length).toBeGreaterThan(0);
            expect(GrammarRepository.getByLevel("french", "A1").length).toBeGreaterThan(0);
            expect(GrammarRepository.getByLevel("french", "A2").length).toBeGreaterThan(0);
            expect(GrammarRepository.getByLevel("portuguese", "A1").length).toBeGreaterThan(0);

        });

    });

    describe("lookup", () => {

        it("finds a topic by id", () => {

            const topic = GrammarRepository.getById("english", "english-a1-present-simple");

            expect(topic).not.toBeNull();
            expect(topic.title).toBe("Present Simple");

        });

        it("returns null for an id that doesn't exist", () => {

            expect(GrammarRepository.getById("english", "not-a-real-id")).toBeNull();

        });

        it("finds a topic by the lesson it belongs to", () => {

            const topic = GrammarRepository.getByLessonId("english", "english-a1-present-simple");

            expect(topic).not.toBeNull();
            expect(topic.id).toBe("english-a1-present-simple");

        });

        it("returns null when a lesson has no grammar reference entry", () => {

            expect(GrammarRepository.getByLessonId("english", "english-a1-greetings")).toBeNull();

        });

    });

    describe("relationships", () => {

        it("relates a topic to its source lesson", () => {

            const topic = GrammarRepository.getById("english", "english-a1-present-simple");
            const { lesson } = GrammarRepository.getRelated("english", topic);

            expect(lesson).not.toBeNull();
            expect(lesson.id).toBe("english-a1-present-simple");
            expect(lesson.title).toBe("Present Simple");

        });

        it("relates a topic to videos sharing the same topic-taxonomy key", () => {

            const topic = GrammarRepository.getById("english", "english-a2-hobbies");
            const { videos } = GrammarRepository.getRelated("english", topic);

            expect(videos.length).toBeGreaterThan(0);
            videos.forEach(video => expect(video.topic).toBe(topic.topic));

        });

        it("returns empty relationships for a null topic", () => {

            expect(GrammarRepository.getRelated("english", null)).toEqual({ lesson: null, videos: [] });

        });

    });

});
