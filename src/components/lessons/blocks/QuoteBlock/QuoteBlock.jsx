import { InteractiveTextCard } from "../../InteractiveTextCard/InteractiveTextCard";

export function QuoteBlock({

    block,

    lesson,

    wordIndex

}){

    return(

        <InteractiveTextCard

            lesson={lesson}

            icon="💬"

            title="Quote"

            text={block.text}

            wordIndex={wordIndex}

        />

    );

}