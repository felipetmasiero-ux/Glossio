import { Link } from "react-router-dom";

import { GrammarRepository } from "../../repositories/GrammarRepository";
import { Card } from "../common/Card/Card";
import { Icon } from "../common/Icon/Icon";

import "./GrammarTopicDetail.css";

function GrammarTopicList({ title, items, className = "" }) {

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className={`grammar-topic-detail__section ${className}`}>
            <h3 className="grammar-topic-detail__section-title">{title}</h3>
            <ul className="grammar-topic-detail__list">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );

}

export function GrammarTopicDetail({ topic }) {

    const { lesson, videos } = GrammarRepository.getRelated(topic.language, topic);

    return (

        <div className="grammar-topic-detail">

            <h2 className="grammar-topic-detail__title">{topic.title}</h2>

            {topic.summary && (
                <p className="grammar-topic-detail__summary text-secondary">{topic.summary}</p>
            )}

            {(topic.explanation ?? []).map((block, index) => (
                <Card key={index} className="grammar-topic-detail__explanation">
                    <p className="grammar-topic-detail__explanation-title">{block.title}</p>
                    <p className="text-secondary">{block.text}</p>
                </Card>
            ))}

            <GrammarTopicList title="Regras" items={topic.rules} />
            <GrammarTopicList title="Exemplos" items={topic.examples} className="grammar-topic-detail__section--examples" />
            <GrammarTopicList title="Observações" items={topic.notes} />
            <GrammarTopicList title="Erros comuns" items={topic.commonMistakes} className="grammar-topic-detail__section--mistakes" />
            <GrammarTopicList title="Dicas" items={topic.tips} className="grammar-topic-detail__section--tips" />

            {(lesson || videos.length > 0) && (
                <div className="grammar-topic-detail__related">

                    <p className="grammar-topic-detail__related-title text-mono-label">Relacionado</p>

                    <ul className="grammar-topic-detail__related-list">

                        {lesson && (
                            <li>
                                <Link to={`/lessons/${lesson.id}`}>
                                    <Icon name="book" size={14} />
                                    Lição: {lesson.title}
                                </Link>
                            </li>
                        )}

                        {lesson && (
                            <li>
                                <Link to={`/exercises/${lesson.id}`}>
                                    <Icon name="pencil" size={14} />
                                    Exercícios
                                </Link>
                            </li>
                        )}

                        {videos.map(video => (
                            <li key={video.id}>
                                <Link to={`/explore/${video.id}`}>
                                    <Icon name="play" size={14} />
                                    Vídeo: {video.title}
                                </Link>
                            </li>
                        ))}

                    </ul>

                </div>
            )}

        </div>

    );

}
