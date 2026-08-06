import { Icon } from "../../common/Icon/Icon";

import "./FeaturesSection.css";

// Copy adapted from the app's own methodology (see About.jsx's PILLARS/
// PRINCIPLES) for a benefit angle, not invented separately - Learn/Explore/
// Collect/Review is Glossio's actual product structure, not marketing spin.
const FEATURES = [
    {
        key: "learn",
        icon: "book",
        title: "Learn",
        description: "Cursos guiados por nível (CEFR: A1 → C2), lição por lição, na ordem certa. Você nunca precisa adivinhar o que estudar hoje."
    },
    {
        key: "explore",
        icon: "globe",
        title: "Explore",
        description: "Vídeos e textos autênticos com tradução instantânea — clique numa palavra sem sair do que está lendo ou assistindo."
    },
    {
        key: "collect",
        icon: "cards",
        title: "Collect",
        description: "Todo vocabulário novo — de uma lição ou de um vídeo — vira uma ficha no seu acervo pessoal, organizado por tema."
    },
    {
        key: "review",
        icon: "clock",
        title: "Review",
        description: "Repetição espaçada garante que o que você aprendeu não se perca — a origem da palavra nunca importa para o agendamento."
    }
];

export function FeaturesSection() {

    return (

        <div className="features-grid">
            {FEATURES.map(feature => (

                <div className="feature-row" key={feature.key}>

                    <span className="feature-row__icon">
                        <Icon name={feature.icon} size={22} />
                    </span>

                    <div>
                        <h3 className="feature-row__title">{feature.title}</h3>
                        <p className="feature-row__description">{feature.description}</p>
                    </div>

                </div>

            ))}
        </div>

    );

}
