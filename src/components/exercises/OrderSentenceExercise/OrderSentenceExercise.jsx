import { useState } from "react";

import { ExerciseShell } from "../ExerciseShell/ExerciseShell";

import "./OrderSentenceExercise.css";

export function OrderSentenceExercise({ exercise, onComplete }) {

    const { tokens, correctOrder } = exercise.payload;

    const [bank, setBank] = useState(() => tokens.map((word, index) => ({ key: index, word })));

    const [strip, setStrip] = useState([]);

    const [checked, setChecked] = useState(false);

    const correct = strip.map(item => item.word).join(" ") === correctOrder.join(" ");

    function moveToStrip(item) {
        if (checked) return;
        setBank(previous => previous.filter(entry => entry.key !== item.key));
        setStrip(previous => [...previous, item]);
    }

    function moveToBank(item) {
        if (checked) return;
        setStrip(previous => previous.filter(entry => entry.key !== item.key));
        setBank(previous => [...previous, item]);
    }

    function handleCheck() {
        if (strip.length !== tokens.length) return;
        setChecked(true);
    }

    function handleContinue() {
        setBank(tokens.map((word, index) => ({ key: index, word })));
        setStrip([]);
        setChecked(false);
        onComplete(correct);
    }

    return (

        <ExerciseShell
            type={exercise.type}
            prompt={exercise.prompt}
            explanation={exercise.explanation}
            checked={checked}
            correct={correct}
            canCheck={strip.length === tokens.length}
            onCheck={handleCheck}
            onContinue={handleContinue}
        >

            <div className={`order-sentence__strip ${checked ? (correct ? "correct" : "wrong") : ""}`}>

                {
                    strip.length === 0
                        ? <span className="order-sentence__placeholder">Toque nas palavras abaixo</span>
                        : strip.map(item => (
                            <button
                                key={item.key}
                                type="button"
                                className="order-sentence__token"
                                disabled={checked}
                                onClick={() => moveToBank(item)}
                            >
                                {item.word}
                            </button>
                        ))
                }

            </div>

            <div className="order-sentence__bank">

                {
                    bank.map(item => (
                        <button
                            key={item.key}
                            type="button"
                            className="order-sentence__token"
                            disabled={checked}
                            onClick={() => moveToStrip(item)}
                        >
                            {item.word}
                        </button>
                    ))
                }

            </div>

        </ExerciseShell>

    );

}
