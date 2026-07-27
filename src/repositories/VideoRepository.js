import { videos } from "../data/videos";
import { normalizeVideo } from "./normalizeVideo";

export const VideoRepository = {

    getAll(language) {

        return (videos[language?.toLowerCase()] ?? []).map(normalizeVideo);

    },

    getById(language, id) {

        return this.getAll(language).find(
            video => video.id === id
        ) ?? null;

    }

};
