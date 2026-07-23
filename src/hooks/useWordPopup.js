import { useState } from "react";

export function useWordPopup({ vocabulary = [] }) {

    const [selectedWord, setSelectedWord] = useState(null);

    function openWord(wordOrText) {

        if (typeof wordOrText === "object") {
            setSelectedWord(wordOrText);
            return;
        }

        const normalized = wordOrText.toLowerCase();

        const found = vocabulary.find(item =>
            item.word.toLowerCase() === normalized
        );

        if (found) {
            setSelectedWord(found);
        }
    }

    function closeWord() {
        setSelectedWord(null);
    }

    return {
        selectedWord,
        openWord,
        closeWord
    };
}