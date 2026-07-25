import "./ModulesPage.css";

import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { useLessonProgress } from "../../hooks/useLessonProgress";

import { CourseRepository } from "../../utils/courses/CourseRepository";
import { ModuleRepository } from "../../utils/courses/ModuleRepository";

import { ModuleCard } from "../../components/lessons/ModuleCard/ModuleCard";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";

export function ModulesPage() {

    const navigate = useNavigate();

    const { language } = useLanguage();

    const { completedLessons } = useLessonProgress();

    const course = CourseRepository.getByLanguage(language);

    const modules = course?.modules ?? [];

    return (

        <div className="page-container modules-page">

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
                                    onOpen={() =>
                                        navigate(`/lessons/module/${module.id}`)
                                    }
                                />
                            ))
                        }
                    </nav>
                )
            }

        </div>

    );

}
