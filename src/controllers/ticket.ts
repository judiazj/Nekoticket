import { Request, Response } from 'express';

import { handleHttp } from '../utils/error.handle.js';
import {
    asignTicketByUser,
    createTicketsService,
    getTicketsPaginatedService
} from '../services/ticket.js';


export const createTickets = async (req: Request, res: Response) => {
    const { id_evento, localidad, precio, cantidad } = req.body;

    try {
        const msg = await createTicketsService(id_evento, localidad, precio, cantidad);
        res.status(201).json({
            msg
        });
    } catch (error) {
        handleHttp(res, 'Error al crear los tickets', error);
    }
}

export const asignTickets = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id_usuario } = req.body;
    try {
        const ticket = await asignTicketByUser(id, id_usuario);
        res.json({
            ok: true,
            msg: 'Ticket asignado correctamente',
            ticket
        });
    } catch (error) {
        handleHttp(res, 'Error al asignar los tickets', error);
    }
}

export const getTicketsPaginated = async (req: Request, res: Response) => {
    const { limit = 5 } = req.query;
    const { idEvento } = req.params;
    try {
        const tickets = await getTicketsPaginatedService(idEvento, Number(limit));
        res.json({
            ok: true,
            msg: 'Tickets obtenidos correctamente',
            tickets
        });
    } catch (error) {
        handleHttp(res, 'Error al obtener los tickets', error);
    }
}