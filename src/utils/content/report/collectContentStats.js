import { generateExercisesForLesson } from "../../exercises/generateExercisesForLesson";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";

// Exercises aren't authored data - generateExercisesForLesson() derives
// them at read time from a lesson's quiz blocks/vocabulary/examples/dialogue
// (see src/utils/exercises/generateExercisesForLesson.js). Counting them
// here means actually running the generator, which also doubles as a smoke
// test: a lesson malformed enough to make it throw is caught and reported
// as zero exercises for that lesson instead of crashing the whole report -
// validateContent() is what's responsible for explaining *why*.
function countExercises(lesson) {

    try {
        return generateExercisesForLesson(lesson).length;
    } catch {
        return 0;
    }

}

// Counts every audio() opt-in (see docs/CONTENT_AUTHORING.md's Audio
// section) on a lesson's blocks - both a recorded file and a TTS-only
// `{}` count, since both mean "this can be played", which is the thing an
// author cares about here. Mirrors (in spirit, not by import - this stays
// portable/fs-free, unlike scripts/content/checkAssets.js's ref collector)
// every place audio can attach: a block, an example/dialogue item, or a
// quiz feedback field.
function countLessonAudioRefs(lesson) {

    let count = 0;

    (lesson?.blocks ?? []).forEach(block => {

        if (block.audio) {
            count += 1;
        }

        if (block.type === BLOCK_TYPES.EXAMPLE) {
            count += (block.examples ?? []).filter(example => example.audio).length;
        }

        if (block.type === BLOCK_TYPES.DIALOGUE) {
            count += (block.lines ?? []).filter(line => line.audio).length;
        }

        if (block.type === BLOCK_TYPES.QUIZ && block.feedback) {
            count += Object.values(block.feedback)
                .filter(value => typeof value === "object" && value?.audio).length;
        }

    });

    return count;

}

function countDictionaryAudioRefs(entries) {
    return (entries ?? []).filter(entry => entry.audio).length;
}

// `courses`: { [language]: course }, `dictionaries`: { [language]: entries[] }
// - same shapes validateContent() takes. Pure and side-effect free: doesn't
// touch the filesystem, so it's equally usable from a Node CLI script and
// from a Vitest test.
export function collectContentStats({ courses, dictionaries }) {

    const courseList = Object.values(courses ?? {});

    let moduleCount = 0;

    let lessonCount = 0;

    let blockCount = 0;

    let objectiveCount = 0;

    let vocabularyWordCount = 0;

    let exerciseCount = 0;

    let audioReferenceCount = 0;

    courseList.forEach(course => {

        (course?.modules ?? []).forEach(module => {

            moduleCount += 1;

            (module?.lessons ?? []).forEach(lesson => {

                lessonCount += 1;

                blockCount += lesson?.blocks?.length ?? 0;

                objectiveCount += lesson?.objectives?.length ?? 0;

                vocabularyWordCount += lesson?.vocabulary?.length ?? 0;

                exerciseCount += countExercises(lesson);

                audioReferenceCount += countLessonAudioRefs(lesson);

            });

        });

    });

    const dictionaryEntryLists = Object.values(dictionaries ?? {});

    const dictionaryWordCount = dictionaryEntryLists
        .reduce((sum, entries) => sum + (entries?.length ?? 0), 0);

    audioReferenceCount += dictionaryEntryLists
        .reduce((sum, entries) => sum + countDictionaryAudioRefs(entries), 0);

    return {

        courseCount: courseList.length,

        moduleCount,

        lessonCount,

        blockCount,

        objectiveCount,

        vocabularyWordCount,

        dictionaryWordCount,

        exerciseCount,

        audioReferenceCount

    };

}
