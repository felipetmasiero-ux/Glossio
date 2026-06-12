import "./EmptyState.css"
import { useContext } from "react"
import { FlashcardContext } from "../contexts/FlashcardContext"

export function Flashcards() {
  const {
    flashcards,
    removeFlashcard
  } = useContext(FlashcardContext)

  return (
    <div className="page-container">
      <div className="empty-state">
        <div className="empty-state__icon">🃏</div>
        <h2 className="empty-state__title">Flashcards</h2>
        <div>

          <h1>My Flashcards</h1>

          {flashcards.map(card => (

            <div key={card.word}>

              <h3>{card.word}</h3>

              <p>{card.translation}</p>

              <button
                onClick={() =>
                  removeFlashcard(card.word)
                }
              >
                Remove
              </button>

            </div>

          ))}

        </div>
      </div>
    </div>
  )
}
