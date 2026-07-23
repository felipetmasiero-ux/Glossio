import { findWord } from "../../../utils/words/findWord";
import "./TextRenderer.css";

export function TextRenderer({

    text,

    wordIndex,

    onWordClick

}) {

    const words = text.match(/\w+|[^\w\s]+|\s+/g) ?? [];

    function handleClick(cleanWord) {

        onWordClick(

            findWord(wordIndex, cleanWord)

        );

    }

    return (

        <p className="text-renderer">

            {

                words.map((word, index) => {

                    if (/^\s+$/.test(word)) {

                        return word;

                    }

                    const cleanWord = word.replace(/[.,!?;:()"']/g, "");

                    return (

                        <span

                            key={index}

                            className="clickable-word"

                            onClick={() => handleClick(cleanWord)}

                        >

                            {word}

                        </span>

                    );

                })

            }

        </p>

    );

}