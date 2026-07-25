import { useState } from "react";

import "./VocabularyCard.css";

import { Card } from "../../common/Card/Card";

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
