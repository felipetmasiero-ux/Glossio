import { englishLessons } from "../../data/lessons/english";
import { frenchLessons } from "../../data/lessons/french";
import { portugueseLessons } from "../../data/lessons/portuguese";


const lessonsByLanguage = {

    english: englishLessons,

    french: frenchLessons,

    portuguese: portugueseLessons

};

export function getLessons(language) {

    if (!language) {
        return [];
    }

    const key = language.toLowerCase();

    return lessonsByLanguage[key] ?? [];

}