import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle.js';
import { getUserById } from '../services/user.js';


export const getUserId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        res.json({
            ok: true,
            msg: 'Usuario encontrado',
            user
        })
    } catch (error) {
        handleHttp(res, 'Error al obtener el usuario', error);
    }
}