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
import { MAX_SESSION_SIZE } from "../../constants/studySession";

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

  // Guards the ~350ms window between a card being answered and
  // FINISH_LEAVING actually swapping in the next one. `currentCard` (and
  // `revealed`) don't change until then, so a second click/Enter/Space
  // during the exit animation would otherwise re-enter handleAnswer for
  // the *same* card - scheduling it twice, double-counting stats, and
  // double-firing the analytics/history side effects in the setTimeout
  // below. A plain ref (not state) because flipping it must never itself
  // cause a render, and it needs to be readable synchronously at the very
  // top of handleAnswer, before any dispatch.
  const isAnsweringRef = useRef(false);

  const startSession = useCallback(() => {

    const dueCards =
      getDueCards(
        flashcards,
        language
      );

    // getDueCards has no ordering of its own (see its own file) - this
    // takes the first MAX_SESSION_SIZE in whatever order it already
    // returned them, it doesn't introduce a new priority rule. Cards
    // beyond the cap are never touched: not rescheduled, not marked
    // studied, still fully due - they just aren't part of *this* session.
    const cards = dueCards.slice(0, MAX_SESSION_SIZE);

    dispatch({
      type: START_SESSION,
      cards
    });

    sessionStartedAtRef.current = Date.now();
    sessionFinishedRef.current = false;
    isAnsweringRef.current = false;

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

    // Second activation (double click, repeated Enter/Space/1-2-3, or a
    // mix of both) for the same card during the exit animation - see
    // isAnsweringRef above. Checked and set synchronously, before any
    // dispatch, so no interleaving of two calls can both pass the check.
    if (!currentCard || isAnsweringRef.current) return;

    isAnsweringRef.current = true;

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

      // The next card (if any) is now current and revealable again -
      // re-open the guard for it.
      isAnsweringRef.current = false;

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