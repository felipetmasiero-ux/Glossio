import { AGAIN } from "../../../constants/studyQuality.js";

export function updateProgress(
    quality,
    setCompletedCards
) {

    if (quality !== AGAIN) {
        setCompletedCards(prev => prev + 1);
    }

}