import { HttpError } from "../utils/HttpError.js";

export function notFound(req, res) {
    res.status(404).json({ error: "Não encontrado." });
}

export function errorHandler(err, req, res, next) {
    if (err instanceof HttpError) {
        return res.status(err.status).json({ error: err.message });
    }

    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor." });
}
