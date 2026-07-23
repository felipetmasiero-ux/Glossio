import "./ClickableWord.css";

export function ClickableWord({

    children,

    onClick

}) {

    return (

        <span

            className="clickable-word"

            onClick={onClick}

        >

            {children}

        </span>

    );

}