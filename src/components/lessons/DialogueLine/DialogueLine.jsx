import { TextRenderer } from "../TextRenderer/TextRenderer";

export function DialogueLine({

    line,
    language,
    onWordClick

}) {

    return (

        <div className={`dialogue-message ${line.side}`}>

            <strong>

                {line.speaker}

            </strong>

            <div className="dialogue-bubble">

                <TextRenderer

                    text={line.text}

                    language={language}

                    onWordClick={onWordClick}

                />

            </div>

        </div>

    );

}