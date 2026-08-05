import "./ModulesPage.css";

import { Link, useNavigate } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { useLessonProgress } from "../../hooks/useLessonProgress";

import { CourseRepository } from "../../utils/courses/CourseRepository";
import { ModuleRepository } from "../../utils/courses/ModuleRepository";

import { ModuleCard } from "../../components/lessons/ModuleCard/ModuleCard";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";
import { Icon } from "../../components/common/Icon/Icon";
import { Seo } from "../../components/common/Seo/Seo";

export function ModulesPage() {

    const navigate = useNavigate();

    const { language } = useLanguage();

    const { completedLessons } = useLessonProgress();

    const course = CourseRepository.getByLanguage(language);

    const modules = course?.modules ?? [];

    return (

        <div className="page-container modules-page animate-fade-in">

            <Seo
                title={`Lições — ${course?.title ?? language}`}
                description={course?.description ?? `Módulos e lições estruturadas para aprender ${language}.`}
                robots="noindex, nofollow"
                path="/lessons"
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
