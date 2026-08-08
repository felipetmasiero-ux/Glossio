import { Card } from "../../common/Card/Card";
import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";

import "./SummaryCard.css";

// Shared visual shell for Home's "summary" cards (Statistics, Achievements,
// Favorites, Placement Test, Resume Activity) - purely presentational, no
// business rules. Each specific card still computes its own data/labels and
// decides its own destination; this only renders icon + title + value +
// description + auxiliary content + CTA in one of two layouts already
// observed across those cards:
//   "stacked" (icon+text on top, CTA below, left-aligned) - Statistics,
//     Favorites, Placement Test.
//   "inline" (icon, text and CTA all in one row) - Achievements, Resume
//     Activity.
// ContinueLearningCard was deliberately NOT folded into this - it has three
// real states (empty/finished/in-progress), an eyebrow, a level badge and a
// category line that don't map onto any of the slots below without
// inventing props no other card needs (see U1 sprint report).
export function SummaryCard({
    className = "",
    layout = "stacked",
    icon,
    iconVariant = "plain",
    iconFill,
    title,
    value,
    numericValue = true,
    description,
    children,
    ctaLabel,
    onCtaClick,
    ctaVariant = "secondary",
    ctaIcon = "chevron-right"
}) {

    const isTitleOnly = Boolean(title) && !value && !children;

    return (

        <Card className={`home-summary-card home-summary-card--${layout} ${className}`.trim()} hoverable={false}>

            {icon && (
                <span className={`home-summary-card__icon ${iconVariant === "badge" ? "home-summary-card__icon--badge" : ""}`.trim()}>
                    <Icon name={icon} size={iconVariant === "badge" ? 18 : 20} fill={iconFill} />
                </span>
            )}

            <div className="home-summary-card__body">

                {title && (
                    <p className={`home-summary-card__title ${isTitleOnly ? "home-summary-card__title--prominent" : ""}`.trim()}>
                        {title}
                    </p>
                )}

                {value && (
                    <p className={`home-summary-card__value ${numericValue ? "home-summary-card__value--numeric" : ""}`.trim()}>
                        {value}
                    </p>
                )}

                {children}

                {description && (
                    <p className="home-summary-card__description">
                        {description}
                    </p>
                )}

            </div>

            {ctaLabel && (
                <Button variant={ctaVariant} onClick={onCtaClick}>
                    {ctaLabel}
                    {ctaIcon && <Icon name={ctaIcon} size={16} />}
                </Button>
            )}

        </Card>

    );

}
