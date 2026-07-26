import { EXERCISE_TYPES } from "../../../constants/exerciseTypes";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";
import { shuffle } from "../shuffle";

const MAX_PER_LESSON = 4;
const MIN_WORDS = 4;
const MAX_WORDS = 9;

function tokenize(text) {
    return text.trim().split(/\s+/);
}

function collectSentences(lesson) {

    const fromExamples = lesson.blocks
        .filter(block => block.type === BLOCK_TYPES.EXAMPLE)
        .flatMap(block => block.examples)
        .map(example => ({ text: example.text, translation: example.translation ?? null }));

    const fromDialogue = lesson.blocks
        .filter(block => block.type === BLOCK_TYPES.DIALOGUE)
        .flatMap(block => block.lines)
        .map(line => ({ text: line.text, translation: null }));

    return [...fromExamples, ...fromDialogue];

}

function shuffleTokens(tokens) {

    const shuffled = shuffle(tokens);

    if (tokens.length > 1 && shuffled.join(" ") === tokens.join(" ")) {
        return shuffle(tokens);
    }

    return shuffled;

}

export function generateOrderSentence(lesson) {

    const sentences = collectSentences(lesson).filter(sentence => {
        const wordCount = tokenize(sentence.text).length;
        return wordCount >= MIN_WORDS && wordCount <= MAX_WORDS;
    });

    return sentences.slice(0, MAX_PER_LESSON).map((sentence, index) => {

        const correctOrder = tokenize(sentence.text);

        return {

            id: `${lesson.id}-${EXERCISE_TYPES.ORDER_SENTENCE}-${index}`,

            type: EXERCISE_TYPES.ORDER_SENTENCE,

            lessonId: lesson.id,

            prompt: sentence.translation
                ? `Reorganize a frase: "${sentence.translation}"`
                : "Reorganize a frase.",

            explanation: null,

            payload: {
                tokens: shuffleTokens(correctOrder),
                correctOrder
            }

        };

    });

}
