import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef
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
import { MIN_QUALITY_TO_PASS } from "../../constants/scheduling";

import { StudyHistoryContext } from "../../contexts/StudyHistoryContext";
import { useLastActivity } from "../useLastActivity";
import { trackEvent, ANALYTICS_EVENTS } from "../../utils/analytics";


export function useStudySession(
  flashcards,
  language,
  answerFlashcard
) {

  const { addStudyRecord } =
    useContext(StudyHistoryContext);

  const { setActivity, clearActivity } = useLastActivity();

  const [studyState, dispatch] =
    useReducer(
      studyReducer,
      initialStudyState
    );

  const currentCard =
    studyState.sessionCards[0];

  // Session-lifetime bookkeeping that doesn't need to trigger a render -
  // sessionFinishedRef guards study_session_finished from firing more than
  // once for the same session (the effect below re-runs on every dispatch
  // once sessionCards is empty, not just the transition into that state).
  const sessionStartedAtRef = useRef(null);
  const sessionFinishedRef = useRef(true);

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

    sessionStartedAtRef.current = Date.now();
    sessionFinishedRef.current = false;

    trackEvent(ANALYTICS_EVENTS.STUDY_SESSION_STARTED, {
      language,
      cardsCount: cards.length
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

      trackEvent(ANALYTICS_EVENTS.REVIEW_COMPLETED, {
        cardId: card.id,
        quality,
        correct: quality >= MIN_QUALITY_TO_PASS
      });

      dispatch({
        type: UPDATE_QUEUE,
        card,
        quality
      });

      dispatch({ type: FINISH_LEAVING });

    }, CARD_EXIT_ANIMATION);

  }, [answerFlashcard, addStudyRecord, currentCard]);

  const restartSession = startSession;

  useEffect(() => {

    if (studyState.sessionCards.length > 0) {

      setActivity({
        type: "flashcards",
        remaining: studyState.sessionCards.length,
        total: studyState.initialSessionSize
      });

    } else if (studyState.initialSessionSize > 0) {

      clearActivity();

      if (!sessionFinishedRef.current) {

        sessionFinishedRef.current = true;

        const { again, good, easy } = studyState.stats;
        const startedAt = sessionStartedAtRef.current;

        trackEvent(ANALYTICS_EVENTS.STUDY_SESSION_FINISHED, {
          language,
          cardsReviewed: again + good + easy,
          cardsCorrect: good + easy,
          cardsWrong: again,
          studyDuration: startedAt ? Date.now() - startedAt : null
        });

      }

    }

  }, [studyState.sessionCards.length, studyState.initialSessionSize, studyState.stats, language, setActivity, clearActivity]);

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