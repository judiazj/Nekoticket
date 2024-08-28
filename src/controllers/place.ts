import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle.js';
import { createPlace } from '../services/place.js';

export const crearLugar = async (req: Request, res: Response) => {
    const { id, ...data } = req.body;
    try {
        const lugar = await createPlace(data);
        res.json({
            ok: true,
            msg: 'Lugar creado',
            lugar
        });
    } catch (err) {
        handleHttp(res, 'Error al crear lugar', err);
    }
}