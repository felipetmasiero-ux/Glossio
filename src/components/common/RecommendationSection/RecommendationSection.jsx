import "./RecommendationSection.css";

export function RecommendationSection({

    title,

    items,

    renderItem

}) {

    if (!items || items.length === 0) {

        return null;

    }

    return (

        <section className="recommendation-section">

            <h2 className="recommendation-section__title">
                {title}
            </h2>

            <div className="recommendation-section__list">
                {items.map(renderItem)}
            </div>

        </section>

    );

}
