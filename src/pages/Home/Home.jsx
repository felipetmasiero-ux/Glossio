import { Link } from "react-router-dom";
import { homeFeatures } from "../../config/homeFeatures";
import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Icon } from "../../components/common/Icon/Icon";
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
      <div className="home__header">
        <p className="home__eyebrow">
          {flagMap[language] || "🌐"} {language}
        </p>

        <h1 className="home__title">Bem-vindo de volta</h1>

        <p className="home__subtitle">
          O que você quer praticar hoje?
        </p>
      </div>

      <p className="home__index-label text-mono-label">Índice</p>

      <nav className="home__index" aria-label="Seções do caderno">
        {homeFeatures.map((feature) => (
          <Link key={feature.to} to={feature.to} className="home__entry">
            <span className="home__entry-number text-mono-label">{feature.number}</span>
            <span className="home__entry-icon">
              <Icon name={feature.icon} size={20} />
            </span>
            <span className="home__entry-body">
              <span className="home__entry-title">{feature.label}</span>
              <span className="home__entry-description">{feature.description}</span>
            </span>
            <Icon name="chevron-right" size={16} className="home__entry-arrow" />
          </Link>
        ))}
      </nav>
    </div>
  );
}
