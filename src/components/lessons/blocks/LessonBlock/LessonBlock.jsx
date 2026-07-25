import { lessonBlocks } from "..";
import { UnknownBlock } from "../UnknownBlock/UnknownBlock";
import"../../../../data/lessons/lesson.css";

export function LessonBlock({

    block,
    lesson,
    wordIndex

}) {

    const config = lessonBlocks[block.type];

    if (!config) {

        return <UnknownBlock block={block} />;

    }

    const Component = config.component;

    return (

        <Component

            block={block}

            lesson={lesson}

            wordIndex={wordIndex}

        />

    );

}