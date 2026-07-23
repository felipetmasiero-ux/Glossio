import { TextRenderer } from "../TextRenderer/TextRenderer";

export function DialogueLine({

    line,
    wordIndex,
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

                    wordIndex={wordIndex}

                    onWordClick={onWordClick}

                />

            </div>

        </div>

    );

}