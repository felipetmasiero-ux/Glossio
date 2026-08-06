import { EXERCISE_TYPES } from "../../../constants/exerciseTypes";
import { getVocabularyEntries } from "../getVocabularyEntries";
import { buildWordPool } from "../buildWordPool";
import { pickDistractors } from "../pickDistractors";
import { shuffle } from "../shuffle";

const MAX_PER_LESSON = 5;
const DISTRACTOR_COUNT = 3;
const MAX_TRANSLATION_LENGTH = 30;

export function generateSelectWord(lesson) {

    const candidates = getVocabularyEntries(lesson).filter(
        entry => !entry.word.includes(" ") && entry.translation.length <= MAX_TRANSLATION_LENGTH
    );

    const pool = buildWordPool(lesson, { singleWordOnly: true });

    const exercises = [];

    for (const entry of candidates) {

        const distractors = pickDistractors(
            pool,
            entry.word,
            DISTRACTOR_COUNT,
            item => item.word
        );

        if (distractors.length < DISTRACTOR_COUNT) continue;

        const options = shuffle([entry.word, ...distractors]);

        exercises.push({

            id: `${lesson.id}-${EXERCISE_TYPES.SELECT_WORD}-${exercises.length}`,

            type: EXERCISE_TYPES.SELECT_WORD,

            lessonId: lesson.id,

            prompt: `Qual é a palavra para "${entry.translation}"?`,

            explanation: null,

            // No per-exercise feedback source today - unlike quiz blocks,
            // vocabulary entries don't carry a feedback() object (see
            // docs/CONTENT_AUTHORING.md's Feedback section for why that
            // scope was deliberately left for later). Explicit null, not
            // just omitted, so ExerciseShell's contract is the same for
            // every exercise type regardless of whether it's used yet.
            feedback: null,

            payload: {
                options,
                answerIndex: options.indexOf(entry.word)
            }

        });

        if (exercises.length === MAX_PER_LESSON) break;

    }

    return exercises;

}
