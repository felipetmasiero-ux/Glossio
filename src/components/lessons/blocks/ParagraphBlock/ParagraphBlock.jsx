import { InteractiveTextCard } from "../../InteractiveTextCard/InteractiveTextCard";

export function ParagraphBlock({

    block,

    lesson

}){

    return(

        <InteractiveTextCard

            lesson={lesson}

            icon="book"

            title="Explicação"

            text={block.text}

        />

    );

}