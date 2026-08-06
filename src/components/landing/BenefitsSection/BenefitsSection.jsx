import { Card } from "../../common/Card/Card";
import { Icon } from "../../common/Icon/Icon";

import "./BenefitsSection.css";

const BENEFITS = [
    {
        key: "retention",
        icon: "clock",
        title: "Você não esquece o que aprende",
        description: "Revisão espaçada agenda cada palavra e cada lição pouco antes de você esquecer — não depende de força de vontade."
    },
    {
        key: "pace",
        icon: "target",
        title: "Estuda o que importa, no seu ritmo",
        description: "Sem sequência para não quebrar, sem pressão de tempo de tela. Você decide quando e quanto estudar."
    },
    {
        key: "progress",
        icon: "bar-chart",
        title: "Progresso que dá pra ver",
        description: "Taxa de acerto por lição e por tópico, streak de estudo e recomendações do que revisar hoje — não só uma barra de XP."
    },
    {
        key: "authentic",
        icon: "globe",
        title: "Conteúdo de verdade, não frases soltas",
        description: "Pratique com textos e vídeos autênticos, com tradução instantânea — não só flashcards fora de contexto."
    }
];

export function BenefitsSection() {

    return (

        <div className="benefits-grid">
            {BENEFITS.map(benefit => (

                <Card key={benefit.key} className="benefit-card" hoverable={false}>

                    <span className="benefit-card__icon">
                        <Icon name={benefit.icon} size={22} />
                    </span>

                    <h3 className="benefit-card__title">{benefit.title}</h3>
                    <p className="benefit-card__description">{benefit.description}</p>

                </Card>

            ))}
        </div>

    );

}
