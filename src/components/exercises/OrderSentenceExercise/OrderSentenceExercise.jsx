import { useEffect, useRef, useState } from "react";

import { ExerciseShell } from "../ExerciseShell/ExerciseShell";

import "./OrderSentenceExercise.css";

export function OrderSentenceExercise({ exercise, onComplete, language }) {

    const { tokens, correctOrder } = exercise.payload;

    const [bank, setBank] = useState(() => tokens.map((word, index) => ({ key: index, word })));

    const [strip, setStrip] = useState([]);

    const [checked, setChecked] = useState(false);

    const correct = strip.map(item => item.word).join(" ") === correctOrder.join(" ");

    // Bank and strip are separate DOM subtrees, so moving a token between
    // them unmounts it from one and mounts a new node in the other - unlike
    // Match Translation, React never gets to reuse the same node, and
    // native Tab order can't help either since the element the user just
    // activated is simply gone. `focusKeyRef` names the token that should
    // receive focus once the move's re-render commits; the effect below
    // (no dependency array - it checks after every render) applies it once
    // and clears itself, so it only ever acts on an actual move, never on
    // an unrelated re-render. Focus follows the moved token itself, in its
    // new list - the simplest, most predictable rule for a two-list add/
    // remove interaction (a well-established accessible pattern), and it
    // reuses moveToStrip/moveToBank exactly as the click handlers already do.
    const tokenRefs = useRef({});
    const focusKeyRef = useRef(null);

    useEffect(() => {

        if (focusKeyRef.current === null) return;

        tokenRefs.current[focusKeyRef.current]?.focus();

        focusKeyRef.current = null;

    });

    function moveToStrip(item) {
        if (checked) return;
        setBank(previous => previous.filter(entry => entry.key !== item.key));
        setStrip(previous => [...previous, item]);
        focusKeyRef.current = item.key;
    }

    function moveToBank(item) {
        if (checked) return;
        setStrip(previous => previous.filter(entry => entry.key !== item.key));
        setBank(previous => [...previous, item]);
        focusKeyRef.current = item.key;
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
            feedback={exercise.feedback}
            language={language}
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
                                ref={el => { tokenRefs.current[item.key] = el; }}
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
                            ref={el => { tokenRefs.current[item.key] = el; }}
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
