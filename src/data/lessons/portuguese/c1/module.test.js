import { describe, expect, it } from "vitest";

import { portugueseC1Module } from "./module";
import { portugueseA1Module } from "../a1/module";
import { portugueseA2Module } from "../a2/module";
import { portugueseB1Module } from "../b1/module";
import { portugueseB2Module } from "../b2/module";
import { portugueseCourse } from "../../../courses/portuguese";
import { ModuleRepository } from "../../../../utils/courses/ModuleRepository";
import { LessonRepository } from "../../../../utils/lessons/LessonRepository";
import { DictionaryRepository } from "../../../../repositories/DictionaryRepository";
import { generateExercisesForLesson } from "../../../../utils/exercises/generateExercisesForLesson";

const C1_LESSON_IDS = [
    "portuguese-c1-personal-development",
    "portuguese-c1-education",
    "portuguese-c1-work-careers",
    "portuguese-c1-society",
    "portuguese-c1-science-technology",
    "portuguese-c1-environment",
    "portuguese-c1-media-news",
    "portuguese-c1-culture-arts",
    "portuguese-c1-psychology",
    "portuguese-c1-economics",
    "portuguese-c1-debate",
    "portuguese-c1-review"
];

describe("Portuguese C1 module", () => {

    it("has exactly 12 lessons with unique, correctly-prefixed ids", () => {

        expect(portugueseC1Module.lessons).toHaveLength(12);

        const ids = portugueseC1Module.lessons.map(lesson => lesson.id);

        expect(new Set(ids).size).toBe(12);
        ids.forEach(id => expect(id.startsWith("portuguese-c1-")).toBe(true));
        expect(ids).toEqual(C1_LESSON_IDS);

    });

    it("is registered on portugueseCourse, alongside A1, A2, B1 and B2, unchanged", () => {

        const moduleIds = portugueseCourse.modules.map(module => module.id);

        expect(moduleIds).toEqual(["portuguese-a1", "portuguese-a2", "portuguese-b1", "portuguese-b2", "portuguese-c1"]);
        expect(portugueseA1Module.lessons).toHaveLength(12);
        expect(portugueseA2Module.lessons).toHaveLength(12);
        expect(portugueseB1Module.lessons).toHaveLength(12);
        expect(portugueseB2Module.lessons).toHaveLength(12);

    });

    it("is reachable through ModuleRepository and LessonRepository", () => {

        const module = ModuleRepository.getById("portuguese", "portuguese-c1");

        expect(module).not.toBeNull();
        expect(module.level).toBe("C1");

        C1_LESSON_IDS.forEach(id => {

            const lesson = LessonRepository.getById("portuguese", id);

            expect(lesson).not.toBeNull();
            expect(lesson.level).toBe("C1");

        });

    });

    it("continues Portuguese B2 -> C1 through ModuleRepository.getNextModule", () => {

        const nextModule = ModuleRepository.getNextModule("portuguese", "portuguese-b2");

        expect(nextModule?.id).toBe("portuguese-c1");

    });

    it("has every lesson's vocabulary resolvable in the Portuguese dictionary", () => {

        portugueseC1Module.lessons.forEach(lesson => {

            lesson.vocabulary.forEach(word => {
                expect(DictionaryRepository.hasWord("portuguese", word), `"${word}" (${lesson.id})`).toBe(true);
            });

        });

    });

    it("generates at least one exercise for every C1 lesson", () => {

        portugueseC1Module.lessons.forEach(lesson => {

            const exercises = generateExercisesForLesson(lesson);

            expect(exercises.length, `${lesson.id} produced no exercises`).toBeGreaterThan(0);
            exercises.forEach(exercise => expect(exercise.lessonId).toBe(lesson.id));

        });

    });

});
