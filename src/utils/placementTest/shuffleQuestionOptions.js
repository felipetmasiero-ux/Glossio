import { shuffle } from "../exercises/shuffle";

// Every placement test question is authored with the correct option written
// first (see src/data/placementTest/**/*.js) - natural to write, but it
// means correctIndex is 0 for the vast majority of questions if presented
// as-is: someone could pass the whole test by always picking option A.
// PlacementTestRepository.getQuestions() runs every question through this
// before handing it to the quiz, so the *authored* order stays whatever's
// easiest to write while the *presented* order is randomized per question.
//
// Shuffles a permutation of indices rather than the option strings
// themselves, so two options with identical text (unlikely, but not
// impossible) can't confuse which one was the correct one.
export function shuffleQuestionOptions(question) {

    const order = shuffle(question.options.map((_, index) => index));

    return {
        ...question,
        options: order.map(index => question.options[index]),
        correctIndex: order.indexOf(question.correctIndex)
    };

}
