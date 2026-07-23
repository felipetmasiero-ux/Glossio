import "./AudioButton.css";

import { Button } from "../../../common/Button/Button";

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

            🔊 Listen

        </Button>

    );

}