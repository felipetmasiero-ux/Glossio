import { getCourse } from "./getCourses";
import { normalizeCourse } from "./normalizeCourse";

export const CourseRepository = {

    getByLanguage(language) {

        return normalizeCourse(
            getCourse(language)
        );

    }

};
