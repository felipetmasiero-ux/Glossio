import { shuffle } from "./shuffle";

export function pickDistractors(pool, correctValue, count, getValue = (item) => item) {

    const seen = new Set([correctValue.toLowerCase()]);

    const distractors = [];

    for (const item of shuffle(pool)) {

        const value = getValue(item);

        const key = value.toLowerCase();

        if (seen.has(key)) continue;

        seen.add(key);

        distractors.push(value);

        if (distractors.length === count) break;

    }

    return distractors;

}
