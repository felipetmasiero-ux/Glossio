import { Button } from "../common/Button/Button";
import "./AnswerButtons.css";

export function AnswerButtons({ onAnswer }) {
  return (
    <div className="answer-buttons">
      <Button className="again-btn" onClick={() => onAnswer(1)}>Again</Button>
      <Button className="good-btn" onClick={() => onAnswer(3)}>Good</Button>
      <Button className="easy-btn" onClick={() => onAnswer(5)}>Easy</Button>
    </div>
  );
}