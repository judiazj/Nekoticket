import { Response } from 'express';
import { User } from '../interfaces/user';

export const handleHttp = (res: Response, error: string, errorRaw?: any) => {
    console.log(errorRaw);
    res.status(500).json({ error });
}

export const handleUserNotExist = (user: User, res: Response) => {
    if (!user) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido - usuario no existe en DB'
        })
    }

    if (!user.activo) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido - usuario inactivo'
        })
    }
}