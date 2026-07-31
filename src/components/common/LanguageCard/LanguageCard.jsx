import { Card } from "../Card/Card";
import "./LanguageCard.css";

export function LanguageCard({ language, flag, nativeName, onClick }) {
  return (
    <Card as="button" className="language-card" onClick={onClick}>
      <span className="language-card__flag">{flag}</span>
      <div>
        <p className="language-card__native">{nativeName}</p>
        <p className="language-card__name">{language}</p>
      </div>
    </Card>
  );
}