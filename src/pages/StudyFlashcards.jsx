import { useContext, useState } from "react";

import { FlashcardContext } from "../contexts/FlashcardContext";
import { LanguageContext } from "../contexts/LanguageContext";

import { useStudySession } from "../hooks/flashcards/useStudySession";
import { useKeyboardShortcuts } from "../hooks/flashcards/useKeyboardShortcuts";

import { StudyCard } from "../components/flashcards/StudyCard";
import { StudyProgress } from "../components/flashcards/StudyProgress";
import { RevealButton } from "../components/flashcards/RevealButton";
import { AnswerButtons } from "../components/flashcards/AnswerButtons";
import { StudySummary } from "../components/flashcards/StudySummary";
import { StudyDashboard } from "../components/flashcards/StudyDashboard";

import "./StudyFlashcards.css";

export function StudyFlashcards() {

  const [started, setStarted] =
    useState(false);

  const { flashcards, answerFlashcard } =
    useContext(FlashcardContext);

  const { language } =
    useContext(LanguageContext);

  const {

    revealed,

    setRevealed,

    sessionCards,

    currentCard,

    stats,

    completedCards,

    initialSessionSize,

    leaving,

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

  if (!started) {

    return (

      <StudyDashboard

        dueCards={sessionCards.length}

        totalCards={flashcards.length}

        onStart={() => setStarted(true)}

      />

    );

  }

  if (!sessionCards.length) {

    return (

      <StudySummary
        stats={stats}
        totalCards={initialSessionSize}
        onRestart={restartSession}
      />

    );

  }

  return (
    <div className="study-page">
      <h1>Study Mode</h1>

      <StudyProgress
        completed={completedCards}
        total={initialSessionSize}
      />

      <div className="study-container">
        <StudyCard
          card={currentCard}
          revealed={revealed}
          leaving={leaving}
        />
      </div>

      {
        !revealed
          ? (
            <RevealButton
              onReveal={() => setRevealed(true)}
            />
          )
          : (
            <AnswerButtons
              onAnswer={handleAnswer}
            />
          )
      }
    </div>
  );
}