import { normalizeWord } from "./normalizeWord";

export function findWord(repository, word) {

    return (

        repository.get(normalizeWord(word))

        ??

        {

            word,

            translation: ""

        }

    );

}