import { describe, expect, it } from "vitest";
import { LessonRepository } from "./LessonRepository";

// Performance sprint regression guard - see CourseRepository.test.js for the
// full rationale. getById used to normalize its one lesson independently of
// getAll(), so it's checked here too.
describe("LessonRepository caching", () => {

    it("getAll returns the exact same array/lesson references on repeated calls", () => {
        const first = LessonRepository.getAll("English");
        const second = LessonRepository.getAll("English");

        expect(second).toBe(first);
        expect(second[0]).toBe(first[0]);
    });

    it("getById returns the same lesson reference as the one inside getAll's cached array", () => {
        const all = LessonRepository.getAll("English");
        const byId = LessonRepository.getById("English", all[0].id);

        expect(byId).toBe(all[0]);
    });

    it("returns null for an id that doesn't exist", () => {
        expect(LessonRepository.getById("English", "not-a-real-lesson")).toBeNull();
    });

});
