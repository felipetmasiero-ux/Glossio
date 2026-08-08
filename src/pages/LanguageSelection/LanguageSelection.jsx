import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LanguageCard } from "../../components/common/LanguageCard/LanguageCard";
import { LanguageContext } from "../../contexts/LanguageContext";
import { trackEvent, ANALYTICS_EVENTS } from "../../utils/analytics";
import { Seo } from "../../components/common/Seo/Seo";

import "./LanguageSelection.css";

export function LanguageSelection() {
  const navigate = useNavigate();

  const { language: currentLanguage, setLanguage } = useContext(LanguageContext);

  function handleLanguage(language) {

    // A language already existed before this pick - this is an existing
    // user switching their study language (e.g. via Profile's "trocar
    // idioma" link, or a resumed session), not someone picking one for the
    // very first time. Same signal Register.jsx/Login.jsx already use to
    // decide whether this screen is even reachable in the first place.
    const isFirstLanguagePick = !currentLanguage;

    setLanguage(language);
    trackEvent(ANALYTICS_EVENTS.LANGUAGE_SELECTED, { language });

    navigate(isFirstLanguagePick ? "/onboarding" : "/home");

  }

  const languages = [
    { key: "English", nativeName: "English", flag: "🇺🇸" },
    { key: "French", nativeName: "Français", flag: "🇫🇷" },
    { key: "Portuguese", nativeName: "Português", flag: "🇧🇷" },
  ];

  return (
    <div className="language-selection">
      <Seo title="Escolha seu Idioma" description="Escolha o idioma que você quer aprender no Glossio." robots="noindex, nofollow" path="/choose-language" />

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