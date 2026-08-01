import { useStatistics } from "../../hooks/useStatistics";
import { OTHER_TOPIC } from "../../utils/flashcards/groupFlashcardsByTopic";
import { TOPIC_LABELS } from "../../constants/topics";

import { Section } from "../../components/common/Section/Section";
import { StatsGrid } from "../../components/studyDashboard/StatsGrid";
import { StatsCard } from "../../components/studyDashboard/StatsCard";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";

import "./Statistics.css";

function topicLabel(topic) {
    if (topic === OTHER_TOPIC) return "Outros";
    return TOPIC_LABELS[topic] ?? topic;
}

export function Statistics() {

    const statistics = useStatistics();

    const maxTopicCount = Math.max(1, ...statistics.wordsByTopic.map(entry => entry.count));

    return (

        <div className="page-container statistics-page animate-fade-in">

            <p className="statistics-page__label text-mono-label">Estatísticas</p>

            <h1 className="statistics-page__title">Seu progresso</h1>

            <StatsGrid>

                <StatsCard value={statistics.totalWordsLearned} label="Palavras" icon="cards" />
                <StatsCard value={statistics.lessonsCompleted} label="Lições" icon="book" />
                <StatsCard value={statistics.videosCompleted} label="Vídeos" icon="play" />
                <StatsCard value={statistics.reviews.total} label="Flashcards" icon="list" />
                <StatsCard value={statistics.reviews.totalReviews} label="Revisões" icon="target" />
                <StatsCard value={statistics.streak.current} label="Sequência" icon="flame" />
                <StatsCard value={statistics.favoriteWords} label="Favoritas" icon="star" />

            </StatsGrid>

            <Section title="Palavras por tópico">

                {statistics.wordsByTopic.length === 0 ? (
                    <EmptyState
                        icon="cards"
                        title="Nenhuma palavra ainda"
                        description="Adicione flashcards para ver suas palavras organizadas por tópico."
                    />
                ) : (
                    <div className="statistics-page__bars">
                        {statistics.wordsByTopic.map(entry => (
                            <div className="statistics-bar" key={entry.topic}>
                                <span className="statistics-bar__label">{topicLabel(entry.topic)}</span>
                                <div className="statistics-bar__track">
                                    <div
                                        className="statistics-bar__fill"
                                        style={{ width: `${(entry.count / maxTopicCount) * 100}%` }}
                                    />
                                </div>
                                <span className="statistics-bar__count text-mono-number">{entry.count}</span>
                            </div>
                        ))}
                    </div>
                )}

            </Section>

        </div>

    );

}
