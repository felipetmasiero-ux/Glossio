import "./Section.css";

export function Section({
    title,
    children
}) {

    return (

        <section className="section">

            {title && <h2>{title}</h2>}

            {children}

        </section>

    );

}