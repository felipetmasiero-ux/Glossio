import { LessonSection } from "../../LessonSection/LessonSection";
import "./UnknownBlock.css";

export function UnknownBlock({ block }) {
  return (
    <LessonSection className="unknown-block">
      <h3>Bloco não suportado</h3>
      <p>
        Tipo: <strong>{block.type}</strong>
      </p>
    </LessonSection>
  );
}
