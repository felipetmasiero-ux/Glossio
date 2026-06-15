import { useContext, useState } from "react";
import { FlashcardContext } from "../contexts/FlashcardContext";
import { LanguageContext } from "../contexts/LanguageContext";
import "./StudyFlashcards.css";


export function StudyFlashcards() {

  const { flashcards, answerFlashcard } = useContext(FlashcardContext);

  const { language } = useContext(LanguageContext);

  const [revealed, setRevealed] = useState(false);

  const sessionStart = useState(() => Date.now())[0];

  const [sessionCards, setSessionCards] = useState(() =>
    flashcards.filter(card =>
      card.language === language &&
      card.nextReview <= sessionStart
    )
  );

  const [totalCards] = useState(sessionCards.length);


  const currentCard = sessionCards[0];

  if (sessionCards.length === 0) {
    return (
      <div className="study-page">
        <h1>🎉 Study completed!</h1>
        <p>No cards to review.</p>
      </div>
    );
  }

  function handleAnswer(quality) {

    answerFlashcard(currentCard.id, quality);

    setSessionCards(previous =>
      previous.filter(card => card.id !== currentCard.id)
    );

    setRevealed(false);
  }

  return (
    <div className="study-page">

      <h1>Study Mode</h1>

      <div className="progress-container">

        <div
          className="progress-bar"
          style={{
            width: `${((totalCards - sessionCards.length) / totalCards) * 100}%`
          }}
        />

      </div>

      <p className="study-progress">
        {totalCards - sessionCards.length} / {totalCards}
      </p>

      <div className="study-container"></div>

      <p className="study-progress">
        Card {totalCards - sessionCards.length + 1} of {totalCards}
      </p>

      <div
        className={`study-card ${revealed ? "revealed" : ""}`}
      >
        <div className="study-card-inner">

          <div className="study-face study-front">
            <h2>{currentCard.word}</h2>
          </div>

          <div className="study-face study-back">
            <h2>{currentCard.translation}</h2>
          </div>

        </div>
      </div>

      {!revealed ? (

        <button
          className="reveal-btn"
          onClick={() => setRevealed(true)}
        >
          Reveal
        </button>

      ) : (

        <div className="answer-buttons">

          <button onClick={() => handleAnswer(1)} className="again-btn" >Again</button>
          <button onClick={() => handleAnswer(3)} className="good-btn">Good</button>
          <button onClick={() => handleAnswer(5)} className="easy-btn">Easy</button>

        </div>

      )}

      
    </div>
  );
}