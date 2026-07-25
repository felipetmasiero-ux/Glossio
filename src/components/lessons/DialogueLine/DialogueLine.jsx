import "./DialogueLine.css";

import { TextRenderer } from "../TextRenderer/TextRenderer";

export function DialogueLine({

    line,
    language,
    onWordClick

}) {

    return (

        <div className="dialogue-line">

            <span className="dialogue-line__speaker text-mono-label">
                {line.speaker}
            </span>

            <div className="dialogue-line__text">
                <TextRenderer

                    text={line.text}

                    language={language}

                    onWordClick={onWordClick}

                />
            </div>

        </div>

    );

}
