import { useEffect, useRef } from "react";

import { Card } from "../../common/Card/Card";
import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";
import { ExerciseFeedback } from "../ExerciseFeedback/ExerciseFeedback";
import { EXERCISE_TYPE_META } from "../../../constants/exerciseTypes";

import "./ExerciseShell.css";

// The one shared shell all 6 exercise types render through - centralizing
// focus/announcement logic here means none of them need their own copy.
// ExerciseSessionPage mounts each exercise component with
// key={current.id}, so a new exercise means a brand new ExerciseShell
// instance too; that's what the mount-only effect below rides on, instead
// of watching an id prop this component doesn't otherwise need.
export function ExerciseShell({
    type,
    prompt,
    explanation,
    feedback,
    language,
    checked,
    correct,
    canCheck = true,
    onCheck,
    onContinue,
    children
}) {

    const meta = EXERCISE_TYPE_META[type];

    const promptRef = useRef(null);
    const resultRef = useRef(null);

    // New exercise mounted - send focus to its question so a keyboard/
    // screen-reader user always lands somewhere meaningful, the same way
    // for every exercise type (including the very first one in a session).
    useEffect(() => {
        promptRef.current?.focus();
    }, []);

    // Only the false -> true transition matters here. Match Translation
    // (matched.length === pairs.length) and Order Sentence build up their
    // answer over several clicks without ever setting `checked` until the
    // attempt is actually complete, so this can't fire mid-interaction for
    // them either - it fires exactly once, when a result becomes available.
    useEffect(() => {

        if (!checked) {
            return;
        }

        resultRef.current?.focus();

    }, [checked]);

    return (

        <Card className="exercise-shell">

            <p className="exercise-shell__eyebrow text-mono-label">
                <Icon name={meta.icon} size={14} />
                {meta.label}
            </p>

            <h2 className="exercise-shell__prompt" ref={promptRef} tabIndex={-1}>
                {prompt}
            </h2>

            <div className="exercise-shell__body">
                {children}
            </div>

            {
                !checked
                    ? (
                        onCheck && (
                            <div className="exercise-shell__actions">
                                <Button disabled={!canCheck} onClick={onCheck}>
                                    Verificar
                                </Button>
                            </div>
                        )
                    )
                    : (
                        <>
                            <div
                                className={`exercise-shell__feedback ${correct ? "success" : "error"}`}
                                ref={resultRef}
                                tabIndex={-1}
                                role="status"
                                aria-live="polite"
                            >
                                <h3>
                                    <Icon name={correct ? "check" : "x"} size={16} />
                                    {correct ? "Correto!" : "Incorreto"}
                                </h3>

                                <ExerciseFeedback correct={correct} explanation={explanation} feedback={feedback} language={language} />
                            </div>

                            <div className="exercise-shell__actions">
                                <Button onClick={onContinue}>
                                    Continuar
                                </Button>
                            </div>
                        </>
                    )
            }

        </Card>

    );

}
