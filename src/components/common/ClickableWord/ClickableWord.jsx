import { useEffect, useRef, useState } from "react";

import "./ClickableWord.css";

const FLASH_DURATION = 800;

export function ClickableWord({

    children,

    onClick,

    known = false

}) {

    const [flashing, setFlashing] = useState(false);

    const flashTimeoutRef = useRef(null);

    useEffect(() => () => clearTimeout(flashTimeoutRef.current), []);

    function flash() {

        setFlashing(true);

        clearTimeout(flashTimeoutRef.current);

        flashTimeoutRef.current = setTimeout(() => setFlashing(false), FLASH_DURATION);

    }

    function handleClick(event) {
        flash();
        onClick(event);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            flash();
            onClick(event);
        }
    }

    return (

        <span

            className={`clickable-word ${known ? "clickable-word--known" : ""} ${flashing ? "clickable-word--flash" : ""}`}

            role="button"

            tabIndex={0}

            onClick={handleClick}

            onKeyDown={handleKeyDown}

        >

            {children}

        </span>

    );

}
