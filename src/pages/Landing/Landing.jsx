import { useNavigate } from "react-router-dom";

import "./Landing.css";

import { Button } from "../../components/common/Button/Button";
import { Icon } from "../../components/common/Icon/Icon";

const PILLARS = [
    {
        key: "learn",
        icon: "book",
        title: "Learn",
        description: "Cursos guiados por nível (CEFR: A1 → C2), lição por lição, na ordem certa."
    },
    {
        key: "explore",
        icon: "globe",
        title: "Explore",
        description: "Conteúdo autêntico com tradução instantânea — pratique com algo real."
    },
    {
        key: "collect",
        icon: "cards",
        title: "Collect",
        description: "Todo vocabulário aprendido se acumula num acervo pessoal organizado por tema."
    },
    {
        key: "review",
        icon: "clock",
        title: "Review",
        description: "Revisão espaçada que garante que o que você aprendeu nunca se perca."
    }
];

const LANGUAGES = [
    { flag: "🇺🇸", name: "Inglês" },
    { flag: "🇫🇷", name: "Francês" },
    { flag: "🇧🇷", name: "Português" }
];

export function Landing() {

    const navigate = useNavigate();

    return (

        <div className="landing animate-fade-in">

            <section className="landing-hero">

                <div className="landing-hero__illustration" aria-hidden="true">
                    <div className="landing-hero__card landing-hero__card--back card card--notch" />
                    <div className="landing-hero__card landing-hero__card--front card card--notch">
                        <Icon name="book" size={30} />
                    </div>
                </div>

                <p className="landing-hero__wordmark text-mono-label">Glossio</p>

                <h1 className="landing-hero__title">
                    Aprenda um idioma como estudo de verdade.
                </h1>

                <p className="landing-hero__description">
                    Lições estruturadas, conteúdo autêntico, um acervo pessoal de vocabulário
                    e revisão espaçada — tudo em um só lugar, sem hábito gamificado.
                </p>

                <Button onClick={() => navigate("/choose-language")}>
                    Começar agora
                </Button>

                <ul className="landing-hero__languages">
                    {LANGUAGES.map(lang => (
                        <li key={lang.name}>
                            <span aria-hidden="true">{lang.flag}</span> {lang.name}
                        </li>
                    ))}
                </ul>

            </section>

            <section className="landing-pillars">

                <p className="landing-pillars__label text-mono-label">Os quatro pilares</p>

                <div className="landing-pillars__list">
                    {PILLARS.map(pillar => (
                        <div className="landing-pillar-row" key={pillar.key}>

                            <span className="landing-pillar-row__icon">
                                <Icon name={pillar.icon} size={20} />
                            </span>

                            <div className="landing-pillar-row__body">
                                <h3 className="landing-pillar-row__title">{pillar.title}</h3>
                                <p className="landing-pillar-row__description">{pillar.description}</p>
                            </div>

                        </div>
                    ))}
                </div>

            </section>

        </div>

    );

}
