import { placementQuestionsByLanguage } from "../data/placementTest";
import { shuffleQuestionOptions } from "../utils/placementTest/shuffleQuestionOptions";

export const PlacementTestRepository = {

    getLevels(language) {
        return placementQuestionsByLanguage[language?.toLowerCase()] ?? {};
    },

    // Ascending order (a1, a2, ...) - the order the recommendation algorithm
    // climbs through, and the order levels are always defined in each data file.
    getAvailableLevels(language) {
        return Object.keys(this.getLevels(language)).map(level => level.toUpperCase());
    },

    // Every question is authored with its correct option written first (see
    // src/data/placementTest/**/*.js) - shuffled here, at the boundary
    // between the authored data and whatever presents it, so the test can't
    // be passed by always picking option A while every question file stays
    // free to keep writing the correct answer first (see
    // shuffleQuestionOptions's own comment).
    getQuestions(language) {
        return Object.values(this.getLevels(language)).flat().map(shuffleQuestionOptions);
    }

};
