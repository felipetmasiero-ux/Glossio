import { normalizeWord } from "../../../repositories/normalizeWord";
import { error } from "./createIssue";
import { validateAudioRef } from "./validateAudioRef";

function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

// entries: the flat, already-combined per-language array (englishDictionary,
// frenchDictionary, ...) - the same shape DictionaryRepository indexes.
// Duplicate normalized ids matter here specifically because
// DictionaryRepository.buildIndex() silently keeps only the *first* entry
// for a given key and drops the rest (see its registerKey() comment) - a
// second "hello" entry wouldn't error anywhere at runtime, it would just
// quietly never be reachable.
export function validateDictionary(entries, { language } = {}) {

    const dictionaryPath = language ?? "dictionary";

    if (!Array.isArray(entries)) {
        return [error("dictionary", dictionaryPath, "Dicionário inválido (não é uma lista).")];
    }

    const issues = [];

    const seenIds = new Map();

    entries.forEach((entry, index) => {

        const entryPath = `${dictionaryPath}[${index}]`;

        if (!isNonEmptyString(entry?.word)) {
            issues.push(error("dictionary", entryPath, `Entrada de dicionário sem "word".`));
            return;
        }

        if (!isNonEmptyString(entry?.translation)) {
            issues.push(error("dictionary", entryPath, `Entrada "${entry.word}" sem "translation".`));
        }

        issues.push(...validateAudioRef(entry?.audio, entryPath));

        const key = normalizeWord(entry.id ?? entry.word);

        if (seenIds.has(key)) {
            issues.push(error(
                "dictionary",
                entryPath,
                `Palavra duplicada no dicionário: "${entry.word}" colide com "${seenIds.get(key)}" (id normalizado "${key}"). A segunda entrada é ignorada silenciosamente pelo DictionaryRepository.`
            ));
        } else {
            seenIds.set(key, entry.word);
        }

    });

    return issues;

}
