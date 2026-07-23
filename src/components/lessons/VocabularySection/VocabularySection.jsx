import "./VocabularySection.css";

import { VocabularyCard } from "../VocabularyCard/VocabularyCard";

import { WordPopup } from "../WordPopup/WordPopup";

import { useWordPopup } from "../../../hooks/useWordPopup";

export function VocabularySection({

    vocabulary=[]

}){

    const{

        selectedWord,

        openWord,

        closeWord

    }=useWordPopup({

        vocabulary

    });

    return(

        <>

            <section className="vocabulary-section">

                <h2>

                    Vocabulary

                </h2>

                <div className="vocabulary-grid">

                    {

                        vocabulary.map(word=>(

                            <VocabularyCard

                                key={word.word}

                                word={word}

                                onOpen={openWord}

                            />

                        ))

                    }

                </div>

            </section>

            <WordPopup

                word={selectedWord}

                onClose={closeWord}

            />

        </>

    );

}