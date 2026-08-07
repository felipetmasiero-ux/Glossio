import { useContext, useState } from "react";

import { FlashcardContext } from "../../contexts/FlashcardContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { StudyHistoryContext } from "../../contexts/StudyHistoryContext";

import { useStudySession } from "../../hooks/flashcards/useStudySession";
import { useKeyboardShortcuts } from "../../hooks/flashcards/useKeyboardShortcuts";
import { useSeo } from "../../hooks/useSeo";

import { StudyCard } from "../../components/flashcards/StudyCard";
import { StudyProgress } from "../../components/flashcards/StudyProgress";
import { RevealButton } from "../../components/flashcards/RevealButton";
import { AnswerButtons } from "../../components/flashcards/AnswerButtons";
import { StudySummary } from "../../components/flashcards/StudySummary";
import { StudyDashboard } from "../../components/studyDashboard/StudyDashboard";

import { getDashboardData } from "../../utils/study/dashboard";

import "./StudyFlashcards.css";

export function StudyFlashcards() {

  const [started, setStarted] =
    useState(false);

  // This page has several early `return`s below (one per session phase),
  // so useSeo has to run here rather than via <Seo> JSX inside each branch.
  useSeo({
    title: "Modo de Estudo",
    description: "Revise seus flashcards com repetição espaçada (SM-2).",
    robots: "noindex, nofollow",
    path: "/flashcards"
  });

  const { flashcards, answerFlashcard } =
    useContext(FlashcardContext);

  const { language } =
    useContext(LanguageContext);

  const { studyHistory } =
    useContext(StudyHistoryContext);

  const {

    revealed,

    revealCard,

    sessionCards,

    currentCard,

    stats,

    completedCards,

    initialSessionSize,

    leaving,

    handleAnswer,

    startSession,

    restartSession

  } = useStudySession(
    flashcards,
    language,
    answerFlashcard
  );

  const dashboard = getDashboardData({
    flashcards,
    language,
    studyHistory
});

  useKeyboardShortcuts({

    currentCard,

    revealed,
    revealCard,

    handleAnswer

  });



  if (!started) {



    return (

      <StudyDashboard
        dashboard={dashboard}
        onStart={() => {
          startSession();
          setStarted(true);
        }}
      />
    );

  }

  if (!sessionCards.length) {

    return (

      <StudySummary
        stats={stats}
        totalCards={initialSessionSize}
        remainingDue={dashboard.due}
        onRestart={restartSession}
      />

    );

  }

  return (
    <div className="study-page">
      <h1>Modo de estudo</h1>

      <StudyProgress
        completedCards={completedCards}
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
              onReveal={revealCard}
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