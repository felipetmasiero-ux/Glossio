import "./VideoFilters.css";

import { TOPIC_LABELS } from "../../../constants/topics";

function FilterGroup({ label, options, formatOption, selected, onChange }) {

    if (options.length === 0) {

        return null;

    }

    return (

        <div className="video-filters__group">

            <span className="video-filters__label text-mono-label">{label}</span>

            <div className="video-filters__chips">

                <button
                    type="button"
                    className={`video-filters__chip ${!selected ? "video-filters__chip--active" : ""}`}
                    onClick={() => onChange(null)}
                >
                    Todos
                </button>

                {
                    options.map(option => (
                        <button
                            key={option}
                            type="button"
                            className={`video-filters__chip ${selected === option ? "video-filters__chip--active" : ""}`}
                            onClick={() => onChange(option)}
                        >
                            {formatOption(option)}
                        </button>
                    ))
                }

            </div>

        </div>

    );

}

export function VideoFilters({
    levels,
    topics,
    selectedLevel,
    selectedTopic,
    onLevelChange,
    onTopicChange
}) {

    return (

        <div className="video-filters">

            <FilterGroup
                label="Nível"
                options={levels}
                formatOption={level => level}
                selected={selectedLevel}
                onChange={onLevelChange}
            />

            <FilterGroup
                label="Tópico"
                options={topics}
                formatOption={topic => TOPIC_LABELS[topic] ?? topic}
                selected={selectedTopic}
                onChange={onTopicChange}
            />

        </div>

    );

}
