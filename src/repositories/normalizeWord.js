export function normalizeWord(word) {
    return word
        ?.toLowerCase()
        .replace(/[.,!?;:()"'’]/g, "")
        .trim();
}
