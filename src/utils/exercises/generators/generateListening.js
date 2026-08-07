import { EXERCISE_TYPES } from "../../../constants/exerciseTypes";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";
import { audio } from "../../lessons/builders/audio";
import { pickDistractors } from "../pickDistractors";
import { shuffle } from "../shuffle";

const MAX_PER_LESSON = 4;
const DISTRACTOR_COUNT = 3;

function collectExampleSentences(lesson) {

    return lesson.blocks
        .filter(block => block.type === BLOCK_TYPES.EXAMPLE)
        .flatMap(block => block.examples);

}

function collectDialogueSentences(lesson) {

    return lesson.blocks
        .filter(block => block.type === BLOCK_TYPES.DIALOGUE)
        .flatMap(block => block.lines);

}

// Builds one listening exercise from a single candidate sentence - kept
// separate from generateListening() below so "how one exercise is put
// together" (audio source, distractor pool, option shuffling) is testable
// in isolation, the same way FillBlank/OrderSentence's inline object
// literals do it, just factored out since there's more happening here.
// Returns null when the candidate doesn't have enough distinct distractors
// in the lesson - the caller skips it, same "continue" behavior
// generateFillBlank.js already uses for the identical situation.
export function buildListeningExercise(lesson, candidate, distractorPool, index) {

    const distractors = pickDistractors(
        distractorPool,
        candidate.text,
        DISTRACTOR_COUNT,
        item => item.text
    );

    if (distractors.length < DISTRACTOR_COUNT) return null;

    const options = shuffle([candidate.text, ...distractors]);
    const answerIndex = options.indexOf(candidate.text);

    return {

        id: `${lesson.id}-${EXERCISE_TYPES.LISTENING}-${index}`,

        type: EXERCISE_TYPES.LISTENING,

        lessonId: lesson.id,

        prompt: "Ouça o áudio e escolha a frase correta.",

        explanation: candidate.translation ?? null,

        // See generateSelectWord.js's comment - no per-exercise feedback
        // source for generated (non-quiz) exercises today.
        feedback: null,

        payload: {

            // candidate.audio when the sentence already has a recorded
            // clip (audio("/....mp3")); audio() - TTS-only - otherwise.
            // resolveAudioSource.js (src/utils/audio) already prefers a
            // real file over TTS, so this generator needs zero changes
            // the day real recordings exist for these sentences.
            audio: candidate.audio ?? audio(),

            text: candidate.text,
            options,
            answerIndex

        }

    };

}

// Sources listening targets from the lesson's own EXAMPLE blocks only -
// they're the one sentence source that reliably carries a translation
// (used for the post-answer explanation), unlike dialogue lines which
// never do (see generateOrderSentence.js). Dialogue lines still widen the
// distractor pool below - a lesson with few examples but a longer
// dialogue still gets a fair shot at 3 plausible distractors.
//
// Distractors are always other real sentences already in the lesson,
// never an automated grammatical mutation of the correct one (e.g. "she
// work" / "she works" / "she working") - that kind of transform is easy
// to get subtly wrong (an accidentally-also-correct variant, an
// ambiguous one) without a grammar-aware generator this app doesn't have.
export function generateListening(lesson) {

    if (!lesson) return [];

    const examples = collectExampleSentences(lesson);
    const dialogueLines = collectDialogueSentences(lesson);
    const distractorPool = [...examples, ...dialogueLines];

    const exercises = [];

    for (const candidate of shuffle(examples)) {

        const exercise = buildListeningExercise(lesson, candidate, distractorPool, exercises.length);

        if (!exercise) continue;

        exercises.push(exercise);

        if (exercises.length === MAX_PER_LESSON) break;

    }

    return exercises;

}
