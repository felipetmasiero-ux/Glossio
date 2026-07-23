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

            subtitle="Language in context"

            text={block.text}

            wordIndex={wordIndex}

        />

    );

}