import { englishA1Dictionary } from "./a1";
import { englishA2Dictionary } from "./a2";
import { englishContractionsDictionary } from "./contractions";
import { englishPhrasesDictionary } from "./phrases";

export const englishDictionary = [
    ...englishA1Dictionary,
    ...englishA2Dictionary,
    ...englishContractionsDictionary,
    ...englishPhrasesDictionary
];
