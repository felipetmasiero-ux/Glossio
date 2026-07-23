import "./LessonReader.css";

import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import { LessonHero } from "../LessonHero/LessonHero";
import { LessonObjectives } from "../LessonObjectives/LessonObjectives";
import { VocabularySection } from "../VocabularySection/VocabularySection";
import { LessonBlock } from "../blocks/LessonBlock/LessonBlock";
import { LessonSummary } from "../LessonSummary/LessonSummary";

import { ProgressIndicator } from "../common/ProgressIndicator/ProgressIndicator";
import { LessonNavigation } from "../common/LessonNavigation/LessonNavigation";

import { LessonRepository } from "../../../utils/lessons/LessonRepository";
import { buildWordRepository } from "../../../utils/words/buildWordRepository";


import { useLanguage } from "../../../hooks/useLanguage";
import { useLessonNavigator } from "../../../hooks/useLessonNavigator";

export function LessonReader({ lesson }) {

    const navigate = useNavigate();

    const { language } = useLanguage();

    const {

        current,
        currentStep,
        steps,
        next,
        previous,
        isFirst,
        isLast,
        stepTitle

    } = useLessonNavigator(lesson);

    const nextLesson = LessonRepository.getNextLesson(
        language,
        lesson.id
    );

    const previousLesson = LessonRepository.getPreviousLesson(
        language,
        lesson.id
    );

    const wordIndex = useMemo(
        () => buildWordRepository(lesson),
        [lesson]
    );

    function scrollTop() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    function handleNext() {

        if (!isLast) {

            next();

            scrollTop();

            return;

        }

        if (nextLesson) {

            navigate(`/lessons/${nextLesson.id}`);

            return;

        }

        navigate("/lessons");

    }

    function handlePrevious() {

        if (!isFirst) {

            previous();

            scrollTop();

            return;

        }

        if (previousLesson) {

            navigate(`/lessons/${previousLesson.id}`);

        }

    }

    return (

        <div className="lesson-reader">

            <LessonHero

                lesson={lesson}

            />

            <LessonObjectives

                objectives={lesson.objectives}

            />

            <VocabularySection

                vocabulary={lesson.vocabulary}

            />

            <h2 className="lesson-step-heading">

                {stepTitle}

            </h2>


            <ProgressIndicator

                current={current + 1}

                total={steps.length}

            />

            <div className="lesson-content animate-fade-in">

                {

                    currentStep.map(block => (

                        <LessonBlock
                            block={block}
                            lesson={lesson}
                            wordIndex={wordIndex}
                        />

                    ))

                }

            </div>

            {

                isLast && (

                    <LessonSummary

                        summary={lesson.summary}

                    />

                )

            }

            <LessonNavigation

                hasPrevious={!isFirst || !!previousLesson}

                hasNext={true}

                nextLabel={

                    isLast

                        ? "Finish Lesson →"

                        : "Continue Reading →"

                }

                onPrevious={handlePrevious}

                onNext={handleNext}

            />

        </div>

    );

}