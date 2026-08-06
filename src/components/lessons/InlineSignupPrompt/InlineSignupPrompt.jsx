import { useNavigate } from "react-router-dom";

import { LessonSection } from "../LessonSection/LessonSection";
import { Button } from "../../common/Button/Button";

import "./InlineSignupPrompt.css";

// The proactive counterpart to AuthGateBanner (which reacts to an attempted
// action) - this one is placed declaratively in the lesson content itself,
// only rendered for a visitor (never for a logged-in reader), using the
// same LessonSection wrapper every other in-lesson block already uses so
// it reads as part of the lesson, not as an ad bolted onto the page.
export function InlineSignupPrompt({
  title = "Quer lembrar dessas palavras depois?",
  description = "Crie uma conta grátis para salvar seu vocabulário e seu progresso em cada lição."
}) {

  const navigate = useNavigate();

  return (
    <LessonSection icon="cards" title={title} className="inline-signup-prompt">
      <p className="inline-signup-prompt__description">{description}</p>
      <Button onClick={() => navigate("/register")}>Criar conta grátis</Button>
    </LessonSection>
  );

}
