import { useState } from "react";

import { Card } from "../../common/Card/Card";
import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";
import { ExerciseFeedback } from "../../exercises/ExerciseFeedback/ExerciseFeedback";

import "./QuizCard.css";

const MARKERS = ["A", "B", "C", "D", "E", "F"];

export function QuizCard({

    quiz,

    onComplete

}) {

    const [

        answer,

        setAnswer

    ] = useState(null);

    const [

        checked,

        setChecked

    ] = useState(false);

    const correct =

        answer === quiz.answer;

    function handleCheck() {

        if (answer === null) return;

        setChecked(true);

    }

    function handleContinue() {

        setChecked(false);

        setAnswer(null);

        onComplete?.(correct);

    }

    function optionState(index) {

        if (!checked) return answer === index ? "selected" : "";

        if (index === quiz.answer) return "correct";

        if (index === answer) return "wrong";

        return "";

    }

    return (

        <Card className="quiz-card">

            <h2 className="quiz-question">

                {quiz.question}

            </h2>

            <div className="quiz-options">

                {

                    quiz.options.map((option, index) => (

                        <button

                            key={index}

                            className={`quiz-option ${optionState(index)}`}

                            disabled={checked}

                            onClick={() => setAnswer(index)}

                        >

                            <span className="quiz-option__marker">
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

            {

                !checked

                    ?

                    (

                        <div className="quiz-actions">

                            <Button

                                disabled={answer === null}

                                onClick={handleCheck}

                            >

                                Verificar

                            </Button>

                        </div>

                    )

                    :

                    (

                        <>

                            <div

                                className={`quiz-feedback ${

                                    correct

                                        ? "success"

                                        : "error"

                                }`}

                            >

                                <h3>
                                    <Icon name={correct ? "check" : "x"} size={16} />
                                    {correct ? "Correto!" : "Incorreto"}
                                </h3>

                                <ExerciseFeedback

                                    correct={correct}

                                    explanation={quiz.explanation}

                                    feedback={quiz.feedback}

                                />

                            </div>

                            <div className="quiz-actions">

                                <Button

                                    onClick={handleContinue}

                                >

                                    Continuar

                                </Button>

                            </div>

                        </>

                    )

            }

        </Card>

    );

}
