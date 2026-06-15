import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import "./LanguageCard.css";

export function LanguageCard({ flag, nativeName, onClick }) {
  const {language} = useContext(LanguageContext)
  return (
    <button className="language-card" onClick={onClick}>
      <span className="language-card__flag">{flag}</span>
      <div>
        <p className="language-card__native">{nativeName}</p>
        <p className="language-card__name">{language}</p>
      </div>
    </button>
  );
}
