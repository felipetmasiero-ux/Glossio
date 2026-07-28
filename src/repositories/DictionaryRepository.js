import { dictionaries } from "../data/dictionary";
import { normalizeWord } from "./normalizeWord";
import { getInflectedForms } from "../utils/text/getInflectedForms";

const indexCache = new Map();

function registerKey(map, rawKey, entry) {

    const key = normalizeWord(rawKey);

    if (!key || map.has(key)) {
        return;
    }

    map.set(key, entry);

}

function buildIndex(language) {

    const entries = dictionaries[language] ?? [];

    const map = new Map();

    // Canonical word/id always wins.
    entries.forEach(entry => {
        registerKey(map, entry.id ?? entry.word, entry);
    });

    // Author-declared aliases are still authoritative over guesses.
    entries.forEach(entry => {
        (entry.aliases ?? []).forEach(alias => registerKey(map, alias, entry));
    });

    // Mechanically-derived inflected forms fill in the rest, lowest priority.
    entries.forEach(entry => {

        const base = normalizeWord(entry.id ?? entry.word);

        if (!base || base.includes(" ")) {
            return;
        }

        getInflectedForms(base).forEach(form => registerKey(map, form, entry));

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
