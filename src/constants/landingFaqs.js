// Single source of truth for the landing page's FAQ - both the visible
// accordion (FaqSection.jsx) and its FAQPage JSON-LD (Landing.jsx, via
// buildFaqSchema) read from this list, so the structured data can never
// drift from what's actually shown on the page.
export const FAQS = [
    {
        question: "O Glossio é gratuito?",
        answer: "Sim. Você pode criar uma conta e estudar sem nenhum custo."
    },
    {
        question: "Preciso criar conta para começar?",
        answer: "Não. Você pode explorar lições reais sem criar conta — só a gravação de progresso, flashcards e exercícios exige login."
    },
    {
        question: "Funciona no celular?",
        answer: "Sim. O Glossio é um PWA: dá para instalar na tela inicial do celular e usar como um app, direto do navegador."
    },
    {
        question: "Quais idiomas estão disponíveis?",
        answer: "Inglês, francês e português, do nível A1 ao C2, no padrão CEFR."
    },
    {
        question: "Como funciona a revisão espaçada?",
        answer: "Cada ficha é reagendada automaticamente a partir do seu desempenho: quanto melhor você lembra, maior o intervalo até a próxima revisão."
    },
    {
        question: "Preciso saber o nível antes de começar?",
        answer: "Não. Dá para começar do zero, ou fazer o teste de nivelamento para começar já no nível certo."
    },
    {
        question: "Tem anúncios?",
        answer: "Não."
    }
];
