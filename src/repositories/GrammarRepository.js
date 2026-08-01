import { grammarByLanguage } from "../data/grammar";
import { LessonRepository } from "../utils/lessons/LessonRepository";
import { VideoRepository } from "./VideoRepository";

export const GrammarRepository = {

    getLevels(language) {
        return grammarByLanguage[language?.toLowerCase()] ?? {};
    },

    getAll(language) {
        return Object.values(this.getLevels(language)).flat();
    },

    getByLevel(language, level) {
        return this.getLevels(language)[level?.toLowerCase()] ?? [];
    },

    getById(language, id) {
        return this.getAll(language).find(topic => topic.id === id) ?? null;
    },

    // Used by GrammarBlock to discreetly link a lesson's inline grammar note
    // back to its full reference entry, when one exists for that lesson.
    getByLessonId(language, lessonId) {
        return this.getAll(language).find(topic => topic.lessonId === lessonId) ?? null;
    },

    // Relationships are derived on the fly from data that already exists
    // (lessons, videos) via the shared topic-taxonomy key each already
    // carries - nothing new is stored to represent "this topic relates to
    // that lesson/video".
    getRelated(language, topic) {

        if (!topic) {
            return { lesson: null, videos: [] };
        }

        const lesson = topic.lessonId ? LessonRepository.getById(language, topic.lessonId) : null;

        const videos = topic.topic
            ? VideoRepository.getAll(language).filter(video => video.topic === topic.topic)
            : [];

        return { lesson, videos };

    }

};
