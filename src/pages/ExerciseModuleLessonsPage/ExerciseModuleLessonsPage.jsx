import "./ExerciseModuleLessonsPage.css";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { useExerciseProgress } from "../../hooks/useExerciseProgress";

import { ModuleRepository } from "../../utils/courses/ModuleRepository";
import { LessonRepository } from "../../utils/lessons/LessonRepository";
import { generateExercisesForLesson } from "../../utils/exercises";

import { Icon } from "../../components/common/Icon/Icon";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";

export function ExerciseModuleLessonsPage() {

    const navigate = useNavigate();

    const { moduleId } = useParams();

    const { language } = useLanguage();

    const { isLessonPracticed } = useExerciseProgress();

    const module = ModuleRepository.getById(language, moduleId);

    if (!module) {

        return (
            <div className="page-container">
                <EmptyState
                    icon="pencil"
                    title="Módulo não encontrado"
                    description="Este módulo pode ter sido movido ou não existe mais."
                    actionLabel="Voltar aos exercícios"
                    onAction={() => navigate("/exercises")}
                />
            </div>
        );

    }

    const rows = module.lessons.map((lesson) => {

        const normalized = LessonRepository.getById(language, lesson.id);

        return {
            lesson,
            exerciseCount: generateExercisesForLesson(normalized).length
        };

    });

    return (

        <div className="page-container exercise-lessons-page animate-fade-in">

            <Link to="/exercises" className="exercise-lessons-back">
                <Icon name="chevron-left" size={15} />
                Voltar aos exercícios
            </Link>

            <p className="exercise-lessons-level text-mono-label">{module.level}</p>

            <h1 className="exercise-lessons-title">
                {module.title}
            </h1>

            <p className="exercise-lessons-description">
                Escolha uma lição para praticar.
            </p>

            <nav className="exercise-lessons-index" aria-label="Lições com exercícios">

                {
                    rows.map(({ lesson, exerciseCount }) => (

                        <button
                            key={lesson.id}
                            type="button"
                            className={`exercise-lesson-row ${exerciseCount === 0 ? "exercise-lesson-row--disabled" : ""}`}
                            disabled={exerciseCount === 0}
                            onClick={() => navigate(`/exercises/${lesson.id}`)}
                        >

                            <span className="exercise-lesson-row__body">
                                <span className="exercise-lesson-row__title">
                                    {lesson.title}
                                    {isLessonPracticed(lesson.id) && <Icon name="check" size={15} className="exercise-lesson-row__practiced" />}
                                </span>

                                <span className="exercise-lesson-row__count text-mono-label">
                                    {exerciseCount === 0 ? "Sem exercícios disponíveis" : `${exerciseCount} exercícios`}
                                </span>
                            </span>

                            <Icon name="chevron-right" size={17} className="exercise-lesson-row__arrow" />

                        </button>

                    ))
                }

            </nav>

        </div>

    );

}
