import { Link } from "react-router-dom";

import { InteractiveTextCard } from "../../InteractiveTextCard/InteractiveTextCard";
import { Icon } from "../../../common/Icon/Icon";

import { GrammarRepository } from "../../../../repositories/GrammarRepository";

import "./GrammarBlock.css";

export function GrammarBlock({

    block,

    lesson

}){

    const topic = lesson ? GrammarRepository.getByLessonId(lesson.language, lesson.id) : null;

    return(

        <InteractiveTextCard

            lesson={lesson}

            icon="ruler"

            title="Gramática"

            subtitle={block.title}

            text={block.text}

            audio={block.audio}

        >

            {topic && (
                <Link
                    to={`/grammar?topic=${encodeURIComponent(topic.id)}`}
                    className="grammar-block__reference-link"
                >
                    Ver referência completa
                    <Icon name="chevron-right" size={13} />
                </Link>
            )}

        </InteractiveTextCard>

    );

}
