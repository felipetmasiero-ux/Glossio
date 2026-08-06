import { useState } from "react";

import { ExerciseShell } from "../ExerciseShell/ExerciseShell";
import { Icon } from "../../common/Icon/Icon";

import "./OptionListExercise.css";

const MARKERS = ["A", "B", "C", "D", "E", "F"];

export function OptionListExercise({ exercise, onComplete }) {

    const [answer, setAnswer] = useState(null);

    const [checked, setChecked] = useState(false);

    const { options, answerIndex } = exercise.payload;

    const correct = answer === answerIndex;

    function handleCheck() {
        if (answer === null) return;
        setChecked(true);
    }

    function handleContinue() {
        setChecked(false);
        setAnswer(null);
        onComplete(correct);
    }

    function optionState(index) {
        if (!checked) return answer === index ? "selected" : "";
        if (index === answerIndex) return "correct";
        if (index === answer) return "wrong";
        return "";
    }

    return (

        <ExerciseShell
            type={exercise.type}
            prompt={exercise.prompt}
            explanation={exercise.explanation}
            feedback={exercise.feedback}
            checked={checked}
            correct={correct}
            canCheck={answer !== null}
            onCheck={handleCheck}
            onContinue={handleContinue}
        >

            <div className="option-list">

                {
                    options.map((option, index) => (

                        <button
                            key={index}
                            type="button"
                            className={`option-list__item ${optionState(index)}`}
                            disabled={checked}
                            onClick={() => setAnswer(index)}
                        >

                            <span className="option-list__marker">
                                {optionState(index) === "correct"
                                    ? <Icon name="check" size={13} />
                                    : optionState(index) === "wrong"
                                        ? <Icon name="x" size={13} />
                                        : MARKERS[index]}
                            </span>

                            {option}

                        </button>

                    ))
                }

            </div>

        </ExerciseShell>

    );

}
