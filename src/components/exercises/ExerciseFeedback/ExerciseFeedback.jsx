import { Icon } from "../../common/Icon/Icon";
import { AudioButton } from "../../common/AudioButton/AudioButton";
import "./ExerciseFeedback.css";

// Which of a quiz block's optional feedback() fields show up depending on
// whether the answer was correct - a grammar rule and an extra example are
// useful context either way, a fun fact rewards a correct answer, a hint
// and a common-mistake note are only useful after getting it wrong (see
// docs/CONTENT_AUTHORING.md's Feedback section for the full reasoning).
// Icons match the block type each field is conceptually closest to
// (grammar -> "ruler", example -> "chat", culture/curiosity -> "globe",
// tip/hint -> "lightbulb"), same icons GrammarBlock/ExampleBlock/
// CultureBlock/TipBlock already use.
const FEEDBACK_FIELDS = [
    { key: "grammarNote", label: "Regra gramatical", icon: "ruler", showOnCorrect: true, showOnIncorrect: true },
    { key: "extraExample", label: "Exemplo", icon: "chat", showOnCorrect: true, showOnIncorrect: true },
    { key: "funFact", label: "Curiosidade", icon: "globe", showOnCorrect: true, showOnIncorrect: false },
    { key: "hint", label: "Dica para lembrar", icon: "lightbulb", showOnCorrect: false, showOnIncorrect: true },
    { key: "commonMistake", label: "Erro comum", icon: "x", showOnCorrect: false, showOnIncorrect: true }
];

// Each field's raw value is either a plain string (the common case - see
// hint()/commonMistake()/etc.) or, when the author attached an audio()
// reference, `{ text, audio }`. Normalizing here means the rendering below
// doesn't need to care which shape a given field happens to be.
function normalizeFieldValue(value) {

    if (typeof value === "string") {
        return { text: value, audio: null };
    }

    return { text: value?.text ?? "", audio: value?.audio ?? null };

}

// Used by ExerciseShell, so every exercise type renders this the same way
// the moment its generator starts passing a `feedback` object through -
// today only generateMultipleChoice does (from quiz blocks). Renders
// nothing beyond the plain explanation when `feedback` is absent, which is
// exactly the pre-existing behavior for every other exercise type.
export function ExerciseFeedback({ correct, explanation, feedback, language }) {

    const visibleFields = FEEDBACK_FIELDS.filter(field => {

        const value = feedback?.[field.key];

        if (!value) {
            return false;
        }

        return correct ? field.showOnCorrect : field.showOnIncorrect;

    });

    if (!explanation && visibleFields.length === 0) {
        return null;
    }

    return (

        <div className="exercise-feedback">

            {explanation && <p className="exercise-feedback__explanation">{explanation}</p>}

            {

                visibleFields.map(field => {

                    const { text, audio } = normalizeFieldValue(feedback[field.key]);

                    return (

                        <div key={field.key} className="exercise-feedback__item">

                            <p className="exercise-feedback__item-label text-mono-label">
                                <Icon name={field.icon} size={14} />
                                {field.label}
                            </p>

                            <div className="exercise-feedback__item-body">

                                <p className="exercise-feedback__item-text">
                                    {text}
                                </p>

                                <AudioButton audio={audio} text={text} language={language} />

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

}
