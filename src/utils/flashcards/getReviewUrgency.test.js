import { describe, expect, it } from "vitest";

import { getReviewUrgency } from "./getReviewUrgency";

const DAY = 24 * 60 * 60 * 1000;

describe("getReviewUrgency", () => {

    it("is 'danger' when the review is due now or overdue", () => {

        expect(getReviewUrgency(1000, 2000)).toBe("danger");
        expect(getReviewUrgency(2000, 2000)).toBe("danger");

    });

    it("is 'warning' when due within the next day", () => {

        expect(getReviewUrgency(2000 + DAY, 2000)).toBe("warning");

    });

    it("is 'neutral' when due further in the future", () => {

        expect(getReviewUrgency(2000 + DAY + 1, 2000)).toBe("neutral");

    });

});
