import "./WeeklyEvolutionCard.css";

const SERIES = [
    { key: "reviews", label: "Revisões", className: "weekly-evolution-card__bar--reviews" },
    { key: "lessons", label: "Lições", className: "weekly-evolution-card__bar--lessons" },
    { key: "videos", label: "Vídeos", className: "weekly-evolution-card__bar--videos" }
];

export function WeeklyEvolutionCard({ weeklyActivity }) {

    const maxValue = Math.max(
        1,
        ...weeklyActivity.flatMap(week => [week.reviews, week.lessons, week.videos])
    );

    return (

        <div className="weekly-evolution-card">

            <div className="weekly-evolution-card__legend">
                {SERIES.map(series => (
                    <span className="weekly-evolution-card__legend-item text-mono-label" key={series.key}>
                        <span className={`weekly-evolution-card__dot ${series.className}`} />
                        {series.label}
                    </span>
                ))}
            </div>

            <div className="weekly-evolution-card__chart">
                {weeklyActivity.map(week => (

                    <div className="weekly-evolution-card__week" key={week.weekStart}>

                        <div className="weekly-evolution-card__bars">
                            {SERIES.map(series => {

                                const value = week[series.key];
                                const heightPercentage = value > 0 ? Math.max(6, (value / maxValue) * 100) : 0;

                                return (
                                    <div
                                        key={series.key}
                                        className={`weekly-evolution-card__bar ${series.className}`}
                                        style={{ height: `${heightPercentage}%` }}
                                        role="progressbar"
                                        aria-valuenow={value}
                                        aria-valuemin={0}
                                        aria-valuemax={maxValue}
                                        aria-label={`${series.label} na semana de ${week.label}: ${value}`}
                                    />
                                );

                            })}
                        </div>

                        <span className="weekly-evolution-card__label text-mono-label">{week.label}</span>

                    </div>

                ))}
            </div>

        </div>

    );

}
