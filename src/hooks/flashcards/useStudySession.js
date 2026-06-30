import {
  useCallback,
  useContext,
  useReducer
} from "react";

import {
  getDueCards,
} from "../../utils/study/session";

import {
  studyReducer,
  initialStudyState
} from "../../reducers/studyReducer";

import {
  ANSWER,
  UPDATE_QUEUE,
  START_SESSION,
  REVEAL,
  START_LEAVING,
  FINISH_LEAVING,
} from "../../constants/studyActions";

import { CARD_EXIT_ANIMATION } from "../../constants/studyTiming";

import { StudyHistoryContext } from "../../contexts/StudyHistoryContext";


export function useStudySession(
  flashcards,
  language,
  answerFlashcard
) {

  const { addStudyRecord } =
    useContext(StudyHistoryContext);

  const [studyState, dispatch] =
    useReducer(
      studyReducer,
      initialStudyState
    );

  const currentCard =
    studyState.sessionCards[0];

  const startSession = useCallback(() => {

    const cards =
      getDueCards(
        flashcards,
        language
      );

    dispatch({
      type: START_SESSION,
      cards
    });

  }, [flashcards, language]);

  const revealCard = useCallback(() => {

    dispatch({
      type: REVEAL
    });

  }, []);

  const handleAnswer = useCallback((quality) => {

    if (!currentCard) return;

    const card = currentCard;

    dispatch({ type: START_LEAVING });

    dispatch({ type: ANSWER, quality });

    setTimeout(() => {

      answerFlashcard(card.id, quality);

      addStudyRecord(card.id, quality);

      dispatch({
        type: UPDATE_QUEUE,
        card,
        quality
      });

      dispatch({ type: FINISH_LEAVING });

    }, CARD_EXIT_ANIMATION);

  }, [answerFlashcard, addStudyRecord, currentCard]);

  const restartSession = startSession;

  return {
    revealed: studyState.revealed,
    sessionCards: studyState.sessionCards,
    initialSessionSize: studyState.initialSessionSize,
    completedCards: studyState.completedCards,
    currentCard,
    stats: studyState.stats,
    leaving: studyState.leaving,
    handleAnswer,
    startSession,
    restartSession,
    revealCard
  };
}