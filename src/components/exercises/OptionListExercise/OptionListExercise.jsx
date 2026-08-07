import { useRef, useState } from "react";

import { ExerciseShell } from "../ExerciseShell/ExerciseShell";
import { Icon } from "../../common/Icon/Icon";
import { AudioButton } from "../../common/AudioButton/AudioButton";

import { trackEvent, ANALYTICS_EVENTS } from "../../../utils/analytics";

import "./OptionListExercise.css";

const MARKERS = ["A", "B", "C", "D", "E", "F"];

// Also renders multiple-choice and select-word exercises, which never set
// payload.audio - AudioButton (and the analytics below) only activate for
// listening exercises (generateListening.js), everything else here is
// unchanged for them.
export function OptionListExercise({ exercise, onComplete, language }) {

    const [answer, setAnswer] = useState(null);

    const [checked, setChecked] = useState(false);

    const playCountRef = useRef(0);

    const { options, answerIndex, audio, text } = exercise.payload;

    const correct = answer === answerIndex;

    function handleCheck() {
        if (answer === null) return;
        setChecked(true);
    }

    function handleContinue() {
        setChecked(false);
        setAnswer(null);
        playCountRef.current = 0;
        onComplete(correct);
    }

    function handleAudioPlay() {

        playCountRef.current += 1;

        trackEvent(ANALYTICS_EVENTS.LISTENING_AUDIO_PLAYED, {
            language,
            exerciseType: exercise.type,
            replay: playCountRef.current > 1
        });

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
            language={language}
            checked={checked}
            correct={correct}
            canCheck={answer !== null}
            onCheck={handleCheck}
            onContinue={handleContinue}
        >

            {audio && (
                <AudioButton
                    audio={audio}
                    text={text}
                    language={language}
                    className="option-list__audio"
                    onPlay={handleAudioPlay}
                />
            )}

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
