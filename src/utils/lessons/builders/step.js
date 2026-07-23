import { createBlock } from "./createBlock";

export function step(title, id) {

    return createBlock(

        "step",

        {

            title

        },

        id

    );

}