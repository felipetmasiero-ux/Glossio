import { educationBlocks } from "../../shared/portuguese/c1/education";

export const educationTopic = {

    id: "portuguese-c1-education",

    language: "portuguese",

    level: "C1",

    topic: "education",

    lessonId: "portuguese-c1-education",

    title: "Nominalização e Registro Acadêmico",

    summary: "Transformar verbos e adjetivos em substantivos abstratos para um tom acadêmico mais formal e objetivo.",

    explanation: educationBlocks,

    rules: [
        "nominalização: verbo/adjetivo → substantivo abstrato ('avaliar' → 'a avaliação de').",
        "típica de textos universitários e relatórios formais.",
        "não deve ser usada em excesso — alternar com frases diretas."
    ],

    examples: [
        "Uma avaliação diferente dos alunos é, sem dúvida, necessária.",
        "A implementação dessa reforma segue sendo um desafio.",
        "Há uma conscientização crescente sobre os limites da decoreba.",
        "Em certa medida, a avaliação padronizada mede a coisa errada."
    ],

    notes: [
        "O português acadêmico nominaliza bastante, mas a fala cotidiana prefere amplamente o verbo direto."
    ],

    commonMistakes: [
        "Nominalizar cada frase, o que produz um texto artificialmente acadêmico em vez de uma comunicação clara."
    ],

    tips: [
        "Se uma frase parece um resumo de pesquisa quando você só está conversando, provavelmente você nominalizou demais — volte ao verbo."
    ]

};
