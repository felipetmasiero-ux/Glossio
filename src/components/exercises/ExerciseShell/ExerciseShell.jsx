import { Card } from "../../common/Card/Card";
import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";
import { ExerciseFeedback } from "../ExerciseFeedback/ExerciseFeedback";
import { EXERCISE_TYPE_META } from "../../../constants/exerciseTypes";

import "./ExerciseShell.css";

export function ExerciseShell({
    type,
    prompt,
    explanation,
    feedback,
    checked,
    correct,
    canCheck = true,
    onCheck,
    onContinue,
    children
}) {

    const meta = EXERCISE_TYPE_META[type];

    return (

        <Card className="exercise-shell">

            <p className="exercise-shell__eyebrow text-mono-label">
                <Icon name={meta.icon} size={14} />
                {meta.label}
            </p>

            <h2 className="exercise-shell__prompt">
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
                            <div className={`exercise-shell__feedback ${correct ? "success" : "error"}`}>
                                <h3>
                                    <Icon name={correct ? "check" : "x"} size={16} />
                                    {correct ? "Correto!" : "Incorreto"}
                                </h3>

                                <ExerciseFeedback correct={correct} explanation={explanation} feedback={feedback} />
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
