import { useEffect, useState } from "react";
import { LanguageContext } from "./LanguageContext";

export function LanguageProvider({ children }) {

    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "english"
    );

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}