import { InteractiveTextCard } from "../../InteractiveTextCard/InteractiveTextCard";

export function ParagraphBlock({

    block,

    lesson

}){

    return(

        <InteractiveTextCard

            lesson={lesson}

            icon="📖"

            title="Explanation"

            text={block.text}

        />

    );

}