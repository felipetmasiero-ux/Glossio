import "./LessonSummary.css";

export function LessonSummary({

    summary = {}

}) {

    const {

        tip = "",

        review = []

    } = summary;

    return (

        <section className="lesson-summary">

            <h2>

                Lesson Summary

            </h2>

            <p>

                {tip}

            </p>

            <div className="summary-review">

                <h3>

                    Review

                </h3>

                <ul>

                    {

                        review.map((item,index)=>(

                            <li key={index}>

                                {item}

                            </li>

                        ))

                    }

                </ul>

            </div>

        </section>

    );

}