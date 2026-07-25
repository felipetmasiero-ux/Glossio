import { englishCourse } from "../../data/courses/english";
import { frenchCourse } from "../../data/courses/french";
import { portugueseCourse } from "../../data/courses/portuguese";

const coursesByLanguage = {

    english: englishCourse,

    french: frenchCourse,

    portuguese: portugueseCourse

};

export function getCourse(language) {

    if (!language) {
        return null;
    }

    return coursesByLanguage[language.toLowerCase()] ?? null;

}
