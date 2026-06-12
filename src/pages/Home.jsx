import { Link } from "react-router-dom";
import { homeFeatures } from "../data/homeFeatures";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import "./Home.css";

const flagMap = {
  English: "🇺🇸",
  French: "🇫🇷",
  Portuguese: "🇧🇷",
};

export function Home() {
  const { language } =
    useContext(LanguageContext);

  return (
    <div className="page-container">
      <div style={{ marginBottom: 40 }}>
        <p className="home__eyebrow">
          {flagMap[language] || "🌐"} {language}
        </p>

        <h1>Bem-vindo de volta</h1>

        <p style={{ marginTop: 8, fontSize: 15 }}>
          O que você quer praticar hoje?
        </p>
      </div>

      <div className="home__grid">
        {homeFeatures.map((feature) => (
          <Link
            key={feature.to}
            to={feature.to}
            className="home__card"
            style={{ "--card-accent": feature.accent }}
          >
            <div
              className="home__card-icon"
              style={{ background: feature.bg }}
            >
              {feature.icon}
            </div>

            <div>
              <p className="home__card-title">{feature.label}</p>
              <p className="home__card-description">
                {feature.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}