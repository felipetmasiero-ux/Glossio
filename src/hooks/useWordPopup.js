import { useState } from "react";
import { useEvents } from "./useEvents";
import { useLanguage } from "./useLanguage";
import { EVENT_TYPES } from "../constants/events";
import { ModuleRepository } from "../utils/courses/ModuleRepository";

export function useWordPopup(lesson) {

    const {
        vocabulary = [],
        id: lessonId,
        category = null
    } = lesson ?? {};

    const [selectedWord, setSelectedWord] = useState(null);

    const { logEvent } = useEvents();
    const { language } = useLanguage();

    function withLessonContext(word) {

        if (!lessonId) {
            return word;
        }

        const moduleId = ModuleRepository.getByLesson(language, lessonId)?.id ?? null;

        return {
            ...word,
            lessonId,
            moduleId,
            category
        };

    }

    function openWord(wordOrText) {

        const word = typeof wordOrText === "object"
            ? wordOrText
            : vocabulary.find(item =>
                item.word.toLowerCase() === wordOrText.toLowerCase()
            );

        if (!word) {
            return;
        }

        const enriched = withLessonContext(word);

        setSelectedWord(enriched);

        logEvent(EVENT_TYPES.WORD_VIEWED, {
            word: enriched.word,
            language,
            lessonId: lessonId ?? null
        });

    }

    function closeWord() {
        setSelectedWord(null);
    }

    return {
        selectedWord,
        openWord,
        closeWord
    };
}
