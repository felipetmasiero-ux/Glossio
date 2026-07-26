import { DictionaryRepository } from "../../repositories/DictionaryRepository";

export function buildWordPool(lesson, { singleWordOnly = false } = {}) {

    const entries = DictionaryRepository.getAll(lesson.language).filter(
        entry => entry.level === lesson.level
    );

    if (!singleWordOnly) {
        return entries;
    }

    return entries.filter(entry => !entry.word.includes(" "));

}
