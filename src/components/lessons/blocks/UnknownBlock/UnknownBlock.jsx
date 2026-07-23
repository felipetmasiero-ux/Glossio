import { LessonSection } from "../../LessonSection/LessonSection";
import "./UnknownBlock.css";

export function UnknownBlock({ block }) {
  return (
    <LessonSection className="unknown-block">
      <h3>⚠ Unsupported block</h3>
      <p>
        Type: <strong>{block.type}</strong>
      </p>
    </LessonSection>
  );
}