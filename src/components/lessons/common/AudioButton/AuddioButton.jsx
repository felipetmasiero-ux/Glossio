import "./AudioButton.css";

import { Button } from "../../../common/Button/Button";
import { Icon } from "../../../common/Icon/Icon";

export function AudioButton({

    text

}) {

    function handleSpeak() {

        if (!window.speechSynthesis) return;

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = "en-US";

        window.speechSynthesis.speak(utterance);

    }

    return (

        <Button

            variant="secondary"

            onClick={handleSpeak}

        >

            <Icon name="volume" size={16} /> Ouvir

        </Button>

    );

}