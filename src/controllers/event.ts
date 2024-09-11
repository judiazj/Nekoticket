import e, { Request, Response } from 'express';

import { handleHttp } from '../utils/error.handle.js';
import { createEvent, getEventById, getEvents, updateEvent } from '../services/event.js';
import { RequestExtend } from '../interfaces/requestExtend';
import { getUserById } from '../services/user.js';
import { User } from '../interfaces/user.js';

export const crearEvento = async (req: RequestExtend, res: Response) => {
    const { id, activo, ...data } = req.body;
    // data.id_artista = req.user._id;
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

export const obtenerEventos = async (req: RequestExtend, res: Response) => {
    const { id_usuario } = req.body;
    try {
        const user: User = await getUserById(id_usuario) as User;
        const eventos = await getEvents(user);
        res.json({
            ok: true,
            msg: 'Eventos obtenidos',
            eventos
        });
    } catch (err) {
        handleHttp(res, 'Error al obtener eventos', err);
    }
}

export const actualizarEvento = async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const { id } = req.params;
    try {
        const evento = await updateEvent(id, data);
        if (evento === 'Evento no encontrado') {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }
        res.json({
            ok: true,
            msg: 'Evento actualizado',
            evento
        });
    } catch (err) {
        handleHttp(res, 'Error al actualizar evento', err);
    }
}

export const obtenerEventoPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const evento = await getEventById(id);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }
        res.json({
            ok: true,
            msg: 'Evento obtenido',
            evento
        });
    } catch (err) {
        handleHttp(res, 'Error al obtener evento', err);
    }
}