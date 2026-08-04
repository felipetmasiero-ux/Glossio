import { useState } from "react";

import { Button } from "../common/Button/Button";
import { Icon } from "../common/Icon/Icon";
import { ConfirmInline } from "../common/ConfirmInline/ConfirmInline";
import { DeckFormOverlay } from "./DeckFormOverlay";
import { countCardsInDeck, isDuplicateDeck } from "../../utils/decks";
import { NO_DECK_FILTER } from "../../constants/decks";
import "./DecksBar.css";

// Deck management lives inside /my-flashcards (no dedicated route) - this bar
// doubles as the deck filter (chips select `activeDeckId`) and as CRUD entry
// points (+ Novo deck, edit/delete per chip). Delete is blocked - both here
// (disabled button) and defensively by the caller - whenever the deck still
// has cards, per the "não pode remover deck com flashcards" requirement.
export function DecksBar({
  decks,
  languageCards,
  language,
  activeDeckId,
  onSelectDeck,
  addDeck,
  updateDeck,
  removeDeck,
  onNotify
}) {

  const [creating, setCreating] = useState(false);
  const [editingDeck, setEditingDeck] = useState(null);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);

  const decksForLanguage = decks.filter(deck => deck.language === language);

  function handleCreate(values) {
    addDeck(values.name, values.language);
    setCreating(false);
    onNotify?.(`Deck "${values.name}" criado.`);
  }

  function handleEdit(values) {
    updateDeck(editingDeck.id, values.name);
    setEditingDeck(null);
    onNotify?.(`Deck renomeado para "${values.name}".`);
  }

  function handleDelete(deck) {
    removeDeck(deck.id);
    setConfirmingDeleteId(null);

    if (activeDeckId === deck.id) {
      onSelectDeck(null);
    }

    onNotify?.(`Deck "${deck.name}" excluído.`);
  }

  return (
    <div className="decks-bar">

      <div className="decks-bar__chips" role="group" aria-label="Filtrar por deck">

        <button
          type="button"
          className={`decks-bar__chip${!activeDeckId ? " decks-bar__chip--active" : ""}`}
          aria-pressed={!activeDeckId}
          onClick={() => onSelectDeck(null)}
        >
          Todos
        </button>

        <button
          type="button"
          className={`decks-bar__chip${activeDeckId === NO_DECK_FILTER ? " decks-bar__chip--active" : ""}`}
          aria-pressed={activeDeckId === NO_DECK_FILTER}
          onClick={() => onSelectDeck(NO_DECK_FILTER)}
        >
          Sem deck
        </button>

        {decksForLanguage.map(deck => {

          const count = countCardsInDeck(languageCards, deck.id);
          const isActive = activeDeckId === deck.id;
          const isConfirmingDelete = confirmingDeleteId === deck.id;

          if (isConfirmingDelete) {
            return (
              <ConfirmInline
                key={deck.id}
                label={`Excluir "${deck.name}"?`}
                onConfirm={() => handleDelete(deck)}
                onCancel={() => setConfirmingDeleteId(null)}
              />
            );
          }

          return (
            <span key={deck.id} className={`decks-bar__chip${isActive ? " decks-bar__chip--active" : ""}`}>

              <button
                type="button"
                className="decks-bar__chip-label"
                aria-pressed={isActive}
                onClick={() => onSelectDeck(deck.id)}
              >
                {deck.name} <span className="decks-bar__chip-count">{count}</span>
              </button>

              <button
                type="button"
                className="decks-bar__chip-action"
                aria-label={`Editar deck ${deck.name}`}
                onClick={() => setEditingDeck(deck)}
              >
                <Icon name="pencil" size={12} />
              </button>

              <button
                type="button"
                className="decks-bar__chip-action"
                aria-label={`Excluir deck ${deck.name}`}
                disabled={count > 0}
                title={count > 0 ? "Remova os cards deste deck antes de excluí-lo" : undefined}
                onClick={() => setConfirmingDeleteId(deck.id)}
              >
                <Icon name="x" size={12} />
              </button>

            </span>
          );

        })}

      </div>

      <Button variant="secondary" className="decks-bar__new" onClick={() => setCreating(true)}>
        <Icon name="cards" size={14} /> Novo deck
      </Button>

      {creating && (
        <DeckFormOverlay
          title="Novo deck"
          initialValues={{ language }}
          isDuplicate={(name, lang) => isDuplicateDeck(decks, { name, language: lang })}
          submitLabel="Criar deck"
          onSubmit={handleCreate}
          onClose={() => setCreating(false)}
        />
      )}

      {editingDeck && (
        <DeckFormOverlay
          title="Editar deck"
          initialValues={editingDeck}
          isDuplicate={(name, lang) => isDuplicateDeck(decks, { name, language: lang, excludeId: editingDeck.id })}
          submitLabel="Salvar"
          onSubmit={handleEdit}
          onClose={() => setEditingDeck(null)}
        />
      )}

    </div>
  );
}
