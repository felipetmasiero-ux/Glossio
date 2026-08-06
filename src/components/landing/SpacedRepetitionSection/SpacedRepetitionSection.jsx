import { FIRST_INTERVAL, SECOND_INTERVAL, DEFAULT_EASE_FACTOR } from "../../../constants/scheduling";

import "./SpacedRepetitionSection.css";

// The timeline below is computed from the same constants the real SM-2
// scheduler uses (src/constants/scheduling.js, src/utils/study/scheduling)
// - not made-up numbers - so it can never drift from what the app actually
// does on a correct answer streak.
const MILESTONES = [
    { label: "Você aprende", days: 0 },
    { label: "1ª revisão", days: FIRST_INTERVAL },
    { label: "2ª revisão", days: SECOND_INTERVAL },
    { label: "3ª revisão", days: Math.round(SECOND_INTERVAL * DEFAULT_EASE_FACTOR) },
    { label: "4ª revisão", days: Math.round(SECOND_INTERVAL * DEFAULT_EASE_FACTOR * DEFAULT_EASE_FACTOR) }
];

export function SpacedRepetitionSection() {

    return (

        <div className="spaced-repetition">

            <p className="spaced-repetition__explanation text-body">
                Sem revisão, a maior parte de uma palavra nova é esquecida em poucos dias
                — é a curva do esquecimento. O Glossio agenda a revisão de cada ficha um
                pouco antes desse ponto; a cada acerto, o intervalo até a próxima revisão
                cresce. Errou? O intervalo diminui, sem punição — só mais uma chance.
            </p>

            <ol className="spaced-repetition__timeline">
                {MILESTONES.map(milestone => (
                    <li className="spaced-repetition__milestone" key={milestone.label}>
                        <span className="spaced-repetition__dot" aria-hidden="true" />
                        <span className="spaced-repetition__label">{milestone.label}</span>
                        <span className="spaced-repetition__day text-mono-label">
                            {milestone.days === 0 ? "Dia 0" : `+${milestone.days}d`}
                        </span>
                    </li>
                ))}
            </ol>

        </div>

    );

}
