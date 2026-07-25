import { InteractiveTextCard } from "../../InteractiveTextCard/InteractiveTextCard";

export function CultureBlock({

    block,

    lesson

}){

    return(

        <InteractiveTextCard

            lesson={lesson}

            icon="🌍"

            title="Culture"

            subtitle={block.title}

            text={block.text}

        />

    );

}