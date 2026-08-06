import { useEffect, useRef, useState } from "react";

import "./WordPopup.css";

import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";

import { useFlashcards } from "../../../hooks/useFlashcards";
import { useLanguage } from "../../../hooks/useLanguage";
import { useOverlayDismiss } from "../../../hooks/useOverlayDismiss";
import { useRequireAuth } from "../../../hooks/useRequireAuth";
import { trackEvent, ANALYTICS_EVENTS } from "../../../utils/analytics";

const EXPLORE_AUTO_CLOSE_DELAY = 6000;

const ADDED_FEEDBACK_DURATION = 1000;

const EXPLORE_POPUP_WIDTH = 240;

const EXPLORE_POPUP_ESTIMATED_HEIGHT = 160;

const VIEWPORT_MARGIN = 12;

const ANCHOR_GAP = 8;

function getAnchoredPosition(anchorElement) {

    const rect = anchorElement.getBoundingClientRect();

    let left = rect.left;

    if (left + EXPLORE_POPUP_WIDTH > window.innerWidth - VIEWPORT_MARGIN) {
        left = Math.max(VIEWPORT_MARGIN, window.innerWidth - EXPLORE_POPUP_WIDTH - VIEWPORT_MARGIN);
    }

    const fitsBelow = rect.bottom + ANCHOR_GAP + EXPLORE_POPUP_ESTIMATED_HEIGHT <= window.innerHeight - VIEWPORT_MARGIN;

    const top = fitsBelow
        ? rect.bottom + ANCHOR_GAP
        : Math.max(VIEWPORT_MARGIN, rect.top - ANCHOR_GAP - EXPLORE_POPUP_ESTIMATED_HEIGHT);

    return { top, left };

}

export function WordPopup({

    word,

    onClose,

    variant = "lesson",

    anchorElement = null,

    onAdd = () => {}

}) {

    const { addFlashcard } = useFlashcards();

    const { language } = useLanguage();

    const requireAuth = useRequireAuth();

    const isExplore = variant === "explore";

    const [added, setAdded] = useState(false);

    const addedTimeoutRef = useRef(null);

    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    });

    const position = isExplore && anchorElement
        ? getAnchoredPosition(anchorElement)
        : null;

    useOverlayDismiss({
        active: true,
        onDismiss: onClose,
        ignoreSelector: isExplore ? ".clickable-word, .word-popup" : null
    });

    useEffect(() => {

        if (!isExplore) return;

        const autoCloseTimeout = setTimeout(() => onCloseRef.current(), EXPLORE_AUTO_CLOSE_DELAY);

        return () => clearTimeout(autoCloseTimeout);

    }, [isExplore]);

    useEffect(() => () => clearTimeout(addedTimeoutRef.current), []);

    if (!word) {

        return null;

    }

    // Every bit of this - the actual add, the analytics event, the
    // "added!" feedback - is only meaningful once a card was really saved,
    // so unlike LessonReader's handleNext (where reading should carry on
    // regardless), the whole handler is what's gated here: a visitor gets
    // the CTA and nothing else runs. requireAuth(...) is invoked here,
    // inside handleAdd's own body, so it (and the ref access in its
    // callback) only ever runs when handleAdd is called from an event
    // handler - never during render.
    function handleAdd() {

        requireAuth(() => {

            addFlashcard(word, language);

            trackEvent(ANALYTICS_EVENTS.FLASHCARD_ADDED, { language, source: variant });

            onAdd(word.word);

            if (!isExplore) {
                onClose();
                return;
            }

            setAdded(true);

            clearTimeout(addedTimeoutRef.current);

            addedTimeoutRef.current = setTimeout(() => setAdded(false), ADDED_FEEDBACK_DURATION);

        })();

    }

    if (isExplore) {

        if (!position) {
            return null;
        }

        return (

            <div
                className="word-popup word-popup--explore"
                style={{ top: position.top, left: position.left }}
                onClick={event => event.stopPropagation()}
            >

                <p className="word-popup__word word-popup__word--explore">
                    {word.word}
                </p>

                {word.partOfSpeech && (
                    <p className="word-popup__pos text-mono-label">
                        {word.partOfSpeech}
                    </p>
                )}

                <p className="word-popup__translation">
                    {word.translation}
                </p>

                <Button onClick={handleAdd} disabled={added}>
                    {
                        added
                            ? <Icon name="check" size={16} className="word-popup__add-icon--confirm" />
                            : <><Icon name="cards" size={16} /> Adicionar</>
                    }
                </Button>

            </div>

        );

    }

    return (

        <div
            className="word-popup-overlay"
            onClick={onClose}
        >

            <div
                className="word-popup"
                onClick={(event) => event.stopPropagation()}
            >

                <p className="word-popup__label text-mono-label">Verbete</p>

                <h2 className="word-popup__word">
                    {word.word}
                </h2>

                <p className="word-popup__translation">
                    {word.translation}
                </p>

                {

                    word.examples?.[0] && (

                        <p className="word-popup__example">
                            {word.examples[0]}
                        </p>

                    )

                }

                {

                    word.note && (

                        <div className="word-popup__note">
                            <Icon name="lightbulb" size={16} />
                            <span>{word.note}</span>
                        </div>

                    )

                }

                <div className="word-popup-actions">

                    <Button
                        onClick={handleAdd}
                    >

                        <Icon name="cards" size={16} /> Adicionar

                    </Button>

                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >

                        Fechar

                    </Button>

                </div>

            </div>

        </div>

    );

}
