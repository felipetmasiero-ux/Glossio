import "./HeadingBlock.css";

export function HeadingBlock({ block }) {

    return (

        <section className="lesson-heading">

            <h2>

                {block.text}

            </h2>

        </section>

    );

}