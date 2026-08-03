import { useEffect, useMemo, useRef, useState } from "react";

import { useLanguage } from "../../hooks/useLanguage";
import { useFlashcards } from "../../hooks/useFlashcards";
import { useEvents } from "../../hooks/useEvents";

import { GoalsStorage } from "../../utils/goals/goalsStorage";
import { getGoalSummary } from "../../utils/goals/getGoalSummary";
import { getGoalHistory } from "../../utils/goals/getGoalHistory";

import { Section } from "../../components/common/Section/Section";
import { Toast } from "../../components/common/Toast/Toast";
import { GoalsForm } from "../../components/goals/GoalsForm";
import { GoalDetailRow } from "../../components/goals/GoalDetailRow";
import { GoalHistoryStrip } from "../../components/goals/GoalHistoryStrip";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";

import "./Goals.css";

function formatMinutes(minutes) {

    if (minutes <= 0) return "0min";
    if (minutes < 60) return `${minutes}min`;

    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;

    return rest === 0 ? `${hours}h` : `${hours}h${rest}min`;

}

export function Goals() {

    const { language } = useLanguage();
    const { flashcards } = useFlashcards();
    const { events } = useEvents();

    const [goals, setGoals] = useState(GoalsStorage.getGoals);
    const [isSaving, setIsSaving] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const toastTimeoutRef = useRef(null);

    useEffect(() => () => clearTimeout(toastTimeoutRef.current), []);

    const summary = useMemo(() => getGoalSummary({
        language, flashcards, events, goals
    }), [language, flashcards, events, goals]);

    const history = useMemo(() => getGoalHistory({
        events, flashcards, language, goals, days: 7
    }), [events, flashcards, language, goals]);

    function handleSubmit(event) {

        event.preventDefault();
        setIsSaving(true);

        GoalsStorage.saveGoals(goals);

        setToastMessage("Metas salvas.");
        setIsSaving(false);
        clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = setTimeout(() => setToastMessage(""), 2500);

    }

    return (

        <div className="page-container goals-page animate-fade-in">

            <p className="goals-page__label text-mono-label">Metas</p>
            <h1 className="goals-page__title">Metas de estudo</h1>

            <Section title="Configurar metas">
                <GoalsForm goals={goals} onChange={setGoals} onSubmit={handleSubmit} isSaving={isSaving} />
            </Section>

            {!summary.hasAnyGoal ? (

                <EmptyState
                    icon="target"
                    title="Nenhuma meta configurada ainda"
                    description="Defina ao menos uma meta acima para começar a acompanhar seu progresso diário e semanal."
                />

            ) : (

                <>

                    <Section title="Hoje">

                        {summary.recommendation && (
                            <p className="goals-page__recommendation">{summary.recommendation}</p>
                        )}

                        <div className="goals-page__rows">
                            <GoalDetailRow label="Lições" goal={summary.daily.lessons} />
                            <GoalDetailRow label="Revisões" goal={summary.daily.reviews} />
                            <GoalDetailRow label="Vídeos" goal={summary.daily.videoMinutes} unit=" min" />
                        </div>

                        {summary.daily.anyConfigured && !summary.daily.allCompleted && (
                            <p className="goals-page__estimate">
                                Tempo estimado para concluir hoje: {formatMinutes(summary.estimatedMinutesRemaining)}
                            </p>
                        )}

                    </Section>

                    <Section title="Esta semana">
                        <div className="goals-page__rows">
                            <GoalDetailRow label="Minutos de estudo" goal={summary.weekly.minutes} unit=" min" />
                            <GoalDetailRow label="Lições" goal={summary.weekly.lessons} />
                        </div>
                    </Section>

                </>

            )}

            <Section title="Últimos 7 dias">
                <GoalHistoryStrip history={history} />
            </Section>

            <Toast message={toastMessage} />

        </div>

    );

}
