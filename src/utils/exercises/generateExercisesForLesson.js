import { generateMultipleChoice } from "./generators/generateMultipleChoice";
import { generateSelectWord } from "./generators/generateSelectWord";
import { generateFillBlank } from "./generators/generateFillBlank";
import { generateMatchTranslation } from "./generators/generateMatchTranslation";
import { generateOrderSentence } from "./generators/generateOrderSentence";
import { generateListening } from "./generators/generateListening";
import { shuffle } from "./shuffle";

export function generateExercisesForLesson(lesson) {

    if (!lesson) return [];

    const exercises = [
        ...generateMultipleChoice(lesson),
        ...generateSelectWord(lesson),
        ...generateFillBlank(lesson),
        ...generateMatchTranslation(lesson),
        ...generateOrderSentence(lesson),
        ...generateListening(lesson)
    ];

    return shuffle(exercises);

}
