import { describe, expect, it } from "vitest";

import { scheduleCard } from "./scheduleCard";

describe("scheduleCard", () => {

    function createCard() {

    return {

        repetitions: 0,

        interval: 0,

        easeFactor: 2.5,

        nextReview: Date.now(),

        updatedAt: Date.now()

    };

}

    it("resets repetitions on AGAIN", () => {

        const updated = scheduleCard(createCard(), 4);

        expect(updated.repetitions).toBe(0);

    });

    it("increments repetitions on GOOD", () => {

        const updated = scheduleCard(createCard(), 4);

        expect(updated.repetitions).toBe(1);

    });

    it("increments repetitions on EASY", () => {

        const updated = scheduleCard(createCard(), 4);

        expect(updated.repetitions).toBe(1);

    });

    it("updates ease factor", () => {

       const updated = scheduleCard(createCard(), 4);

        expect(updated.easeFactor).not.toBe(createCard().easeFactor);

    });

    it("updates next review date", () => {

        const updated = scheduleCard(createCard(), 4);

        expect(updated.nextReview).toBeGreaterThan(Date.now());

    });

    it("updates updatedAt", () => {

        const updated = scheduleCard(createCard(), 4);

        expect(updated.updatedAt).toBeDefined();

    });

});