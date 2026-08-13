import { describe, expect, it } from "vitest";

import { englishB1Module } from "./module";
import { englishA1Module } from "../a1/module";
import { englishA2Module } from "../a2/module";
import { CourseRepository } from "../../../../utils/courses/CourseRepository";
import { ModuleRepository } from "../../../../utils/courses/ModuleRepository";
import { LessonRepository } from "../../../../utils/lessons/LessonRepository";
import { DictionaryRepository } from "../../../../repositories/DictionaryRepository";
import { generateExercisesForLesson } from "../../../../utils/exercises/generateExercisesForLesson";

const B1_LESSON_IDS = [
    "english-b1-experiences",
    "english-b1-goals",
    "english-b1-relationships",
    "english-b1-work",
    "english-b1-travel-problems",
    "english-b1-health-lifestyle",
    "english-b1-technology-habits",
    "english-b1-opinions",
    "english-b1-environment",
    "english-b1-media",
    "english-b1-news-stories",
    "english-b1-review"
];

describe("English B1 module", () => {

    it("has exactly 12 lessons with unique, correctly-prefixed ids", () => {

        expect(englishB1Module.lessons).toHaveLength(12);

        const ids = englishB1Module.lessons.map(lesson => lesson.id);

        expect(new Set(ids).size).toBe(12);
        ids.forEach(id => expect(id.startsWith("english-b1-")).toBe(true));
        expect(ids).toEqual(B1_LESSON_IDS);

    });

    it("is registered in the English course, alongside A1 and A2, unchanged", () => {

        const course = CourseRepository.getByLanguage("english");
        const moduleIds = course.modules.map(module => module.id);

        expect(moduleIds).toEqual(["english-a1", "english-a2", "english-b1"]);
        expect(englishA1Module.lessons).toHaveLength(12);
        expect(englishA2Module.lessons).toHaveLength(12);

    });

    it("is reachable through ModuleRepository and LessonRepository", () => {

        const module = ModuleRepository.getById("english", "english-b1");

        expect(module).not.toBeNull();
        expect(module.level).toBe("B1");

        B1_LESSON_IDS.forEach(id => {

            const lesson = LessonRepository.getById("english", id);

            expect(lesson).not.toBeNull();
            expect(lesson.level).toBe("B1");

        });

    });

    it("has every vocabulary word resolving in the English dictionary", () => {

        englishB1Module.lessons.forEach(lesson => {

            lesson.vocabulary.forEach(word => {
                expect(DictionaryRepository.getEntry("english", word), `"${word}" in ${lesson.id}`).not.toBeNull();
            });

        });

    });

    it("generates at least one exercise for every B1 lesson", () => {

        englishB1Module.lessons.forEach(lesson => {

            const exercises = generateExercisesForLesson(lesson);

            expect(exercises.length, `${lesson.id} produced no exercises`).toBeGreaterThan(0);
            exercises.forEach(exercise => expect(exercise.lessonId).toBe(lesson.id));

        });

    });

});
