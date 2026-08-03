import { memo } from "react";

import { EmptyState } from "../../common/EmptyState/EmptyState";

import "./VocabularyDistributionCard.css";

// distribution stays referentially stable across renders where flashcards/
// language haven't changed (see useDashboardData.js) - memo lets this card
// skip re-rendering in that case.
export const VocabularyDistributionCard = memo(function VocabularyDistributionCard({ distribution }) {

    if (distribution.length === 0) {
        return (
            <EmptyState
                icon="ruler"
                title="Sem vocabulário ainda"
                description="Este idioma ainda não tem palavras cadastradas no dicionário."
            />
        );
    }

    return (

        <div className="vocabulary-distribution-card">

            {distribution.map(entry => (

                <div className="vocabulary-distribution-card__row" key={entry.level}>

                    <span className="vocabulary-distribution-card__level text-mono-label">{entry.level}</span>

                    <div
                        className="vocabulary-distribution-card__track"
                        role="progressbar"
                        aria-valuenow={entry.percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${entry.level}: ${entry.percentage}% do vocabulário conhecido`}
                    >
                        <div
                            className="vocabulary-distribution-card__fill"
                            style={{ width: `${entry.percentage}%` }}
                        />
                    </div>

                    <span className="vocabulary-distribution-card__percentage text-mono-number">{entry.percentage}%</span>

                </div>

            ))}

        </div>

    );

});
