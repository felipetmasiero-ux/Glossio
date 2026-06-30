const DAY_IN_MS = 24 * 60 * 60 * 1000;

function getDayTimestamp(timestamp) {
    const date = new Date(timestamp);

    date.setHours(0, 0, 0, 0);

    return date.getTime();
}

export function getStreak(history) {

    if (!history.length) {
        return {
            current: 0,
            longest: 0
        };
    }

    const studiedDays = [
        ...new Set(
            history.map(record =>
                getDayTimestamp(record.reviewedAt)
            )
        )
    ].sort((a, b) => a - b);

    const today = getDayTimestamp(Date.now());

    // Se não estudou hoje, o streak atual é perdido.
    if (studiedDays.at(-1) !== today) {
        return {
            current: 0,
            longest: 0
        };
    }

    // ---------- Current streak ----------

    let current = 1;
    let expectedDay = today;

    for (let i = studiedDays.length - 2; i >= 0; i--) {

        expectedDay -= DAY_IN_MS;

        if (studiedDays[i] === expectedDay) {
            current++;
        } else {
            break;
        }

    }

    // ---------- Longest streak ----------

    let longest = 1;
    let streak = 1;

    for (let i = 1; i < studiedDays.length; i++) {

        if (studiedDays[i] - studiedDays[i - 1] === DAY_IN_MS) {

            streak++;

        } else {

            streak = 1;

        }

        longest = Math.max(longest, streak);

    }

    return {
        current,
        longest
    };

}