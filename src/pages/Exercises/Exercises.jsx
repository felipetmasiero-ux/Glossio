import "./Exercises.css";

import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { useExerciseProgress } from "../../hooks/useExerciseProgress";

import { CourseRepository } from "../../utils/courses/CourseRepository";
import { ModuleRepository } from "../../utils/courses/ModuleRepository";

import { ModuleCard } from "../../components/lessons/ModuleCard/ModuleCard";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";

export function Exercises() {

    const navigate = useNavigate();

    const { language } = useLanguage();

    const { practicedLessons } = useExerciseProgress();

    const course = CourseRepository.getByLanguage(language);

    const modules = course?.modules ?? [];

    return (

        <div className="page-container exercises-page">

            <p className="exercises-page__label text-mono-label">Prática</p>

            <h1 className="exercises-page__title">
                Exercícios
            </h1>

            <p className="exercises-page__description">
                Pratique o que você já leu com exercícios gerados a partir de cada lição.
            </p>

            {
                modules.length === 0 ? (
                    <EmptyState
                        icon="pencil"
                        title="Nenhum exercício ainda"
                        description="Ainda não há lições disponíveis para este idioma."
                    />
                ) : (
                    <nav className="exercises-index" aria-label="Módulos com exercícios">
                        {
                            modules.map((module) => (
                                <ModuleCard
                                    key={module.id}
                                    module={module}
                                    progress={ModuleRepository.getProgress(module, practicedLessons)}
                                    onOpen={() =>
                                        navigate(`/exercises/module/${module.id}`)
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
