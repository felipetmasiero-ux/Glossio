import "./WordPopup.css";

import { Button } from "../../common/Button/Button";

import { useFlashcards } from "../../../hooks/useFlashcards";
import { useLanguage } from "../../../hooks/useLanguage";

export function WordPopup({

    word,

    onClose

}) {

    const { addFlashcard } = useFlashcards();

    const { language } = useLanguage();

    if (!word) {

        return null;

    }

    function handleAdd() {

        addFlashcard(word, language);

        onClose();

    }

    return (

        <div
            className="word-popup-overlay"
            onClick={onClose}
        >

            <div
                className="word-popup"
                onClick={(event) => event.stopPropagation()}
            >

                <h2>

                    {word.word}

                </h2>

                <h3>

                    {word.translation}

                </h3>

                {

                    word.examples?.[0] && (

                        <div className="popup-example">

                            {word.examples[0]}

                        </div>

                    )

                }

                {

                    word.note && (

                        <div className="popup-note">

                            💡 {word.note}

                        </div>

                    )

                }

                <div className="word-popup-actions">

                    <Button
                        onClick={handleAdd}
                    >

                        ⭐ Add Flashcard

                    </Button>

                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >

                        Close

                    </Button>

                </div>

            </div>

        </div>

    );

}
