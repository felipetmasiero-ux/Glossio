import { ClickableWord } from "../../common/ClickableWord/ClickableWord";
import { DictionaryRepository } from "../../../repositories/DictionaryRepository";
import { normalizeWord } from "../../../repositories/normalizeWord";
import { tokenizeText } from "../../../utils/text/tokenizeText";
import { stripPunctuation } from "../../../utils/text/stripPunctuation";

export function TranscriptRenderer({

    segment,

    language,

    onWordClick,

    knownWords = new Set()

}) {

    const tokens = tokenizeText(segment.text);

    function handleClick(event, word) {

        event?.stopPropagation();

        onWordClick({
            word,
            language,
            anchor: event?.currentTarget ?? null
        });

    }

    return (

        <>

            {

                tokens.map((token, index) => {

                    if (/^\s+$/.test(token)) {

                        return token;

                    }

                    const cleanWord = stripPunctuation(token);

                    if (!cleanWord || !DictionaryRepository.hasWord(language, cleanWord)) {

                        return token;

                    }

                    const known = knownWords.has(normalizeWord(cleanWord));

                    return (

                        <ClickableWord

                            key={index}

                            known={known}

                            onClick={event => handleClick(event, cleanWord)}

                        >

                            {token}

                        </ClickableWord>

                    );

                })

            }

        </>

    );

}
