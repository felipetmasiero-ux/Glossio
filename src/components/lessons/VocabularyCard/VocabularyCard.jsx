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

            className={`vocabulary-card ${flipped ? "flipped" : ""}`}

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

                    <span className="card-language">

                        🇺🇸

                    </span>

                    <h3>

                        {word.word}

                    </h3>

                    <p>

                        Click to reveal

                    </p>

                </>

                :

                <>

                    <span className="card-language">

                        🇧🇷

                    </span>

                    <h3>

                        {word.translation}

                    </h3>

                    <p>

                        Click again for details

                    </p>

                </>

            }

        </Card>

    );

}