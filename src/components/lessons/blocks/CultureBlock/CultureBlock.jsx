import { InteractiveTextCard } from "../../InteractiveTextCard/InteractiveTextCard";

export function CultureBlock({

    block,

    lesson,

    wordIndex

}){

    return(

        <InteractiveTextCard

            lesson={lesson}

            icon="🌍"

            title="Culture"

            subtitle={block.title}

            text={block.text}

            wordIndex={wordIndex}

        />

    );

}