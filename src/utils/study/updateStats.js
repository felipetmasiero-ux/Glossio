import {
    AGAIN,
    GOOD
} from "../../constants/studyQuality";

export function updateStats(
    quality,
    setStats
) {

    const key =
        quality === AGAIN
            ? "again"
            : quality === GOOD
                ? "good"
                : "easy";

    setStats(prev => ({
        ...prev,
        [key]: prev[key] + 1
    }));

}