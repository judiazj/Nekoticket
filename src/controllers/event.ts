import e, { Request, Response } from 'express';

import { handleHttp } from '../utils/error.handle.js';
import { createEvent, getEventById, getEvents, getTicketsSoldByEvent, updateEvent } from '../services/event.js';
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
        let eventos = await getEvents(user);
        let boletasVendidasEventos = await Promise.all(eventos.map(async (evento) => {
            let boletasVendidas: number | any[] = await getTicketsSoldByEvent(evento._id as unknown as string);
            if (Array.isArray(boletasVendidas) && boletasVendidas.length === 0) {
                boletasVendidas = 0;
            } else {
                boletasVendidas = boletasVendidas[0].total_tickets;
            }
            return boletasVendidas;
        }));
        eventos = eventos.map((evento) => {
            return {
                ...evento,
                boletas_vendidas: boletasVendidasEventos.shift()
            }
        });
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
        let boletasVendidas: number | any[] = await getTicketsSoldByEvent(id);
        if (Array.isArray(boletasVendidas) && boletasVendidas.length === 0) {
            boletasVendidas = 0;
        } else {
            boletasVendidas = boletasVendidas[0].total_tickets;
        }
        res.json({
            ok: true,
            msg: 'Evento obtenido',
            evento,
            boletasVendidas
        });
    } catch (err) {
        handleHttp(res, 'Error al obtener evento', err);
    }
}