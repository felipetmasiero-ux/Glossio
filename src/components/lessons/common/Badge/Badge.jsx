import "./Badge.css";

export function Badge({

    children,

    color = "primary"

}) {

    return (

        <span className={`badge ${color}`}>

            {children}

        </span>

    );

}