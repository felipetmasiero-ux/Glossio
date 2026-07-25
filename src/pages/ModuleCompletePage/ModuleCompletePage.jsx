import "./ModuleCompletePage.css";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { useEvents } from "../../hooks/useEvents";
import { useFlashcards } from "../../hooks/useFlashcards";

import { ModuleRepository } from "../../utils/courses/ModuleRepository";
import { getModuleCompletionStats } from "../../utils/courses/getModuleCompletionStats";
import { getNextLevel } from "../../utils/courses/getNextLevel";

import { Button } from "../../components/common/Button/Button";
import { Icon } from "../../components/common/Icon/Icon";

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
                <h1>Módulo não encontrado.</h1>
            </div>
        );

    }

    const stats = getModuleCompletionStats({ module, events, flashcards });

    const nextModule = ModuleRepository.getNextModule(language, module.id);

    const nextLevel = getNextLevel(module.level);

    const continueLabel = nextModule
        ? `Continuar para ${nextModule.level}`
        : nextLevel
            ? `Continuar para ${nextLevel}`
            : "Voltar aos módulos";

    function handleContinue() {

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

        <div className="page-container module-complete-page">

            <div className="module-complete-stamp">
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

                <Link to="/lessons" className="module-complete-secondary-link">
                    Voltar aos módulos
                </Link>

            </div>

        </div>

    );

}
