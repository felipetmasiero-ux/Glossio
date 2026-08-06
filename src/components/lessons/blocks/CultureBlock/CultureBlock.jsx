import { InteractiveTextCard } from "../../InteractiveTextCard/InteractiveTextCard";

export function CultureBlock({

    block,

    lesson

}){

    return(

        <InteractiveTextCard

            lesson={lesson}

            icon="globe"

            title="Cultura"

            subtitle={block.title}

            text={block.text}

            audio={block.audio}

        />

    );

}