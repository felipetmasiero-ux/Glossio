const STORAGE_KEY = "studyGoals";

export const DEFAULT_GOALS = {
    dailyLessons: null,
    dailyReviews: null,
    dailyVideoMinutes: null,
    weeklyMinutes: null,
    weeklyLessons: null
};

function sanitize(goals) {

    const clean = { ...DEFAULT_GOALS };

    for (const key of Object.keys(DEFAULT_GOALS)) {

        const value = goals?.[key];

        clean[key] = typeof value === "number" && value > 0 ? value : null;

    }

    return clean;

}

export const GoalsStorage = {

    getGoals() {

        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? sanitize(JSON.parse(raw)) : { ...DEFAULT_GOALS };
        } catch {
            return { ...DEFAULT_GOALS };
        }

    },

    saveGoals(goals) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitize(goals)));
    },

    hasAnyGoal(goals) {
        return Object.values(sanitize(goals)).some(value => value !== null);
    }

};
