import { AGAIN } from "../../constants/studyQuality";

export function updateProgress(
    quality,
    setCompletedCards
) {

    if (quality !== AGAIN) {
        setCompletedCards(prev => prev + 1);
    }

}