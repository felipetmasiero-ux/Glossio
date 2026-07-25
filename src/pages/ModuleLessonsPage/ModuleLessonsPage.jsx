import "./ModuleLessonsPage.css";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { useLessonProgress } from "../../hooks/useLessonProgress";

import { ModuleRepository } from "../../utils/courses/ModuleRepository";

import { LessonCard } from "../../components/lessons/LessonCard/LessonCard";
import { ProgressIndicator } from "../../components/lessons/common/ProgressIndicator/ProgressIndicator";

export function ModuleLessonsPage() {

    const navigate = useNavigate();

    const { moduleId } = useParams();

    const { language } = useLanguage();

    const { completedLessons, isLessonCompleted } = useLessonProgress();

    const module = ModuleRepository.getById(language, moduleId);

    if (!module) {

        return <h1>Module not found.</h1>;

    }

    const progress = ModuleRepository.getProgress(module, completedLessons);

    return (

        <div className="module-lessons-page">

            <Link to="/lessons" className="module-lessons-back">
                ← Back to Modules
            </Link>

            <h1>

                {module.title}

            </h1>

            <p>

                {module.description}

            </p>

            <ProgressIndicator

                current={progress.completed}

                total={progress.total}

                label="Module progress"

            />

            <div className="lessons-grid">

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

            </div>

        </div>

    );

}
