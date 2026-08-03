import { describe, expect, it } from "vitest";
import { VideoRepository } from "./VideoRepository";

// Performance sprint regression guard - see CourseRepository.test.js for the
// full rationale.
describe("VideoRepository caching", () => {

    it("getAll returns the exact same array/video references on repeated calls", () => {
        const first = VideoRepository.getAll("English");
        const second = VideoRepository.getAll("English");

        expect(second).toBe(first);
        expect(second[0]).toBe(first[0]);
    });

    it("getById returns the same video reference as the one inside getAll's cached array", () => {
        const all = VideoRepository.getAll("English");
        const byId = VideoRepository.getById("English", all[0].id);

        expect(byId).toBe(all[0]);
    });

    it("returns null for an id that doesn't exist", () => {
        expect(VideoRepository.getById("English", "not-a-real-video")).toBeNull();
    });

});
