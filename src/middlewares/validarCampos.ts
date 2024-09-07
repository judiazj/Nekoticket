import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import EventModel from '../models/event.js';

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