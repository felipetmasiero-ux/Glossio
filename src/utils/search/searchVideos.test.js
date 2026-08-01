import { describe, expect, it } from "vitest";

import { searchVideos } from "./searchVideos";
import { MATCH_RANK } from "./matchRank";

function video(title, overrides = {}) {
    return { id: title, title, description: "", topic: null, language: "english", ...overrides };
}

describe("searchVideos", () => {

    it("matches by title", () => {

        const videos = [video("At the Restaurant"), video("Ordering Coffee")];

        const results = searchVideos(videos, "restaurant");

        expect(results.map(r => r.label)).toEqual(["At the Restaurant"]);

    });

    it("matches by topic", () => {

        const videos = [video("Ordering Coffee", { topic: "food" })];

        const results = searchVideos(videos, "food");

        expect(results[0].rank).toBe(MATCH_RANK.ALIAS);

    });

    it("matches by the translated topic label", () => {

        const videos = [video("Ordering Coffee", { topic: "food" })];

        const results = searchVideos(videos, "comida");

        expect(results.map(r => r.label)).toEqual(["Ordering Coffee"]);

    });

    it("matches by description as a last resort", () => {

        const videos = [video("At the Restaurant", { description: "A customer orders a coffee" })];

        const results = searchVideos(videos, "customer");

        expect(results[0].rank).toBe(MATCH_RANK.TRANSLATION);

    });

    it("excludes videos that don't match any field", () => {

        const videos = [video("At the Restaurant")];

        expect(searchVideos(videos, "xyz")).toEqual([]);

    });

});
