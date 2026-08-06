import { useNavigate } from "react-router-dom";

import { LanguageCard } from "../../common/LanguageCard/LanguageCard";
import { SUPPORTED_LANGUAGES } from "../../../constants/languages";

import "./LanguagesSection.css";

const LANGUAGE_DISPLAY = {
    English: { flag: "🇺🇸", nativeName: "English" },
    French: { flag: "🇫🇷", nativeName: "Français" },
    Portuguese: { flag: "🇧🇷", nativeName: "Português" }
};

// Reuses the same LanguageCard + /lessons/language/:language route as
// LanguagesIndexPage.jsx (the public course browser) - clicking a language
// here opens real lesson content with no account required.
export function LanguagesSection() {

    const navigate = useNavigate();

    return (

        <div className="languages-grid">
            {SUPPORTED_LANGUAGES.map(language => (
                <LanguageCard
                    key={language}
                    language={language}
                    flag={LANGUAGE_DISPLAY[language].flag}
                    nativeName={LANGUAGE_DISPLAY[language].nativeName}
                    onClick={() => navigate(`/lessons/language/${language.toLowerCase()}`)}
                />
            ))}
        </div>

    );

}
