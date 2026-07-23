import "./Highlight.css";

export function Highlight({

    children,

    onClick

}){

    return(

        <span

            className="highlight"

            onClick={onClick}

        >

            {children}

        </span>

    );

}