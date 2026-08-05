import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LanguageCard } from "../../components/common/LanguageCard/LanguageCard";
import { LanguageContext } from "../../contexts/LanguageContext";
import { trackEvent, ANALYTICS_EVENTS } from "../../utils/analytics";

import "./LanguageSelection.css";

export function LanguageSelection() {
  const navigate = useNavigate();

  const { setLanguage } = useContext(LanguageContext);

  function handleLanguage(language) {
    setLanguage(language);
    trackEvent(ANALYTICS_EVENTS.LANGUAGE_SELECTED, { language });
    navigate("/home");
  }

  const languages = [
    { key: "English", nativeName: "English", flag: "🇺🇸" },
    { key: "French", nativeName: "Français", flag: "🇫🇷" },
    { key: "Portuguese", nativeName: "Português", flag: "🇧🇷" },
  ];

  return (
    <div className="language-selection">
      <div className="language-selection-header">
        <p className="language-selection-mark text-mono-label">Glossio</p>

        <h1 className="language-selection-title">Escolha seu idioma</h1>

        <p className="language-selection-subtitle">
          Selecione o idioma que você quer aprender
        </p>
      </div>

      <div className="language-selection-grid">
        {languages.map((lang) => (
          <LanguageCard
            key={lang.key}
            language={lang.key}
            flag={lang.flag}
            nativeName={lang.nativeName}
            onClick={() => handleLanguage(lang.key)}
          />
        ))}
      </div>
    </div>
  );
}