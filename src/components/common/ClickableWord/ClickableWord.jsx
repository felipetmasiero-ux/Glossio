import "./ClickableWord.css";

export function ClickableWord({

    children,

    onClick,

    known = false

}) {

    function handleKeyDown(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick(event);
        }
    }

    return (

        <span

            className={`clickable-word ${known ? "clickable-word--known" : ""}`}

            role="button"

            tabIndex={0}

            onClick={onClick}

            onKeyDown={handleKeyDown}

        >

            {children}

        </span>

    );

}
