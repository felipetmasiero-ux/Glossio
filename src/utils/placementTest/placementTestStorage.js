// Local-only, on purpose (Sprint 37 restriction): the recommendation is a
// convenience nudge, not user progress - it never touches the backend,
// PostgreSQL, or Cloud Sync, so it's never part of that sync payload.
const STORAGE_KEY = "placementTestResults";

function loadAll() {

    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
        return {};
    }

}

function saveAll(all) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export const PlacementTestStorage = {

    getResult(language) {
        return loadAll()[language?.toLowerCase()] ?? null;
    },

    saveResult(language, result) {

        const all = loadAll();

        const record = {
            language,
            recommendedLevel: result.recommendedLevel,
            recommendedModuleId: result.recommendedModuleId,
            scoresByLevel: result.scoresByLevel,
            completedAt: Date.now()
        };

        all[language.toLowerCase()] = record;
        saveAll(all);

        return record;

    },

    getAllResults() {
        return loadAll();
    },

    // The single most recently completed test, across every language - used
    // by Profile's "Último teste" read-only summary.
    getLatestResult() {

        const all = loadAll();
        const results = Object.values(all);

        if (results.length === 0) {
            return null;
        }

        return results.reduce((latest, current) =>
            !latest || current.completedAt > latest.completedAt ? current : latest
        , null);

    }

};
