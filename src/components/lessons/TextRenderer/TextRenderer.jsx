import { ClickableWord } from "../../common/ClickableWord/ClickableWord";
import { DictionaryRepository } from "../../../repositories/DictionaryRepository";
import { tokenizeText } from "../../../utils/text/tokenizeText";
import { stripPunctuation } from "../../../utils/text/stripPunctuation";
import "./TextRenderer.css";

export function TextRenderer({

    text,

    language,

    onWordClick

}) {

    const tokens = tokenizeText(text);

    function handleClick(cleanWord) {

        onWordClick(
            DictionaryRepository.getEntry(language, cleanWord)
        );

    }

    return (

        <p className="text-renderer">

            {

                tokens.map((token, index) => {

                    if (/^\s+$/.test(token)) {

                        return token;

                    }

                    const cleanWord = stripPunctuation(token);

                    if (!cleanWord || !DictionaryRepository.hasWord(language, cleanWord)) {

                        return token;

                    }

                    return (

                        <ClickableWord

                            key={index}

                            onClick={() => handleClick(cleanWord)}

                        >

                            {token}

                        </ClickableWord>

                    );

                })

            }

        </p>

    );

}
