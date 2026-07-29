import "./ExerciseSessionPage.css";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { useExerciseSession } from "../../hooks/exercises/useExerciseSession";

import { LessonRepository } from "../../utils/lessons/LessonRepository";
import { ModuleRepository } from "../../utils/courses/ModuleRepository";
import { EXERCISE_TYPES } from "../../constants/exerciseTypes";

import { ProgressIndicator } from "../../components/lessons/common/ProgressIndicator/ProgressIndicator";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";
import { Button } from "../../components/common/Button/Button";
import { Icon } from "../../components/common/Icon/Icon";

import { OptionListExercise } from "../../components/exercises/OptionListExercise/OptionListExercise";
import { FillBlankExercise } from "../../components/exercises/FillBlankExercise/FillBlankExercise";
import { MatchTranslationExercise } from "../../components/exercises/MatchTranslationExercise/MatchTranslationExercise";
import { OrderSentenceExercise } from "../../components/exercises/OrderSentenceExercise/OrderSentenceExercise";

const EXERCISE_COMPONENTS = {
    [EXERCISE_TYPES.MULTIPLE_CHOICE]: OptionListExercise,
    [EXERCISE_TYPES.SELECT_WORD]: OptionListExercise,
    [EXERCISE_TYPES.FILL_BLANK]: FillBlankExercise,
    [EXERCISE_TYPES.MATCH_TRANSLATION]: MatchTranslationExercise,
    [EXERCISE_TYPES.ORDER_SENTENCE]: OrderSentenceExercise
};

export function ExerciseSessionPage() {

    const navigate = useNavigate();

    const { lessonId } = useParams();

    const { language } = useLanguage();

    const lesson = LessonRepository.getById(language, lessonId);

    const {
        current,
        initialTotal,
        completedCount,
        correctCount,
        totalAnswers,
        finished,
        handleAnswered,
        restart
    } = useExerciseSession(lesson);

    if (!lesson?.id) {

        return (
            <div className="page-container">
                <EmptyState
                    icon="pencil"
                    title="Lição não encontrada"
                    description="Esta lição pode ter sido movida ou não existe mais."
                    actionLabel="Voltar aos exercícios"
                    onAction={() => navigate("/exercises")}
                />
            </div>
        );

    }

    const module = ModuleRepository.getByLesson(language, lesson.id);

    const backTo = module ? `/exercises/module/${module.id}` : "/exercises";

    if (initialTotal === 0) {

        return (
            <div className="page-container">
                <Link to={backTo} className="exercise-session-back">
                    <Icon name="chevron-left" size={15} />
                    Voltar
                </Link>

                <EmptyState
                    icon="pencil"
                    title="Sem exercícios disponíveis"
                    description="Esta lição ainda não tem conteúdo suficiente para gerar exercícios."
                />
            </div>
        );

    }

    if (finished) {

        const accuracy = totalAnswers === 0 ? 0 : Math.round((correctCount / totalAnswers) * 100);

        return (

            <div className="page-container exercise-session-complete animate-fade-in">

                <div className="exercise-session-complete__stamp animate-celebrate">
                    <Icon name="check" size={26} />
                </div>

                <p className="exercise-session-complete__label text-mono-label">Exercícios concluídos</p>

                <h1 className="exercise-session-complete__title">
                    {lesson.title}
                </h1>

                <dl className="exercise-session-complete__stats">
                    <div className="exercise-session-complete__stat">
                        <dt>Exercícios</dt>
                        <dd className="text-mono-number">{initialTotal}</dd>
                    </div>
                    <div className="exercise-session-complete__stat">
                        <dt>Precisão</dt>
                        <dd className="text-mono-number">{accuracy}%</dd>
                    </div>
                </dl>

                <div className="exercise-session-complete__actions">
                    <Button onClick={restart}>
                        Praticar novamente
                    </Button>

                    <Link to={backTo} className="exercise-session-complete__secondary-link">
                        Voltar à lição
                    </Link>
                </div>

            </div>

        );

    }

    const ExerciseComponent = EXERCISE_COMPONENTS[current.type];

    return (

        <div className="page-container exercise-session-page">

            <Link to={backTo} className="exercise-session-back">
                <Icon name="chevron-left" size={15} />
                Voltar
            </Link>

            <ProgressIndicator
                current={completedCount}
                total={initialTotal}
                label="Progresso"
            />

            <ExerciseComponent
                key={current.id}
                exercise={current}
                onComplete={handleAnswered}
            />

        </div>

    );

}
