import { englishA1Dictionary } from "./a1";
import { englishA2Dictionary } from "./a2";
import { englishB1Dictionary } from "./b1";
import { englishB2Dictionary } from "./b2";
import { englishContractionsDictionary } from "./contractions";
import { englishPhrasesDictionary } from "./phrases";

export const englishDictionary = [
    ...englishA1Dictionary,
    ...englishA2Dictionary,
    ...englishB1Dictionary,
    ...englishB2Dictionary,
    ...englishContractionsDictionary,
    ...englishPhrasesDictionary
];
