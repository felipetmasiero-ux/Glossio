import "./HowItWorksSection.css";

const STEPS = [
    {
        key: "choose",
        title: "Escolha um idioma",
        description: "Inglês, francês ou português — do zero ao avançado, por nível CEFR (A1 → C2)."
    },
    {
        key: "study",
        title: "Estude lições estruturadas",
        description: "Cada lição ensina vocabulário, gramática e prática, sempre na ordem certa."
    },
    {
        key: "save",
        title: "Salve o vocabulário novo",
        description: "Toda palavra que você marca — numa lição ou num vídeo — vira uma ficha no seu acervo pessoal."
    },
    {
        key: "review",
        title: "Revise no momento certo",
        description: "A revisão espaçada avisa quando revisar cada ficha, antes que você tenha chance de esquecer."
    }
];

export function HowItWorksSection() {

    return (

        <ol className="how-it-works">
            {STEPS.map((step, index) => (

                <li className="how-it-works__step" key={step.key}>

                    <span className="how-it-works__number text-mono-number" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                        <h3 className="how-it-works__title">{step.title}</h3>
                        <p className="how-it-works__description">{step.description}</p>
                    </div>

                </li>

            ))}
        </ol>

    );

}
