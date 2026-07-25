import "./ModulesPage.css";

import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { useLessonProgress } from "../../hooks/useLessonProgress";

import { CourseRepository } from "../../utils/courses/CourseRepository";
import { ModuleRepository } from "../../utils/courses/ModuleRepository";

import { ModuleCard } from "../../components/lessons/ModuleCard/ModuleCard";

export function ModulesPage() {

    const navigate = useNavigate();

    const { language } = useLanguage();

    const { completedLessons } = useLessonProgress();

    const course = CourseRepository.getByLanguage(language);

    const modules = course?.modules ?? [];

    return (

        <div className="modules-page">

            <h1>

                {course?.title ?? "Modules"}

            </h1>

            {

                modules.length === 0 && (

                    <p>

                        No modules available yet for this language.

                    </p>

                )

            }

            <div className="modules-grid">

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

            </div>

        </div>

    );

}
