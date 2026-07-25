import "./ClickableWord.css";

export function ClickableWord({

    children,

    onClick

}) {

    function handleKeyDown(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick();
        }
    }

    return (

        <span

            className="clickable-word"

            role="button"

            tabIndex={0}

            onClick={onClick}

            onKeyDown={handleKeyDown}

        >

            {children}

        </span>

    );

}
