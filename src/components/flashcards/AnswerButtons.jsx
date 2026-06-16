export function AnswerButtons({ onAnswer }) {
  return (
    <div className="answer-buttons">

      <button
        className="again-btn"
        onClick={() => onAnswer(1)}
      >
        Again
      </button>

      <button
        className="good-btn"
        onClick={() => onAnswer(3)}
      >
        Good
      </button>

      <button
        className="easy-btn"
        onClick={() => onAnswer(5)}
      >
        Easy
      </button>

    </div>
  );
}