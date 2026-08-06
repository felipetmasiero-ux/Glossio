import { EXERCISE_TYPES } from "../../../constants/exerciseTypes";
import { getVocabularyEntries } from "../getVocabularyEntries";

const GROUP_SIZE = 5;
const MIN_GROUP_SIZE = 4;

function chunkPairs(pairs) {

    const total = pairs.length;

    if (total < MIN_GROUP_SIZE) return [];

    let groupCount = Math.max(1, Math.round(total / GROUP_SIZE));

    while (groupCount > 1 && Math.floor(total / groupCount) < MIN_GROUP_SIZE) {
        groupCount -= 1;
    }

    const baseSize = Math.floor(total / groupCount);

    const remainder = total % groupCount;

    const groups = [];

    let offset = 0;

    for (let i = 0; i < groupCount; i++) {

        const size = baseSize + (i < remainder ? 1 : 0);

        groups.push(pairs.slice(offset, offset + size));

        offset += size;

    }

    return groups;

}

export function generateMatchTranslation(lesson) {

    const pairs = getVocabularyEntries(lesson).map(entry => ({
        id: entry.id,
        word: entry.word,
        translation: entry.translation
    }));

    const groups = chunkPairs(pairs);

    return groups.map((group, index) => ({

        id: `${lesson.id}-${EXERCISE_TYPES.MATCH_TRANSLATION}-${index}`,

        type: EXERCISE_TYPES.MATCH_TRANSLATION,

        lessonId: lesson.id,

        prompt: "Associe cada palavra à sua tradução.",

        explanation: null,

        // See generateSelectWord.js's comment - no per-exercise feedback
        // source for this generator today.
        feedback: null,

        payload: {
            pairs: group
        }

    }));

}
