import { getOrMigrateEvents, appendEvents } from "../services/eventService.js";

export async function getEvents(req, res, next) {
    try {
        const events = await getOrMigrateEvents(req.userId);
        res.status(200).json(events);
    } catch (err) {
        next(err);
    }
}

export async function postEvents(req, res, next) {
    try {
        const events = await appendEvents(req.userId, req.body);
        res.status(201).json(events);
    } catch (err) {
        next(err);
    }
}
