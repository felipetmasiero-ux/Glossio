import "./ModuleLessonsPage.css";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { useLessonProgress } from "../../hooks/useLessonProgress";

import { ModuleRepository } from "../../utils/courses/ModuleRepository";

import { LessonCard } from "../../components/lessons/LessonCard/LessonCard";
import { ProgressIndicator } from "../../components/lessons/common/ProgressIndicator/ProgressIndicator";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";
import { Icon } from "../../components/common/Icon/Icon";

export function ModuleLessonsPage() {

    const navigate = useNavigate();

    const { moduleId } = useParams();

    const { language } = useLanguage();

    const { completedLessons, isLessonCompleted } = useLessonProgress();

    const module = ModuleRepository.getById(language, moduleId);

    if (!module) {

        return (
            <div className="page-container">
                <EmptyState
                    icon="book"
                    title="Módulo não encontrado"
                    description="Este módulo pode ter sido movido ou não existe mais."
                    actionLabel="Voltar aos módulos"
                    onAction={() => navigate("/lessons")}
                />
            </div>
        );

    }

    const progress = ModuleRepository.getProgress(module, completedLessons);

    return (

        <div className="page-container module-lessons-page animate-fade-in">

            <Link to="/lessons" className="module-lessons-back">
                <Icon name="chevron-left" size={15} />
                Voltar aos módulos
            </Link>

            <p className="module-lessons-level text-mono-label">{module.level}</p>

            <h1 className="module-lessons-title">
                {module.title}
            </h1>

            <p className="module-lessons-description">
                {module.description}
            </p>

            <ProgressIndicator

                current={progress.completed}

                total={progress.total}

                label="Progresso do módulo"

            />

            <nav className="lessons-index" aria-label="Lições do módulo">

                {
                    module.lessons.map((lesson) => {

                        const locked = !ModuleRepository.isLessonUnlocked(
                            language,
                            lesson.id,
                            completedLessons
                        );

                        return (

                            <LessonCard
                                key={lesson.id}
                                lesson={lesson}
                                locked={locked}
                                completed={isLessonCompleted(lesson.id)}
                                onOpen={() =>
                                    !locked && navigate(`/lessons/${lesson.id}`)
                                }
                            />

                        );

                    })
                }

            </nav>

            <Link to={`/exercises/module/${module.id}`} className="module-lessons-exercises-link">
                <Icon name="pencil" size={15} />
                Praticar exercícios deste módulo
            </Link>

        </div>

    );

}
