export function createBlock(
    type,
    data,
    id
) {

    return {

        id: id ?? crypto.randomUUID(),

        type,

        ...data

    };

}