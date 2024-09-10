import { Request, Response } from 'express';

import { handleHttp } from '../utils/error.handle.js';
import { asignTicketByUser, createTicketsService } from '../services/ticket.js';


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