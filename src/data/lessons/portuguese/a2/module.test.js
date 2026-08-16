import { describe, expect, it } from "vitest";

import { portugueseA2Module } from "./module";
import { portugueseCourse } from "../../../courses/portuguese";
import { ModuleRepository } from "../../../../utils/courses/ModuleRepository";
import { DashboardRepository } from "../../../../utils/dashboard/DashboardRepository";
import { DictionaryRepository } from "../../../../repositories/DictionaryRepository";
import { generateExercisesForLesson } from "../../../../utils/exercises/generateExercisesForLesson";

// Content-authoring sprint: Portuguese A2 is the first module added to
// Portuguese since A1. This guards the parts that only real content (not
// validate-content, which is a separate npm script) can verify: every
// lesson is reachable through the same generic infra English/French A2
// already use, with no per-language special-casing anywhere.
describe("Portuguese A2 module", () => {

    it("is registered on portugueseCourse, after A1", () => {

        expect(portugueseCourse.modules).toHaveLength(3);
        expect(portugueseCourse.modules[0].id).toBe("portuguese-a1");
        expect(portugueseCourse.modules[1].id).toBe("portuguese-a2");
        expect(portugueseCourse.modules[2].id).toBe("portuguese-b1");

    });

    it("has 12 lessons with unique ids, all prefixed with the module id", () => {

        expect(portugueseA2Module.lessons).toHaveLength(12);

        const ids = portugueseA2Module.lessons.map(lesson => lesson.id);

        expect(new Set(ids).size).toBe(12);

        ids.forEach(id => expect(id.startsWith("portuguese-a2-")).toBe(true));

    });

    it("has every lesson's vocabulary resolvable in the Portuguese dictionary", () => {

        portugueseA2Module.lessons.forEach(lesson => {

            lesson.vocabulary.forEach(word => {
                expect(DictionaryRepository.hasWord("portuguese", word), `"${word}" (${lesson.id})`).toBe(true);
            });

        });

    });

    it("can generate exercises for every lesson", () => {

        portugueseA2Module.lessons.forEach(lesson => {
            expect(generateExercisesForLesson(lesson).length, lesson.id).toBeGreaterThan(0);
        });

    });

    it("continues Portuguese A1 -> A2 through ModuleRepository.getNextModule, exactly like English/French", () => {

        const nextModule = ModuleRepository.getNextModule("portuguese", "portuguese-a1");

        expect(nextModule?.id).toBe("portuguese-a2");

    });

    it("chains Portuguese A1's last lesson into A2's first lesson via getNextLesson", () => {

        const a1Lessons = ModuleRepository.getAllLessonsInOrder("portuguese").filter(
            lesson => lesson.level === "A1"
        );

        const lastA1Lesson = a1Lessons[a1Lessons.length - 1];

        expect(ModuleRepository.isLastLessonInModule("portuguese", lastA1Lesson.id)).toBe(true);

        const nextLesson = ModuleRepository.getNextLesson("portuguese", lastA1Lesson.id);

        expect(nextLesson?.id).toBe(portugueseA2Module.lessons[0].id);

    });

    it("recognizes B2 as Portuguese's next level, correctly reported as not yet available", () => {

        // getNextLevelInfo looks at the *last* registered module - now that
        // B1 is also registered, this proves it (not A1/A2) drives the
        // next-level calculation, and that B2 (out of scope for this
        // sprint, no data exists yet) is correctly reported as unavailable
        // rather than crashing or silently defaulting to something else.
        expect(DashboardRepository.getNextLevelInfo({ language: "portuguese" })).toEqual({
            level: "B2",
            available: false
        });

    });

});
