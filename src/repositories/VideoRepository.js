import { videos } from "../data/videos";
import { normalizeVideo } from "./normalizeVideo";

// Same reasoning/pattern as CourseRepository/LessonRepository's cache: the
// underlying video data is static, but normalizeVideo() was being re-run
// over every video on every single getAll() call (and getById(), via its
// own getAll() call, transitively).
const normalizedVideosCache = new Map();

function getNormalizedVideos(language) {

    const key = language?.toLowerCase();

    if (!normalizedVideosCache.has(key)) {
        normalizedVideosCache.set(
            key,
            (videos[key] ?? []).map(normalizeVideo)
        );
    }

    return normalizedVideosCache.get(key);

}

export const VideoRepository = {

    getAll(language) {
        return getNormalizedVideos(language);
    },

    getById(language, id) {
        return this.getAll(language).find(
            video => video.id === id
        ) ?? null;
    }

};
