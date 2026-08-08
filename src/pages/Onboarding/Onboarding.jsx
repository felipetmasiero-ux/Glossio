import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LanguageContext } from "../../contexts/LanguageContext";
import { Card } from "../../components/common/Card/Card";
import { Seo } from "../../components/common/Seo/Seo";

import "./Onboarding.css";

// Only ever displayed in Portuguese copy (the whole app's UI language) - the
// language *being learned* is stored as its English key ("English"/"French"/
// "Portuguese", see LanguageSelection.jsx), so it needs its own demonym here
// to read naturally in "Você já sabe {demonym}?". No other screen in the
// app translates this key - HeroCard etc. show the raw key - so this map is
// intentionally local to this one screen rather than a new shared util.
const DEMONYMS = {
    English: "inglês",
    French: "francês",
    Portuguese: "português"
};

// Reached only right after a language is chosen for the very first time on
// this device (see LanguageSelection.jsx's isFirstLanguagePick) - answers
// "where do I start", nothing else. Both destinations reuse existing,
// already-correct decision logic instead of computing anything new here:
// - "Sou iniciante" goes to /home, where getContinueLearning/getNextStep
//   (untouched) already resolve a zero-progress user to the first lesson.
// - "Já sei um pouco" goes to /placement-test?language=..., reusing the
//   deep-link support PlacementTest.jsx already has for Home/Profile.
export function Onboarding() {

    const navigate = useNavigate();
    const { language } = useContext(LanguageContext);

    const demonym = DEMONYMS[language] ?? language;

    function handleBeginner() {
        navigate("/home");
    }

    function handleHasKnowledge() {
        navigate(`/placement-test?language=${encodeURIComponent(language)}`);
    }

    return (

        <div className="onboarding-page">

            <Seo
                title="Por onde começar"
                description="Conte para o Glossio se você já sabe algo do idioma escolhido, para começarmos no lugar certo."
                robots="noindex, nofollow"
                path="/onboarding"
            />

            <div className="onboarding-page__header">
                <p className="onboarding-page__mark text-mono-label">Glossio</p>
                <h1 className="onboarding-page__title">Você já sabe {demonym}?</h1>
                <p className="onboarding-page__subtitle">Escolha a opção que melhor descreve você.</p>
            </div>

            <div className="onboarding-page__options">

                <Card as="button" type="button" className="onboarding-page__option" onClick={handleBeginner}>
                    <p className="onboarding-page__option-title">Sou iniciante</p>
                    <p className="onboarding-page__option-description">Quero começar do zero.</p>
                </Card>

                <Card as="button" type="button" className="onboarding-page__option" onClick={handleHasKnowledge}>
                    <p className="onboarding-page__option-title">Já sei um pouco</p>
                    <p className="onboarding-page__option-description">Quero descobrir meu nível.</p>
                </Card>

            </div>

        </div>

    );

}
