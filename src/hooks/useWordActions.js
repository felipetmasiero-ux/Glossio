import { useState } from "react";

import { useFlashcards } from "./useFlashcards";
import { useLanguage } from "./useLanguage";

export function useWordActions() {

    const [selectedWord, setSelectedWord] = useState(null);

    const [toast, setToast] = useState("");

    const { addFlashcard } = useFlashcards();

    const { language } = useLanguage();

    function openWord(word){

        setSelectedWord(word);

    }

    function closeWord(){

        setSelectedWord(null);

    }

    function addWord(){

        if(!selectedWord) return;

        addFlashcard(selectedWord, language);

        setSelectedWord(null);

        setToast(`${selectedWord.word} added to Flashcards`);

        setTimeout(

            ()=>setToast(""),

            2000

        );

    }

    return{

        selectedWord,

        openWord,

        closeWord,

        addWord,

        toast

    };

}