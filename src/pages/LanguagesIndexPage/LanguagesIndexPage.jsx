import { useNavigate } from "react-router-dom";

import { LanguageCard } from "../../components/common/LanguageCard/LanguageCard";
import { Seo } from "../../components/common/Seo/Seo";

import { SUPPORTED_LANGUAGES } from "../../constants/languages";

// Reuses LanguageSelection's exact layout (same CSS classes) - this is the
// public, unauthenticated counterpart to it: picking a language here never
// touches LanguageContext or requires a session, it just links into the
// public course browser (/lessons/language/:language).
import "../LanguageSelection/LanguageSelection.css";

const LANGUAGE_DISPLAY = {
    English: { flag: "🇺🇸", nativeName: "English" },
    French: { flag: "🇫🇷", nativeName: "Français" },
    Portuguese: { flag: "🇧🇷", nativeName: "Português" }
};

export function LanguagesIndexPage() {

    const navigate = useNavigate();

    return (
        <div className="language-selection">

            <Seo
                title="Idiomas"
                description="Explore lições gratuitas de inglês, francês e português no Glossio - sem precisar criar conta."
                path="/languages"
            />

            <div className="language-selection-header">
                <p className="language-selection-mark text-mono-label">Glossio</p>

                <h1 className="language-selection-title">Escolha um idioma</h1>

                <p className="language-selection-subtitle">
                    Explore as lições gratuitamente, sem criar conta
                </p>
            </div>

            <div className="language-selection-grid">
                {SUPPORTED_LANGUAGES.map((language) => (
                    <LanguageCard
                        key={language}
                        language={language}
                        flag={LANGUAGE_DISPLAY[language].flag}
                        nativeName={LANGUAGE_DISPLAY[language].nativeName}
                        onClick={() => navigate(`/lessons/language/${language.toLowerCase()}`)}
                    />
                ))}
            </div>

        </div>
    );

}
