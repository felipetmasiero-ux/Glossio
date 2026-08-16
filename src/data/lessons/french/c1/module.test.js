import { describe, expect, it } from "vitest";

import { frenchC1Module } from "./module";
import { frenchA1Module } from "../a1/module";
import { frenchA2Module } from "../a2/module";
import { frenchB1Module } from "../b1/module";
import { frenchB2Module } from "../b2/module";
import { frenchCourse } from "../../../courses/french";
import { ModuleRepository } from "../../../../utils/courses/ModuleRepository";
import { LessonRepository } from "../../../../utils/lessons/LessonRepository";
import { DictionaryRepository } from "../../../../repositories/DictionaryRepository";
import { generateExercisesForLesson } from "../../../../utils/exercises/generateExercisesForLesson";

const C1_LESSON_IDS = [
    "french-c1-personal-development",
    "french-c1-education",
    "french-c1-work-careers",
    "french-c1-society",
    "french-c1-science-technology",
    "french-c1-environment",
    "french-c1-media-news",
    "french-c1-culture-arts",
    "french-c1-psychology",
    "french-c1-economics",
    "french-c1-debate",
    "french-c1-review"
];

describe("French C1 module", () => {

    it("has exactly 12 lessons with unique, correctly-prefixed ids", () => {

        expect(frenchC1Module.lessons).toHaveLength(12);

        const ids = frenchC1Module.lessons.map(lesson => lesson.id);

        expect(new Set(ids).size).toBe(12);
        ids.forEach(id => expect(id.startsWith("french-c1-")).toBe(true));
        expect(ids).toEqual(C1_LESSON_IDS);

    });

    it("is registered on frenchCourse, alongside A1, A2, B1 and B2, unchanged", () => {

        const moduleIds = frenchCourse.modules.map(module => module.id);

        expect(moduleIds).toEqual(["french-a1", "french-a2", "french-b1", "french-b2", "french-c1"]);
        expect(frenchA1Module.lessons).toHaveLength(12);
        expect(frenchA2Module.lessons).toHaveLength(12);
        expect(frenchB1Module.lessons).toHaveLength(12);
        expect(frenchB2Module.lessons).toHaveLength(12);

    });

    it("is reachable through ModuleRepository and LessonRepository", () => {

        const module = ModuleRepository.getById("french", "french-c1");

        expect(module).not.toBeNull();
        expect(module.level).toBe("C1");

        C1_LESSON_IDS.forEach(id => {

            const lesson = LessonRepository.getById("french", id);

            expect(lesson).not.toBeNull();
            expect(lesson.level).toBe("C1");

        });

    });

    it("continues French B2 -> C1 through ModuleRepository.getNextModule", () => {

        const nextModule = ModuleRepository.getNextModule("french", "french-b2");

        expect(nextModule?.id).toBe("french-c1");

    });

    it("has every lesson's vocabulary resolvable in the French dictionary", () => {

        frenchC1Module.lessons.forEach(lesson => {

            lesson.vocabulary.forEach(word => {
                expect(DictionaryRepository.hasWord("french", word), `"${word}" (${lesson.id})`).toBe(true);
            });

        });

    });

    it("generates at least one exercise for every C1 lesson", () => {

        frenchC1Module.lessons.forEach(lesson => {

            const exercises = generateExercisesForLesson(lesson);

            expect(exercises.length, `${lesson.id} produced no exercises`).toBeGreaterThan(0);
            exercises.forEach(exercise => expect(exercise.lessonId).toBe(lesson.id));

        });

    });

});
