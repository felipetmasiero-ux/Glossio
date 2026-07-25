import "./LessonReader.css";
import"../../../data/lessons/lesson.css";

import { useNavigate } from "react-router-dom";

import { LessonHero } from "../LessonHero/LessonHero";
import { LessonModuleNav } from "../LessonModuleNav/LessonModuleNav";
import { LessonObjectives } from "../LessonObjectives/LessonObjectives";
import { VocabularySection } from "../VocabularySection/VocabularySection";
import { LessonBlock } from "../blocks/LessonBlock/LessonBlock";
import { LessonSummary } from "../LessonSummary/LessonSummary";

import { ProgressIndicator } from "../common/ProgressIndicator/ProgressIndicator";
import { LessonNavigation } from "../common/LessonNavigation/LessonNavigation";

import { ModuleRepository } from "../../../utils/courses/ModuleRepository";

import { useLanguage } from "../../../hooks/useLanguage";
import { useLessonNavigator } from "../../../hooks/useLessonNavigator";
import { useLessonProgress } from "../../../hooks/useLessonProgress";

export function LessonReader({ lesson }) {

    const navigate = useNavigate();

    const { language } = useLanguage();

    const { completedLessons, completeLesson } = useLessonProgress();

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

    const nextLesson = ModuleRepository.getNextLesson(
        language,
        lesson.id
    );

    const previousLesson = ModuleRepository.getPreviousLesson(
        language,
        lesson.id
    );

    const currentModule = ModuleRepository.getByLesson(language, lesson.id);

    const lessonIndex = currentModule?.lessons.findIndex(
        moduleLesson => moduleLesson.id === lesson.id
    ) ?? 0;

    const moduleProgress = currentModule
        ? ModuleRepository.getProgress(currentModule, completedLessons)
        : { completed: 0, total: 0 };

    const courseProgress = ModuleRepository.getProgress(
        { lessons: ModuleRepository.getAllLessonsInOrder(language) },
        completedLessons
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

        completeLesson(lesson.id);

        if (currentModule && ModuleRepository.isLastLessonInModule(language, lesson.id)) {

            navigate(`/lessons/module/${currentModule.id}/complete`);

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

            <LessonModuleNav

                module={currentModule}

                lessonIndex={lessonIndex}

                moduleProgress={moduleProgress}

                courseProgress={courseProgress}

            />

            <LessonHero

                lesson={lesson}

            />

            <LessonObjectives

                objectives={lesson.objectives}

            />

            <VocabularySection

                lesson={lesson}

                vocabulary={lesson.vocabulary}

            />

            <h2 className="lesson-step-heading">

                {stepTitle}

            </h2>


            <ProgressIndicator

                current={current + 1}

                total={steps.length}

            />

            <div className="lesson-content paper-ruled animate-fade-in">

                {

                    currentStep.map(block => (

                        <LessonBlock
                            key={block.id}
                            block={block}
                            lesson={lesson}
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

                        ? "Concluir lição"

                        : "Continuar leitura"

                }

                onPrevious={handlePrevious}

                onNext={handleNext}

            />

        </div>

    );

}
