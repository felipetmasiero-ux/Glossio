import { ClickableWord } from "../../common/ClickableWord/ClickableWord";
import { DictionaryRepository } from "../../../repositories/DictionaryRepository";
import { longestMatchTokenize } from "../../../utils/text/longestMatchTokenize";
import "./TextRenderer.css";

export function TextRenderer({

    text,

    language,

    onWordClick

}) {

    const chunks = longestMatchTokenize(
        text,
        candidate => DictionaryRepository.hasWord(language, candidate)
    );

    function handleClick(phrase) {

        onWordClick(
            DictionaryRepository.getEntry(language, phrase)
        );

    }

    return (

        <p className="text-renderer">

            {

                chunks.map((chunk, index) => {

                    if (!chunk.isMatch) {

                        return chunk.text;

                    }

                    return (

                        <ClickableWord

                            key={index}

                            onClick={() => handleClick(chunk.text)}

                        >

                            {chunk.text}

                        </ClickableWord>

                    );

                })

            }

        </p>

    );

}
