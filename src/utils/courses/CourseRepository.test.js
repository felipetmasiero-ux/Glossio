import { describe, expect, it } from "vitest";
import { CourseRepository } from "./CourseRepository";

// Performance sprint regression guard: getByLanguage used to run a fresh
// deep .map().sort() over every module and every lesson (normalizeCourse ->
// normalizeModule -> normalizeLesson) on *every single call* - despite the
// underlying course data being 100% static. That was wasted CPU on a
// function called from nearly everywhere (ModulesPage, ModuleLessonsPage,
// LessonPage, the dashboard's course overview, ...), and it handed out a
// brand-new module/lesson object graph each time, which broke referential-
// equality checks (React.memo included) for any component holding a lesson/
// module across renders. It's now cached per language.
describe("CourseRepository.getByLanguage caching", () => {

    it("returns the exact same object reference on repeated calls for the same language", () => {
        const first = CourseRepository.getByLanguage("English");
        const second = CourseRepository.getByLanguage("English");

        expect(second).toBe(first);
        expect(second.modules).toBe(first.modules);
        expect(second.modules[0]).toBe(first.modules[0]);
        expect(second.modules[0].lessons).toBe(first.modules[0].lessons);
        expect(second.modules[0].lessons[0]).toBe(first.modules[0].lessons[0]);
    });

    it("treats different casings of the same language as the same cache entry", () => {
        const lower = CourseRepository.getByLanguage("english");
        const capitalized = CourseRepository.getByLanguage("English");

        expect(lower).toBe(capitalized);
    });

    it("still returns correct, distinct data per language", () => {
        const english = CourseRepository.getByLanguage("English");
        const french = CourseRepository.getByLanguage("French");

        expect(english.language).toBe("english");
        expect(french.language).toBe("french");
        expect(english).not.toBe(french);
    });

    it("returns null for a language with no course data, without throwing or caching garbage", () => {
        expect(CourseRepository.getByLanguage("Klingon")).toBeNull();
        expect(CourseRepository.getByLanguage("Klingon")).toBeNull();
    });

});
