import { useMemo, useState } from "react";

import { ExerciseShell } from "../ExerciseShell/ExerciseShell";
import { shuffle } from "../../../utils/exercises/shuffle";

import "./MatchTranslationExercise.css";

export function MatchTranslationExercise({ exercise, onComplete }) {

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

    const checked = matched.length === pairs.length;

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
            setSelectedWord(null);
            setTimeout(() => setMistake(null), 500);
        }

    }

    function handleContinue() {
        setMatched([]);
        setSelectedWord(null);
        onComplete(true);
    }

    return (

        <ExerciseShell
            type={exercise.type}
            prompt={exercise.prompt}
            explanation={exercise.explanation}
            checked={checked}
            correct={true}
            onContinue={handleContinue}
        >

            <div className="match-translation">

                <div className="match-translation__column">

                    {
                        displayedWords.map(item => (

                            <button
                                key={item.id}
                                type="button"
                                className={`match-translation__item ${matched.includes(item.id) ? "matched" : ""} ${selectedWord === item.id ? "selected" : ""}`}
                                disabled={matched.includes(item.id)}
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
