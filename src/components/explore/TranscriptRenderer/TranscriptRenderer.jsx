import { ClickableWord } from "../../common/ClickableWord/ClickableWord";
import { DictionaryRepository } from "../../../repositories/DictionaryRepository";
import { normalizeWord } from "../../../repositories/normalizeWord";
import { longestMatchTokenize } from "../../../utils/text/longestMatchTokenize";

export function TranscriptRenderer({

    segment,

    language,

    onWordClick,

    knownWords = new Set()

}) {

    const chunks = longestMatchTokenize(
        segment.text,
        candidate => DictionaryRepository.hasWord(language, candidate)
    );

    function handleClick(event, phrase) {

        event?.stopPropagation();

        onWordClick({
            word: phrase,
            language,
            anchor: event?.currentTarget ?? null
        });

    }

    return (

        <>

            {

                chunks.map((chunk, index) => {

                    if (!chunk.isMatch) {

                        return chunk.text;

                    }

                    const known = knownWords.has(normalizeWord(chunk.text));

                    return (

                        <ClickableWord

                            key={index}

                            known={known}

                            onClick={event => handleClick(event, chunk.text)}

                        >

                            {chunk.text}

                        </ClickableWord>

                    );

                })

            }

        </>

    );

}
