import { useNavigate } from "react-router-dom";

import { SummaryCard } from "../SummaryCard/SummaryCard";

const ICON_BY_TYPE = {
    exercise: "pencil",
    flashcards: "cards",
    lesson: "book",
    video: "play"
};

export function ResumeActivityCard({ activity }) {

    const navigate = useNavigate();

    if (!activity) return null;

    return (

        <SummaryCard
            className="resume-activity-card"
            layout="inline"
            icon={ICON_BY_TYPE[activity.type] ?? "cards"}
            iconVariant="badge"
            title={activity.label}
            description={
                typeof activity.remaining === "number"
                    ? `${activity.remaining} ${activity.remaining === 1 ? "restante" : "restantes"}`
                    : null
            }
            ctaLabel="Continuar"
            ctaVariant="primary"
            ctaIcon={null}
            onCtaClick={() => navigate(activity.href)}
        />

    );

}
