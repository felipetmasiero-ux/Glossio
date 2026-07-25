import { ClickableWord } from "../ClickableWord/ClickableWord";
import { DictionaryRepository } from "../../../repositories/DictionaryRepository";
import "./TextRenderer.css";

export function TextRenderer({

    text,

    language,

    onWordClick

}) {

    const tokens = text.match(/[\p{L}\p{N}'’]+|[^\s\p{L}\p{N}]+|\s+/gu) ?? [];

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

                    const cleanWord = token.replace(/[.,!?;:()"'’]/g, "");

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
