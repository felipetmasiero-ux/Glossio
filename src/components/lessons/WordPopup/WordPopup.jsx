import "./WordPopup.css";

import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";

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

                <p className="word-popup__label text-mono-label">Verbete</p>

                <h2 className="word-popup__word">
                    {word.word}
                </h2>

                <p className="word-popup__translation">
                    {word.translation}
                </p>

                {

                    word.examples?.[0] && (

                        <p className="word-popup__example">
                            {word.examples[0]}
                        </p>

                    )

                }

                {

                    word.note && (

                        <div className="word-popup__note">
                            <Icon name="lightbulb" size={16} />
                            <span>{word.note}</span>
                        </div>

                    )

                }

                <div className="word-popup-actions">

                    <Button
                        onClick={handleAdd}
                    >

                        <Icon name="cards" size={16} /> Adicionar

                    </Button>

                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >

                        Fechar

                    </Button>

                </div>

            </div>

        </div>

    );

}
