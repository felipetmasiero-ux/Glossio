import { describe, expect, it } from "vitest";

import { portugueseB2Module } from "./module";
import { portugueseA1Module } from "../a1/module";
import { portugueseA2Module } from "../a2/module";
import { portugueseB1Module } from "../b1/module";
import { portugueseCourse } from "../../../courses/portuguese";
import { ModuleRepository } from "../../../../utils/courses/ModuleRepository";
import { LessonRepository } from "../../../../utils/lessons/LessonRepository";
import { DictionaryRepository } from "../../../../repositories/DictionaryRepository";
import { generateExercisesForLesson } from "../../../../utils/exercises/generateExercisesForLesson";

const B2_LESSON_IDS = [
    "portuguese-b2-personal-development",
    "portuguese-b2-education",
    "portuguese-b2-work-careers",
    "portuguese-b2-society",
    "portuguese-b2-science-technology",
    "portuguese-b2-environment",
    "portuguese-b2-media-news",
    "portuguese-b2-culture-arts",
    "portuguese-b2-relationships-conflict",
    "portuguese-b2-economics",
    "portuguese-b2-debate",
    "portuguese-b2-review"
];

describe("Portuguese B2 module", () => {

    it("has exactly 12 lessons with unique, correctly-prefixed ids", () => {

        expect(portugueseB2Module.lessons).toHaveLength(12);

        const ids = portugueseB2Module.lessons.map(lesson => lesson.id);

        expect(new Set(ids).size).toBe(12);
        ids.forEach(id => expect(id.startsWith("portuguese-b2-")).toBe(true));
        expect(ids).toEqual(B2_LESSON_IDS);

    });

    it("is registered on portugueseCourse, alongside A1, A2 and B1, unchanged", () => {

        const moduleIds = portugueseCourse.modules.map(module => module.id);

        expect(moduleIds).toEqual(["portuguese-a1", "portuguese-a2", "portuguese-b1", "portuguese-b2"]);
        expect(portugueseA1Module.lessons).toHaveLength(12);
        expect(portugueseA2Module.lessons).toHaveLength(12);
        expect(portugueseB1Module.lessons).toHaveLength(12);

    });

    it("is reachable through ModuleRepository and LessonRepository", () => {

        const module = ModuleRepository.getById("portuguese", "portuguese-b2");

        expect(module).not.toBeNull();
        expect(module.level).toBe("B2");

        B2_LESSON_IDS.forEach(id => {

            const lesson = LessonRepository.getById("portuguese", id);

            expect(lesson).not.toBeNull();
            expect(lesson.level).toBe("B2");

        });

    });

    it("continues Portuguese B1 -> B2 through ModuleRepository.getNextModule", () => {

        const nextModule = ModuleRepository.getNextModule("portuguese", "portuguese-b1");

        expect(nextModule?.id).toBe("portuguese-b2");

    });

    it("has every lesson's vocabulary resolvable in the Portuguese dictionary", () => {

        portugueseB2Module.lessons.forEach(lesson => {

            lesson.vocabulary.forEach(word => {
                expect(DictionaryRepository.hasWord("portuguese", word), `"${word}" (${lesson.id})`).toBe(true);
            });

        });

    });

    it("generates at least one exercise for every B2 lesson", () => {

        portugueseB2Module.lessons.forEach(lesson => {

            const exercises = generateExercisesForLesson(lesson);

            expect(exercises.length, `${lesson.id} produced no exercises`).toBeGreaterThan(0);
            exercises.forEach(exercise => expect(exercise.lessonId).toBe(lesson.id));

        });

    });

});
