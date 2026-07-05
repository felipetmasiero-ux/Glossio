import { describe, expect, it } from "vitest";

import { scheduleCard } from "./scheduleCard";

import {
    AGAIN,
    GOOD,
    EASY
} from "../../../constants/studyQuality";

describe("scheduleCard", () => {

    function createCard(overrides = {}) {

        return {

            repetitions: 0,

            interval: 0,

            easeFactor: 2.5,

            nextReview: Date.now(),

            updatedAt: Date.now(),

            ...overrides

        };

    }

    it("resets repetitions on AGAIN", () => {

        const updated = scheduleCard(
            createCard({ repetitions: 3 }),
            AGAIN
        );

        expect(updated.repetitions).toBe(0);

    });

    it("increments repetitions on GOOD", () => {

        const updated = scheduleCard(
            createCard(),
            GOOD
        );

        expect(updated.repetitions).toBe(1);

    });

    it("increments repetitions on EASY", () => {

        const updated = scheduleCard(
            createCard(),
            EASY
        );

        expect(updated.repetitions).toBe(1);

    });

    it("decreases ease factor on AGAIN", () => {

        const updated = scheduleCard(
            createCard(),
            AGAIN
        );

        expect(updated.easeFactor).toBeLessThan(2.5);

    });

    it("updates next review date", () => {

        const updated = scheduleCard(
            createCard(),
            GOOD
        );

        expect(updated.nextReview).toBeGreaterThan(Date.now());

    });

    it("updates updatedAt", () => {

        const updated = scheduleCard(
            createCard(),
            GOOD
        );

        expect(updated.updatedAt).toBeDefined();

    });

});