import { describe, expect, it } from "vitest";

import { GrammarRepository } from "./GrammarRepository";
import { portugueseA2Module } from "../data/lessons/portuguese/a2/module";
import { pastWeekendBlocks } from "../data/grammar/shared/portuguese/a2/pastWeekend";
import { lifeJourneyBlocks } from "../data/grammar/shared/portuguese/a2/lifeJourney";

const PORTUGUESE_A2_LESSON_IDS = [
    "portuguese-a2-past-weekend",
    "portuguese-a2-comparisons",
    "portuguese-a2-health",
    "portuguese-a2-weather-forecast",
    "portuguese-a2-directions",
    "portuguese-a2-past-habits",
    "portuguese-a2-free-time",
    "portuguese-a2-feelings",
    "portuguese-a2-restaurant",
    "portuguese-a2-hotel",
    "portuguese-a2-making-plans",
    "portuguese-a2-life-journey"
];

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
            const b1 = GrammarRepository.getByLevel("english", "B1");
            const b2 = GrammarRepository.getByLevel("english", "B2");
            const c1 = GrammarRepository.getByLevel("english", "C1");
            const all = GrammarRepository.getAll("english");

            expect(all.length).toBe(a1.length + a2.length + b1.length + b2.length + c1.length);

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
            expect(lesson.title).toBe("Presente Simples");

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

    // Portuguese A2 is a deliberate exception to the ~5/12 curation ratio
    // every other module (English A1/A2, French A1/A2, Portuguese A1) uses -
    // full 12/12 coverage, one entry per lesson, decided explicitly for this
    // module. Portuguese A1's partial (3/12) coverage is untouched and still
    // covered by the "loading" describe block above.
    describe("Portuguese A2 (full 12/12 coverage)", () => {

        it("has exactly 12 topics, one per lesson", () => {

            expect(GrammarRepository.getByLevel("portuguese", "A2")).toHaveLength(12);

        });

        it("has 12 unique ids", () => {

            const ids = GrammarRepository.getByLevel("portuguese", "A2").map(topic => topic.id);

            expect(new Set(ids).size).toBe(12);

        });

        it("has language 'portuguese' and level 'A2' on every topic", () => {

            GrammarRepository.getByLevel("portuguese", "A2").forEach(topic => {
                expect(topic.language).toBe("portuguese");
                expect(topic.level).toBe("A2");
            });

        });

        it("still has exactly 3 topics for Portuguese A1, unchanged", () => {

            expect(GrammarRepository.getByLevel("portuguese", "A1")).toHaveLength(3);

        });

        it("resolves every one of the 12 A2 lessons via getByLessonId", () => {

            PORTUGUESE_A2_LESSON_IDS.forEach(lessonId => {

                const topic = GrammarRepository.getByLessonId("portuguese", lessonId);

                expect(topic).not.toBeNull();
                expect(topic.lessonId).toBe(lessonId);

            });

        });

        it("relates every one of the 12 topics to a real, existing Portuguese A2 lesson (no dangling lessonId)", () => {

            GrammarRepository.getByLevel("portuguese", "A2").forEach(topic => {

                const { lesson } = GrammarRepository.getRelated("portuguese", topic);

                expect(lesson).not.toBeNull();
                expect(lesson.id).toBe(topic.lessonId);

            });

        });

        it("shares the exact same grammar block object between the lesson and the reference - not a duplicate copy", () => {

            // Object identity (toBe), not just equal content: proves the
            // lesson's grammar() call and the reference's `explanation`
            // field both import the same shared/portuguese/a2 constant,
            // the same mechanism English A2/French A2/Portuguese A1 use.
            const pastWeekendTopic = GrammarRepository.getByLessonId("portuguese", "portuguese-a2-past-weekend");
            expect(pastWeekendTopic.explanation).toBe(pastWeekendBlocks);

            const lifeJourneyTopic = GrammarRepository.getByLessonId("portuguese", "portuguese-a2-life-journey");
            expect(lifeJourneyTopic.explanation).toBe(lifeJourneyBlocks);

        });

        it("has every lesson's inline grammar() block matching its reference entry's explanation verbatim (single source of truth)", () => {

            portugueseA2Module.lessons.forEach(lesson => {

                const grammarBlock = lesson.blocks.find(block => block.type === "grammar");
                const topic = GrammarRepository.getByLessonId("portuguese", lesson.id);

                expect(topic).not.toBeNull();
                expect(grammarBlock.title).toBe(topic.explanation[0].title);
                expect(grammarBlock.text).toBe(topic.explanation[0].text);

            });

        });

        it("does not affect English A1/A2 or French A1/A2 coverage", () => {

            expect(GrammarRepository.getByLevel("english", "A1").length).toBe(5);
            expect(GrammarRepository.getByLevel("english", "A2").length).toBe(5);
            expect(GrammarRepository.getByLevel("french", "A1").length).toBe(5);
            expect(GrammarRepository.getByLevel("french", "A2").length).toBe(5);

        });

    });

});
