import { AGAIN } from "../../../constants/studyQuality.js";

export function updateSessionQueue(
    sessionCards,
    answeredCard,
    quality
) {
    const remaining =
        sessionCards.filter(
            card => card.id !== answeredCard.id
        );

    if (quality === AGAIN) {
        return [...remaining, answeredCard];
    }

    return remaining;
}