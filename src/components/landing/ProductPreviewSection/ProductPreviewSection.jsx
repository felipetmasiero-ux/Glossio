import { Icon } from "../../common/Icon/Icon";
import { DeviceFrameMockup } from "../DeviceFrameMockup/DeviceFrameMockup";

import "./ProductPreviewSection.css";

// Not photographic screenshots (no browser/screenshot tooling was
// available while building this) - each mockup reuses the app's real
// classes/tokens (.paper-ruled, .clickable-word--flash, .card--notch) so
// what's shown here matches the actual product, not a generic stock
// illustration. See docs/LANDING_CONVERSION.md.
export function ProductPreviewSection() {

    return (

        <div className="product-preview">

            <DeviceFrameMockup label="Lição estruturada">
                <p className="product-preview__lesson paper-ruled text-reading">
                    I would like to{" "}
                    <span className="clickable-word clickable-word--flash">order</span>{" "}
                    a coffee, please.
                </p>
            </DeviceFrameMockup>

            <DeviceFrameMockup label="Revisão espaçada">
                <div className="product-preview__flashcards">
                    <div className="card card--notch product-preview__flashcard product-preview__flashcard--back" />
                    <div className="card card--notch product-preview__flashcard product-preview__flashcard--front">
                        <span className="text-mono-label">order</span>
                        <h3>pedir</h3>
                    </div>
                </div>
            </DeviceFrameMockup>

            <DeviceFrameMockup label="Recomendado para você">
                <div className="product-preview__dashboard">
                    <div className="product-preview__rec-item">
                        <span className="product-preview__rec-icon"><Icon name="book" size={16} /></span>
                        <span>
                            <strong>Revisar: Greetings</strong>
                            <small>Você acertou 52% nesta lição.</small>
                        </span>
                    </div>
                    <div className="product-preview__rec-item">
                        <span className="product-preview__rec-icon"><Icon name="clock" size={16} /></span>
                        <span>
                            <strong>8 fichas atrasadas</strong>
                            <small>Sem revisar há 8 dias.</small>
                        </span>
                    </div>
                </div>
            </DeviceFrameMockup>

        </div>

    );

}
