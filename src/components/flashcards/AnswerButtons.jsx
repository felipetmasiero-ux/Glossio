import { Button } from "../common/Button/Button";
import "./AnswerButtons.css";

export function AnswerButtons({ onAnswer }) {
  return (
    <div className="answer-buttons">
      <Button variant="danger" className="again-btn" onClick={() => onAnswer(1)}>Again</Button>
      <Button variant="warning" className="good-btn" onClick={() => onAnswer(3)}>Good</Button>
      <Button variant="success" className="easy-btn" onClick={() => onAnswer(5)}>Easy</Button>
    </div>
  );
}