import { describe, expect, it } from "vitest";

import { englishB2Module } from "./module";
import { englishA1Module } from "../a1/module";
import { englishA2Module } from "../a2/module";
import { englishB1Module } from "../b1/module";
import { CourseRepository } from "../../../../utils/courses/CourseRepository";
import { ModuleRepository } from "../../../../utils/courses/ModuleRepository";
import { LessonRepository } from "../../../../utils/lessons/LessonRepository";
import { DictionaryRepository } from "../../../../repositories/DictionaryRepository";
import { generateExercisesForLesson } from "../../../../utils/exercises/generateExercisesForLesson";

const B2_LESSON_IDS = [
    "english-b2-personal-development",
    "english-b2-education",
    "english-b2-work-careers",
    "english-b2-society",
    "english-b2-science-technology",
    "english-b2-environment",
    "english-b2-media-news",
    "english-b2-culture-arts",
    "english-b2-relationships-conflict",
    "english-b2-economics",
    "english-b2-debate",
    "english-b2-review"
];

describe("English B2 module", () => {

    it("has exactly 12 lessons with unique, correctly-prefixed ids", () => {

        expect(englishB2Module.lessons).toHaveLength(12);

        const ids = englishB2Module.lessons.map(lesson => lesson.id);

        expect(new Set(ids).size).toBe(12);
        ids.forEach(id => expect(id.startsWith("english-b2-")).toBe(true));
        expect(ids).toEqual(B2_LESSON_IDS);

    });

    it("is registered in the English course, alongside A1, A2 and B1, unchanged", () => {

        const course = CourseRepository.getByLanguage("english");
        const moduleIds = course.modules.map(module => module.id);

        expect(moduleIds).toEqual(["english-a1", "english-a2", "english-b1", "english-b2"]);
        expect(englishA1Module.lessons).toHaveLength(12);
        expect(englishA2Module.lessons).toHaveLength(12);
        expect(englishB1Module.lessons).toHaveLength(12);

    });

    it("is reachable through ModuleRepository and LessonRepository", () => {

        const module = ModuleRepository.getById("english", "english-b2");

        expect(module).not.toBeNull();
        expect(module.level).toBe("B2");

        B2_LESSON_IDS.forEach(id => {

            const lesson = LessonRepository.getById("english", id);

            expect(lesson).not.toBeNull();
            expect(lesson.level).toBe("B2");

        });

    });

    it("has every vocabulary word resolving in the English dictionary", () => {

        englishB2Module.lessons.forEach(lesson => {

            lesson.vocabulary.forEach(word => {
                expect(DictionaryRepository.getEntry("english", word), `"${word}" in ${lesson.id}`).not.toBeNull();
            });

        });

    });

    it("generates at least one exercise for every B2 lesson", () => {

        englishB2Module.lessons.forEach(lesson => {

            const exercises = generateExercisesForLesson(lesson);

            expect(exercises.length, `${lesson.id} produced no exercises`).toBeGreaterThan(0);
            exercises.forEach(exercise => expect(exercise.lessonId).toBe(lesson.id));

        });

    });

});
