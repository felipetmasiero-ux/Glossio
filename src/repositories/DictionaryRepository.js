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

    const key = language?.toLowerCase();

    if (!indexCache.has(key)) {
        indexCache.set(key, buildIndex(key));
    }

    return indexCache.get(key);

}

export const DictionaryRepository = {

    // Consumers pass `language` in whatever casing they have on hand -
    // display-cased from LanguageContext ("English"), lowercase from video
    // data ("english"), etc. Normalizing once here (matching the pattern
    // VideoRepository/VideoProgressRepository already use) is the single
    // point where that gets reconciled with `dictionaries`' lowercase keys,
    // instead of every caller needing to remember to lowercase it first.
    getAll(language) {
        return dictionaries[language?.toLowerCase()] ?? [];
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
