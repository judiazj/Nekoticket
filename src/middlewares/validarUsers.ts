import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.js';

export const existeEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { correo } = req.body;
    const user = await UserModel.findOne({ correo });
    if (user) {
        return res.status(400).json({
            msg: `El correo ${correo} ya esta registrado`
        });
    }
    next();
}