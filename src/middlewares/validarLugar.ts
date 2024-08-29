import { Request, Response, NextFunction } from 'express';
import PlaceModel from '../models/place.js';

export const existeLugarPorId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const lugar = await PlaceModel.findById(id);
    if (!lugar) {
        return res.status(400).json({
            msg: `El lugar con id ${id} no existe`
        });
    }
    next();
}