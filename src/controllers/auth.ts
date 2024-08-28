import { Response, Request } from 'express';

import { encrypt } from '../utils/bcrypt.handle.js';
import { handleHttp } from '../utils/error.handle.js';
import { crearUser } from '../services/user.js';

import { User } from '../interfaces/user';

export const registrarUsuario = async (req: Request<{}, {}, User>, res: Response) => {
    const { activo, rol, ...userData } = req.body;
    const passHash = await encrypt(userData.password);
    userData.password = passHash;
    try {
        const user = await crearUser(userData);
        res.status(201).json({
            ok: true,
            msg: 'Usuario creado',
            user
        })
    } catch (e) {
        handleHttp(res, 'Error al registrar usuario', e);
    }
}

