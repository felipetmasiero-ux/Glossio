const STORAGE_KEY = "videoProgress";

function loadAll() {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return {};
    }

    try {

        const parsed = JSON.parse(saved);

        return parsed && typeof parsed === "object" ? parsed : {};

    } catch {

        return {};

    }

}

function saveAll(all) {

    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));

}

export const VideoProgressRepository = {

    getProgress(language) {

        const all = loadAll();

        return all[language?.toLowerCase()] ?? {};

    },

    saveProgress(language, progress) {

        const all = loadAll();

        all[language?.toLowerCase()] = progress;

        saveAll(all);

    },

    getVideoProgress(language, videoId) {

        return this.getProgress(language)[videoId] ?? null;

    },

    updateVideoProgress(language, videoId, data) {

        const progress = this.getProgress(language);

        const existing = progress[videoId] ?? null;

        const updated = {
            videoId,
            currentTime: 0,
            duration: 0,
            completed: false,
            completedAt: null,
            ...existing,
            ...data,
            updatedAt: Date.now()
        };

        this.saveProgress(language, {
            ...progress,
            [videoId]: updated
        });

        return updated;

    }

};
