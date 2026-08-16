import { describe, expect, it } from "vitest";

import { frenchB1Module } from "./module";
import { frenchA1Module } from "../a1/module";
import { frenchA2Module } from "../a2/module";
import { CourseRepository } from "../../../../utils/courses/CourseRepository";
import { ModuleRepository } from "../../../../utils/courses/ModuleRepository";
import { LessonRepository } from "../../../../utils/lessons/LessonRepository";
import { DictionaryRepository } from "../../../../repositories/DictionaryRepository";
import { generateExercisesForLesson } from "../../../../utils/exercises/generateExercisesForLesson";

const B1_LESSON_IDS = [
    "french-b1-experiences",
    "french-b1-goals",
    "french-b1-relationships",
    "french-b1-work",
    "french-b1-travel-problems",
    "french-b1-health-lifestyle",
    "french-b1-technology-habits",
    "french-b1-opinions",
    "french-b1-environment",
    "french-b1-media",
    "french-b1-news-stories",
    "french-b1-review"
];

describe("French B1 module", () => {

    it("has exactly 12 lessons with unique, correctly-prefixed ids", () => {

        expect(frenchB1Module.lessons).toHaveLength(12);

        const ids = frenchB1Module.lessons.map(lesson => lesson.id);

        expect(new Set(ids).size).toBe(12);
        ids.forEach(id => expect(id.startsWith("french-b1-")).toBe(true));
        expect(ids).toEqual(B1_LESSON_IDS);

    });

    it("is registered in the French course, alongside A1 and A2, unchanged", () => {

        const course = CourseRepository.getByLanguage("french");
        const moduleIds = course.modules.map(module => module.id);

        expect(moduleIds).toEqual(["french-a1", "french-a2", "french-b1", "french-b2", "french-c1"]);
        expect(frenchA1Module.lessons).toHaveLength(12);
        expect(frenchA2Module.lessons).toHaveLength(12);

    });

    it("is reachable through ModuleRepository and LessonRepository", () => {

        const module = ModuleRepository.getById("french", "french-b1");

        expect(module).not.toBeNull();
        expect(module.level).toBe("B1");

        B1_LESSON_IDS.forEach(id => {

            const lesson = LessonRepository.getById("french", id);

            expect(lesson).not.toBeNull();
            expect(lesson.level).toBe("B1");

        });

    });

    it("has every vocabulary word resolving in the French dictionary", () => {

        frenchB1Module.lessons.forEach(lesson => {

            lesson.vocabulary.forEach(word => {
                expect(DictionaryRepository.getEntry("french", word), `"${word}" in ${lesson.id}`).not.toBeNull();
            });

        });

    });

    it("generates at least one exercise for every B1 lesson", () => {

        frenchB1Module.lessons.forEach(lesson => {

            const exercises = generateExercisesForLesson(lesson);

            expect(exercises.length, `${lesson.id} produced no exercises`).toBeGreaterThan(0);
            exercises.forEach(exercise => expect(exercise.lessonId).toBe(lesson.id));

        });

    });

});
