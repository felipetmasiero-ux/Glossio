import "./About.css";

import { Icon } from "../../components/common/Icon/Icon";
import { Seo } from "../../components/common/Seo/Seo";

const PILLARS = [
    {
        key: "learn",
        icon: "book",
        title: "Learn — o caminho guiado",
        description: "Cursos → módulos → lições → exercícios, nessa ordem. Responde \"o que estudar hoje\" quando você não quer decidir sozinho."
    },
    {
        key: "explore",
        icon: "globe",
        title: "Explore — a imersão",
        description: "Vídeos com transcrição interativa: clicar numa palavra abre a tradução sem interromper o conteúdo. Pratique com algo real, não mais um exercício."
    },
    {
        key: "collect",
        icon: "cards",
        title: "Collect — o acervo pessoal",
        description: "Palavras e frases aprendidas — de Learn ou de Explore — se acumulam num acervo pessoal organizado por tema, nunca numa lista solta."
    },
    {
        key: "review",
        icon: "clock",
        title: "Review — a retenção",
        description: "Repetição espaçada que garante que o que Learn ensinou e Explore expôs não seja esquecido. A origem nunca importa para o agendamento."
    }
];

const PRINCIPLES = [
    "Estudo de verdade, não hábito gamificado — a linguagem visual é a de uma ferramenta de estudo séria.",
    "Uma única cor de destaque em todo o app — vermelho e verde existem só para certo/errado.",
    "Aprendizado sem interrupções — salvar uma palavra ou ver uma tradução nunca tira você do que está lendo, ouvindo ou assistindo.",
    "Um único ecossistema — todo pilar novo se conecta às mesmas fichas, ao mesmo dicionário, ao mesmo progresso.",
    "Recomendação sem IA — toda sugestão de conteúdo é filtro sobre idioma, nível e tema. Você deveria sempre entender por que algo foi recomendado."
];

export function About() {

    return (

        <div className="page-container about-page animate-fade-in">

            <Seo title="Sobre" description="Conheça a metodologia do Glossio: lições estruturadas, conteúdo autêntico, vocabulário pessoal e revisão espaçada." robots="noindex, nofollow" path="/about" />

            <p className="about-page__label text-mono-label">Sobre</p>

            <h1 className="about-page__title">O que é o Glossio</h1>

            <p className="about-page__lead">
                Glossio existe para que um aprendiz autodidata sério trate aprender um idioma
                como estudo de verdade — não como hábito gamificado. O critério de sucesso não é
                tempo de tela: é retenção de vocabulário e avanço real por nível, do A1 ao C2.
            </p>

            <section className="about-page__section">

                <h2 className="about-page__section-title">Os quatro pilares</h2>

                <div className="about-pillars">
                    {PILLARS.map(pillar => (
                        <div className="about-pillar" key={pillar.key}>

                            <span className="about-pillar__icon">
                                <Icon name={pillar.icon} size={20} />
                            </span>

                            <div>
                                <h3 className="about-pillar__title">{pillar.title}</h3>
                                <p className="about-pillar__description">{pillar.description}</p>
                            </div>

                        </div>
                    ))}
                </div>

            </section>

            <section className="about-page__section">

                <h2 className="about-page__section-title">Filosofia</h2>

                <ul className="about-principles">
                    {PRINCIPLES.map(principle => (
                        <li key={principle}>{principle}</li>
                    ))}
                </ul>

            </section>

        </div>

    );

}
