import { describe, expect, it } from "vitest";

import { portugueseB1Module } from "./module";
import { portugueseA1Module } from "../a1/module";
import { portugueseA2Module } from "../a2/module";
import { portugueseCourse } from "../../../courses/portuguese";
import { ModuleRepository } from "../../../../utils/courses/ModuleRepository";
import { LessonRepository } from "../../../../utils/lessons/LessonRepository";
import { DictionaryRepository } from "../../../../repositories/DictionaryRepository";
import { generateExercisesForLesson } from "../../../../utils/exercises/generateExercisesForLesson";

const B1_LESSON_IDS = [
    "portuguese-b1-experiences",
    "portuguese-b1-goals",
    "portuguese-b1-relationships",
    "portuguese-b1-work",
    "portuguese-b1-travel-problems",
    "portuguese-b1-health-lifestyle",
    "portuguese-b1-technology-habits",
    "portuguese-b1-opinions",
    "portuguese-b1-environment",
    "portuguese-b1-media",
    "portuguese-b1-news-stories",
    "portuguese-b1-review"
];

describe("Portuguese B1 module", () => {

    it("has exactly 12 lessons with unique, correctly-prefixed ids", () => {

        expect(portugueseB1Module.lessons).toHaveLength(12);

        const ids = portugueseB1Module.lessons.map(lesson => lesson.id);

        expect(new Set(ids).size).toBe(12);
        ids.forEach(id => expect(id.startsWith("portuguese-b1-")).toBe(true));
        expect(ids).toEqual(B1_LESSON_IDS);

    });

    it("is registered on portugueseCourse, alongside A1 and A2, unchanged", () => {

        const moduleIds = portugueseCourse.modules.map(module => module.id);

        expect(moduleIds).toEqual(["portuguese-a1", "portuguese-a2", "portuguese-b1", "portuguese-b2"]);
        expect(portugueseA1Module.lessons).toHaveLength(12);
        expect(portugueseA2Module.lessons).toHaveLength(12);

    });

    it("is reachable through ModuleRepository and LessonRepository", () => {

        const module = ModuleRepository.getById("portuguese", "portuguese-b1");

        expect(module).not.toBeNull();
        expect(module.level).toBe("B1");

        B1_LESSON_IDS.forEach(id => {

            const lesson = LessonRepository.getById("portuguese", id);

            expect(lesson).not.toBeNull();
            expect(lesson.level).toBe("B1");

        });

    });

    it("continues Portuguese A2 -> B1 through ModuleRepository.getNextModule", () => {

        const nextModule = ModuleRepository.getNextModule("portuguese", "portuguese-a2");

        expect(nextModule?.id).toBe("portuguese-b1");

    });

    it("has every lesson's vocabulary resolvable in the Portuguese dictionary", () => {

        portugueseB1Module.lessons.forEach(lesson => {

            lesson.vocabulary.forEach(word => {
                expect(DictionaryRepository.hasWord("portuguese", word), `"${word}" (${lesson.id})`).toBe(true);
            });

        });

    });

    it("generates at least one exercise for every B1 lesson", () => {

        portugueseB1Module.lessons.forEach(lesson => {

            const exercises = generateExercisesForLesson(lesson);

            expect(exercises.length, `${lesson.id} produced no exercises`).toBeGreaterThan(0);
            exercises.forEach(exercise => expect(exercise.lessonId).toBe(lesson.id));

        });

    });

});
