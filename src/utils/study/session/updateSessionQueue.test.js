import { describe, expect, it } from "vitest";

import { updateSessionQueue } from "./updateSessionQueue";

import {
    AGAIN,
    GOOD,
    EASY
} from "../../../constants/studyQuality";

describe("updateSessionQueue", () => {

    const card1 = { id: 1 };
    const card2 = { id: 2 };
    const card3 = { id: 3 };

    const queue = [
        card1,
        card2,
        card3
    ];

    it("removes the card when answered GOOD", () => {

        const updated = updateSessionQueue(
            queue,
            card1,
            GOOD
        );

        expect(updated).toEqual([
            card2,
            card3
        ]);

    });

    it("removes the card when answered EASY", () => {

        const updated = updateSessionQueue(
            queue,
            card1,
            EASY
        );

        expect(updated).toEqual([
            card2,
            card3
        ]);

    });

    it("moves the card to the end when answered AGAIN", () => {

        const updated = updateSessionQueue(
            queue,
            card1,
            AGAIN
        );

        expect(updated).toEqual([
            card2,
            card3,
            card1
        ]);

    });

    it("does not mutate the original queue", () => {

        updateSessionQueue(
            queue,
            card1,
            AGAIN
        );

        expect(queue).toEqual([
            card1,
            card2,
            card3
        ]);

    });

    it("returns a new array", () => {

        const updated = updateSessionQueue(
            queue,
            card1,
            GOOD
        );

        expect(updated).not.toBe(queue);

    });

    it("works with a single card", () => {

        const updated = updateSessionQueue(
            [card1],
            card1,
            GOOD
        );

        expect(updated).toEqual([]);

    });

});