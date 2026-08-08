import { useNavigate } from "react-router-dom";

import { SummaryCard } from "../SummaryCard/SummaryCard";

const ICON_BY_TYPE = {
    exercise: "pencil",
    flashcards: "cards",
    lesson: "book",
    video: "play"
};

// R4 (post-sprint audit, H3): Home only ever renders this card now when
// lastActivity exists but *lost* getNextStep's priority race to something
// else (see Home.jsx's showResumeActivityCard) - PrimaryActionCard already
// owns the "next action" CTA in that case. This is no longer a competing
// action, just contextual "you can also resume this" information, so the
// CTA uses SummaryCard's default secondary styling instead of the primary
// one it used to override - the smallest change that stops it from reading
// as a second main call to action, without touching activity.label/href
// (data layer, untouched) or inventing a new component.
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
            ctaIcon={null}
            onCtaClick={() => navigate(activity.href)}
        />

    );

}
