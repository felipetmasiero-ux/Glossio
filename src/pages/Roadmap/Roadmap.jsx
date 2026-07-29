import "./Roadmap.css";

const PHASES = [
    {
        key: "beta",
        status: "Fase atual",
        title: "Beta",
        description: "O ciclo completo já funciona de ponta a ponta.",
        items: [
            "Learn: cursos, módulos, lições e exercícios, com bloqueio sequencial",
            "Explore: vídeos com transcrição interativa e tradução instantânea",
            "Collect: acervo pessoal de vocabulário, agrupado por tema",
            "Review: repetição espaçada, sessão de estudo e atalhos de teclado",
            "Recomendações entre Learn e Explore pelo mesmo tema, sem IA"
        ]
    },
    {
        key: "v1",
        status: "Próxima fase",
        title: "v1.0",
        description: "Amadurecer o ecossistema que já existe, não abrir uma frente nova.",
        items: [
            "Mais níveis de conteúdo estruturado (B1 em diante)",
            "Collections visuais mais ricas dentro de Collect",
            "Frases clicáveis em texto corrido, não só em vídeo",
            "Explore ganha novos tipos de conteúdo além de vídeo"
        ]
    },
    {
        key: "commercial",
        status: "Visão de longo prazo",
        title: "Commercial",
        description: "A fundação técnica para escalar além de um dispositivo só.",
        items: [
            "Contas e sincronização entre dispositivos",
            "Backend real por trás do que hoje vive no armazenamento local",
            "Expansão de idiomas e conteúdo"
        ]
    }
];

export function Roadmap() {

    return (

        <div className="page-container roadmap-page animate-fade-in">

            <p className="roadmap-page__label text-mono-label">Roadmap</p>

            <h1 className="roadmap-page__title">Para onde o Glossio vai</h1>

            <p className="roadmap-page__lead">
                Sem promessas de data — só a ordem das fases e o que cada uma prioriza.
            </p>

            <ol className="roadmap-phases">
                {PHASES.map(phase => (
                    <li className="roadmap-phase" key={phase.key}>

                        <div className="roadmap-phase__marker" aria-hidden="true" />

                        <div className="roadmap-phase__body">

                            <p className="roadmap-phase__status text-mono-label">{phase.status}</p>

                            <h2 className="roadmap-phase__title">{phase.title}</h2>

                            <p className="roadmap-phase__description">{phase.description}</p>

                            <ul className="roadmap-phase__items">
                                {phase.items.map(item => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>

                        </div>

                    </li>
                ))}
            </ol>

        </div>

    );

}
