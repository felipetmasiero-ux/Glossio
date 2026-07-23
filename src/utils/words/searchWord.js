import { normalizeWord } from "./normalizeWord";

export function searchWords(repository, query) {

    const normalized = normalizeWord(query);

    return [...repository.values()]

        .filter(word =>

            normalizeWord(word.word)

                .includes(normalized)

        );

}