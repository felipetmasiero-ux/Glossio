import { useState } from "react";

import { Button } from "../common/Button/Button";
import { Input } from "../common/Input/Input";
import { SUPPORTED_LANGUAGES } from "../../constants/languages";
import "./FlashcardForm.css";

export function DeckForm({
  initialValues,
  isDuplicate,
  onSubmit,
  onCancel,
  submitLabel = "Salvar"
}) {

  const isEditing = Boolean(initialValues?.id);

  const [name, setName] = useState(initialValues?.name ?? "");
  const [language, setLanguage] = useState(initialValues?.language ?? SUPPORTED_LANGUAGES[0]);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Dê um nome ao deck.");
      return;
    }

    if (isDuplicate?.(trimmedName, language)) {
      setError("Você já tem um deck com esse nome nesse idioma.");
      return;
    }

    setError("");

    onSubmit({ name: trimmedName, language });
  }

  return (
    <form className="flashcard-form" onSubmit={handleSubmit}>

      <label className="flashcard-form__label" htmlFor="deck-form-name">Nome do deck</label>
      <Input
        id="deck-form-name"
        value={name}
        onChange={event => setName(event.target.value)}
        placeholder="Ex: Verbos irregulares"
      />

      {isEditing ? (
        <p className="flashcard-form__hint">Idioma: {language}</p>
      ) : (
        <>
          <label className="flashcard-form__label" htmlFor="deck-form-language">Idioma</label>
          <select
            id="deck-form-language"
            className="input"
            value={language}
            onChange={event => setLanguage(event.target.value)}
          >
            {SUPPORTED_LANGUAGES.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </>
      )}

      {error && <p className="flashcard-form__error" role="alert">{error}</p>}

      <div className="flashcard-form__actions">
        <Button type="submit">{submitLabel}</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
      </div>

    </form>
  );
}
