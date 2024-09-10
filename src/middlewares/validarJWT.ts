import { NextFunction, Request, Response } from 'express';

import { handleUserNotExist } from '../utils/error.handle.js';
import { verifyToken } from '../utils/token.handle.js';
import UserModel from '../models/user.js';
import { RequestExtend } from '../interfaces/requestExtend';
import { User } from '../interfaces/user.js';



export const validarJWT = async (req: RequestExtend, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    const token = authHeader.split(' ')[1];

    try {
        const { id }: { id: string } = verifyToken(token) as { id: string };


        const usuario = await UserModel.findOne({ correo: id });
        handleUserNotExist(usuario as User, res);

        req.user = usuario;
        next();
    } catch (e) {
        res.status(401).json({
            ok: false,
            msg: 'Token no valido',
            error: e
        })
    }
}

export const optionalJWT = async (req: RequestExtend, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next();
    }

    const token = authHeader.split(' ')[1];

    try {
        const { id }: { id: string } = verifyToken(token) as { id: string };
        const user = await UserModel.findOne({ correo: id });
        handleUserNotExist(user as User, res);

        req.user = user;
        next();
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al validar token',
            error: e
        })
    }
}