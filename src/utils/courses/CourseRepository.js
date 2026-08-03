import { getCourse } from "./getCourses";
import { normalizeCourse } from "./normalizeCourse";

// The underlying course/module/lesson data (src/data/courses/*) is static -
// imported once, never mutated at runtime - but normalizeCourse() re-runs a
// deep .map().sort() over every module *and* every lesson on every single
// call. Since ModuleRepository (and everything built on it: ModulesPage,
// ModuleLessonsPage, LessonPage, the dashboard's course overview, etc.)
// calls getByLanguage very frequently, that was both wasted CPU work and a
// fresh set of module/lesson object references on every call - which broke
// referential-equality checks (React.memo included) for anything holding
// onto a lesson/module object across renders. Same caching pattern as
// DictionaryRepository's indexCache.
const normalizedCourseCache = new Map();

export const CourseRepository = {

    getByLanguage(language) {

        // Same normalize-once boundary as DictionaryRepository/VideoRepository:
        // callers pass whatever casing they have on hand ("English" from
        // LanguageContext, lowercase elsewhere) - keying the cache on the
        // lowercased form means both resolve to the exact same cached object.
        const key = language?.toLowerCase();

        if (!normalizedCourseCache.has(key)) {
            normalizedCourseCache.set(key, normalizeCourse(getCourse(language)));
        }

        return normalizedCourseCache.get(key);

    }

};
