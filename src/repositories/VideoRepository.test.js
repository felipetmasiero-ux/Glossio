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

// English videos had their `transcript` cleared to `[]` (unverified
// YouTube license, same reasoning as French - see
// docs/explore-french-data-request.md). This guards that the cleanup only
// touched `transcript`: every video is still there, still has real
// metadata, and nothing else was clipped by the bracket-matching script
// that stripped the transcript arrays.
describe("VideoRepository - English transcript removal", () => {

    it("still has all 31 English videos", () => {
        expect(VideoRepository.getAll("english")).toHaveLength(31);
    });

    it("has an empty transcript, but everything else intact, on every English video", () => {

        VideoRepository.getAll("english").forEach(video => {

            expect(video.transcript).toEqual([]);

            expect(video.id).toBeTruthy();
            expect(video.title).toBeTruthy();
            expect(video.language).toBe("english");
            expect(video.level).toBeTruthy();
            expect(video.duration).toBeGreaterThan(0);
            expect(video.source?.videoId).toBeTruthy();

        });

    });

});
