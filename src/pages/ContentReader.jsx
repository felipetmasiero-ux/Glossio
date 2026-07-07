import { contentData } from "../data/contentData"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { TranslationPopup } from "../components/common/TranslationPopup/TranslationPopup"

import "./ContentReader.css"

export function ContentReader() {
    const [selectedWord, setSelectedWord] = useState(null)

    const { id } = useParams()

    const content = contentData.find(
        item => item.id === Number(id)
    )

    function showTranslation(item) {
        setSelectedWord(item)
    }

    return (
        <div className="page-container">
            <div className="empty-state">
                <div className="empty-state__icon">✏️</div>

                <h1>{content.title}</h1>

                <p>
                    {content.words.map((item, index) => (
                        <span
                            key={index}
                            className="clickable-word"
                            onClick={() => showTranslation(item)}
                        >
                            {item.word}{" "}
                        </span>
                    ))}
                </p>
                <TranslationPopup word={selectedWord} />
            </div>
        </div>
    );
}