import { useEffect, useMemo, useRef, useState } from "react";

import { ExerciseShell } from "../ExerciseShell/ExerciseShell";
import { shuffle } from "../../../utils/exercises/shuffle";

import "./MatchTranslationExercise.css";

export function MatchTranslationExercise({ exercise, onComplete, language }) {

    const { pairs } = exercise.payload;

    const words = useMemo(
        () => shuffle(pairs.map(pair => ({ id: pair.id, label: pair.word }))),
        [pairs]
    );

    const translations = useMemo(
        () => shuffle(pairs.map(pair => ({ id: pair.id, label: pair.translation }))),
        [pairs]
    );

    const [selectedWord, setSelectedWord] = useState(null);

    const [matched, setMatched] = useState([]);

    const [mistake, setMistake] = useState(null);

    // Unlike `mistake` (a transient flag for the shake animation, cleared
    // after 500ms or on the next word selection), this never clears once
    // set - it's the permanent record of whether any mismatch happened
    // during this attempt, used for the final result.
    const [hadMistake, setHadMistake] = useState(false);

    const mistakeTimeoutRef = useRef(null);

    useEffect(() => () => clearTimeout(mistakeTimeoutRef.current), []);

    // Keyboard focus continuity: both columns are native <button>s, so Tab/
    // Enter/Space already work with zero extra code, and a mismatch leaves
    // focus exactly where it was (same DOM node, nothing gets disabled).
    // A *correct* match is the one real gap - the translation button the
    // user just activated becomes `disabled`, and disabling the currently
    // focused element drops focus to <body> per native browser behavior.
    // This ref map + effect sends focus to the next unmatched word instead,
    // continuing the exercise's own "pick a word, then its translation"
    // flow. Only reacts to `matched` (a real match), never to a mismatch.
    const wordButtonRefs = useRef({});

    useEffect(() => {

        if (matched.length === 0) return;

        const nextWord = words.find(item => !matched.includes(item.id));

        nextWord && wordButtonRefs.current[nextWord.id]?.focus();

    }, [matched, words]);

    const checked = matched.length === pairs.length;

    const correct = !hadMistake;

    const displayedWords = checked
        ? pairs.map(pair => ({ id: pair.id, label: pair.word }))
        : words;

    const displayedTranslations = checked
        ? pairs.map(pair => ({ id: pair.id, label: pair.translation }))
        : translations;

    function handleSelectWord(id) {
        if (matched.includes(id)) return;
        setSelectedWord(id);
        setMistake(null);
    }

    function handleSelectTranslation(id) {

        if (!selectedWord || matched.includes(id)) return;

        if (selectedWord === id) {
            setMatched(previous => [...previous, id]);
            setSelectedWord(null);
        } else {
            setMistake(id);
            setHadMistake(true);
            setSelectedWord(null);
            clearTimeout(mistakeTimeoutRef.current);
            mistakeTimeoutRef.current = setTimeout(() => setMistake(null), 500);
        }

    }

    function handleContinue() {
        setMatched([]);
        setSelectedWord(null);
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
            onContinue={handleContinue}
        >

            <div className="match-translation">

                <div className="match-translation__column">

                    {
                        displayedWords.map(item => (

                            <button
                                key={item.id}
                                ref={el => { wordButtonRefs.current[item.id] = el; }}
                                type="button"
                                className={`match-translation__item ${matched.includes(item.id) ? "matched" : ""} ${selectedWord === item.id ? "selected" : ""}`}
                                disabled={matched.includes(item.id)}
                                aria-pressed={selectedWord === item.id}
                                onClick={() => handleSelectWord(item.id)}
                            >
                                {item.label}
                            </button>

                        ))
                    }

                </div>

                <div className="match-translation__column">

                    {
                        displayedTranslations.map(item => (

                            <button
                                key={item.id}
                                type="button"
                                className={`match-translation__item ${matched.includes(item.id) ? "matched" : ""} ${mistake === item.id ? "mistake" : ""}`}
                                disabled={matched.includes(item.id)}
                                onClick={() => handleSelectTranslation(item.id)}
                            >
                                {item.label}
                            </button>

                        ))
                    }

                </div>

            </div>

        </ExerciseShell>

    );

}
