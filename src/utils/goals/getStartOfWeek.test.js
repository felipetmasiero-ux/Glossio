import { describe, expect, it } from "vitest";

import { getStartOfWeek } from "./getStartOfWeek";

describe("getStartOfWeek", () => {

    it("returns the Monday at midnight of the given date's week", () => {

        // Wednesday, 2026-08-05 (a Wednesday - fixed, not relative to "today")
        const wednesday = new Date(2026, 7, 5, 15, 30).getTime();
        const monday = getStartOfWeek(wednesday);

        const result = new Date(monday);
        expect(result.getDay()).toBe(1);
        expect(result.getHours()).toBe(0);
        expect(result.getDate()).toBe(3);

    });

    it("treats a Monday itself as the start of its own week", () => {

        const monday = new Date(2026, 7, 3, 9, 0).getTime();
        expect(getStartOfWeek(monday)).toBe(new Date(2026, 7, 3, 0, 0, 0, 0).getTime());

    });

    it("rolls a Sunday back to the previous Monday", () => {

        const sunday = new Date(2026, 7, 9, 23, 0).getTime();
        const monday = getStartOfWeek(sunday);

        expect(new Date(monday).getDay()).toBe(1);
        expect(new Date(monday).getDate()).toBe(3);

    });

});
