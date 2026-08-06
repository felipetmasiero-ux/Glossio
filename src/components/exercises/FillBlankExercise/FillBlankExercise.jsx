import { useState } from "react";

import { ExerciseShell } from "../ExerciseShell/ExerciseShell";

import "./FillBlankExercise.css";

const BLANK = "_____";

export function FillBlankExercise({ exercise, onComplete, language }) {

    const [selected, setSelected] = useState(null);

    const [checked, setChecked] = useState(false);

    const { sentence, answer, options } = exercise.payload;

    const correct = selected === answer;

    const [before, after] = sentence.split(BLANK);

    function handleCheck() {
        if (!selected) return;
        setChecked(true);
    }

    function handleContinue() {
        setChecked(false);
        setSelected(null);
        onComplete(correct);
    }

    function chipState(option) {
        if (!checked) return selected === option ? "selected" : "";
        if (option === answer) return "correct";
        if (option === selected) return "wrong";
        return "";
    }

    return (

        <ExerciseShell
            type={exercise.type}
            prompt={exercise.prompt}
            explanation={exercise.explanation}
            feedback={exercise.feedback}
            language={language}
            checked={checked}
            correct={correct}
            canCheck={selected !== null}
            onCheck={handleCheck}
            onContinue={handleContinue}
        >

            <p className="fill-blank__sentence text-reading">
                {before}
                <span className="fill-blank__gap">{selected ?? BLANK}</span>
                {after}
            </p>

            <div className="fill-blank__options">

                {
                    options.map(option => (

                        <button
                            key={option}
                            type="button"
                            className={`fill-blank__chip ${chipState(option)}`}
                            disabled={checked}
                            onClick={() => setSelected(option)}
                        >
                            {option}
                        </button>

                    ))
                }

            </div>

        </ExerciseShell>

    );

}
