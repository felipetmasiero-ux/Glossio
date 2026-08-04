export function createDeck({ name, language }) {
    const now = Date.now();

    return {
        id: crypto.randomUUID(),

        name,
        language,

        createdAt: now,
        updatedAt: now
    };
}
