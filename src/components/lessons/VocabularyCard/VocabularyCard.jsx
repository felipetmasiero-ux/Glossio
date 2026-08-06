import { useState } from "react";

import "./VocabularyCard.css";

import { Card } from "../../common/Card/Card";
import { AudioButton } from "../../common/AudioButton/AudioButton";

export function VocabularyCard({

    word,

    onOpen

}) {

    const [

        flipped,

        setFlipped

    ] = useState(false);

    return (

        <Card

            className={`vocabulary-card card--notch ${flipped ? "flipped" : ""}`}

            onClick={() => {

                if (!flipped) {

                    setFlipped(true);

                    return;

                }

                onOpen(word);

            }}

        >

            {

                !flipped ?

                <>

                    <span className="vocabulary-card__label text-mono-label">
                        Vocabulário
                    </span>

                    <h3>

                        {word.word}

                        <AudioButton
                            audio={word.audio}
                            text={word.word}
                            language={word.language}
                            className="vocabulary-card__audio"
                        />

                    </h3>

                    <p>

                        Toque para revelar

                    </p>

                </>

                :

                <>

                    <span className="vocabulary-card__label text-mono-label">
                        Tradução
                    </span>

                    <h3>

                        {word.translation}

                    </h3>

                    <p>

                        Toque de novo para detalhes

                    </p>

                </>

            }

        </Card>

    );

}
