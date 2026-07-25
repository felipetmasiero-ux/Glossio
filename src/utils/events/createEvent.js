export function createEvent(type, payload = {}, id) {

    return {

        id: id ?? crypto.randomUUID(),

        type,

        payload,

        timestamp: Date.now()

    };

}
