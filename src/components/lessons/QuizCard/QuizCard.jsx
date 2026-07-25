import { useState } from "react";

import { Card } from "../../common/Card/Card";
import { Button } from "../../common/Button/Button";

import "./QuizCard.css";

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

                            className={`quiz-option ${

                                answer === index

                                    ? "selected"

                                    : ""

                            }`}

                            disabled={checked}

                            onClick={() => setAnswer(index)}

                        >

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

                                Check

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

                                    {

                                        correct

                                            ? "✅ Correct!"

                                            : "❌ Incorrect"

                                    }

                                </h3>

                                <p>

                                    {quiz.explanation}

                                </p>

                            </div>

                            <div className="quiz-actions">

                                <Button

                                    onClick={handleContinue}

                                >

                                    Continue

                                </Button>

                            </div>

                        </>

                    )

            }

        </Card>

    );

}