import { describe, expect, it } from "vitest";

import { searchPlacementTest } from "./searchPlacementTest";

describe("searchPlacementTest", () => {

    it("matches the English title", () => {

        const results = searchPlacementTest("placement");

        expect(results.length).toBe(1);
        expect(results[0].label).toBe("Placement Test");
        expect(results[0].type).toBe("placement-test");

    });

    it("matches the Portuguese alias", () => {

        expect(searchPlacementTest("nivelamento").length).toBe(1);
        expect(searchPlacementTest("teste de nível").length).toBe(1);

    });

    it("matches the description as a last resort", () => {

        const results = searchPlacementTest("recomendado");

        expect(results.length).toBe(1);

    });

    it("returns no results for an unrelated query", () => {

        expect(searchPlacementTest("xyznotrelated")).toEqual([]);

    });

});
