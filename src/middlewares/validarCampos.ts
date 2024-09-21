import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import EventModel from '../models/event.js';
import { totalTicketsEventByUser } from '../services/ticket.js';

export const validarCampos = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}

export const eventExists = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const event = await EventModel.findById(id);
        if (!event) {
            return res.status(400).json({
                msg: 'No existe un evento con ese id'
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            msg: 'Error al validar el evento'
        });
    }
}

export const verifyTicketEventByUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { id_usuario } = req.body;
    try {
        const totalTickets = await totalTicketsEventByUser(id, id_usuario);
        console.log(totalTickets);
        if (totalTickets >= 4) {
            return res.status(400).json({
                msg: 'No puedes obtener más de 4 tickets por evento'
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            msg: 'Error al verificar la cantidad de tickets'
        });
    }
}