import "./TranslationButton.css";

import { Button } from "../../../common/Button/Button";

export function TranslationButton({

    visible,
    onClick

}) {

    return (

        <Button

            variant="secondary"

            onClick={onClick}

        >

            {

                visible

                    ? "Ocultar tradução"

                    : "Mostrar tradução"

            }

        </Button>

    );

}