export function TranslationPopup({ word }) {

    if (!word) return null

    return (
        <div>
            <h3>{word.word}</h3>
            <p>{word.translation}</p>
        </div>
    )
}