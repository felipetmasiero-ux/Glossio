import { useState, useEffect, useCallback, useMemo } from "react";
import { DeckContext } from "./DeckContext";
import {
    createDeck,
    loadDecks,
    saveDecks,
    renameDeck as renameDeckEntry,
    isDuplicateDeck
} from "../utils/decks";

export function DeckProvider({ children }) {

    const [decks, setDecks] = useState(loadDecks);

    useEffect(() => {
        saveDecks(decks);
    }, [decks]);

    // Reads `decks` directly (for the duplicate check), same trade-off as
    // FlashcardProvider.addFlashcard.
    const addDeck = useCallback((name, language) => {

        const trimmedName = name?.trim();

        if (!trimmedName) {
            console.warn("Invalid deck name:", name);
            return;
        }

        if (isDuplicateDeck(decks, { name: trimmedName, language })) {
            console.warn("Skipped deck: duplicate name", trimmedName);
            return;
        }

        const deck = createDeck({ name: trimmedName, language });

        setDecks(previous => [...previous, deck]);

        return deck;

    }, [decks]);

    const updateDeck = useCallback((deckId, name) => {

        const trimmedName = name?.trim();
        const target = decks.find(deck => deck.id === deckId);

        if (!trimmedName || !target) return;

        if (isDuplicateDeck(decks, { name: trimmedName, language: target.language, excludeId: deckId })) {
            console.warn("Skipped deck rename: duplicate name", trimmedName);
            return;
        }

        setDecks(previous =>
            previous.map(deck =>
                deck.id === deckId
                    ? renameDeckEntry(deck, trimmedName)
                    : deck
            )
        );
    }, [decks]);

    const removeDeck = useCallback(deckId => {
        setDecks(previous =>
            previous.filter(deck => deck.id !== deckId)
        );
    }, []);

    const value = useMemo(() => ({
        decks,
        addDeck,
        updateDeck,
        removeDeck
    }), [decks, addDeck, updateDeck, removeDeck]);

    return (
        <DeckContext.Provider value={value}>
            {children}
        </DeckContext.Provider>
    );
}
