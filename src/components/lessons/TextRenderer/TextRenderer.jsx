import { ClickableWord } from "../ClickableWord/ClickableWord";
import { findWord } from "../../../utils/words/findWord";
import "./TextRenderer.css";

export function TextRenderer({

    text,

    wordIndex,

    onWordClick

}) {

    const tokens = text.match(/[\p{L}\p{N}'’]+|[^\s\p{L}\p{N}]+|\s+/gu) ?? [];

    function handleClick(cleanWord) {

        onWordClick(

            findWord(wordIndex, cleanWord)

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

                    if (!cleanWord) {

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
