import { Link } from "react-router-dom";

import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";

import "./HeroSection.css";

const LANGUAGES = [
    { flag: "🇺🇸", name: "Inglês" },
    { flag: "🇫🇷", name: "Francês" },
    { flag: "🇧🇷", name: "Português" }
];

const TRUST_SIGNALS = [
    "Grátis para começar",
    "Sem anúncios",
    "Sem hábito gamificado"
];

// Kept self-contained (not wrapped in LandingSection) - the hero has its
// own unique full-width, illustration-led layout that doesn't fit the
// eyebrow/title/tone pattern the sections below it share.
export function HeroSection({ onPrimaryCta }) {

    return (

        <section className="landing-hero">

            <div className="landing-hero__illustration" aria-hidden="true">
                <div className="landing-hero__card landing-hero__card--back card card--notch" />
                <div className="landing-hero__card landing-hero__card--front card card--notch">
                    <img src="/logo.png" alt="" className="landing-hero__logo-image" />
                </div>
            </div>

            <p className="landing-hero__wordmark text-mono-label">Glossio</p>

            <h1 className="landing-hero__title">
                Aprender um idioma não devia ser um jogo de sequências.
            </h1>

            <p className="landing-hero__description">
                Glossio é uma ferramenta de estudo de verdade: lições estruturadas por
                nível (CEFR A1–C2), conteúdo autêntico com tradução instantânea, um
                acervo pessoal de vocabulário e revisão espaçada que garante que você
                não esqueça o que aprendeu.
            </p>

            <div className="landing-hero__actions">
                <Button onClick={onPrimaryCta}>
                    Começar agora
                </Button>

                <Link to="/placement-test" className="landing-hero__secondary-link">
                    Já sabe um pouco? Faça um teste.
                </Link>

                <Link to="/languages" className="landing-hero__tertiary-link">
                    Ver o conteúdo sem criar conta
                    <Icon name="chevron-right" size={14} />
                </Link>
            </div>

            <ul className="landing-hero__trust" aria-label="Por que confiar no Glossio">
                {TRUST_SIGNALS.map(signal => (
                    <li key={signal}>
                        <Icon name="check" size={14} />
                        {signal}
                    </li>
                ))}
            </ul>

            <ul className="landing-hero__languages">
                {LANGUAGES.map(lang => (
                    <li key={lang.name}>
                        <span aria-hidden="true">{lang.flag}</span> {lang.name}
                    </li>
                ))}
            </ul>

        </section>

    );

}
