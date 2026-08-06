import "./ModulesPage.css";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { useLessonProgress } from "../../hooks/useLessonProgress";

import { CourseRepository } from "../../utils/courses/CourseRepository";
import { ModuleRepository } from "../../utils/courses/ModuleRepository";

import { ModuleCard } from "../../components/lessons/ModuleCard/ModuleCard";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";
import { Icon } from "../../components/common/Icon/Icon";
import { Seo } from "../../components/common/Seo/Seo";

// Two entry points render this same page: the authenticated /lessons (no
// param, driven by LanguageContext - "continue studying my language") and
// the public /lessons/language/:language (driven by the URL, reachable
// while logged out - see App.jsx). The URL param wins when present so a
// visitor's link always shows the same course regardless of their local
// LanguageContext state (which they may not have set at all).
export function ModulesPage() {

    const navigate = useNavigate();

    const { language: paramLanguage } = useParams();

    const { language: contextLanguage } = useLanguage();

    const language = paramLanguage ?? contextLanguage;

    const { completedLessons } = useLessonProgress();

    const course = CourseRepository.getByLanguage(language);

    const modules = course?.modules ?? [];

    return (

        <div className="page-container modules-page animate-fade-in">

            <Seo
                title={`Lições — ${course?.title ?? language}`}
                description={course?.description ?? `Módulos e lições estruturadas para aprender ${language}.`}
                robots={paramLanguage ? "index, follow" : "noindex, nofollow"}
                path={paramLanguage ? `/lessons/language/${paramLanguage}` : "/lessons"}
            />

            <p className="modules-page__label text-mono-label">Sumário</p>

            <h1 className="modules-page__title">
                {course?.title ?? "Módulos"}
            </h1>

            {
                modules.length === 0 ? (
                    <EmptyState
                        icon="book"
                        title="Nenhum módulo ainda"
                        description="Ainda não há módulos disponíveis para este idioma."
                    />
                ) : (
                    <nav className="modules-index" aria-label="Módulos do curso">
                        {
                            modules.map((module) => (
                                <ModuleCard
                                    key={module.id}
                                    module={module}
                                    progress={ModuleRepository.getProgress(module, completedLessons)}
                                    onOpen={() => {
                                        window.scrollTo(0, 0);
                                        navigate(`/lessons/module/${module.id}`);
                                    }}
                                />
                            ))
                        }
                    </nav>
                )
            }

            <Link to="/alphabets" className="modules-page__alphabet-link">
                Ver alfabeto do idioma
                <Icon name="chevron-right" size={15} />
            </Link>

        </div>

    );

}
