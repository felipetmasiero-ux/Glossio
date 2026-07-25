import { InteractiveTextCard } from "../../InteractiveTextCard/InteractiveTextCard";

export function GrammarBlock({

    block,

    lesson

}){

    return(

        <InteractiveTextCard

            lesson={lesson}

            icon="ruler"

            title="Gramática"

            subtitle={block.title}

            text={block.text}

        />

    );

}