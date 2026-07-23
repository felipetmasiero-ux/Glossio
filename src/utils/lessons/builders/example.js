import { createBlock } from "./createBlock";

export function example(data, id) {

    return createBlock(

        "example",

        {

            text: data.text,

            translation: data.translation,

            vocabulary: data.vocabulary ?? []

        },

        id

    );

}