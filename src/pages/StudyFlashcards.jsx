import { useContext } from "react";

import { FlashcardContext } from "../contexts/FlashcardContext";
import { LanguageContext } from "../contexts/LanguageContext";

import { useStudySession } from "../hooks/flashcards/useStudySession";
import { useKeyboardShortcuts } from "../hooks/flashcards/useKeyboardShortcuts";

import { StudyCard } from "../components/flashcards/StudyCard";
import { StudyProgress } from "../components/flashcards/StudyProgress";
import { RevealButton } from "../components/flashcards/RevealButton";
import { AnswerButtons } from "../components/flashcards/AnswerButtons";
import { StudySummary } from "../components/flashcards/StudySummary";

import "./StudyFlashcards.css";

export function StudyFlashcards() {

  const { flashcards, answerFlashcard } =
    useContext(FlashcardContext);

  const { language } =
    useContext(LanguageContext);

  const {

    revealed,
    setRevealed,

    sessionCards,
    totalCards,

    currentCard,

    stats,

    handleAnswer,
    restartSession

  } = useStudySession(
    flashcards,
    language,
    answerFlashcard
  );

  useKeyboardShortcuts({

    currentCard,

    revealed,
    setRevealed,

    handleAnswer

  });

  if (!sessionCards.length) {

    return (

      <StudySummary

        stats={stats}

        totalCards={totalCards}

        onRestart={restartSession}

      />

    );

  }

  return (

    <div className="study-page">

      <h1>Study Mode</h1>

      <StudyProgress
        totalCards={totalCards}
        sessionCards={sessionCards}
      />

      <StudyCard
        card={currentCard}
        revealed={revealed}
      />

      {

        !revealed

          ?

          <RevealButton
            onReveal={() => setRevealed(true)}
          />

          :

          <AnswerButtons
            onAnswer={handleAnswer}
          />

      }

    </div>

  );

}