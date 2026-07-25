import { InteractiveTextCard } from "../../InteractiveTextCard/InteractiveTextCard";

export function QuoteBlock({

    block,

    lesson

}){

    return(

        <InteractiveTextCard

            lesson={lesson}

            variant="quote"

            text={block.text}

        />

    );

}
