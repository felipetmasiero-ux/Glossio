import "./ModuleCompletePage.css";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { useEvents } from "../../hooks/useEvents";
import { useFlashcards } from "../../hooks/useFlashcards";

import { ModuleRepository } from "../../utils/courses/ModuleRepository";
import { getModuleCompletionStats } from "../../utils/courses/getModuleCompletionStats";

import { Button } from "../../components/common/Button/Button";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";
import { Icon } from "../../components/common/Icon/Icon";
import { Seo } from "../../components/common/Seo/Seo";

export function ModuleCompletePage() {

    const navigate = useNavigate();

    const { moduleId } = useParams();

    const { language } = useLanguage();

    const { events } = useEvents();

    const { flashcards } = useFlashcards();

    const module = ModuleRepository.getById(language, moduleId);

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

    const stats = getModuleCompletionStats({ module, events, flashcards });

    const nextModule = ModuleRepository.getNextModule(language, module.id);

    const continueLabel = nextModule
        ? `Continuar para ${nextModule.level}`
        : "Voltar aos módulos";

    function handleContinue() {

        window.scrollTo(0, 0);

        if (nextModule) {
            navigate(`/lessons/module/${nextModule.id}`);
            return;
        }

        navigate("/lessons");

    }

    const statRows = [
        { label: "Lições", value: stats.lessonCount },
        { label: "Palavras aprendidas", value: stats.wordsLearned },
        { label: "Flashcards adicionados", value: stats.flashcardsAdded },
        { label: "Precisão nos quizzes", value: stats.quizAccuracy === null ? "—" : `${stats.quizAccuracy}%` },
        { label: "Tempo estudado", value: `~${stats.estimatedMinutes} min` },
    ];

    return (

        <div className="page-container module-complete-page animate-fade-in">

            <Seo title={`Módulo concluído — ${module.title}`} robots="noindex, nofollow" path={`/lessons/module/${module.id}/complete`} />

            <div className="module-complete-stamp animate-celebrate">
                <Icon name="check" size={26} />
            </div>

            <p className="module-complete-label text-mono-label">Módulo concluído</p>

            <h1 className="module-complete-title">
                {module.title}
            </h1>

            <p className="module-complete-description">
                Você terminou as {stats.lessonCount} lições deste módulo. Bom trabalho!
            </p>

            <dl className="module-complete-stats">
                {statRows.map((row) => (
                    <div className="module-complete-stat" key={row.label}>
                        <dt>{row.label}</dt>
                        <dd className="text-mono-number">{row.value}</dd>
                    </div>
                ))}
            </dl>

            <div className="module-complete-actions">

                <Button onClick={handleContinue}>
                    {continueLabel}
                </Button>

                <div className="module-complete-secondary-actions">

                    {/* Exercises are generated from each lesson's own content
                    (generateExercisesForLesson.js) and every lesson requires
                    at least one block - in practice a real module always has
                    something to practice, so this link is unconditional
                    rather than adding a second, heavier computation here
                    just to decide whether to show it. */}
                    <Link
                        to={`/exercises/module/${module.id}`}
                        className="module-complete-secondary-link"
                    >
                        Praticar exercícios
                    </Link>

                    {
                        stats.flashcardsAdded > 0 && (
                            <Link
                                to="/flashcards"
                                className="module-complete-secondary-link"
                            >
                                Revisar flashcards
                            </Link>
                        )
                    }

                    {
                        nextModule && (
                            <Link
                                to="/lessons"
                                className="module-complete-secondary-link"
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                Voltar aos módulos
                            </Link>
                        )
                    }

                </div>

            </div>

        </div>

    );

}
