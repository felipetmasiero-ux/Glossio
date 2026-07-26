import { DictionaryRepository } from "../../repositories/DictionaryRepository";

export function getVocabularyEntries(lesson) {

    return lesson.vocabulary
        .map(word => DictionaryRepository.getEntry(lesson.language, word))
        .filter(Boolean);

}
