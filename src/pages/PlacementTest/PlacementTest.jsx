import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { usePlacementTest } from "../../hooks/usePlacementTest";
import { useLanguage } from "../../hooks/useLanguage";

import { LanguageCard } from "../../components/common/LanguageCard/LanguageCard";
import { Button } from "../../components/common/Button/Button";
import { ProgressBar } from "../../components/common/ProgressBar/ProgressBar";
import { Card } from "../../components/common/Card/Card";
import { Icon } from "../../components/common/Icon/Icon";

import "./PlacementTest.css";

const LANGUAGES = [
    { key: "English", nativeName: "English", flag: "🇺🇸" },
    { key: "French", nativeName: "Français", flag: "🇫🇷" },
    { key: "Portuguese", nativeName: "Português", flag: "🇧🇷" }
];

const LEVEL_MESSAGES = {
    A1: "Recomendamos começar pelo A1, o ponto de partida ideal para construir uma base sólida.",
    A2: "Você já domina o básico! Recomendamos começar pelo A2 para seguir evoluindo sem repetir o que já sabe."
};

export function PlacementTest() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { language: appLanguage, setLanguage: setAppLanguage } = useLanguage();

    const {
        step,
        STEPS,
        language,
        currentQuestion,
        currentAnswer,
        isLastQuestion,
        progress,
        result,
        selectLanguage,
        answerCurrent,
        goToPreviousQuestion,
        goToNextQuestion,
        retake
    } = usePlacementTest();

    const [hasStartedQuiz, setHasStartedQuiz] = useState(false);

    // Deep-linked from Home/Profile for the app's current language (e.g.
    // "?language=English") - skips straight past the picker into the quiz's
    // "ready to start" screen instead of making the user pick it again.
    useEffect(() => {

        const preselected = searchParams.get("language");

        if (preselected && LANGUAGES.some(lang => lang.key === preselected)) {
            selectLanguage(preselected);
        }

        // Intentionally only ever runs once, on mount - re-running on every
        // `selectLanguage` identity change would fight a manual language pick.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSelectLanguage(selected) {
        selectLanguage(selected);
        setHasStartedQuiz(false);
    }

    function ensureAppLanguageMatchesResult() {
        if (appLanguage !== result.language) {
            setAppLanguage(result.language);
        }
    }

    function handleStartRecommendedModule() {
        ensureAppLanguageMatchesResult();
        navigate(`/lessons/module/${result.recommendedModuleId}`);
    }

    function handleViewAllModules() {
        ensureAppLanguageMatchesResult();
        navigate("/lessons");
    }

    if (step === STEPS.LANGUAGE) {

        return (

            <div className="page-container placement-test-page animate-fade-in">

                <p className="placement-test-page__label text-mono-label">Teste de nivelamento</p>
                <h1 className="placement-test-page__title">Qual idioma você quer testar?</h1>
                <p className="placement-test-page__subtitle text-secondary">
                    Responda algumas perguntas rápidas e descubra o módulo ideal para começar.
                    O resultado não gera certificado nem nota - é apenas uma recomendação.
                </p>

                <div className="placement-test-page__languages">
                    {LANGUAGES.map(lang => (
                        <LanguageCard
                            key={lang.key}
                            language={lang.key}
                            flag={lang.flag}
                            nativeName={lang.nativeName}
                            onClick={() => handleSelectLanguage(lang.key)}
                        />
                    ))}
                </div>

            </div>

        );

    }

    if (step === STEPS.QUIZ) {

        if (!hasStartedQuiz) {

            return (

                <div className="page-container placement-test-page animate-fade-in">

                    <p className="placement-test-page__label text-mono-label">Teste de nivelamento • {language}</p>
                    <h1 className="placement-test-page__title">Pronto para começar?</h1>
                    <p className="placement-test-page__subtitle text-secondary">
                        {progress.total} perguntas rápidas de vocabulário, gramática, compreensão, frases e ordem de palavras.
                    </p>

                    <Button onClick={() => setHasStartedQuiz(true)}>
                        Iniciar teste
                    </Button>

                </div>

            );

        }

        return (

            <div className="page-container placement-test-page animate-fade-in">

                <p className="placement-test-page__label text-mono-label">Teste de nivelamento • {language}</p>

                <div className="placement-test-page__progress">
                    <span className="text-small">Pergunta {progress.current} de {progress.total}</span>
                    <ProgressBar value={(progress.current / progress.total) * 100} />
                </div>

                <Card className="placement-test-question">

                    <p className="placement-test-question__prompt">{currentQuestion.prompt}</p>

                    <div className="placement-test-question__options">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`placement-test-question__option${currentAnswer === index ? " placement-test-question__option--selected" : ""}`}
                                aria-pressed={currentAnswer === index}
                                onClick={() => answerCurrent(index)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                </Card>

                <div className="placement-test-page__actions">

                    <Button
                        variant="secondary"
                        onClick={goToPreviousQuestion}
                        disabled={progress.current === 1}
                    >
                        Anterior
                    </Button>

                    <Button
                        onClick={goToNextQuestion}
                        disabled={currentAnswer === null}
                    >
                        {isLastQuestion ? "Ver resultado" : "Próxima"}
                    </Button>

                </div>

            </div>

        );

    }

    // step === STEPS.RESULT
    const message = result.isBeyondAvailableLevels
        ? `Você já domina todo o conteúdo disponível para ${result.language} no momento! Continue praticando com o ${result.recommendedLevel}.`
        : LEVEL_MESSAGES[result.recommendedLevel] ?? "";

    return (

        <div className="page-container placement-test-page animate-fade-in">

            <p className="placement-test-page__label text-mono-label">Resultado</p>
            <h1 className="placement-test-page__title">{result.language}</h1>

            <Card className="placement-test-result">

                <p className="placement-test-result__eyebrow text-mono-label">Nível recomendado</p>
                <p className="placement-test-result__level">{result.recommendedLevel}</p>
                <p className="placement-test-result__message text-secondary">{message}</p>

            </Card>

            <div className="placement-test-page__actions">

                {result.recommendedModuleId && (
                    <Button onClick={handleStartRecommendedModule}>
                        Começar pelo {result.recommendedLevel}
                    </Button>
                )}

                <Button variant="secondary" onClick={handleViewAllModules}>
                    Ver todos os módulos
                </Button>

                <Button variant="ghost" onClick={retake}>
                    <Icon name="shuffle" size={14} />
                    Refazer teste
                </Button>

            </div>

        </div>

    );

}
