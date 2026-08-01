import { useMemo, useState } from "react";

import { useLanguage } from "./useLanguage";
import { useFlashcards } from "./useFlashcards";
import { useDebouncedValue } from "./useDebouncedValue";

import { ModuleRepository } from "../utils/courses/ModuleRepository";
import { VideoRepository } from "../repositories/VideoRepository";
import { DictionaryRepository } from "../repositories/DictionaryRepository";

import {
    searchLessons,
    searchVideos,
    searchDictionary,
    searchFlashcards
} from "../utils/search";

const DEBOUNCE_MS = 200;

const EMPTY_RESULTS = { lessons: [], videos: [], dictionary: [], flashcards: [] };

export function useUniversalSearch() {

    const { language } = useLanguage();
    const { flashcards } = useFlashcards();

    const [rawQuery, setRawQuery] = useState("");
    const query = useDebouncedValue(rawQuery, DEBOUNCE_MS);

    // In-memory indices, rebuilt only when the active language (or the
    // flashcard collection) actually changes - not on every keystroke. At a
    // few hundred/thousand items each, a plain filter+sort per keystroke over
    // these already-flat arrays is already instant; no inverted index or
    // trie is needed at this scale.
    const lessons = useMemo(() => {

        return ModuleRepository.getAll(language).flatMap(module =>
            module.lessons.map(lesson => ({ ...lesson, moduleTitle: module.title }))
        );

    }, [language]);

    const videos = useMemo(() => VideoRepository.getAll(language), [language]);

    const dictionaryEntries = useMemo(() => DictionaryRepository.getAll(language), [language]);

    const languageFlashcards = useMemo(
        () => flashcards.filter(card => card.language === language),
        [flashcards, language]
    );

    const trimmedQuery = query.trim();

    const results = useMemo(() => {

        if (!trimmedQuery) {
            return EMPTY_RESULTS;
        }

        return {
            lessons: searchLessons(lessons, trimmedQuery),
            videos: searchVideos(videos, trimmedQuery),
            dictionary: searchDictionary(dictionaryEntries, trimmedQuery),
            flashcards: searchFlashcards(languageFlashcards, trimmedQuery)
        };

    }, [lessons, videos, dictionaryEntries, languageFlashcards, trimmedQuery]);

    const totalResults = results.lessons.length + results.videos.length
        + results.dictionary.length + results.flashcards.length;

    return {
        query: rawQuery,
        setQuery: setRawQuery,
        // The (debounced, trimmed) query the results below were actually
        // computed against - what highlighting should search for, since the
        // still-updating raw input can be a keystroke ahead of them.
        matchedQuery: trimmedQuery,
        isSearching: trimmedQuery.length > 0,
        hasResults: totalResults > 0,
        ...results
    };

}
