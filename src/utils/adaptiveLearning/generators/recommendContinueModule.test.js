import { describe, expect, it } from "vitest";

import { recommendContinueModule } from "./recommendContinueModule";
import { ModuleRepository } from "../../courses/ModuleRepository";

describe("recommendContinueModule", () => {

    it("recommends the next uncompleted lesson for a brand new user", () => {

        const result = recommendContinueModule({ language: "english", completedLessons: [] });

        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            type: "continue-module",
            priority: 5,
            href: "/lessons/english-a1-greetings"
        });
        expect(result[0].title).toContain("Cumprimentos");

    });

    it("recommends the next lesson after some are already completed", () => {

        const result = recommendContinueModule({
            language: "english",
            completedLessons: ["english-a1-greetings"]
        });

        expect(result[0].href).not.toBe("/lessons/english-a1-greetings");

    });

    it("returns nothing for a language with no course at all (getContinueLearning's 'empty' status)", () => {

        const result = recommendContinueModule({ language: "klingon", completedLessons: [] });

        expect(result).toEqual([]);

    });

    it("returns nothing once every lesson in the language is completed", () => {

        const allLessonIds = ModuleRepository.getAllLessonsInOrder("english").map(lesson => lesson.id);

        const result = recommendContinueModule({ language: "english", completedLessons: allLessonIds });

        expect(result).toEqual([]);

    });

});
