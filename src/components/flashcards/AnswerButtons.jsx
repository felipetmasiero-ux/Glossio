import { Button } from "../common/Button/Button";
import { Icon } from "../common/Icon/Icon";
import "./AnswerButtons.css";

export function AnswerButtons({ onAnswer }) {
  return (
    <div className="answer-buttons">
      <Button variant="danger" className="again-btn" onClick={() => onAnswer(1)}>
        <Icon name="x" size={15} /> De novo
      </Button>
      <Button variant="warning" className="good-btn" onClick={() => onAnswer(3)}>
        <Icon name="check" size={15} /> Bom
      </Button>
      <Button variant="success" className="easy-btn" onClick={() => onAnswer(5)}>
        <Icon name="star" size={15} /> Fácil
      </Button>
    </div>
  );
}
