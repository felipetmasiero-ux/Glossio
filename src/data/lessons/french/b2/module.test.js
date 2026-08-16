import { describe, expect, it } from "vitest";

import { frenchB2Module } from "./module";
import { frenchA1Module } from "../a1/module";
import { frenchA2Module } from "../a2/module";
import { frenchB1Module } from "../b1/module";
import { CourseRepository } from "../../../../utils/courses/CourseRepository";
import { ModuleRepository } from "../../../../utils/courses/ModuleRepository";
import { LessonRepository } from "../../../../utils/lessons/LessonRepository";
import { DictionaryRepository } from "../../../../repositories/DictionaryRepository";
import { generateExercisesForLesson } from "../../../../utils/exercises/generateExercisesForLesson";

const B2_LESSON_IDS = [
    "french-b2-personal-development",
    "french-b2-education",
    "french-b2-work-careers",
    "french-b2-society",
    "french-b2-science-technology",
    "french-b2-environment",
    "french-b2-media-news",
    "french-b2-culture-arts",
    "french-b2-relationships-conflict",
    "french-b2-economics",
    "french-b2-debate",
    "french-b2-review"
];

describe("French B2 module", () => {

    it("has exactly 12 lessons with unique, correctly-prefixed ids", () => {

        expect(frenchB2Module.lessons).toHaveLength(12);

        const ids = frenchB2Module.lessons.map(lesson => lesson.id);

        expect(new Set(ids).size).toBe(12);
        ids.forEach(id => expect(id.startsWith("french-b2-")).toBe(true));
        expect(ids).toEqual(B2_LESSON_IDS);

    });

    it("is registered in the French course, alongside A1, A2 and B1, unchanged", () => {

        const course = CourseRepository.getByLanguage("french");
        const moduleIds = course.modules.map(module => module.id);

        expect(moduleIds).toEqual(["french-a1", "french-a2", "french-b1", "french-b2", "french-c1"]);
        expect(frenchA1Module.lessons).toHaveLength(12);
        expect(frenchA2Module.lessons).toHaveLength(12);
        expect(frenchB1Module.lessons).toHaveLength(12);

    });

    it("is reachable through ModuleRepository and LessonRepository", () => {

        const module = ModuleRepository.getById("french", "french-b2");

        expect(module).not.toBeNull();
        expect(module.level).toBe("B2");

        B2_LESSON_IDS.forEach(id => {

            const lesson = LessonRepository.getById("french", id);

            expect(lesson).not.toBeNull();
            expect(lesson.level).toBe("B2");

        });

    });

    it("has every vocabulary word resolving in the French dictionary", () => {

        frenchB2Module.lessons.forEach(lesson => {

            lesson.vocabulary.forEach(word => {
                expect(DictionaryRepository.getEntry("french", word), `"${word}" in ${lesson.id}`).not.toBeNull();
            });

        });

    });

    it("generates at least one exercise for every B2 lesson", () => {

        frenchB2Module.lessons.forEach(lesson => {

            const exercises = generateExercisesForLesson(lesson);

            expect(exercises.length, `${lesson.id} produced no exercises`).toBeGreaterThan(0);
            exercises.forEach(exercise => expect(exercise.lessonId).toBe(lesson.id));

        });

    });

});
