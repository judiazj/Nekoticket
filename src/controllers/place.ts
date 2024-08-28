import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle.js';
import { createPlace, updatePlace } from '../services/place.js';

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

export const actualizarLugar = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id: idBody, ...data } = req.body;
    try {
        const lugar = await updatePlace(id, data);
        if (!lugar) {
            return res.status(404).json({
                ok: false,
                msg: 'Lugar no encontrado'
            });
        }
        res.json({
            ok: true,
            msg: 'Lugar actualizado',
            lugar
        });
    } catch (err) {
        handleHttp(res, 'Error al actualizar lugar', err);
    }
}