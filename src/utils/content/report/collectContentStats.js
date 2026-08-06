import { generateExercisesForLesson } from "../../exercises/generateExercisesForLesson";

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

    courseList.forEach(course => {

        (course?.modules ?? []).forEach(module => {

            moduleCount += 1;

            (module?.lessons ?? []).forEach(lesson => {

                lessonCount += 1;

                blockCount += lesson?.blocks?.length ?? 0;

                objectiveCount += lesson?.objectives?.length ?? 0;

                vocabularyWordCount += lesson?.vocabulary?.length ?? 0;

                exerciseCount += countExercises(lesson);

            });

        });

    });

    const dictionaryWordCount = Object.values(dictionaries ?? {})
        .reduce((sum, entries) => sum + (entries?.length ?? 0), 0);

    return {

        courseCount: courseList.length,

        moduleCount,

        lessonCount,

        blockCount,

        objectiveCount,

        vocabularyWordCount,

        dictionaryWordCount,

        exerciseCount

    };

}
