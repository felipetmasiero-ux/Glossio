import { ClickableWord } from "../ClickableWord/ClickableWord";
import { VocabularyRepository } from "../../../utils/vocabulary/VocabularyRepository";

export function InteractiveText({

    text,

    lesson,

    highlight = [],

    onWordClick

}) {

    const words = text.split(" ");

    return (

        <>

            {

                words.map((word, index) => {

                    const clean = word.replace(/[.,!?;:()"']/g, "");

                    const shouldHighlight =

                        highlight.some(

                            item =>

                                item.toLowerCase() ===

                                clean.toLowerCase()

                        );

                    if (!shouldHighlight) {

                        return (

                            <span key={index}>

                                {word}{" "}

                            </span>

                        );

                    }

                    const vocabulary =

                        VocabularyRepository.findByWord(

                            lesson,

                            clean

                        );

                    if (!vocabulary) {

                        return (

                            <span key={index}>

                                {word}{" "}

                            </span>

                        );

                    }

                    return (

                        <ClickableWord

                            key={index}

                            onClick={() =>

                                onWordClick(vocabulary)

                            }

                        >

                            {word}

                        </ClickableWord>

                    );

                })

            }

        </>

    );

}