import { InteractiveTextCard } from "../../InteractiveTextCard/InteractiveTextCard";

export function GrammarBlock({

    block,

    lesson

}){

    return(

        <InteractiveTextCard

            lesson={lesson}

            icon="📚"

            title="Grammar"

            subtitle={block.title}

            text={block.text}

        />

    );

}