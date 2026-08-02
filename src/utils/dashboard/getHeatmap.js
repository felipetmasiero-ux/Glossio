import { ACTIVITY_EVENT_TYPES } from "../../constants/dashboard";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const DEFAULT_DAYS = 90;

function getDayTimestamp(timestamp) {
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}

function getLevel(count) {
    if (count === 0) return 0;
    if (count <= 4) return 1;
    if (count <= 9) return 2;
    return 3;
}

export function getHeatmap({ events = [], days = DEFAULT_DAYS } = {}) {

    const countsByDay = new Map();

    events
        .filter(event => ACTIVITY_EVENT_TYPES.includes(event.type))
        .forEach(event => {
            const day = getDayTimestamp(event.timestamp);
            countsByDay.set(day, (countsByDay.get(day) ?? 0) + 1);
        });

    const today = getDayTimestamp(Date.now());

    const cells = [];

    for (let i = days - 1; i >= 0; i--) {

        const timestamp = today - i * DAY_IN_MS;
        const count = countsByDay.get(timestamp) ?? 0;

        cells.push({
            date: new Date(timestamp).toISOString().slice(0, 10),
            timestamp,
            count,
            level: getLevel(count)
        });

    }

    return cells;

}
