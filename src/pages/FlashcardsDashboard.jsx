import { useContext } from "react";

import { FlashcardContext } from "../contexts/FlashcardContext";

import { StudyDashboard } from "../components/flashcards/StudyDashboard";

export function FlashcardsDashboard() {

  const {

    flashcards,

    removeFlashcard

  } = useContext(FlashcardContext);

  return (

    <div className="page-container">

      <h1>My Flashcards</h1>

      <StudyDashboard
        flashcards={flashcards}
        removeFlashcard={removeFlashcard}
      />

    </div>

  );

}