import { AGAIN } from "../../../constants/studyQuality.js";

export function updateQueue(
    card,
    quality,
    setSessionCards
) {

    setSessionCards(previous => {

        const remaining =
            previous.filter(c => c.id !== card.id);

        if (quality === AGAIN) {
            return [...remaining, card];
        }

        return remaining;

    });

}