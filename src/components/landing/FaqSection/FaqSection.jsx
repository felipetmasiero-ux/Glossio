import { FAQS } from "../../../constants/landingFaqs";

import "./FaqSection.css";

export function FaqSection({ onFaqOpen }) {

    function handleToggle(faq, event) {
        if (event.target.open) {
            onFaqOpen?.(faq.question);
        }
    }

    return (

        <div className="faq-list">
            {FAQS.map(faq => (

                <details className="faq-item" key={faq.question} onToggle={event => handleToggle(faq, event)}>
                    <summary className="faq-item__question">{faq.question}</summary>
                    <p className="faq-item__answer">{faq.answer}</p>
                </details>

            ))}
        </div>

    );

}
