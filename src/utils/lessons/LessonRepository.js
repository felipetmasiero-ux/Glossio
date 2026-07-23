import { getLessons } from "./getLessons";
import { normalizeLesson } from "./normalizeLesson";

export const LessonRepository = {

    getAll(language) {

        return getLessons(language).map(normalizeLesson);

    },

    getById(language, id) {

        const lesson = getLessons(language).find(

            lesson => lesson.id === id

        );

        return normalizeLesson(lesson);

    },

    getNextLesson(language, id) {

        const lessons = getLessons(language);

        const index = lessons.findIndex(

            lesson => lesson.id === id

        );

        if (

            index === -1 ||

            index === lessons.length - 1

        ) {

            return null;

        }

        return normalizeLesson(

            lessons[index + 1]

        );

    },

    getPreviousLesson(language, id) {

        const lessons = getLessons(language);

        const index = lessons.findIndex(

            lesson => lesson.id === id

        );

        if (index <= 0) {

            return null;

        }

        return normalizeLesson(

            lessons[index - 1]

        );

    }

};