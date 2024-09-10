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
    const { id_usuario, localidad, cantidad } = req.body;

    if (cantidad < 1 || cantidad > 4) {
        return res.status(400).json({ msg: 'La cantidad de boletas debe ser entre 1 y 4' });
    }
    try {
        const tickets = await asignTicketByUser(id, localidad, cantidad, id_usuario);
        if (tickets === 'No hay suficientes boletas disponibles') {
            return res.status(400).json({ msg: 'No hay suficientes boletas disponibles' });
        }

        res.json({
            ok: true,
            msg: 'Compra exitosa',
            tickets
        });
    } catch (error) {
        handleHttp(res, 'Error al asignar los tickets', error);
    }
}

export const getTicketsByLocalidad = async (req: Request, res: Response) => {
    const { idEvento } = req.params;
    try {
        const tickets = await getTicketsPaginatedService(idEvento);
        if (tickets.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron boletas disponibles para este evento.' });
        }

        res.status(200).json({
            ok: true,
            msg: 'Boletas disponibles para el evento',
            tickets
        });
    } catch (error) {
        handleHttp(res, 'Error al obtener los tickets', error);
    }
}