import { placementQuestionsByLanguage } from "../data/placementTest";

export const PlacementTestRepository = {

    getLevels(language) {
        return placementQuestionsByLanguage[language?.toLowerCase()] ?? {};
    },

    // Ascending order (a1, a2, ...) - the order the recommendation algorithm
    // climbs through, and the order levels are always defined in each data file.
    getAvailableLevels(language) {
        return Object.keys(this.getLevels(language)).map(level => level.toUpperCase());
    },

    getQuestions(language) {
        return Object.values(this.getLevels(language)).flat();
    }

};
