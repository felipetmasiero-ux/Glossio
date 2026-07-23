import { InfoBox } from "../../common/InfoBox/InfoBox";

export function TipBlock({

    block

}) {

    return (

        <InfoBox

            variant="tip"

            icon="💡"

            title={block.title ?? "Tip"}

        >

            <p>

                {block.text}

            </p>

        </InfoBox>

    );

}