import "../../components/lessons/LessonHero/LessonHero.css";
import "./ModuleCompletePage.css";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { useEvents } from "../../hooks/useEvents";
import { useFlashcards } from "../../hooks/useFlashcards";

import { ModuleRepository } from "../../utils/courses/ModuleRepository";
import { getModuleCompletionStats } from "../../utils/courses/getModuleCompletionStats";
import { getNextLevel } from "../../utils/courses/getNextLevel";

import { Button } from "../../components/common/Button/Button";

export function ModuleCompletePage() {

    const navigate = useNavigate();

    const { moduleId } = useParams();

    const { language } = useLanguage();

    const { events } = useEvents();

    const { flashcards } = useFlashcards();

    const module = ModuleRepository.getById(language, moduleId);

    if (!module) {

        return <h1>Module not found.</h1>;

    }

    const stats = getModuleCompletionStats({ module, events, flashcards });

    const nextModule = ModuleRepository.getNextModule(language, module.id);

    const nextLevel = getNextLevel(module.level);

    const continueLabel = nextModule
        ? `Continue to ${nextModule.level}`
        : nextLevel
            ? `Continue to ${nextLevel}`
            : "Back to Modules";

    function handleContinue() {

        if (nextModule) {
            navigate(`/lessons/module/${nextModule.id}`);
            return;
        }

        navigate("/lessons");

    }

    return (

        <div className="module-complete-page">

            <section className="lesson-hero module-complete-hero">

                <span className="lesson-level">
                    🎉 Module Complete
                </span>

                <h1>
                    {module.title}
                </h1>

                <p className="lesson-description">
                    You've finished all {stats.lessonCount} lessons in this module. Great work!
                </p>

                <div className="lesson-meta">

                    <div className="lesson-meta-item">
                        📚 {stats.lessonCount} lessons
                    </div>

                    <div className="lesson-meta-item">
                        🗣️ {stats.wordsLearned} words learned
                    </div>

                    <div className="lesson-meta-item">
                        ⭐ {stats.flashcardsAdded} flashcards added
                    </div>

                    <div className="lesson-meta-item">
                        ✅ {
                            stats.quizAccuracy === null
                                ? "No quizzes yet"
                                : `${stats.quizAccuracy}% quiz accuracy`
                        }
                    </div>

                    <div className="lesson-meta-item">
                        ⏱ ~{stats.estimatedMinutes} min studied
                    </div>

                </div>

            </section>

            <div className="module-complete-actions">

                <Button onClick={handleContinue}>
                    {continueLabel} →
                </Button>

                <Link to="/lessons" className="module-complete-secondary-link">
                    Back to Modules
                </Link>

            </div>

        </div>

    );

}
