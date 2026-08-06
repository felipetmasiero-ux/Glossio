import { Icon } from "../../common/Icon/Icon";

import "./TestimonialsSection.css";

// Ships empty on purpose - there are no real testimonials yet, and
// fabricating names/quotes attributed to users would be dishonest content
// on a page whose whole point is to build trust. The shape below
// ({ id, quote, name, context }) is what a real testimonial should carry
// once there is one; this component (and the "Depoimentos" section around
// it, in Landing.jsx) simply doesn't render until `testimonials` is
// non-empty - same empty-hides pattern as RecommendedForYouCard
// (src/components/home/RecommendedForYouCard).
export function TestimonialsSection({ testimonials = [] }) {

    if (testimonials.length === 0) {
        return null;
    }

    return (

        <div className="testimonials-grid">
            {testimonials.map(testimonial => (

                <blockquote className="testimonial-card" key={testimonial.id}>

                    <Icon name="quote" size={20} className="testimonial-card__icon" />

                    <p className="testimonial-card__quote">{testimonial.quote}</p>

                    <footer className="testimonial-card__footer">
                        <cite className="testimonial-card__name">{testimonial.name}</cite>
                        {testimonial.context && (
                            <span className="testimonial-card__context">{testimonial.context}</span>
                        )}
                    </footer>

                </blockquote>

            ))}
        </div>

    );

}
