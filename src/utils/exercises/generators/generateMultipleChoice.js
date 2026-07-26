import { EXERCISE_TYPES } from "../../../constants/exerciseTypes";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";

export function generateMultipleChoice(lesson) {

    const quizBlocks = lesson.blocks.filter(
        block => block.type === BLOCK_TYPES.QUIZ
    );

    return quizBlocks.map((block, index) => ({

        id: `${lesson.id}-${EXERCISE_TYPES.MULTIPLE_CHOICE}-${index}`,

        type: EXERCISE_TYPES.MULTIPLE_CHOICE,

        lessonId: lesson.id,

        prompt: block.question,

        explanation: block.explanation ?? null,

        payload: {
            options: block.options,
            answerIndex: block.answer
        }

    }));

}
