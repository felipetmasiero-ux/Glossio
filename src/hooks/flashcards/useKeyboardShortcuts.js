import { useEffect } from "react";

export function useKeyboardShortcuts({
  currentCard,
  revealed,
  revealCard,
  handleAnswer
}) {

  useEffect(() => {

    function handleKeyDown(event) {

      if (!currentCard) return;

      if (!revealed && event.code === "Space") {
        event.preventDefault();
        revealCard();
        return;
      }

      if (!revealed) return;

      switch (event.key) {

        case "1":
          handleAnswer(1);
          break;

        case "2":
          handleAnswer(3);
          break;

        case "3":
          handleAnswer(5);
          break;

        default:
          break;

      }

    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

  }, [
    currentCard,
    revealed,
    handleAnswer,
    revealCard
  ]);

}