// Shared by scripts/validateContent.js and scripts/contentReport.js - the
// one place that knows how to load every course + every dictionary under
// plain Node (via ../registerLoader.mjs, which teaches Node's resolver
// about this codebase's extensionless imports - see its own comment).
// Reuses SUPPORTED_LANGUAGES instead of hardcoding a second language list.
import { getCourse } from "../../src/utils/courses/getCourses.js";
import { dictionaries } from "../../src/data/dictionary/index.js";
import { SUPPORTED_LANGUAGES } from "../../src/constants/languages.js";

export function loadContentData() {

    const courses = {};

    SUPPORTED_LANGUAGES.forEach(language => {

        const key = language.toLowerCase();

        const course = getCourse(key);

        if (course) {
            courses[key] = course;
        }

    });

    return { courses, dictionaries };

}
