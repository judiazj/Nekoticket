import { Request, Response } from 'express';

import { handleHttp } from '../utils/error.handle.js';
import { createEvent } from '../services/event.js';

export const crearEvento = async (req: Request, res: Response) => {
    const { id, activo, ...data } = req.body;
    try {
        const evento = await createEvent(data);
        res.json({
            ok: true,
            msg: 'Evento creado',
            evento
        });
    } catch (err) {
        handleHttp(res, 'Error al crear evento', err);
    }
}