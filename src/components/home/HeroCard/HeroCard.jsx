import "./HeroCard.css";

const FLAGS = {
    English: "🇺🇸",
    French: "🇫🇷",
    Portuguese: "🇧🇷"
};

export function HeroCard({ greeting, language }) {

    return (

        <div className="hero-card">

            <p className="hero-card__eyebrow text-mono-label">
                {FLAGS[language] ?? "🌐"} {language}
            </p>

            <h1 className="hero-card__greeting">
                {greeting}
            </h1>

        </div>

    );

}
