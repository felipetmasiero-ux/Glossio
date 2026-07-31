import { VideoProgressRepository } from "../../repositories/VideoProgressRepository";

export function getVideosCompleted({ language }) {

    return Object.values(VideoProgressRepository.getProgress(language))
        .filter(entry => entry.completed)
        .length;

}
