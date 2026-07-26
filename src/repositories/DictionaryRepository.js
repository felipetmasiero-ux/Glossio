import { dictionaries } from "../data/dictionary";
import { normalizeWord } from "./normalizeWord";

const indexCache = new Map();

function buildIndex(language) {

    const entries = dictionaries[language] ?? [];

    const map = new Map();

    entries.forEach(entry => {
        map.set(normalizeWord(entry.id ?? entry.word), entry);
    });

    return map;

}

function getIndex(language) {

    if (!indexCache.has(language)) {
        indexCache.set(language, buildIndex(language));
    }

    return indexCache.get(language);

}

export const DictionaryRepository = {

    getAll(language) {
        return dictionaries[language] ?? [];
    },

    getEntry(language, word) {
        return getIndex(language).get(normalizeWord(word)) ?? null;
    },

    hasWord(language, word) {
        return getIndex(language).has(normalizeWord(word));
    },

    getTranslation(language, word) {
        return this.getEntry(language, word)?.translation ?? null;
    },

    findWord(language, word) {
        return this.getEntry(language, word);
    }

};
