import { EXERCISE_TYPES } from "../../../constants/exerciseTypes";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";
import { normalizeWord } from "../../../repositories/normalizeWord";
import { getVocabularyEntries } from "../getVocabularyEntries";
import { buildWordPool } from "../buildWordPool";
import { pickDistractors } from "../pickDistractors";
import { shuffle } from "../shuffle";

const MAX_PER_LESSON = 3;
const DISTRACTOR_COUNT = 3;
const BLANK = "_____";

function findSentences(lesson) {

    return lesson.blocks
        .filter(block => block.type === BLOCK_TYPES.EXAMPLE)
        .flatMap(block => block.examples);

}

export function generateFillBlank(lesson) {

    const vocabularyWords = new Set(
        getVocabularyEntries(lesson)
            .filter(entry => !entry.word.includes(" "))
            .map(entry => normalizeWord(entry.word))
    );

    const pool = buildWordPool(lesson, { singleWordOnly: true });

    const exercises = [];

    for (const example of findSentences(lesson)) {

        const tokens = example.text.trim().split(/\s+/);

        const matchIndex = tokens.findIndex(
            token => vocabularyWords.has(normalizeWord(token))
        );

        if (matchIndex === -1) continue;

        const answer = normalizeWord(tokens[matchIndex]);

        const distractors = pickDistractors(
            pool,
            answer,
            DISTRACTOR_COUNT,
            item => normalizeWord(item.word)
        );

        if (distractors.length < DISTRACTOR_COUNT) continue;

        const sentence = tokens
            .map((token, index) => index === matchIndex ? BLANK : token)
            .join(" ");

        const options = shuffle([answer, ...distractors]);

        exercises.push({

            id: `${lesson.id}-${EXERCISE_TYPES.FILL_BLANK}-${exercises.length}`,

            type: EXERCISE_TYPES.FILL_BLANK,

            lessonId: lesson.id,

            prompt: example.translation
                ? `Complete a frase: "${example.translation}"`
                : "Complete a frase.",

            explanation: null,

            // See generateSelectWord.js's comment - no per-exercise
            // feedback source for this generator today.
            feedback: null,

            payload: {
                sentence,
                answer,
                options
            }

        });

        if (exercises.length === MAX_PER_LESSON) break;

    }

    return exercises;

}
