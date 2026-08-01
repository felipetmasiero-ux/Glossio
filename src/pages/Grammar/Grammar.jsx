import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { GrammarRepository } from "../../repositories/GrammarRepository";
import { filterGrammarTopics } from "../../utils/grammar/filterGrammarTopics";
import { TOPIC_LABELS } from "../../constants/topics";

import { Input } from "../../components/common/Input/Input";
import { Icon } from "../../components/common/Icon/Icon";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";
import { GrammarTopicDetail } from "../../components/grammar/GrammarTopicDetail";

import "./Grammar.css";

const LANGUAGES = ["english", "french", "portuguese"];
const LANGUAGE_LABELS = { english: "English", french: "French", portuguese: "Portuguese" };

export function Grammar() {

    const [searchParams] = useSearchParams();
    const { language } = useLanguage();

    // The whole tree (all three languages) is browsable here - unlike the
    // rest of the app, a reference is useful to consult regardless of which
    // language the learner is actively studying right now.
    const groups = useMemo(() => {

        return LANGUAGES.flatMap(lang => {

            const levels = GrammarRepository.getLevels(lang);

            return Object.entries(levels).map(([level, topics]) => ({
                key: `${lang}-${level}`,
                label: `${LANGUAGE_LABELS[lang]} ${level.toUpperCase()}`,
                topics
            }));

        });

    }, []);

    const allTopics = useMemo(() => groups.flatMap(group => group.topics), [groups]);

    const [selectedId, setSelectedId] = useState(() => {

        const fromLink = searchParams.get("topic");
        if (fromLink && allTopics.some(topic => topic.id === fromLink)) {
            return fromLink;
        }

        const currentLanguageTopic = allTopics.find(topic => topic.language === language?.toLowerCase());

        return currentLanguageTopic?.id ?? allTopics[0]?.id ?? null;

    });

    const [query, setQuery] = useState("");

    const selectedTopic = allTopics.find(topic => topic.id === selectedId) ?? null;

    const filteredGroups = useMemo(() => {

        return groups
            .map(group => ({ ...group, topics: filterGrammarTopics(group.topics, query) }))
            .filter(group => group.topics.length > 0);

    }, [groups, query]);

    return (

        <div className="page-container grammar-page animate-fade-in">

            <p className="grammar-page__label text-mono-label">Gramática</p>
            <h1 className="grammar-page__title">Central de gramática</h1>
            <p className="grammar-page__subtitle text-secondary">
                Uma referência rápida de gramática, organizada por idioma e nível - não é um curso novo.
            </p>

            <Input
                className="grammar-page__search"
                placeholder="Buscar na gramática..."
                value={query}
                onChange={event => setQuery(event.target.value)}
                icon={<Icon name="search" size={16} />}
            />

            {filteredGroups.length === 0 ? (

                <EmptyState
                    icon="ruler"
                    title="Nenhum resultado encontrado."
                    description="Tente outro termo."
                />

            ) : (

                <div className="grammar-page__layout">

                    <nav className="grammar-page__nav" aria-label="Tópicos de gramática">
                        {filteredGroups.map(group => (
                            <div key={group.key} className="grammar-nav-group">

                                <h2 className="grammar-nav-group__title">{group.label}</h2>

                                {group.topics.map(topic => (
                                    <div key={topic.id} className="grammar-nav-item">

                                        <button
                                            type="button"
                                            className={`grammar-nav-item__button${topic.id === selectedId ? " grammar-nav-item__button--active" : ""}`}
                                            aria-expanded={topic.id === selectedId}
                                            onClick={() => setSelectedId(topic.id)}
                                        >
                                            <span className="grammar-nav-item__title">{topic.title}</span>
                                            <span className="grammar-nav-item__meta text-small">
                                                {TOPIC_LABELS[topic.topic] ?? topic.topic} • {topic.level}
                                            </span>
                                        </button>

                                        {/* Mobile accordion content - hidden on desktop via CSS,
                                            where the same detail renders once in the side pane instead. */}
                                        {topic.id === selectedId && (
                                            <div className="grammar-nav-item__mobile-content">
                                                <GrammarTopicDetail topic={topic} />
                                            </div>
                                        )}

                                    </div>
                                ))}

                            </div>
                        ))}
                    </nav>

                    <div className="grammar-page__content">
                        {selectedTopic ? (
                            <GrammarTopicDetail topic={selectedTopic} />
                        ) : (
                            <EmptyState
                                icon="ruler"
                                title="Selecione um tópico"
                                description="Escolha um tópico de gramática ao lado para ver os detalhes."
                            />
                        )}
                    </div>

                </div>

            )}

        </div>

    );

}
