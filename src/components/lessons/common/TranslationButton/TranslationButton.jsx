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

                    ? "Hide translation"

                    : "Show translation"

            }

        </Button>

    );

}