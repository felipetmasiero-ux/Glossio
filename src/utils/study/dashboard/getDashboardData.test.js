import { describe, expect, it } from "vitest";

import { getDashboardData } from "./getDashboardData";

describe("getDashboardData", () => {

    it("returns dashboard object", () => {

        const dashboard = getDashboardData({

            flashcards: [],

            language: "english",

            studyHistory: []

        });

        expect(dashboard).toEqual(

            expect.objectContaining({

                due: expect.any(Number),

                total: expect.any(Number),

                streak: expect.any(Object),

                dailyGoal: expect.any(Object)

            })

        );

    });

    it("contains daily goal", () => {

        const dashboard = getDashboardData({

            flashcards: [],

            language: "english",

            studyHistory: []

        });

        expect(dashboard.dailyGoal.goal).toBe(10);

    });

});