import { createStudyRecord } from "./createStudyRecord";

export function recordStudy(
    history,
    cardId,
    quality
) {
    return [
        ...history,
        createStudyRecord({
            cardId,
            quality
        })
    ];
}