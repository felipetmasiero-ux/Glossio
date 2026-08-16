import { describe, expect, it } from "vitest";

import { englishC1Module } from "./module";
import { englishA1Module } from "../a1/module";
import { englishA2Module } from "../a2/module";
import { englishB1Module } from "../b1/module";
import { englishB2Module } from "../b2/module";
import { englishCourse } from "../../../courses/english";
import { ModuleRepository } from "../../../../utils/courses/ModuleRepository";
import { LessonRepository } from "../../../../utils/lessons/LessonRepository";
import { DictionaryRepository } from "../../../../repositories/DictionaryRepository";
import { generateExercisesForLesson } from "../../../../utils/exercises/generateExercisesForLesson";

const C1_LESSON_IDS = [
    "english-c1-personal-development",
    "english-c1-education",
    "english-c1-work-careers",
    "english-c1-society",
    "english-c1-science-technology",
    "english-c1-environment",
    "english-c1-media-news",
    "english-c1-culture-arts",
    "english-c1-psychology",
    "english-c1-economics",
    "english-c1-debate",
    "english-c1-review"
];

describe("English C1 module", () => {

    it("has exactly 12 lessons with unique, correctly-prefixed ids", () => {

        expect(englishC1Module.lessons).toHaveLength(12);

        const ids = englishC1Module.lessons.map(lesson => lesson.id);

        expect(new Set(ids).size).toBe(12);
        ids.forEach(id => expect(id.startsWith("english-c1-")).toBe(true));
        expect(ids).toEqual(C1_LESSON_IDS);

    });

    it("is registered on englishCourse, alongside A1, A2, B1 and B2, unchanged", () => {

        const moduleIds = englishCourse.modules.map(module => module.id);

        expect(moduleIds).toEqual(["english-a1", "english-a2", "english-b1", "english-b2", "english-c1"]);
        expect(englishA1Module.lessons).toHaveLength(12);
        expect(englishA2Module.lessons).toHaveLength(12);
        expect(englishB1Module.lessons).toHaveLength(12);
        expect(englishB2Module.lessons).toHaveLength(12);

    });

    it("is reachable through ModuleRepository and LessonRepository", () => {

        const module = ModuleRepository.getById("english", "english-c1");

        expect(module).not.toBeNull();
        expect(module.level).toBe("C1");

        C1_LESSON_IDS.forEach(id => {

            const lesson = LessonRepository.getById("english", id);

            expect(lesson).not.toBeNull();
            expect(lesson.level).toBe("C1");

        });

    });

    it("continues English B2 -> C1 through ModuleRepository.getNextModule", () => {

        const nextModule = ModuleRepository.getNextModule("english", "english-b2");

        expect(nextModule?.id).toBe("english-c1");

    });

    it("has every lesson's vocabulary resolvable in the English dictionary", () => {

        englishC1Module.lessons.forEach(lesson => {

            lesson.vocabulary.forEach(word => {
                expect(DictionaryRepository.hasWord("english", word), `"${word}" (${lesson.id})`).toBe(true);
            });

        });

    });

    it("generates at least one exercise for every C1 lesson", () => {

        englishC1Module.lessons.forEach(lesson => {

            const exercises = generateExercisesForLesson(lesson);

            expect(exercises.length, `${lesson.id} produced no exercises`).toBeGreaterThan(0);
            exercises.forEach(exercise => expect(exercise.lessonId).toBe(lesson.id));

        });

    });

});
