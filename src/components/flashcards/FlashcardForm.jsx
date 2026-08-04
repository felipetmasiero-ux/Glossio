import { useState } from "react";

import { Button } from "../common/Button/Button";
import { Input } from "../common/Input/Input";
import { SUPPORTED_LANGUAGES } from "../../constants/languages";
import "./FlashcardForm.css";

// Shared by both "create" and "edit" flows in MyFlashcards - `initialValues`
// is empty for create, prefilled for edit. `isDuplicate` lets the caller
// reuse the same word+language uniqueness rule FlashcardProvider already
// enforces (see isDuplicateFlashcard.js), so the user gets an inline message
// instead of a silent no-op.
export function FlashcardForm({
  initialValues,
  decks,
  isDuplicate,
  onSubmit,
  onCancel,
  submitLabel = "Salvar"
}) {

  const [values, setValues] = useState(() => ({
    word: initialValues?.word ?? "",
    translation: initialValues?.translation ?? "",
    example: initialValues?.example ?? "",
    notes: initialValues?.notes ?? "",
    language: initialValues?.language ?? SUPPORTED_LANGUAGES[0],
    deckId: initialValues?.deckId ?? ""
  }));

  const [error, setError] = useState("");

  function handleChange(field, value) {
    setValues(previous => ({ ...previous, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const word = values.word.trim();
    const translation = values.translation.trim();

    if (!word || !translation) {
      setError("Palavra e tradução são obrigatórias.");
      return;
    }

    if (isDuplicate?.(word, values.language)) {
      setError("Você já tem um flashcard com essa palavra nesse idioma.");
      return;
    }

    setError("");

    onSubmit({
      word,
      translation,
      example: values.example.trim() || null,
      notes: values.notes.trim() || null,
      language: values.language,
      deckId: values.deckId || null
    });
  }

  const decksForLanguage = decks.filter(deck => deck.language === values.language);

  return (
    <form className="flashcard-form" onSubmit={handleSubmit}>

      <label className="flashcard-form__label" htmlFor="flashcard-form-word">Palavra</label>
      <Input
        id="flashcard-form-word"
        value={values.word}
        onChange={event => handleChange("word", event.target.value)}
        placeholder="Ex: casa"
      />

      <label className="flashcard-form__label" htmlFor="flashcard-form-translation">Tradução</label>
      <Input
        id="flashcard-form-translation"
        value={values.translation}
        onChange={event => handleChange("translation", event.target.value)}
        placeholder="Ex: house"
      />

      <label className="flashcard-form__label" htmlFor="flashcard-form-language">Idioma</label>
      <select
        id="flashcard-form-language"
        className="input"
        value={values.language}
        onChange={event => handleChange("language", event.target.value)}
      >
        {SUPPORTED_LANGUAGES.map(language => (
          <option key={language} value={language}>{language}</option>
        ))}
      </select>

      <label className="flashcard-form__label" htmlFor="flashcard-form-deck">Deck</label>
      <select
        id="flashcard-form-deck"
        className="input"
        value={values.deckId}
        onChange={event => handleChange("deckId", event.target.value)}
      >
        <option value="">Sem deck</option>
        {decksForLanguage.map(deck => (
          <option key={deck.id} value={deck.id}>{deck.name}</option>
        ))}
      </select>

      <label className="flashcard-form__label" htmlFor="flashcard-form-example">Exemplo (opcional)</label>
      <textarea
        id="flashcard-form-example"
        className="input"
        rows={2}
        value={values.example}
        onChange={event => handleChange("example", event.target.value)}
        placeholder="Frase de exemplo"
      />

      <label className="flashcard-form__label" htmlFor="flashcard-form-notes">Notas (opcional)</label>
      <textarea
        id="flashcard-form-notes"
        className="input"
        rows={2}
        value={values.notes}
        onChange={event => handleChange("notes", event.target.value)}
        placeholder="Dicas, contexto, observações"
      />

      {error && <p className="flashcard-form__error" role="alert">{error}</p>}

      <div className="flashcard-form__actions">
        <Button type="submit">{submitLabel}</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
      </div>

    </form>
  );
}
