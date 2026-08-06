import { Button } from "../../common/Button/Button";

import "./FinalCtaSection.css";

export function FinalCtaSection({ onCta }) {

    return (

        <div className="final-cta">

            <h2 className="final-cta__title">Comece a estudar hoje.</h2>

            <p className="final-cta__description">
                Grátis, sem cartão, sem anúncios. Escolha um idioma e faça sua primeira
                lição em menos de dois minutos.
            </p>

            <Button onClick={onCta} className="final-cta__button">
                Criar conta grátis
            </Button>

        </div>

    );

}
