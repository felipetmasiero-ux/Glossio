import { useState } from "react";

import { Icon } from "../common/Icon/Icon";
import { HighlightedText } from "./HighlightedText";
import { TOPIC_LABELS } from "../../constants/topics";

import "./SearchResultRow.css";
import "./DictionaryResultRow.css";

// A dictionary result never navigates away - it's a lookup, not a page.
// Clicking expands a small inline preview in place (no popup, no modal, no
// "add to flashcards" action here - that already exists elsewhere).
export function DictionaryResultRow({ entry, query, matchedText }) {

    const [expanded, setExpanded] = useState(false);

    const titleQuery = matchedText === entry.word ? query : "";
    const translationQuery = matchedText === entry.translation ? query : "";

    return (

        <li className="search-result-row">

            <button
                type="button"
                className="search-result-row__button"
                aria-expanded={expanded}
                onClick={() => setExpanded(previous => !previous)}
            >

                <span className="search-result-row__icon">
                    <Icon name="alphabet" size={18} />
                </span>

                <span className="search-result-row__body">
                    <span className="search-result-row__title">
                        <HighlightedText text={entry.word} query={titleQuery} />
                    </span>
                    <span className="search-result-row__meta text-small">
                        <HighlightedText text={entry.translation} query={translationQuery} />
                    </span>
                </span>

                <Icon name="chevron-right" size={16} className="search-result-row__chevron" />

            </button>

            {expanded && (
                <div className="dictionary-result-row__preview">

                    {entry.topic && (
                        <p className="dictionary-result-row__topic text-small">
                            {TOPIC_LABELS[entry.topic] ?? entry.topic}
                        </p>
                    )}

                    {entry.examples?.length > 0 && (
                        <ul className="dictionary-result-row__examples">
                            {entry.examples.map((example, index) => (
                                <li key={index} className="text-secondary">{example}</li>
                            ))}
                        </ul>
                    )}

                    {entry.note && (
                        <p className="dictionary-result-row__note text-small">{entry.note}</p>
                    )}

                </div>
            )}

        </li>

    );

}
