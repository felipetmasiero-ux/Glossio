import "./ModuleLessonsPage.css";

import { useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useLessonProgress } from "../../hooks/useLessonProgress";

import { ModuleRepository } from "../../utils/courses/ModuleRepository";
import { getLanguageFromId } from "../../utils/courses/getLanguageFromId";

import { LessonCard } from "../../components/lessons/LessonCard/LessonCard";
import { ProgressIndicator } from "../../components/lessons/common/ProgressIndicator/ProgressIndicator";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";
import { Icon } from "../../components/common/Icon/Icon";
import { Seo } from "../../components/common/Seo/Seo";
import { buildCourseSchema, buildBreadcrumbSchema, combineSchemas } from "../../utils/seo/buildJsonLd";
import { SITE_URL } from "../../config/seo";

// Public route (see App.jsx) - language comes from the moduleId itself
// (every id is prefixed with it, e.g. "english-a1"), not LanguageContext,
// so this page is fully self-sufficient from its own URL regardless of
// whether the visitor is logged in or has ever set a language at all.
export function ModuleLessonsPage() {

    const navigate = useNavigate();

    const { moduleId } = useParams();

    const language = getLanguageFromId(moduleId);

    const { completedLessons, isLessonCompleted } = useLessonProgress();

    const module = ModuleRepository.getById(language, moduleId);

    // Stable across renders so LessonCard (memoized) doesn't re-render
    // every lesson row just because e.g. `completedLessons` changed
    // elsewhere in this same array of lessons.
    const handleOpenLesson = useCallback(
        lesson => navigate(`/lessons/${lesson.id}`),
        [navigate]
    );

    if (!module) {

        return (
            <div className="page-container">
                <Seo title="Módulo não encontrado" robots="noindex, nofollow" />
                <EmptyState
                    icon="book"
                    title="Módulo não encontrado"
                    description="Este módulo pode ter sido movido ou não existe mais."
                    actionLabel="Voltar aos módulos"
                    onAction={() => {
                        window.scrollTo(0, 0);
                        navigate("/lessons");
                    }}
                />
            </div>
        );

    }

    const progress = ModuleRepository.getProgress(module, completedLessons);

    const jsonLd = combineSchemas(
        buildCourseSchema(module),
        buildBreadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Idiomas", url: `${SITE_URL}/languages` },
            { name: module.title, url: `${SITE_URL}/lessons/module/${module.id}` }
        ])
    );

    return (

        <div className="page-container module-lessons-page animate-fade-in">

            <Seo
                title={module.title}
                description={module.description}
                path={`/lessons/module/${module.id}`}
                jsonLd={jsonLd}
            />

            <Link
                to="/lessons"
                className="module-lessons-back"
                onClick={() => window.scrollTo(0, 0)}
            >
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
                                onOpenLesson={handleOpenLesson}
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
