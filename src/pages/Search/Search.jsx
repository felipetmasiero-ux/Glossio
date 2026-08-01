import { useNavigate } from "react-router-dom";

import { useUniversalSearch } from "../../hooks/useUniversalSearch";
import { useLanguage } from "../../hooks/useLanguage";

import { Input } from "../../components/common/Input/Input";
import { Icon } from "../../components/common/Icon/Icon";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";
import { SearchResultsSection } from "../../components/search/SearchResultsSection";
import { SearchResultRow } from "../../components/search/SearchResultRow";
import { DictionaryResultRow } from "../../components/search/DictionaryResultRow";

import { TOPIC_LABELS } from "../../constants/topics";

import "./Search.css";

export function Search() {

    const navigate = useNavigate();
    const { language } = useLanguage();

    const {
        query,
        setQuery,
        matchedQuery,
        isSearching,
        hasResults,
        lessons,
        videos,
        dictionary,
        flashcards
    } = useUniversalSearch();

    return (

        <div className="page-container search-page animate-fade-in">

            <p className="search-page__label text-mono-label">Buscar</p>
            <h1 className="search-page__title">Pesquisa universal</h1>

            <Input
                className="search-page__input"
                placeholder="Pesquisar..."
                value={query}
                onChange={event => setQuery(event.target.value)}
                icon={<Icon name="search" size={16} />}
            />

            {!isSearching && (
                <EmptyState
                    icon="search"
                    title="Busque em todo o Glossio"
                    description="Encontre lições, vídeos, palavras do dicionário e flashcards em um único lugar."
                />
            )}

            {isSearching && !hasResults && (
                <EmptyState
                    icon="search"
                    title="Nenhum resultado encontrado."
                    description="Tente outra palavra."
                />
            )}

            {isSearching && hasResults && (

                <div className="search-page__results">

                    <SearchResultsSection title="Lições" count={lessons.length}>
                        {lessons.map(result => (
                            <SearchResultRow
                                key={result.id}
                                icon="book"
                                title={result.label}
                                query={matchedQuery}
                                meta={`${language} • ${result.data.level} • Lição`}
                                onClick={() => navigate(`/lessons/${result.id}`)}
                            />
                        ))}
                    </SearchResultsSection>

                    <SearchResultsSection title="Vídeos" count={videos.length}>
                        {videos.map(result => (
                            <SearchResultRow
                                key={result.id}
                                icon="play"
                                title={result.label}
                                query={matchedQuery}
                                meta={`Explore • ${language}${result.data.topic ? ` • ${TOPIC_LABELS[result.data.topic] ?? result.data.topic}` : ""}`}
                                onClick={() => navigate(`/explore/${result.id}`)}
                            />
                        ))}
                    </SearchResultsSection>

                    <SearchResultsSection title="Dicionário" count={dictionary.length}>
                        {dictionary.map(result => (
                            <DictionaryResultRow
                                key={result.id}
                                entry={result.data}
                                query={matchedQuery}
                                matchedText={result.matchedText}
                            />
                        ))}
                    </SearchResultsSection>

                    <SearchResultsSection title="Flashcards" count={flashcards.length}>
                        {flashcards.map(result => (
                            <SearchResultRow
                                key={result.id}
                                icon={result.data.favorite ? "star" : "cards"}
                                title={result.label}
                                query={matchedQuery}
                                meta={result.data.translation}
                                onClick={() => navigate(`/my-flashcards?search=${encodeURIComponent(result.label)}`)}
                            />
                        ))}
                    </SearchResultsSection>

                </div>

            )}

        </div>

    );

}
